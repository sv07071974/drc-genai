import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.schema.output_parser import StrOutputParser
import json
import datetime

# Load environment variables
load_dotenv()

app = FastAPI(title="DRC AI Consultant API")

# Configure CORS so the frontend can call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the LLM
# This expects OPENAI_API_KEY to be in the environment/.env
try:
    llm = ChatOpenAI(temperature=0.2, model="gpt-4o")
except Exception as e:
    print(f"Warning: Could not initialize LLM. Error: {e}")
    llm = None

class AssessmentData(BaseModel):
    role: str
    department: str
    scores: dict
    consentGiven: bool

# Define the consulting prompt template
CONSULTANT_TEMPLATE = """
You are an expert Digital Transformation Consultant evaluating a company's digital readiness.
The user has just completed a comprehensive Digital Readiness Check across 5 categories: Organization, People, Culture, Tools, and Technology.

Here is their profile:
- Role/Perspective: {role}
- Department: {department}

Here are their scores (out of 5) for each category:
- Organization: {org_score}
- People: {people_score}
- Culture: {culture_score}
- Tools: {tools_score}
- Technology: {tech_score}

Based on this specific profile and these exact scores, provide a highly tailored, strategic evaluation.
DO NOT use markdown formatting outside of the JSON structure.

You must respond ONLY with a valid JSON object matching this exact structure:
{{
    "executiveSummary": "A 2-3 sentence high-level summary of their current state and primary strategic imperative.",
    "keyRisks": [
        "Risk 1 description based on lowest scores",
        "Risk 2 description based on lowest scores"
    ],
    "automationOpportunities": [
        "Specific, actionable automation opportunity 1 relevant to their department/role",
        "Specific, actionable automation opportunity 2 relevant to their department/role",
        "Specific, actionable automation opportunity 3 relevant to their department/role"
    ],
    "strategicRoadmap": [
        {{"phase": "Phase 1: Immediate Wins", "action": "Description of action"}},
        {{"phase": "Phase 2: Foundation Building", "action": "Description of action"}},
        {{"phase": "Phase 3: Advanced Capabilities", "action": "Description of action"}}
    ]
}}

Ensure the tone is professional, consultative, and directly addresses the implications of their department ({department}) and role ({role}).
"""

prompt = PromptTemplate(
    input_variables=["role", "department", "org_score", "people_score", "culture_score", "tools_score", "tech_score"],
    template=CONSULTANT_TEMPLATE
)

@app.post("/api/generate-insights")
async def generate_insights(data: AssessmentData):
    if not data.consentGiven:
        raise HTTPException(status_code=400, detail="User consent is required for AI generation.")
    
    if not llm:
        print("Warning: OpenAI API Key not found. Returning a mock response for testing.")
        return {
            "executiveSummary": "This is a MOCK AI Executive Summary. Your organization is showing promising signs of digital adoption, but significant gaps remain in cross-departmental tool integration.",
            "keyRisks": [
                "Mock Risk 1: Fragmented data across your key systems limits visibility.",
                "Mock Risk 2: Staff might lack the training necessary to fully leverage new deployments."
            ],
            "automationOpportunities": [
                f"Mock Opportunity 1: Automate standard approvals in the {data.department or 'General'} department.",
                "Mock Opportunity 2: Implement a unified dashboard pulling from existing APIs.",
                "Mock Opportunity 3: Use low-code tools for immediate, repetitive task handling."
            ],
            "strategicRoadmap": [
                {"phase": "Phase 1: Immediate Wins", "action": "Consolidate tool licenses and map current workflows."},
                {"phase": "Phase 2: Foundation Building", "action": "Deploy cloud-first infrastructure for core systems."},
                {"phase": "Phase 3: Advanced Capabilities", "action": "Integrate True AI/ML models into the operational pipeline."}
            ]
        }
    
    try:
        # Construct the chain
        chain = prompt | llm | StrOutputParser()
        
        # Invoke the chain
        result_str = chain.invoke({
            "role": data.role,
            "department": data.department if data.department else "General / Organization-wide",
            "org_score": data.scores.get("organization", 0),
            "people_score": data.scores.get("people", 0),
            "culture_score": data.scores.get("culture", 0),
            "tools_score": data.scores.get("tools", 0),
            "tech_score": data.scores.get("technology", 0)
        })
        
        # Clean the response in case the LLM returned markdown code blocks (e.g., ```json ... ```)
        cleaned_result = result_str.strip()
        if cleaned_result.startswith("```json"):
            cleaned_result = cleaned_result[7:]
        if cleaned_result.startswith("```"):
            cleaned_result = cleaned_result[3:]
        if cleaned_result.endswith("```"):
            cleaned_result = cleaned_result[:-3]
            
        # Parse JSON to ensure it's valid before returning
        result_json = json.loads(cleaned_result.strip())
        
        # Log the successful completion
        try:
            timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            log_entry = f"[{timestamp}] Role: {data.role}, Dept: {data.department}, Scores: {data.scores} | AI Output: {json.dumps(result_json)}\n"
            os.makedirs("data", exist_ok=True)
            with open("data/log.txt", "a") as log_file:
                log_file.write(log_entry)
        except Exception as log_err:
            print(f"Failed to write to data/log.txt: {log_err}")
        
        return result_json
        
    except Exception as e:
        print(f"Error generating insights: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate insights: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8589, reload=True)
