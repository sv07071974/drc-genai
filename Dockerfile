# Use official lightweight Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all project files into the container
COPY . .

# Expose both the backend (8589) and frontend (8590) ports
EXPOSE 8589
EXPOSE 8590

# Start the Python backend in the background, and the frontend on port 8590 in the foreground
CMD ["sh", "-c", "python3 app.py & python3 -m http.server 8590"]
