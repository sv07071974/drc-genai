// Digital Readiness Check Assessment JavaScript

// Assessment Configuration
const ASSESSMENT_CONFIG = {
    categories: ['organization', 'people', 'culture', 'tools', 'technology'],
    categoryNames: {
        organization: 'Organization',
        people: 'People',
        culture: 'Culture',
        tools: 'Tools',
        technology: 'Technology'
    },
    categoryIcons: {
        organization: 'fas fa-building',
        people: 'fas fa-users',
        culture: 'fas fa-heart',
        tools: 'fas fa-tools',
        technology: 'fas fa-microchip'
    }
};

const ROLE_TYPES = {
    MANAGEMENT: 'management',
    EMPLOYEE: 'employee',
    EMPLOYEE_DEPT: 'employee_dept'
};

const AGREEMENT_SCALE = [
    { text: 'Strongly disagree', value: 1 },
    { text: 'Disagree', value: 2 },
    { text: 'Neutral', value: 3 },
    { text: 'Agree', value: 4 },
    { text: 'Strongly agree', value: 5 }
];

const FREQUENCY_SCALE = [
    { text: 'Never', value: 1 },
    { text: 'Rarely', value: 2 },
    { text: 'Sometimes', value: 3 },
    { text: 'Often', value: 4 },
    { text: 'Always', value: 5 }
];

// Emoji configurations for different scale types
const EMOJI_AGREEMENT = [
    { emoji: '😞', label: 'Strongly disagree', value: 1 },
    { emoji: '😕', label: 'Disagree', value: 2 },
    { emoji: '😐', label: 'Neutral', value: 3 },
    { emoji: '🙂', label: 'Agree', value: 4 },
    { emoji: '🤩', label: 'Strongly agree', value: 5 }
];

const EMOJI_FREQUENCY = [
    { emoji: '🚫', label: 'Never', value: 1 },
    { emoji: '🌙', label: 'Rarely', value: 2 },
    { emoji: '⚖️', label: 'Sometimes', value: 3 },
    { emoji: '☀️', label: 'Often', value: 4 },
    { emoji: '🔥', label: 'Always', value: 5 }
];

const MASTER_LOG_STORAGE_KEY = 'drc_master_log';

// Scenario descriptions for maturity questions
const SCENARIO_MATURITY = [
    { title: 'Getting Started', desc: 'We\'re just beginning to explore this area. Processes are ad-hoc or informal.', value: 1 },
    { title: 'Developing', desc: 'Some initiatives are underway but not yet standardized across teams.', value: 2 },
    { title: 'Advancing', desc: 'Good progress made with documented practices in place for most teams.', value: 3 },
    { title: 'Mature', desc: 'Well-established processes with measurable outcomes and continuous improvement.', value: 4 },
    { title: 'Leading', desc: 'Industry-leading capabilities; we set benchmarks others follow.', value: 5 }
];

// Input type constants
const INPUT_TYPES = {
    SLIDER: 'slider',
    SEGMENTED: 'segmented',
    EMOJI: 'emoji',
    SCENARIO: 'scenario',
    GRADIENT: 'gradient',
    CARDS: 'cards'
};

const QUESTIONS_EMPLOYEE = {
    organization: [
        {
            id: 'emp_org_1',
            question: 'Leadership explains how digital priorities impact my team.',
            description: 'Clarity on strategy helps employees align their daily work to the roadmap.',
            options: AGREEMENT_SCALE,
            inputType: INPUT_TYPES.SEGMENTED
        },
        {
            id: 'emp_org_2',
            question: 'We receive regular updates on digital initiatives that affect our work.',
            description: 'Consistent updates keep employees aware of timing and expectations.',
            options: FREQUENCY_SCALE,
            inputType: INPUT_TYPES.EMOJI,
            emojiSet: EMOJI_FREQUENCY
        },
        {
            id: 'emp_org_3',
            question: 'When teams suggest improvements, resources are available to test them.',
            description: 'Access to funding or time encourages grass-roots innovation.',
            options: AGREEMENT_SCALE,
            inputType: INPUT_TYPES.EMOJI,
            emojiSet: EMOJI_AGREEMENT
        },
        {
            id: 'emp_org_4',
            question: 'Digital efforts feel coordinated across departments rather than siloed.',
            description: 'Cross-team alignment prevents duplicate work and conflicting goals.',
            options: AGREEMENT_SCALE,
            inputType: INPUT_TYPES.GRADIENT
        },
        {
            id: 'emp_org_5',
            question: 'My manager shares a roadmap for upcoming digital changes.',
            description: 'Local context makes the enterprise roadmap actionable for teams.',
            options: AGREEMENT_SCALE,
            inputType: INPUT_TYPES.SEGMENTED
        }
    ],
    people: [
        {
            id: 'emp_people_1',
            question: 'I have the digital skills needed to do my job effectively.',
            description: 'Baseline literacy ensures adoption of new platforms.',
            options: AGREEMENT_SCALE,
            inputType: INPUT_TYPES.SCENARIO,
            scenarios: SCENARIO_MATURITY
        },
        {
            id: 'emp_people_2',
            question: 'Training for new tools is available when we need it.',
            description: 'Just-in-time training shortens the learning curve.',
            options: FREQUENCY_SCALE,
            inputType: INPUT_TYPES.EMOJI,
            emojiSet: EMOJI_FREQUENCY
        },
        {
            id: 'emp_people_3',
            question: 'I know who to ask when I need help with a digital tool.',
            description: 'Clear champions accelerate troubleshooting and adoption.',
            options: AGREEMENT_SCALE,
            inputType: INPUT_TYPES.SEGMENTED
        },
        {
            id: 'emp_people_4',
            question: 'Performance goals recognize digital upskilling or knowledge sharing.',
            description: 'Rewarding digital behaviors encourages participation.',
            options: AGREEMENT_SCALE,
            inputType: INPUT_TYPES.GRADIENT
        },
        {
            id: 'emp_people_5',
            question: 'Recruitment brings in colleagues with strong digital experience.',
            description: 'Fresh talent raises the overall capability baseline.',
            options: AGREEMENT_SCALE,
            inputType: INPUT_TYPES.SEGMENTED
        }
    ],
    culture: [
        {
            id: 'emp_culture_1',
            question: 'Experimenting with new digital ideas is encouraged on my team.',
            description: 'Empowered teams surface incremental improvements faster.',
            options: AGREEMENT_SCALE,
            inputType: INPUT_TYPES.EMOJI,
            emojiSet: EMOJI_AGREEMENT
        },
        {
            id: 'emp_culture_2',
            question: 'We learn from failed pilots without assigning blame.',
            description: 'Psychological safety keeps innovation moving.',
            options: AGREEMENT_SCALE,
            inputType: INPUT_TYPES.SCENARIO,
            scenarios: SCENARIO_MATURITY
        },
        {
            id: 'emp_culture_3',
            question: 'Departments openly share lessons from their digital projects.',
            description: 'Storytelling helps other teams avoid repeated mistakes.',
            options: FREQUENCY_SCALE,
            inputType: INPUT_TYPES.SEGMENTED
        },
        {
            id: 'emp_culture_4',
            question: 'Customer feedback is used to refine our digital tools.',
            description: 'Customer insight keeps teams focused on real value.',
            options: AGREEMENT_SCALE,
            inputType: INPUT_TYPES.GRADIENT
        },
        {
            id: 'emp_culture_5',
            question: 'Leaders recognize teams that automate manual work.',
            description: 'Recognition signals that automation is a priority.',
            options: AGREEMENT_SCALE,
            inputType: INPUT_TYPES.EMOJI,
            emojiSet: EMOJI_AGREEMENT
        }
    ],
    tools: [
        {
            id: 'emp_tools_1',
            question: 'The tools I use each day are intuitive and reliable.',
            description: 'Ease-of-use reduces workarounds and shadow systems.',
            options: AGREEMENT_SCALE,
            inputType: INPUT_TYPES.EMOJI,
            emojiSet: EMOJI_AGREEMENT
        },
        {
            id: 'emp_tools_2',
            question: 'Data flows automatically between the systems I use.',
            description: 'Integrated tools eliminate duplicate entry.',
            options: AGREEMENT_SCALE,
            inputType: INPUT_TYPES.SCENARIO,
            scenarios: SCENARIO_MATURITY
        },
        {
            id: 'emp_tools_3',
            question: 'I can automate repetitive steps without waiting on IT.',
            description: 'Citizen automation keeps momentum high.',
            options: AGREEMENT_SCALE,
            inputType: INPUT_TYPES.SEGMENTED
        },
        {
            id: 'emp_tools_4',
            question: 'Dashboards or reports show up-to-date metrics for my role.',
            description: 'Real-time data supports confident decisions.',
            options: FREQUENCY_SCALE,
            inputType: INPUT_TYPES.EMOJI,
            emojiSet: EMOJI_FREQUENCY
        },
        {
            id: 'emp_tools_5',
            question: 'Project work follows a clear delivery method (Agile, Kanban, etc.).',
            description: 'Shared methods make collaboration smoother.',
            options: AGREEMENT_SCALE,
            inputType: INPUT_TYPES.GRADIENT
        }
    ],
    technology: [
        {
            id: 'emp_tech_1',
            question: 'Systems I rely on are available without frequent outages.',
            description: 'Reliable platforms build confidence in digital ways of working.',
            options: FREQUENCY_SCALE,
            inputType: INPUT_TYPES.EMOJI,
            emojiSet: EMOJI_FREQUENCY
        },
        {
            id: 'emp_tech_2',
            question: 'Requesting a new digital tool is straightforward.',
            description: 'Lightweight intake processes encourage innovation.',
            options: AGREEMENT_SCALE,
            inputType: INPUT_TYPES.SEGMENTED
        },
        {
            id: 'emp_tech_3',
            question: 'Cloud or mobile versions of tools are available when I need them.',
            description: 'Flexible access supports hybrid work.',
            options: AGREEMENT_SCALE,
            inputType: INPUT_TYPES.SCENARIO,
            scenarios: SCENARIO_MATURITY
        },
        {
            id: 'emp_tech_4',
            question: 'Security requirements are clear and easy to follow.',
            description: 'Clarity keeps adoption high without creating friction.',
            options: AGREEMENT_SCALE,
            inputType: INPUT_TYPES.GRADIENT
        },
        {
            id: 'emp_tech_5',
            question: 'Data from different systems is easy to combine for analysis.',
            description: 'Good data management unlocks insights.',
            options: AGREEMENT_SCALE,
            inputType: INPUT_TYPES.EMOJI,
            emojiSet: EMOJI_AGREEMENT
        }
    ]
};

const DEPARTMENT_DEEP_DIVES = {
    technology: {
        tools: [
            {
                id: 'dept_technology_tools_1',
                question: 'Critical incidents are triaged automatically before engineers engage.',
                description: 'Automation in intake reduces noise and response time.',
                options: AGREEMENT_SCALE,
                inputType: INPUT_TYPES.SEGMENTED
            }
        ],
        technology: [
            {
                id: 'dept_technology_technology_1',
                question: 'Environment provisioning or CI/CD pipelines run without manual tickets.',
                description: 'Self-service pipelines free engineers to focus on value.',
                options: AGREEMENT_SCALE,
                inputType: INPUT_TYPES.SCENARIO,
                scenarios: SCENARIO_MATURITY
            }
        ]
    },
    finance: {
        tools: [
            {
                id: 'dept_finance_tools_1',
                question: 'Invoice approvals route automatically without email chasing.',
                description: 'Workflow automation shortens days sales outstanding.',
                options: AGREEMENT_SCALE,
                inputType: INPUT_TYPES.EMOJI,
                emojiSet: EMOJI_AGREEMENT
            }
        ],
        technology: [
            {
                id: 'dept_finance_technology_1',
                question: 'Monthly reconciliations pull data directly from source systems.',
                description: 'Straight-through processing reduces spreadsheet effort.',
                options: AGREEMENT_SCALE,
                inputType: INPUT_TYPES.SCENARIO,
                scenarios: SCENARIO_MATURITY
            }
        ]
    },
    procurement: {
        tools: [
            {
                id: 'dept_procurement_tools_1',
                question: 'Vendor onboarding steps are tracked in a shared workflow.',
                description: 'Visibility over onboarding prevents manual follow-ups.',
                options: AGREEMENT_SCALE,
                inputType: INPUT_TYPES.SEGMENTED
            }
        ],
        technology: [
            {
                id: 'dept_procurement_technology_1',
                question: 'Contract data syncs automatically with sourcing and finance systems.',
                description: 'Integrated data removes re-keying and missed clauses.',
                options: AGREEMENT_SCALE,
                inputType: INPUT_TYPES.EMOJI,
                emojiSet: EMOJI_AGREEMENT
            }
        ]
    },
    legal: {
        tools: [
            {
                id: 'dept_legal_tools_1',
                question: 'Template libraries auto-populate key contract fields.',
                description: 'Guided templates reduce drafting effort.',
                options: AGREEMENT_SCALE,
                inputType: INPUT_TYPES.EMOJI,
                emojiSet: EMOJI_AGREEMENT
            }
        ],
        technology: [
            {
                id: 'dept_legal_technology_1',
                question: 'Contract reviews use automated clause detection or comparisons.',
                description: 'AI review keeps lawyers focused on negotiation.',
                options: AGREEMENT_SCALE,
                inputType: INPUT_TYPES.SCENARIO,
                scenarios: SCENARIO_MATURITY
            }
        ]
    },
    operations: {
        tools: [
            {
                id: 'dept_operations_tools_1',
                question: 'Shift schedules and handovers are generated digitally.',
                description: 'Automated scheduling removes whiteboard updates.',
                options: AGREEMENT_SCALE,
                inputType: INPUT_TYPES.SEGMENTED
            }
        ],
        technology: [
            {
                id: 'dept_operations_technology_1',
                question: 'Shop-floor data (safety, downtime, yields) flows automatically into dashboards.',
                description: 'Sensor-driven data removes manual logbooks.',
                options: AGREEMENT_SCALE,
                inputType: INPUT_TYPES.EMOJI,
                emojiSet: EMOJI_AGREEMENT
            }
        ]
    },
    marketing: {
        tools: [
            {
                id: 'dept_marketing_tools_1',
                question: 'Campaign briefs and approvals move through a shared workflow tool.',
                description: 'Clear workflows reduce email approvals.',
                options: AGREEMENT_SCALE,
                inputType: INPUT_TYPES.EMOJI,
                emojiSet: EMOJI_AGREEMENT
            }
        ],
        technology: [
            {
                id: 'dept_marketing_technology_1',
                question: 'Performance dashboards refresh automatically from ad platforms and CRM.',
                description: 'Automated reporting frees time for optimization.',
                options: AGREEMENT_SCALE,
                inputType: INPUT_TYPES.SEGMENTED
            }
        ]
    },
    production: {
        tools: [
            {
                id: 'dept_production_tools_1',
                question: 'Maintenance requests are logged via mobile or kiosk, not paper.',
                description: 'Digital capture keeps technicians aligned.',
                options: AGREEMENT_SCALE,
                inputType: INPUT_TYPES.SCENARIO,
                scenarios: SCENARIO_MATURITY
            }
        ],
        technology: [
            {
                id: 'dept_production_technology_1',
                question: 'Quality checks and machine telemetry trigger alerts automatically.',
                description: 'Automated monitoring spots issues earlier.',
                options: AGREEMENT_SCALE,
                inputType: INPUT_TYPES.EMOJI,
                emojiSet: EMOJI_AGREEMENT
            }
        ]
    }
};

const DEPARTMENT_LABELS = {
    technology: 'Technology',
    finance: 'Finance',
    procurement: 'Procurement',
    legal: 'Legal',
    operations: 'Operations',
    marketing: 'Marketing',
    production: 'Production'
};

const ROADMAP_CATEGORY_NOTES = {
    organization: 'Tighten governance, funding cadence, and alignment on the digital roadmap.',
    people: 'Invest in upskilling, coaching, and recruiting to raise digital confidence.',
    culture: 'Reinforce behaviors that reward experimentation and customer feedback.',
    tools: 'Standardize processes, automate repetitive steps, and improve data flow.',
    technology: 'Modernize infrastructure, cloud adoption, and integration patterns.'
};

const ROADMAP_ACTION_TAGS = {
    organization: ['Governance refresh', 'Funding playbook'],
    people: ['Upskilling sprint', 'Hire for skills'],
    culture: ['Recognition loop', 'Customer immersion'],
    tools: ['Process map', 'Automation backlog'],
    technology: ['Cloud-first runbooks', 'Integration fabric']
};

const AUTOMATION_LIBRARY = {
    too_1: 'Document key processes in a shared tool, then target high-volume steps for automation.',
    too_2: 'Connect core platforms with lightweight integrations or iPaaS connectors.',
    too_3: 'Adopt a standard delivery framework (Agile/Kanban) with digital boards for visibility.',
    too_4: 'Stand up self-serve analytics dashboards fed by a governed data layer.',
    too_5: 'Prioritize RPA or workflow bots for high-volume manual approvals.',
    tec_1: 'Phase out legacy infrastructure by containerizing or moving to managed cloud services.',
    tec_2: 'Adopt a cloud-first policy with reference architectures and landing zones.',
    tec_3: 'Automate security baselines (patching, MFA) to reduce manual checklists.',
    tec_4: 'Establish data pipelines with quality checks so teams trust the outputs.',
    tec_5: 'Design APIs or microservices to scale without rewriting core apps.',
    emp_tools_2: 'Enable integrations or API-based syncs so employees stop copying data.',
    emp_tools_3: 'Provide low-code automation kits (Power Automate, Zapier) with guardrails.',
    emp_tools_4: 'Automate KPI refreshes with scheduled extracts instead of slide updates.',
    emp_tech_5: 'Deploy a governed data hub that blends CRM, ERP, and product data.',
    dept_technology_tools_1: 'Use AIOps or runbook automation to pre-triage incidents.',
    dept_technology_technology_1: 'Expand self-service pipelines with templates for standard stacks.',
    dept_finance_tools_1: 'Automate invoice routing with workflow + e-sign to shrink cycle time.',
    dept_finance_technology_1: 'Integrate GL, billing, and bank data for touchless reconciliations.',
    dept_procurement_tools_1: 'Digitize vendor intake with required fields and SLA tracking.',
    dept_procurement_technology_1: 'Sync contract metadata to sourcing and AP systems via APIs.',
    dept_legal_tools_1: 'Adopt clause libraries that auto-fill key terms from CRM data.',
    dept_legal_technology_1: 'Use AI clause compare to flag risk before lawyer review.',
    dept_operations_tools_1: 'Automate scheduling/handovers with workforce management software.',
    dept_operations_technology_1: 'Stream IoT or MES data into live operational dashboards.',
    dept_marketing_tools_1: 'Use intake/approval workflows to track campaign progress visibly.',
    dept_marketing_technology_1: 'Automate marketing dashboards with connectors to ad platforms.',
    dept_production_tools_1: 'Capture maintenance tickets digitally to auto-assign technicians.',
    dept_production_technology_1: 'Use condition monitoring sensors to trigger predictive maintenance.'
};

// Detailed Recommendations Library - Score-based actionable items
const DETAILED_RECOMMENDATIONS = {
    organization: {
        icon: 'fa-building',
        lowScore: {
            summary: 'Your organizational foundation for digital transformation needs significant strengthening. Focus on establishing clear strategy, governance, and funding structures.',
            actions: [
                { title: 'Develop Digital Strategy', desc: 'Create a comprehensive digital transformation roadmap with clear objectives, timelines, and success metrics.', priority: 'critical', tags: ['Strategy', 'Planning'] },
                { title: 'Establish Governance', desc: 'Form a cross-functional steering committee to oversee digital initiatives and ensure accountability.', priority: 'critical', tags: ['Governance', 'Leadership'] },
                { title: 'Secure Budget Allocation', desc: 'Build a business case for digital investment and secure multi-year funding commitment.', priority: 'high', tags: ['Budget', 'Investment'] },
                { title: 'Break Down Silos', desc: 'Create cross-departmental working groups to improve collaboration on digital initiatives.', priority: 'high', tags: ['Collaboration', 'Integration'] },
                { title: 'Executive Sponsorship', desc: 'Identify and empower executive champions to drive digital transformation from the top.', priority: 'medium', tags: ['Leadership', 'Change Management'] }
            ]
        },
        mediumScore: {
            summary: 'Your organization has started building digital foundations but needs to strengthen execution and cross-functional alignment.',
            actions: [
                { title: 'Refine Strategy Communication', desc: 'Ensure digital strategy is clearly communicated to all levels and regularly reinforced.', priority: 'high', tags: ['Communication', 'Strategy'] },
                { title: 'Enhance Governance Maturity', desc: 'Implement regular review cycles and clear decision-making frameworks for digital initiatives.', priority: 'high', tags: ['Governance', 'Process'] },
                { title: 'Optimize Budget Utilization', desc: 'Track ROI of digital investments and reallocate resources to high-performing initiatives.', priority: 'medium', tags: ['Budget', 'ROI'] },
                { title: 'Strengthen Integration', desc: 'Create shared KPIs across departments to drive collaborative digital outcomes.', priority: 'medium', tags: ['Integration', 'Metrics'] }
            ]
        },
        highScore: {
            summary: 'Excellent organizational foundation! Continue optimizing and look for opportunities to scale successful practices.',
            actions: [
                { title: 'Scale Best Practices', desc: 'Document and share successful digital transformation patterns across the organization.', priority: 'low', tags: ['Knowledge Sharing', 'Scale'] },
                { title: 'Continuous Improvement', desc: 'Establish feedback loops to continuously refine strategy based on outcomes and market changes.', priority: 'low', tags: ['Optimization', 'Agility'] }
            ]
        }
    },
    people: {
        icon: 'fa-users',
        lowScore: {
            summary: 'Your workforce digital capabilities need significant development. Prioritize skills assessment, training programs, and change management.',
            actions: [
                { title: 'Skills Gap Analysis', desc: 'Conduct a comprehensive digital skills assessment across all roles and departments.', priority: 'critical', tags: ['Assessment', 'Skills'] },
                { title: 'Digital Literacy Program', desc: 'Launch foundational digital literacy training for all employees covering essential tools and concepts.', priority: 'critical', tags: ['Training', 'Basics'] },
                { title: 'Change Champions Network', desc: 'Identify and train digital champions in each department to support peer learning.', priority: 'high', tags: ['Change Management', 'Adoption'] },
                { title: 'Address Resistance', desc: 'Implement structured change management to address fears and resistance to new technologies.', priority: 'high', tags: ['Change Management', 'Culture'] },
                { title: 'Update Job Descriptions', desc: 'Revise roles to include digital competencies and create career paths for digital skills.', priority: 'medium', tags: ['HR', 'Career Development'] }
            ]
        },
        mediumScore: {
            summary: 'Your people capabilities are developing. Focus on deepening skills and creating sustainable learning pathways.',
            actions: [
                { title: 'Advanced Training Tracks', desc: 'Develop role-specific advanced digital training for key functions (analytics, automation, etc.).', priority: 'high', tags: ['Training', 'Specialization'] },
                { title: 'Mentorship Programs', desc: 'Pair digitally savvy employees with those still developing to accelerate knowledge transfer.', priority: 'high', tags: ['Mentorship', 'Development'] },
                { title: 'Recognition Systems', desc: 'Create incentives and recognition for employees who adopt and champion digital tools.', priority: 'medium', tags: ['Recognition', 'Motivation'] },
                { title: 'Digital Talent Pipeline', desc: 'Partner with educational institutions and refine hiring to attract digital-native talent.', priority: 'medium', tags: ['Recruitment', 'Talent'] }
            ]
        },
        highScore: {
            summary: 'Strong people capabilities! Maintain momentum through continuous learning and knowledge sharing.',
            actions: [
                { title: 'Innovation Labs', desc: 'Create spaces for employees to experiment with emerging technologies and share learnings.', priority: 'low', tags: ['Innovation', 'Experimentation'] },
                { title: 'External Engagement', desc: 'Encourage participation in industry events and communities to stay ahead of trends.', priority: 'low', tags: ['Networking', 'Trends'] }
            ]
        }
    },
    culture: {
        icon: 'fa-heart',
        lowScore: {
            summary: 'Cultural readiness for digital transformation needs significant attention. Focus on building innovation mindset and psychological safety.',
            actions: [
                { title: 'Innovation Framework', desc: 'Create structured programs (hackathons, idea challenges) to encourage and reward innovation.', priority: 'critical', tags: ['Innovation', 'Engagement'] },
                { title: 'Fail-Forward Culture', desc: 'Establish psychological safety by celebrating learning from failures, not just successes.', priority: 'critical', tags: ['Culture', 'Risk Tolerance'] },
                { title: 'Break Down Silos', desc: 'Implement cross-functional collaboration tools and regular inter-department showcases.', priority: 'high', tags: ['Collaboration', 'Communication'] },
                { title: 'Customer-Centric Focus', desc: 'Create direct feedback channels from customers to teams driving digital initiatives.', priority: 'high', tags: ['Customer', 'Feedback'] },
                { title: 'Learning Culture', desc: 'Allocate dedicated time for learning and experimentation (e.g., 10% time for innovation).', priority: 'medium', tags: ['Learning', 'Development'] }
            ]
        },
        mediumScore: {
            summary: 'Your culture is evolving to support digital transformation. Reinforce positive behaviors and expand successful programs.',
            actions: [
                { title: 'Scale Innovation Programs', desc: 'Expand successful innovation initiatives to more teams and departments.', priority: 'high', tags: ['Scale', 'Innovation'] },
                { title: 'Strengthen Collaboration', desc: 'Implement regular cross-functional retrospectives to improve digital project outcomes.', priority: 'high', tags: ['Collaboration', 'Agile'] },
                { title: 'Customer Journey Mapping', desc: 'Involve more teams in understanding and improving digital customer experiences.', priority: 'medium', tags: ['Customer', 'Experience'] },
                { title: 'Recognition Amplification', desc: 'Publicly celebrate digital wins to reinforce desired cultural behaviors.', priority: 'medium', tags: ['Recognition', 'Communication'] }
            ]
        },
        highScore: {
            summary: 'Excellent digital culture! Sustain momentum and help other organizations learn from your success.',
            actions: [
                { title: 'Culture Ambassador Program', desc: 'Formalize programs to spread your digital culture to new teams and acquisitions.', priority: 'low', tags: ['Scale', 'Culture'] },
                { title: 'External Thought Leadership', desc: 'Share your cultural transformation journey at industry events and publications.', priority: 'low', tags: ['Branding', 'Sharing'] }
            ]
        }
    },
    tools: {
        icon: 'fa-tools',
        lowScore: {
            summary: 'Your tools and processes need significant modernization. Focus on process documentation, integration, and basic automation.',
            actions: [
                { title: 'Process Documentation', desc: 'Map and document all key business processes to identify automation and improvement opportunities.', priority: 'critical', tags: ['Process', 'Documentation'] },
                { title: 'Tool Audit', desc: 'Inventory all current tools and identify gaps, redundancies, and integration opportunities.', priority: 'critical', tags: ['Audit', 'Inventory'] },
                { title: 'Integration Strategy', desc: 'Develop a plan to connect disparate systems using APIs or integration platforms (iPaaS).', priority: 'high', tags: ['Integration', 'APIs'] },
                { title: 'Basic Automation', desc: 'Start with simple workflow automation for high-volume, repetitive tasks.', priority: 'high', tags: ['Automation', 'Quick Wins'] },
                { title: 'Agile Adoption', desc: 'Implement agile methodologies with digital project management tools for better visibility.', priority: 'medium', tags: ['Agile', 'Methodology'] }
            ]
        },
        mediumScore: {
            summary: 'Your tools foundation is developing. Focus on expanding automation and improving analytics capabilities.',
            actions: [
                { title: 'Advanced Automation', desc: 'Expand automation to more complex workflows using RPA or low-code platforms.', priority: 'high', tags: ['RPA', 'Automation'] },
                { title: 'Self-Service Analytics', desc: 'Deploy dashboards and BI tools that enable business users to access insights independently.', priority: 'high', tags: ['Analytics', 'Self-Service'] },
                { title: 'Process Optimization', desc: 'Use process mining tools to identify and eliminate bottlenecks in digital workflows.', priority: 'medium', tags: ['Process', 'Optimization'] },
                { title: 'Tool Consolidation', desc: 'Reduce tool sprawl by consolidating to integrated platforms where possible.', priority: 'medium', tags: ['Consolidation', 'Efficiency'] }
            ]
        },
        highScore: {
            summary: 'Strong tools and process foundation! Look for advanced optimization and emerging technology opportunities.',
            actions: [
                { title: 'AI-Powered Automation', desc: 'Explore AI/ML integration to make automation smarter and more adaptive.', priority: 'low', tags: ['AI', 'ML'] },
                { title: 'Predictive Analytics', desc: 'Move from descriptive to predictive analytics for proactive decision making.', priority: 'low', tags: ['Analytics', 'Prediction'] }
            ]
        }
    },
    technology: {
        icon: 'fa-microchip',
        lowScore: {
            summary: 'Your technology infrastructure needs significant modernization. Prioritize cloud adoption, security, and data management.',
            actions: [
                { title: 'Infrastructure Assessment', desc: 'Conduct a comprehensive audit of current infrastructure to identify modernization priorities.', priority: 'critical', tags: ['Audit', 'Infrastructure'] },
                { title: 'Cloud Strategy', desc: 'Develop a cloud adoption roadmap starting with non-critical workloads.', priority: 'critical', tags: ['Cloud', 'Strategy'] },
                { title: 'Security Foundations', desc: 'Implement essential cybersecurity hygiene: MFA, patching, access controls, and training.', priority: 'critical', tags: ['Security', 'Compliance'] },
                { title: 'Data Governance', desc: 'Establish data quality standards, ownership, and access policies across the organization.', priority: 'high', tags: ['Data', 'Governance'] },
                { title: 'Legacy Modernization', desc: 'Create a phased plan to retire or modernize legacy systems blocking digital progress.', priority: 'high', tags: ['Legacy', 'Modernization'] }
            ]
        },
        mediumScore: {
            summary: 'Your technology foundation is developing. Focus on scaling cloud adoption and building data capabilities.',
            actions: [
                { title: 'Cloud Optimization', desc: 'Optimize cloud usage with FinOps practices and leverage managed services where appropriate.', priority: 'high', tags: ['Cloud', 'FinOps'] },
                { title: 'Data Platform', desc: 'Build a unified data platform that enables analytics and AI across the organization.', priority: 'high', tags: ['Data', 'Platform'] },
                { title: 'Security Maturity', desc: 'Advance from reactive to proactive security with monitoring, threat detection, and response.', priority: 'high', tags: ['Security', 'Monitoring'] },
                { title: 'API Strategy', desc: 'Develop an API-first approach to enable integration and ecosystem connectivity.', priority: 'medium', tags: ['APIs', 'Integration'] }
            ]
        },
        highScore: {
            summary: 'Strong technology foundation! Focus on optimization, emerging technologies, and staying ahead of the curve.',
            actions: [
                { title: 'Emerging Tech Exploration', desc: 'Establish innovation programs to evaluate AI, blockchain, IoT, and other emerging technologies.', priority: 'low', tags: ['Innovation', 'Emerging Tech'] },
                { title: 'Platform Excellence', desc: 'Continuously optimize platform performance, cost, and developer experience.', priority: 'low', tags: ['Optimization', 'Platform'] }
            ]
        }
    }
};

// Question Database
const QUESTIONS = {
    organization: [
        {
            id: 'org_1',
            question: 'Does your organization have a documented digital transformation strategy?',
            description: 'A clear strategy outlines goals, timelines, and resources for digital initiatives.',
            inputType: INPUT_TYPES.SCENARIO,
            options: [
                { text: 'No strategy exists', value: 1 },
                { text: 'Strategy is being developed', value: 2 },
                { text: 'Strategy exists but not well communicated', value: 3 },
                { text: 'Clear strategy exists and is communicated', value: 4 },
                { text: 'Strategy is regularly reviewed and updated', value: 5 }
            ],
            scenarios: [
                { title: 'No Strategy', desc: 'No strategy exists', value: 1 },
                { title: 'In Development', desc: 'Strategy is being developed', value: 2 },
                { title: 'Exists, Not Shared', desc: 'Strategy exists but not well communicated', value: 3 },
                { title: 'Clear & Communicated', desc: 'Clear strategy exists and is communicated', value: 4 },
                { title: 'Continuously Updated', desc: 'Strategy is regularly reviewed and updated', value: 5 }
            ]
        },
        {
            id: 'org_2',
            question: 'How is digital transformation governed in your organization?',
            description: 'Governance includes oversight, decision-making processes, and accountability.',
            inputType: INPUT_TYPES.SCENARIO,
            options: [
                { text: 'No formal governance', value: 1 },
                { text: 'Ad-hoc governance', value: 2 },
                { text: 'Some governance structures exist', value: 3 },
                { text: 'Well-defined governance structure', value: 4 },
                { text: 'Mature governance with regular reviews', value: 5 }
            ],
            scenarios: [
                { title: 'None', desc: 'No formal governance', value: 1 },
                { title: 'Ad-hoc', desc: 'Ad-hoc governance', value: 2 },
                { title: 'Some Structures', desc: 'Some governance structures exist', value: 3 },
                { title: 'Well-Defined', desc: 'Well-defined governance structure', value: 4 },
                { title: 'Mature', desc: 'Mature governance with regular reviews', value: 5 }
            ]
        },
        {
            id: 'org_3',
            question: 'Are digital initiatives adequately funded?',
            description: 'Funding includes budget allocation for technology, training, and resources.',
            inputType: INPUT_TYPES.SEGMENTED,
            options: [
                { text: 'No dedicated budget', value: 1 },
                { text: 'Limited budget available', value: 2 },
                { text: 'Moderate budget allocated', value: 3 },
                { text: 'Adequate budget for most initiatives', value: 4 },
                { text: 'Well-funded with multi-year budget', value: 5 }
            ]
        },
        {
            id: 'org_4',
            question: 'How integrated are digital initiatives across departments?',
            description: 'Integration ensures alignment and avoids duplication of efforts.',
            inputType: INPUT_TYPES.EMOJI,
            emojiSet: [
                { emoji: '🏝️', label: 'Siloed', value: 1 },
                { emoji: '🔗', label: 'Limited', value: 2 },
                { emoji: '🤝', label: 'Some', value: 3 },
                { emoji: '🌐', label: 'Good', value: 4 },
                { emoji: '🚀', label: 'Fully Integrated', value: 5 }
            ],
            options: [
                { text: 'Siloed initiatives', value: 1 },
                { text: 'Limited coordination', value: 2 },
                { text: 'Some cross-department collaboration', value: 3 },
                { text: 'Good integration across departments', value: 4 },
                { text: 'Fully integrated enterprise-wide', value: 5 }
            ]
        },
        {
            id: 'org_5',
            question: 'How does leadership support digital transformation?',
            description: 'Leadership support includes commitment, resources, and active participation.',
            inputType: INPUT_TYPES.GRADIENT,
            options: [
                { text: 'Little to no support', value: 1 },
                { text: 'Passive support', value: 2 },
                { text: 'Moderate support and involvement', value: 3 },
                { text: 'Strong support and participation', value: 4 },
                { text: 'Championing transformation actively', value: 5 }
            ]
        }
    ],
    people: [
        {
            id: 'peo_1',
            question: 'How would you rate the digital skills of your workforce?',
            description: 'Digital skills include technical proficiency and digital literacy.',
            inputType: INPUT_TYPES.GRADIENT,
            options: [
                { text: 'Poor digital skills', value: 1 },
                { text: 'Below average skills', value: 2 },
                { text: 'Average digital skills', value: 3 },
                { text: 'Good digital skills', value: 4 },
                { text: 'Excellent digital capabilities', value: 5 }
            ]
        },
        {
            id: 'peo_2',
            question: 'Is there a structured approach to upskilling employees?',
            description: 'Upskilling includes training programs, workshops, and learning opportunities.',
            inputType: INPUT_TYPES.SCENARIO,
            options: [
                { text: 'No structured approach', value: 1 },
                { text: 'Ad-hoc training occasionally', value: 2 },
                { text: 'Some training programs exist', value: 3 },
                { text: 'Structured training programs', value: 4 },
                { text: 'Comprehensive learning ecosystem', value: 5 }
            ],
            scenarios: [
                { title: 'None', desc: 'No structured approach', value: 1 },
                { title: 'Ad-hoc', desc: 'Ad-hoc training occasionally', value: 2 },
                { title: 'Some Programs', desc: 'Some training programs exist', value: 3 },
                { title: 'Structured', desc: 'Structured training programs', value: 4 },
                { title: 'Comprehensive', desc: 'Comprehensive learning ecosystem', value: 5 }
            ]
        },
        {
            id: 'peo_3',
            question: 'How willing are employees to adopt new technologies?',
            description: 'Willingness indicates openness to change and new ways of working.',
            inputType: INPUT_TYPES.EMOJI,
            emojiSet: [
                { emoji: '😤', label: 'Highly Resistant', value: 1 },
                { emoji: '😕', label: 'Somewhat Resistant', value: 2 },
                { emoji: '😐', label: 'Neutral', value: 3 },
                { emoji: '🙂', label: 'Generally Willing', value: 4 },
                { emoji: '🤩', label: 'Very Enthusiastic', value: 5 }
            ],
            options: [
                { text: 'Highly resistant to change', value: 1 },
                { text: 'Somewhat resistant', value: 2 },
                { text: 'Neutral attitude', value: 3 },
                { text: 'Generally willing', value: 4 },
                { text: 'Very enthusiastic', value: 5 }
            ]
        },
        {
            id: 'peo_4',
            question: 'Are there digital champions or advocates in your organization?',
            description: 'Digital champions help drive adoption and support colleagues.',
            inputType: INPUT_TYPES.SEGMENTED,
            options: [
                { text: 'No digital champions', value: 1 },
                { text: 'Few informal champions', value: 2 },
                { text: 'Some recognized champions', value: 3 },
                { text: 'Active champion network', value: 4 },
                { text: 'Strong champion program', value: 5 }
            ]
        },
        {
            id: 'peo_5',
            question: 'How effective is your recruitment for digital roles?',
            description: 'Recruitment effectiveness in attracting and hiring digital talent.',
            inputType: INPUT_TYPES.EMOJI,
            emojiSet: [
                { emoji: '😰', label: 'Very Difficult', value: 1 },
                { emoji: '😟', label: 'Challenging', value: 2 },
                { emoji: '😐', label: 'Moderate', value: 3 },
                { emoji: '😊', label: 'Good', value: 4 },
                { emoji: '🌟', label: 'Excellent', value: 5 }
            ],
            options: [
                { text: 'Very difficult to recruit', value: 1 },
                { text: 'Challenging recruitment', value: 2 },
                { text: 'Moderate success in recruitment', value: 3 },
                { text: 'Good recruitment outcomes', value: 4 },
                { text: 'Excellent talent acquisition', value: 5 }
            ]
        }
    ],
    culture: [
        {
            id: 'cul_1',
            question: 'How innovative is your organizational culture?',
            description: 'Innovation culture encourages experimentation and new ideas.',
            inputType: INPUT_TYPES.GRADIENT,
            options: [
                { text: 'Not innovative', value: 1 },
                { text: 'Low innovation', value: 2 },
                { text: 'Moderate innovation', value: 3 },
                { text: 'Innovative culture', value: 4 },
                { text: 'Highly innovative', value: 5 }
            ]
        },
        {
            id: 'cul_2',
            question: 'Is there a culture of continuous learning?',
            description: 'Learning culture supports ongoing development and improvement.',
            inputType: INPUT_TYPES.EMOJI,
            emojiSet: [
                { emoji: '📕', label: 'No Learning', value: 1 },
                { emoji: '📖', label: 'Limited', value: 2 },
                { emoji: '📚', label: 'Some', value: 3 },
                { emoji: '🎓', label: 'Strong', value: 4 },
                { emoji: '🏆', label: 'Excellence', value: 5 }
            ],
            options: [
                { text: 'No learning culture', value: 1 },
                { text: 'Limited learning focus', value: 2 },
                { text: 'Some learning initiatives', value: 3 },
                { text: 'Strong learning culture', value: 4 },
                { text: 'Excellence in continuous learning', value: 5 }
            ]
        },
        {
            id: 'cul_3',
            question: 'How does your organization handle failure and risk?',
            description: 'Risk culture affects willingness to try new approaches.',
            inputType: INPUT_TYPES.SCENARIO,
            options: [
                { text: 'Punish failure, avoid risk', value: 1 },
                { text: 'Discourage risk-taking', value: 2 },
                { text: 'Tolerate some risk', value: 3 },
                { text: 'Encourage calculated risk', value: 4 },
                { text: 'Embrace failure as learning', value: 5 }
            ],
            scenarios: [
                { title: 'Risk Averse', desc: 'Punish failure, avoid risk', value: 1 },
                { title: 'Discouraged', desc: 'Discourage risk-taking', value: 2 },
                { title: 'Tolerant', desc: 'Tolerate some risk', value: 3 },
                { title: 'Encouraged', desc: 'Encourage calculated risk', value: 4 },
                { title: 'Embraced', desc: 'Embrace failure as learning', value: 5 }
            ]
        },
        {
            id: 'cul_4',
            question: 'Is collaboration encouraged across departments?',
            description: 'Collaboration enables sharing of knowledge and resources.',
            inputType: INPUT_TYPES.SEGMENTED,
            options: [
                { text: 'Siloed departments', value: 1 },
                { text: 'Limited collaboration', value: 2 },
                { text: 'Some cross-team work', value: 3 },
                { text: 'Good collaboration', value: 4 },
                { text: 'Excellent collaboration culture', value: 5 }
            ]
        },
        {
            id: 'cul_5',
            question: 'How customer-centric is your organization?',
            description: 'Customer focus drives digital initiatives and improvements.',
            inputType: INPUT_TYPES.EMOJI,
            emojiSet: [
                { emoji: '🚫', label: 'Not Focused', value: 1 },
                { emoji: '👤', label: 'Limited', value: 2 },
                { emoji: '👥', label: 'Moderate', value: 3 },
                { emoji: '❤️', label: 'Strong', value: 4 },
                { emoji: '💎', label: 'Extremely', value: 5 }
            ],
            options: [
                { text: 'Not customer-focused', value: 1 },
                { text: 'Limited customer focus', value: 2 },
                { text: 'Moderate customer orientation', value: 3 },
                { text: 'Strong customer focus', value: 4 },
                { text: 'Extremely customer-centric', value: 5 }
            ]
        }
    ],
    tools: [
        {
            id: 'too_1',
            question: 'How well are business processes documented?',
            description: 'Process documentation enables optimization and automation.',
            inputType: INPUT_TYPES.SCENARIO,
            options: [
                { text: 'Processes not documented', value: 1 },
                { text: 'Some processes documented', value: 2 },
                { text: 'Key processes documented', value: 3 },
                { text: 'Most processes documented', value: 4 },
                { text: 'Comprehensive process documentation', value: 5 }
            ],
            scenarios: [
                { title: 'None', desc: 'Processes not documented', value: 1 },
                { title: 'Some', desc: 'Some processes documented', value: 2 },
                { title: 'Key Ones', desc: 'Key processes documented', value: 3 },
                { title: 'Most', desc: 'Most processes documented', value: 4 },
                { title: 'Comprehensive', desc: 'Comprehensive process documentation', value: 5 }
            ]
        },
        {
            id: 'too_2',
            question: 'Are digital tools integrated across the organization?',
            description: 'Integration prevents data silos and improves efficiency.',
            inputType: INPUT_TYPES.EMOJI,
            emojiSet: [
                { emoji: '🏝️', label: 'None', value: 1 },
                { emoji: '🔗', label: 'Limited', value: 2 },
                { emoji: '⚙️', label: 'Some', value: 3 },
                { emoji: '🔄', label: 'Good', value: 4 },
                { emoji: '🌐', label: 'Fully Integrated', value: 5 }
            ],
            options: [
                { text: 'No tool integration', value: 1 },
                { text: 'Limited integration', value: 2 },
                { text: 'Some integrated systems', value: 3 },
                { text: 'Good system integration', value: 4 },
                { text: 'Fully integrated ecosystem', value: 5 }
            ]
        },
        {
            id: 'too_3',
            question: 'How effective are project management methodologies?',
            description: 'Project management ensures successful delivery of initiatives.',
            inputType: INPUT_TYPES.SEGMENTED,
            options: [
                { text: 'No formal methodology', value: 1 },
                { text: 'Informal approaches', value: 2 },
                { text: 'Basic methodology', value: 3 },
                { text: 'Well-defined methodology', value: 4 },
                { text: 'Mature project management', value: 5 }
            ]
        },
        {
            id: 'too_4',
            question: 'Are analytics and reporting tools widely used?',
            description: 'Analytics tools enable data-driven decision making.',
            inputType: INPUT_TYPES.GRADIENT,
            options: [
                { text: 'No analytics tools', value: 1 },
                { text: 'Limited analytics use', value: 2 },
                { text: 'Some departments use analytics', value: 3 },
                { text: 'Widespread analytics adoption', value: 4 },
                { text: 'Advanced analytics everywhere', value: 5 }
            ]
        },
        {
            id: 'too_5',
            question: 'How automated are routine business processes?',
            description: 'Automation improves efficiency and reduces errors.',
            inputType: INPUT_TYPES.EMOJI,
            emojiSet: [
                { emoji: '✋', label: 'Manual', value: 1 },
                { emoji: '📝', label: 'Minimal', value: 2 },
                { emoji: '⚙️', label: 'Some', value: 3 },
                { emoji: '🤖', label: 'Good', value: 4 },
                { emoji: '🚀', label: 'Highly Automated', value: 5 }
            ],
            options: [
                { text: 'No process automation', value: 1 },
                { text: 'Minimal automation', value: 2 },
                { text: 'Some automated processes', value: 3 },
                { text: 'Good automation level', value: 4 },
                { text: 'Highly automated operations', value: 5 }
            ]
        }
    ],
    technology: [
        {
            id: 'tec_1',
            question: 'How modern is your IT infrastructure?',
            description: 'Modern infrastructure supports digital initiatives effectively.',
            inputType: INPUT_TYPES.GRADIENT,
            options: [
                { text: 'Outdated infrastructure', value: 1 },
                { text: 'Some modern components', value: 2 },
                { text: 'Mixed old and new systems', value: 3 },
                { text: 'Mostly modern infrastructure', value: 4 },
                { text: 'State-of-the-art infrastructure', value: 5 }
            ]
        },
        {
            id: 'tec_2',
            question: 'Are cloud services utilized effectively?',
            description: 'Cloud services provide scalability and flexibility.',
            inputType: INPUT_TYPES.EMOJI,
            emojiSet: [
                { emoji: '🏢', label: 'No Cloud', value: 1 },
                { emoji: '☁️', label: 'Limited', value: 2 },
                { emoji: '⛅', label: 'Some', value: 3 },
                { emoji: '🌤️', label: 'Good', value: 4 },
                { emoji: '🚀', label: 'Cloud-First', value: 5 }
            ],
            options: [
                { text: 'No cloud usage', value: 1 },
                { text: 'Limited cloud adoption', value: 2 },
                { text: 'Some cloud services', value: 3 },
                { text: 'Good cloud utilization', value: 4 },
                { text: 'Cloud-first approach', value: 5 }
            ]
        },
        {
            id: 'tec_3',
            question: 'How secure are your digital systems?',
            description: 'Security is essential for digital transformation.',
            inputType: INPUT_TYPES.SEGMENTED,
            options: [
                { text: 'Poor security measures', value: 1 },
                { text: 'Basic security in place', value: 2 },
                { text: 'Adequate security', value: 3 },
                { text: 'Good security practices', value: 4 },
                { text: 'Excellent security posture', value: 5 }
            ]
        },
        {
            id: 'tec_4',
            question: 'Is data managed effectively across the organization?',
            description: 'Data management includes storage, quality, and accessibility.',
            inputType: INPUT_TYPES.SCENARIO,
            options: [
                { text: 'Poor data management', value: 1 },
                { text: 'Basic data practices', value: 2 },
                { text: 'Some data management', value: 3 },
                { text: 'Good data practices', value: 4 },
                { text: 'Excellent data management', value: 5 }
            ],
            scenarios: [
                { title: 'Poor', desc: 'Poor data management', value: 1 },
                { title: 'Basic', desc: 'Basic data practices', value: 2 },
                { title: 'Some', desc: 'Some data management', value: 3 },
                { title: 'Good', desc: 'Good data practices', value: 4 },
                { title: 'Excellent', desc: 'Excellent data management', value: 5 }
            ]
        },
        {
            id: 'tec_5',
            question: 'How scalable is your technology architecture?',
            description: 'Scalable architecture supports growth and changing needs.',
            inputType: INPUT_TYPES.EMOJI,
            emojiSet: [
                { emoji: '📦', label: 'Not Scalable', value: 1 },
                { emoji: '📊', label: 'Limited', value: 2 },
                { emoji: '📈', label: 'Some', value: 3 },
                { emoji: '🔄', label: 'Good', value: 4 },
                { emoji: '♾️', label: 'Highly Scalable', value: 5 }
            ],
            options: [
                { text: 'Not scalable', value: 1 },
                { text: 'Limited scalability', value: 2 },
                { text: 'Some scalable components', value: 3 },
                { text: 'Good scalability', value: 4 },
                { text: 'Highly scalable architecture', value: 5 }
            ]
        }
    ]
};

// Assessment State
let assessmentState = {
    currentCategory: 0,
    answers: {},
    categoryScores: {},
    role: ROLE_TYPES.MANAGEMENT,
    department: null,
    overallScore: 0,
    overallStage: null,
    roadmapSteps: [],
    automationInsights: [],
    submissionLogged: false
};

assessmentState.overallStage = getStageInfo(0);

let categoryChart = null;
let activeQuestions = cloneQuestionSet(QUESTIONS);

function cloneQuestionSet(questionSet) {
    return JSON.parse(JSON.stringify(questionSet));
}

function prepareActiveQuestionSet() {
    let baseSet;
    if (assessmentState.role === ROLE_TYPES.MANAGEMENT) {
        baseSet = cloneQuestionSet(QUESTIONS);
    } else {
        baseSet = cloneQuestionSet(QUESTIONS_EMPLOYEE);
    }

    if (assessmentState.role === ROLE_TYPES.EMPLOYEE_DEPT && assessmentState.department) {
        const deepDive = DEPARTMENT_DEEP_DIVES[assessmentState.department];
        if (deepDive) {
            Object.keys(deepDive).forEach(category => {
                baseSet[category] = baseSet[category] || [];
                baseSet[category] = baseSet[category].concat(deepDive[category]);
            });
        }
    }

    activeQuestions = baseSet;
    assessmentState.answers = {};
    assessmentState.categoryScores = {};
    assessmentState.currentCategory = 0;
    assessmentState.overallScore = 0;
    assessmentState.overallStage = getStageInfo(0);
    assessmentState.roadmapSteps = [];
    assessmentState.automationInsights = [];
    assessmentState.submissionLogged = false;
}

function setupRoleControls() {
    const roleInputs = document.querySelectorAll('.role-card input[name="roleType"]');
    const departmentGroup = document.getElementById('departmentSelectorGroup');
    const departmentSelect = document.getElementById('departmentSelect');

    if (!roleInputs.length) {
        return;
    }

    roleInputs.forEach(input => {
        input.addEventListener('change', (event) => {
            assessmentState.role = event.target.value;
            if (assessmentState.role === ROLE_TYPES.EMPLOYEE_DEPT) {
                departmentGroup?.classList.remove('d-none');
            } else {
                departmentGroup?.classList.add('d-none');
                assessmentState.department = null;
                if (departmentSelect) {
                    departmentSelect.value = '';
                }
            }
            updateRoleCardStates();
            updateStartButtonState();
        });
    });

    if (departmentSelect) {
        departmentSelect.addEventListener('change', (event) => {
            assessmentState.department = event.target.value;
            updateStartButtonState();
        });
    }

    if (assessmentState.role === ROLE_TYPES.EMPLOYEE_DEPT) {
        departmentGroup?.classList.remove('d-none');
    }

    updateRoleCardStates();
    updateStartButtonState();
}

function updateRoleCardStates() {
    document.querySelectorAll('.role-card').forEach(card => {
        const input = card.querySelector('input[name="roleType"]');
        if (!input) return;
        card.classList.toggle('active', input.checked);
    });
}

function updateStartButtonState() {
    const startButton = document.getElementById('startAssessmentBtn');
    if (!startButton) return;
    const requiresDepartment = assessmentState.role === ROLE_TYPES.EMPLOYEE_DEPT;
    const isValid = !requiresDepartment || Boolean(assessmentState.department);
    startButton.disabled = !isValid;
}

// Initialize Assessment
function initializeAssessment() {
    renderQuestions();
    updateProgress();
    buildSectionProgressDots();
    updateSectionProgress();
    setupRoleControls();
    updateMasterLogCount();
}

// Start Assessment
function startAssessment() {
    if (assessmentState.role === ROLE_TYPES.EMPLOYEE_DEPT && !assessmentState.department) {
        updateStartButtonState();
        document.getElementById('departmentSelect')?.focus();
        return;
    }

    prepareActiveQuestionSet();
    renderQuestions();
    updateProgress();
    buildSectionProgressDots();
    updateSectionProgress();
    document.getElementById('welcome-section').classList.add('d-none');
    document.getElementById('assessment-section').classList.remove('d-none');
    document.getElementById('sectionProgress').classList.remove('d-none');
    showValidationMessage(false);
    showCurrentCategory();
}

// Render Questions
function renderQuestions() {
    ASSESSMENT_CONFIG.categories.forEach(category => {
        const container = document.getElementById(`questions-${category}`);
        if (!container) return;
        const questions = activeQuestions[category] || [];

        if (!questions.length) {
            container.innerHTML = '<p class="text-muted">No questions configured for this role.</p>';
            return;
        }

        container.innerHTML = questions.map((q, index) => {
            const savedValue = Number(assessmentState.answers[q.id]) || 0;
            const inputType = q.inputType || INPUT_TYPES.SLIDER;
            const inputHTML = renderInputByType(q, savedValue, inputType);

            return `
                <div class="question-item" id="question-${q.id}">
                    <div class="question-title">${index + 1}. ${q.question}</div>
                    <div class="question-description">${q.description}</div>
                    ${inputHTML}
                </div>
            `;
        }).join('');
    });

    initializeSliderVisuals();
    initializeGradientInputs();
}

// Render input based on type
function renderInputByType(q, savedValue, inputType) {
    switch (inputType) {
        case INPUT_TYPES.SEGMENTED:
            return renderSegmentedInput(q, savedValue);
        case INPUT_TYPES.EMOJI:
            return renderEmojiInput(q, savedValue);
        case INPUT_TYPES.SCENARIO:
            return renderScenarioInput(q, savedValue);
        case INPUT_TYPES.GRADIENT:
            return renderGradientInput(q, savedValue);
        case INPUT_TYPES.SLIDER:
        default:
            return renderSliderInput(q, savedValue);
    }
}

// Slider Input (default)
function renderSliderInput(q, savedValue) {
    const minOptionValue = Math.min(...q.options.map(option => Number(option.value)));
    const maxOptionValue = Math.max(...q.options.map(option => Number(option.value)));
    const defaultValue = Math.round((minOptionValue + maxOptionValue) / 2) || 3;
    const sliderValue = savedValue || defaultValue;
    const selectedOption = q.options.find(option => Number(option.value) === savedValue);
    const selectionText = savedValue && selectedOption
        ? `${savedValue} – ${selectedOption.text}`
        : 'Slide to record your response';

    return `
        <div class="slider-group">
            <div class="slider-value" id="slider-value-${q.id}">${selectionText}</div>
            <input
                type="range"
                min="1"
                max="5"
                step="1"
                value="${sliderValue}"
                class="readiness-slider"
                data-question="${q.id}"
                data-default-value="${defaultValue}"
                ${savedValue ? 'data-selected="true"' : ''}
                oninput="handleSliderChange('${q.id}', this.value, this)"
            />
            <div class="slider-scale">
                ${q.options.map(option => {
        const isActive = savedValue === Number(option.value);
        return `
                    <span class="slider-tick${isActive ? ' active' : ''}" data-value="${option.value}">
                        <strong>${option.value}</strong>
                        <small>${option.text}</small>
                    </span>
                    `;
    }).join('')}
            </div>
        </div>
    `;
}

// Segmented Button Bar
function renderSegmentedInput(q, savedValue) {
    return `
        <div class="segmented-group" data-question="${q.id}">
            ${q.options.map(option => `
                <button type="button" 
                    class="segmented-btn${savedValue === option.value ? ' active' : ''}"
                    data-value="${option.value}"
                    onclick="handleHybridSelect('${q.id}', ${option.value}, this, 'segmented')">
                    <span>${option.value}</span>
                    <span class="seg-label">${option.text}</span>
                </button>
            `).join('')}
        </div>
    `;
}

// Emoji Rating
function renderEmojiInput(q, savedValue) {
    const emojiSet = q.emojiSet || EMOJI_AGREEMENT;
    return `
        <div class="emoji-group" data-question="${q.id}">
            ${emojiSet.map(item => `
                <button type="button" 
                    class="emoji-btn${savedValue === item.value ? ' active' : ''}"
                    data-value="${item.value}"
                    onclick="handleHybridSelect('${q.id}', ${item.value}, this, 'emoji')">
                    <span class="emoji">${item.emoji}</span>
                    <span class="emoji-label">${item.label}</span>
                </button>
            `).join('')}
        </div>
    `;
}

// Scenario Cards
function renderScenarioInput(q, savedValue) {
    const scenarios = q.scenarios || SCENARIO_MATURITY;
    return `
        <div class="scenario-group" data-question="${q.id}">
            ${scenarios.map(scenario => `
                <div class="scenario-card${savedValue === scenario.value ? ' active' : ''}"
                    data-level="${scenario.value}"
                    data-value="${scenario.value}"
                    onclick="handleHybridSelect('${q.id}', ${scenario.value}, this, 'scenario')">
                    <div class="scenario-title">${scenario.title}</div>
                    <div class="scenario-desc">${scenario.desc}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// Gradient Scale
function renderGradientInput(q, savedValue) {
    const defaultVal = savedValue || 3;
    const percentage = ((defaultVal - 1) / 4) * 100;
    const selectedOption = q.options.find(opt => opt.value === defaultVal);
    const label = selectedOption ? selectedOption.text : 'Neutral';

    return `
        <div class="gradient-group" data-question="${q.id}">
            <div class="gradient-labels">
                <span class="label-low">${q.options[0]?.text || 'Low'}</span>
                <span class="label-high">${q.options[q.options.length - 1]?.text || 'High'}</span>
            </div>
            <div class="gradient-track" data-question="${q.id}">
                <div class="gradient-thumb" style="left: ${percentage}%;" data-value="${defaultVal}"></div>
            </div>
            <div class="gradient-ticks">
                ${q.options.map(opt => `<span class="gradient-tick">${opt.value}</span>`).join('')}
            </div>
            <div class="gradient-value-display">
                <span class="gradient-value-badge" id="gradient-badge-${q.id}">
                    ${savedValue ? `${savedValue} – ${label}` : 'Drag to select'}
                </span>
            </div>
        </div>
    `;
}

// Handle hybrid input selection
function handleHybridSelect(questionId, value, element, inputType) {
    assessmentState.answers[questionId] = value;

    // Remove active from siblings
    const parent = element.parentElement;
    parent.querySelectorAll('.active').forEach(el => el.classList.remove('active'));

    // Add active to selected
    element.classList.add('active');

    // Clear incomplete state
    const questionElement = document.getElementById(`question-${questionId}`);
    if (questionElement) {
        questionElement.classList.remove('incomplete');
    }

    showValidationMessage(false);
    updateProgress();
}

// Initialize gradient (drag) inputs
function initializeGradientInputs() {
    document.querySelectorAll('.gradient-track').forEach(track => {
        const thumb = track.querySelector('.gradient-thumb');
        if (!thumb) return;

        const questionId = track.dataset.question;
        const question = findQuestionById(questionId);
        if (!question) return;

        let isDragging = false;

        const updatePosition = (clientX) => {
            const rect = track.getBoundingClientRect();
            let percentage = ((clientX - rect.left) / rect.width) * 100;
            percentage = Math.max(0, Math.min(100, percentage));

            // Snap to 5 positions (1-5)
            const step = 100 / 4;
            const snappedIndex = Math.round(percentage / step);
            const snappedPercentage = snappedIndex * step;
            const value = snappedIndex + 1;

            thumb.style.left = `${snappedPercentage}%`;
            thumb.dataset.value = value;

            // Update badge
            const badge = document.getElementById(`gradient-badge-${questionId}`);
            const option = question.options.find(opt => opt.value === value);
            if (badge && option) {
                badge.textContent = `${value} – ${option.text}`;
            }

            // Save answer
            assessmentState.answers[questionId] = value;

            // Clear incomplete
            const questionElement = document.getElementById(`question-${questionId}`);
            if (questionElement) {
                questionElement.classList.remove('incomplete');
            }

            showValidationMessage(false);
            updateProgress();
        };

        // Mouse events
        thumb.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                updatePosition(e.clientX);
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Touch events
        thumb.addEventListener('touchstart', (e) => {
            isDragging = true;
            e.preventDefault();
        });

        document.addEventListener('touchmove', (e) => {
            if (isDragging && e.touches[0]) {
                updatePosition(e.touches[0].clientX);
            }
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });

        // Click on track to jump
        track.addEventListener('click', (e) => {
            if (e.target !== thumb) {
                updatePosition(e.clientX);
            }
        });
    });
}

function buildSectionProgressDots() {
    const dotsContainer = document.getElementById('sectionProgressDots');
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';

    ASSESSMENT_CONFIG.categories.forEach(() => {
        const li = document.createElement('li');
        dotsContainer.appendChild(li);
    });
}

function updateSectionProgress() {
    const labelElement = document.getElementById('sectionProgressLabel');
    const categoryElement = document.getElementById('sectionProgressCategory');
    const currentIndex = assessmentState.currentCategory;
    const currentCategoryKey = ASSESSMENT_CONFIG.categories[currentIndex];
    const total = ASSESSMENT_CONFIG.categories.length;

    if (labelElement) {
        labelElement.textContent = `Section ${currentIndex + 1} of ${total}`;
    }

    if (categoryElement) {
        categoryElement.textContent = ASSESSMENT_CONFIG.categoryNames[currentCategoryKey];
    }

    const dots = document.querySelectorAll('#sectionProgressDots li');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index <= currentIndex);
    });
}

function showValidationMessage(shouldShow) {
    const messageElement = document.getElementById('validationMessage');
    if (!messageElement) return;
    messageElement.classList.toggle('d-none', !shouldShow);
}

function validateCurrentCategory() {
    const currentCategoryKey = ASSESSMENT_CONFIG.categories[assessmentState.currentCategory];
    const categoryQuestions = activeQuestions[currentCategoryKey] || [];
    let hasIncomplete = false;

    categoryQuestions.forEach(question => {
        const isAnswered = Boolean(assessmentState.answers[question.id]);
        const questionElement = document.getElementById(`question-${question.id}`);
        if (questionElement) {
            questionElement.classList.toggle('incomplete', !isAnswered);
        }
        if (!isAnswered) {
            hasIncomplete = true;
        }
    });

    showValidationMessage(hasIncomplete);
    return !hasIncomplete;
}

// Handle Slider Change
function handleSliderChange(questionId, rawValue, inputElement) {
    const value = Number(rawValue);
    if (Number.isNaN(value)) {
        return;
    }

    assessmentState.answers[questionId] = value;

    const questionElement = document.getElementById(`question-${questionId}`);
    if (questionElement) {
        questionElement.classList.remove('incomplete');
    }

    const displayElement = document.getElementById(`slider-value-${questionId}`);
    const question = findQuestionById(questionId);
    if (displayElement && question) {
        const matchedOption = (question.options || []).find(option => Number(option.value) === value);
        displayElement.textContent = matchedOption ? `${value} – ${matchedOption.text}` : `Selected: ${value}`;
    }

    if (inputElement) {
        inputElement.setAttribute('data-selected', 'true');
        updateSliderVisualState(inputElement);
        const sliderGroup = inputElement.closest('.slider-group');
        if (sliderGroup) {
            sliderGroup.querySelectorAll('.slider-tick').forEach(tick => {
                tick.classList.toggle('active', Number(tick.dataset.value) === value);
            });
        }
    }

    showValidationMessage(false);
    updateProgress();
}

function initializeSliderVisuals() {
    document.querySelectorAll('.readiness-slider').forEach(slider => {
        updateSliderVisualState(slider);
        const isSelected = slider.dataset.selected === 'true';
        if (!isSelected) {
            const sliderGroup = slider.closest('.slider-group');
            if (sliderGroup) {
                sliderGroup.querySelectorAll('.slider-tick').forEach(tick => tick.classList.remove('active'));
            }
        }
    });
}

function updateSliderVisualState(slider) {
    if (!slider) return;
    const min = Number(slider.min) || 1;
    const max = Number(slider.max) || 5;
    const value = Number(slider.value) || min;
    const percentage = ((value - min) / (max - min)) * 100;
    const isSelected = slider.dataset.selected === 'true';
    const activeColor = getCssVariableValue('--primary-color') || '#7c3aed';
    const inactiveColor = 'rgba(226, 232, 240, 0.5)';
    const trackColor = isSelected ? activeColor : inactiveColor;
    slider.style.background = `linear-gradient(90deg, ${trackColor} ${percentage}%, rgba(226, 232, 240, 0.8) ${percentage}%)`;
}

// Show Current Category
function showCurrentCategory() {
    // Hide all categories
    ASSESSMENT_CONFIG.categories.forEach(category => {
        document.getElementById(`category-${category}`).classList.add('d-none');
    });

    // Show current category
    const currentCategoryKey = ASSESSMENT_CONFIG.categories[assessmentState.currentCategory];
    document.getElementById(`category-${currentCategoryKey}`).classList.remove('d-none');

    updateSectionProgress();
    showValidationMessage(false);

    // Update navigation buttons
    updateNavigationButtons();

    const assessmentSection = document.getElementById('assessment-section');
    if (assessmentSection && !assessmentSection.classList.contains('d-none')) {
        scrollToActiveCategory();
    }
}

// Update Navigation Buttons
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Show/hide previous button
    if (assessmentState.currentCategory === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'inline-block';
    }

    // Update next button text
    if (assessmentState.currentCategory === ASSESSMENT_CONFIG.categories.length - 1) {
        nextBtn.innerHTML = 'Complete Assessment <i class="fas fa-check ms-2"></i>';
    } else {
        nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right ms-2"></i>';
    }
}

// Navigate Sections
function navigateSection(direction) {
    if (direction === 'prev' && assessmentState.currentCategory > 0) {
        assessmentState.currentCategory--;
        showCurrentCategory();
    } else if (direction === 'next') {
        if (!validateCurrentCategory()) {
            return;
        }

        if (assessmentState.currentCategory < ASSESSMENT_CONFIG.categories.length - 1) {
            assessmentState.currentCategory++;
            showCurrentCategory();
        } else {
            // Complete assessment
            completeAssessment();
        }
    }
}

function scrollToActiveCategory() {
    const currentCategoryKey = ASSESSMENT_CONFIG.categories[assessmentState.currentCategory];
    const target = document.getElementById(`category-${currentCategoryKey}`) || document.getElementById('assessment-section');
    scrollElementIntoViewWithOffset(target);
}

function scrollElementIntoViewWithOffset(element) {
    if (!element) return;
    const header = document.querySelector('header');
    const offset = (header?.offsetHeight || 0) + 12;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
}

// Update Progress
function updateProgress() {
    const totalQuestions = Object.values(activeQuestions).flat().length || 1;
    const answeredQuestions = Object.keys(assessmentState.answers).length;
    const progressPercentage = Math.round((answeredQuestions / totalQuestions) * 100);

    document.getElementById('progressBar').style.width = `${progressPercentage}%`;
    document.getElementById('progressText').textContent = `${progressPercentage}% Complete`;
}

// Calculate Category Scores
function calculateCategoryScores() {
    ASSESSMENT_CONFIG.categories.forEach(category => {
        const categoryQuestions = activeQuestions[category] || [];
        let totalScore = 0;
        let answeredCount = 0;

        categoryQuestions.forEach(question => {
            if (assessmentState.answers[question.id]) {
                totalScore += assessmentState.answers[question.id];
                answeredCount++;
            }
        });

        const averageScore = answeredCount > 0 ? totalScore / answeredCount : 0;
        const maxScore = 5; // Maximum score per question
        const percentageScore = (averageScore / maxScore) * 100;

        assessmentState.categoryScores[category] = {
            average: averageScore,
            percentage: percentageScore,
            answered: answeredCount,
            total: categoryQuestions.length
        };
    });
}

// Complete Assessment
function completeAssessment() {
    calculateCategoryScores();
    showResults();
}

// Show Results
function showResults() {
    document.getElementById('assessment-section').classList.add('d-none');
    document.getElementById('results-section').classList.remove('d-none');

    displayOverallScore();
    displayCategoryChart();
    displayCategoryResults();
    buildRoadmapSteps();
    buildAutomationInsights();
    buildDetailedRecommendations();
    recordSubmissionForMasterLog();
    fetchAIInsights();
    scrollElementIntoViewWithOffset(document.getElementById('results-section'));
}

// Fetch AI Consultant Insights
async function fetchAIInsights() {
    const container = document.getElementById('aiConsultantContainer');
    const loadingState = document.getElementById('aiLoadingState');
    const resultsContent = document.getElementById('aiResultsContent');

    // Reset UI
    container.style.display = 'block';
    loadingState.classList.remove('d-none');
    resultsContent.classList.add('d-none');

    try {
        const payload = {
            role: assessmentState.role || 'management',
            department: assessmentState.department || '',
            scores: {
                organization: assessmentState.categoryScores?.organization?.average || 0,
                people: assessmentState.categoryScores?.people?.average || 0,
                culture: assessmentState.categoryScores?.culture?.average || 0,
                tools: assessmentState.categoryScores?.tools?.average || 0,
                technology: assessmentState.categoryScores?.technology?.average || 0
            },
            consentGiven: true
        };

        // Dynamically use the correct protocol (http/https) to avoid Mixed Content errors
        const protocol = window.location.protocol;

        let apiUrl = '';
        if (protocol === 'https:') {
            // Using a first-level subdomain (drc-api) because Cloudflare free SSL doesn't cover second-level (api.drc-genai)
            apiUrl = `https://drc-api.sansmi.org/api/generate-insights`;
        } else {
            // If we're on http (local network), we use the specific 8589 port
            const hostname = window.location.hostname;
            const port = ':8589'; // Always use port 8589 for HTTP local connections
            apiUrl = `${protocol}//${hostname}${port}/api/generate-insights`;
        }

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();

        // Populate UI
        document.getElementById('aiExecSummary').textContent = data.executiveSummary || 'No summary provided.';

        const risksList = document.getElementById('aiKeyRisks');
        risksList.innerHTML = '';
        (data.keyRisks || []).forEach(risk => {
            risksList.innerHTML += `<li class="list-group-item bg-transparent"><i class="fas fa-exclamation-circle text-danger me-2"></i>${risk}</li>`;
        });

        const oppsList = document.getElementById('aiAutomationOpps');
        oppsList.innerHTML = '';
        (data.automationOpportunities || []).forEach(opp => {
            oppsList.innerHTML += `<li class="list-group-item bg-transparent"><i class="fas fa-check-circle text-success me-2"></i>${opp}</li>`;
        });

        const roadmapDiv = document.getElementById('aiRoadmap');
        roadmapDiv.innerHTML = '';
        (data.strategicRoadmap || []).forEach(step => {
            roadmapDiv.innerHTML += `
                <div class="col-md-4 mb-3">
                    <div class="card h-100 border-info border-opacity-50 shadow-sm">
                        <div class="card-header bg-info text-white py-2">
                            <strong class="text-white">${step.phase}</strong>
                        </div>
                        <div class="card-body py-2 px-3 small bg-white text-dark">
                            ${step.action}
                        </div>
                    </div>
                </div>
            `;
        });

        // Hide loading, show results
        loadingState.classList.add('d-none');
        resultsContent.classList.remove('d-none');

    } catch (err) {
        console.error('Failed to fetch AI insights:', err);
        loadingState.classList.add('d-none');
        resultsContent.classList.remove('d-none');
        resultsContent.innerHTML = `<div class="alert alert-warning"><i class="fas fa-exclamation-triangle me-2"></i>Could not connect to the AI Consultant service. Please start the backend server on port 8589 with your OpenAI API key.</div>`;
    }
}

function getStageInfo(score) {
    if (score < 30) {
        return {
            title: 'Getting Started',
            description: 'Your organization is beginning its digital transformation journey. Focus on building foundational capabilities and awareness.'
        };
    }
    if (score < 50) {
        return {
            title: 'Developing',
            description: 'Your organization is making progress with digital initiatives. Continue building on existing efforts and address gaps.'
        };
    }
    if (score < 70) {
        return {
            title: 'Advancing',
            description: 'Your organization has good digital readiness. Focus on scaling successful initiatives and improving weaker areas.'
        };
    }
    if (score < 90) {
        return {
            title: 'Mature',
            description: 'Your organization has strong digital capabilities. Continue innovating and maintaining momentum.'
        };
    }
    return {
        title: 'Leading',
        description: 'Your organization is a digital leader. Focus on continuous improvement and sharing best practices.'
    };
}

// Display Overall Score
function displayOverallScore() {
    const scores = Object.values(assessmentState.categoryScores);
    const overallAverage = scores.reduce((sum, score) => sum + score.percentage, 0) / scores.length;
    const roundedScore = Math.round(overallAverage);
    const stageInfo = getStageInfo(overallAverage);

    assessmentState.overallScore = roundedScore;
    assessmentState.overallStage = stageInfo;

    document.getElementById('overallScore').textContent = roundedScore;
    document.getElementById('overallTitle').textContent = stageInfo.title;
    document.getElementById('overallDescription').textContent = stageInfo.description;

    // Update score circle
    const scoreCircle = document.querySelector('.score-circle');
    const degrees = (overallAverage / 100) * 360;
    scoreCircle.style.background = `conic-gradient(var(--primary-color) ${degrees}deg, rgba(226, 232, 240, 0.5) ${degrees}deg)`;
}

// Display Category Chart
function displayCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    const categories = ASSESSMENT_CONFIG.categories.map(cat => ASSESSMENT_CONFIG.categoryNames[cat]);
    const scores = ASSESSMENT_CONFIG.categories.map(cat => assessmentState.categoryScores[cat].percentage);
    const primaryColor = getCssVariableValue('--primary-color') || '#7c3aed';
    const accentColor = getCssVariableValue('--accent-color') || '#f97316';
    const fillColor = hexToRgba(primaryColor, 0.2);

    if (!categoryChart) {
        categoryChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: categories,
                datasets: [{
                    label: 'Digital Readiness Score',
                    data: scores,
                    backgroundColor: fillColor,
                    borderColor: primaryColor,
                    borderWidth: 2,
                    pointBackgroundColor: accentColor,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: primaryColor
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    } else {
        categoryChart.data.labels = categories;
        categoryChart.data.datasets[0].data = scores;
        categoryChart.data.datasets[0].backgroundColor = fillColor;
        categoryChart.data.datasets[0].borderColor = primaryColor;
        categoryChart.data.datasets[0].pointBackgroundColor = accentColor;
        categoryChart.data.datasets[0].pointHoverBorderColor = primaryColor;
        categoryChart.update();
    }
}

// Display Category Results
function displayCategoryResults() {
    ASSESSMENT_CONFIG.categories.forEach(category => {
        const score = assessmentState.categoryScores[category];
        const scoreElement = document.getElementById(`score-${category}`);
        const descriptionElement = document.getElementById(`description-${category}`);
        const recommendationsElement = document.getElementById(`recommendations-${category}`);

        // Update score
        scoreElement.textContent = Math.round(score.percentage);

        // Update description
        let description;
        if (score.percentage < 30) {
            description = 'This area needs significant attention and improvement to support digital transformation.';
        } else if (score.percentage < 50) {
            description = 'This area has some capabilities but requires development to support transformation goals.';
        } else if (score.percentage < 70) {
            description = 'This area has good capabilities and can support most digital initiatives effectively.';
        } else if (score.percentage < 90) {
            description = 'This area has strong capabilities and is well-positioned for digital transformation.';
        } else {
            description = 'This area has excellent capabilities and can serve as a model for others.';
        }
        descriptionElement.classList.remove('d-none');
        descriptionElement.textContent = description;

        // Update recommendations
        const recommendations = getRecommendations(category, score.percentage);

        // Ensure the list is cleared first
        recommendationsElement.innerHTML = '';

        if (recommendations.length > 0) {
            recommendations.forEach(rec => {
                const li = document.createElement('li');
                li.textContent = rec;
                recommendationsElement.appendChild(li);
            });
        } else {
            // Fallback if empty (should be covered by getRecommendations logic, but safe to add)
            const li = document.createElement('li');
            li.textContent = 'Excellent work! No specific recommendations at this time.';
            recommendationsElement.appendChild(li);
        }
    });
}

// Get Recommendations
function getRecommendations(category, score) {
    const recommendations = [];
    const categoryQuestions = activeQuestions[category] || [];

    // Check if any questions in this category have been answered
    let answeredCount = 0;
    categoryQuestions.forEach(q => {
        if (assessmentState.answers[q.id]) {
            answeredCount++;
        }
    });

    // If no data available (or very low data), return specific message
    if (answeredCount === 0) {
        return ['Not enough data available for providing recommendations.'];
    }

    // 1. Add specific recommendations based on low-scoring answers (1 or 2)
    categoryQuestions.forEach(q => {
        const answerValue = assessmentState.answers[q.id];
        if (answerValue && answerValue <= 2) {
            recommendations.push(getSpecificRecommendation(q.id));
        }
    });

    // 2. If no specific recommendations (high scores), add a generic "keep it up" message
    if (recommendations.length === 0) {
        recommendations.push('Excellent work! Continue to maintain and innovate in this area.');
    }

    return recommendations;
}

// Specific Recommendations Mapping
function getSpecificRecommendation(questionId) {
    const specificRecs = {
        // Organization
        'org_1': 'Prioritize the creation of a documented digital transformation strategy.',
        'org_2': 'Establish a formal governance structure to oversee digital initiatives.',
        'org_3': 'Review budget allocation to ensure digital initiatives are adequately funded.',
        'org_4': 'Create cross-functional teams to improve integration between departments.',
        'org_5': 'Engage leadership in digital workshops to increase support and buy-in.',

        // People
        'peo_1': 'Conduct a skills gap analysis and provide basic digital literacy training.',
        'peo_2': 'Implement structured training programs for key digital competencies.',
        'peo_3': 'Run change management sessions to address resistance to new technologies.',
        'peo_4': 'Identify and empower "Digital Champions" within teams to drive adoption.',
        'peo_5': 'Review job descriptions and recruitment channels to attract digital talent.',

        // Culture
        'cul_1': 'Launch an "Innovation Challenge" to encourage new ideas from staff.',
        'cul_2': 'Provide access to online learning platforms to foster a learning culture.',
        'cul_3': 'Celebrate "smart failures" to reduce fear of risk-taking.',
        'cul_4': 'Implement collaboration tools (like Slack/Teams) to break down silos.',
        'cul_5': 'Implement customer feedback loops to drive digital improvements.',

        // Tools
        'too_1': 'Start documenting key business processes to identify automation opportunities.',
        'too_2': 'Audit current tools and look for integration opportunities (APIs/Zapier).',
        'too_3': 'Adopt a standard project management methodology (e.g., Agile/Scrum).',
        'too_4': 'Start with basic dashboards to visualize key performance indicators.',
        'too_5': 'Identify repetitive manual tasks that can be easily automated.',

        // Technology
        'tec_1': 'Plan a phased upgrade of legacy infrastructure to modern standards.',
        'tec_2': 'Evaluate cloud solutions for non-critical workloads to start migration.',
        'tec_3': 'Conduct a security audit and implement basic cybersecurity hygiene.',
        'tec_4': 'Establish data governance policies to ensure data quality and access.',
        'tec_5': 'Design future systems with microservices or modular architecture for scalability.',

        // Employee Organization
        'emp_org_1': 'Host monthly digital town halls so leaders translate the roadmap for frontline teams.',
        'emp_org_2': 'Send bi-weekly release notes or Loom recaps covering upcoming digital launches.',
        'emp_org_3': 'Stand up a micro-innovation fund so teams can test automation ideas quickly.',
        'emp_org_4': 'Schedule cross-department stand-ups to surface dependencies on shared initiatives.',
        'emp_org_5': 'Publish a quarterly roadmap snapshot for every business unit with key milestones.',

        // Employee People
        'emp_people_1': 'Offer curated micro-learning paths tied to each role\'s digital expectations.',
        'emp_people_2': 'Record short walkthroughs for new tools and store them in an easily searchable hub.',
        'emp_people_3': 'Assign digital office hours so employees know exactly who can unblock them.',
        'emp_people_4': 'Add "teach a tool" or automation goals into performance check-ins.',
        'emp_people_5': 'Refine recruiting briefs with digital leaders to target the right talent pools.',

        // Employee Culture
        'emp_culture_1': 'Reserve sprint capacity for experiments and capture outcomes in a shared log.',
        'emp_culture_2': 'Close every pilot with a learning recap slide regardless of outcome.',
        'emp_culture_3': 'Host monthly show-and-tells so departments demo digital wins and misses.',
        'emp_culture_4': 'Pipe customer feedback straight into product/channel teams with action owners.',
        'emp_culture_5': 'Launch an "automation hero" shout-out in all-hands meetings.',

        // Employee Tools
        'emp_tools_1': 'Run UX listening sessions to remove clunky steps in core tools.',
        'emp_tools_2': 'Prioritize API/iPaaS connectors that eliminate double entry across systems.',
        'emp_tools_3': 'Provide low-code licenses plus guardrails so teams can automate safely.',
        'emp_tools_4': 'Automate KPI refreshes with scheduled queries instead of monthly slide builds.',
        'emp_tools_5': 'Roll out a simple Agile/Kanban template and coach teams for two sprints.',

        // Employee Technology
        'emp_tech_1': 'Track uptime targets per tool and publish the status in a live dashboard.',
        'emp_tech_2': 'Create a lightweight intake form with same-week triage for new tool requests.',
        'emp_tech_3': 'Expand secure mobile/cloud access with managed devices and SSO.',
        'emp_tech_4': 'Translate security policies into short checklists and micro-videos.',
        'emp_tech_5': 'Invest in a governed data layer so teams can blend CRM/ERP/product data without exports.',

        // Department Deep Dives
        'dept_technology_tools_1': 'Adopt AIOps or runbook automation to enrich alerts before on-call engineers engage.',
        'dept_technology_technology_1': 'Templatize IaC and CI/CD pipelines so product teams self-serve environments.',
        'dept_finance_tools_1': 'Use workflow routing with reminders for invoices stuck longer than 48 hours.',
        'dept_finance_technology_1': 'Connect ERP, billing, and bank feeds to auto-populate reconciliations.',
        'dept_procurement_tools_1': 'Digitize vendor intake with required fields and SLA tracking dashboards.',
        'dept_procurement_technology_1': 'Sync contract metadata into sourcing and finance systems through APIs.',
        'dept_legal_tools_1': 'Deploy smart templates that pull customer data directly from CRM records.',
        'dept_legal_technology_1': 'Adopt AI clause comparison to flag risky language before attorney review.',
        'dept_operations_tools_1': 'Implement workforce scheduling software with digital shift swaps.',
        'dept_operations_technology_1': 'Stream plant and safety data into live dashboards rather than manual logs.',
        'dept_marketing_tools_1': 'Centralize campaign briefs/approvals in a kanban board everyone can view.',
        'dept_marketing_technology_1': 'Automate marketing dashboards with connectors to ad, web, and CRM platforms.',
        'dept_production_tools_1': 'Log maintenance tickets via QR codes or kiosks to auto-assign technicians.',
        'dept_production_technology_1': 'Use sensors/SCADA alerts for predictive maintenance instead of manual rounds.'
    };

    return specificRecs[questionId] || 'Review this area for potential improvements.';
}

function buildRoadmapSteps() {
    const container = document.getElementById('roadmapSteps');
    if (!container) return;

    const sortedCategories = ASSESSMENT_CONFIG.categories
        .map(key => ({
            key,
            score: assessmentState.categoryScores[key]?.percentage || 0
        }))
        .sort((a, b) => a.score - b.score)
        .slice(0, 3);

    if (!sortedCategories.length || sortedCategories.every(item => item.score === 0)) {
        assessmentState.roadmapSteps = [];
        container.innerHTML = '<p class="text-muted mb-0">Complete the assessment to see your prioritized roadmap.</p>';
        return;
    }

    const steps = sortedCategories.map((entry, index) => {
        const categoryName = ASSESSMENT_CONFIG.categoryNames[entry.key];
        const description = ROADMAP_CATEGORY_NOTES[entry.key] || 'Focus on structured improvements in this area.';
        const actions = ROADMAP_ACTION_TAGS[entry.key] || [];
        const priorityClass = index === 0 ? 'high' : index === 1 ? 'medium' : 'low';
        const priorityLabel = index === 0 ? 'High Impact' : index === 1 ? 'Next Focus' : 'Stabilize';

        return {
            order: index + 1,
            categoryKey: entry.key,
            category: categoryName,
            priorityClass,
            priority: priorityLabel,
            description,
            actions
        };
    });

    assessmentState.roadmapSteps = steps;
    container.innerHTML = '';

    steps.forEach(step => {
        const stepElement = document.createElement('div');
        stepElement.className = 'roadmap-step';
        stepElement.innerHTML = `
            <span class="step-number">${step.order}</span>
            <span class="step-priority ${step.priorityClass}">${step.priority}</span>
            <h5>${step.category}</h5>
            <p>${step.description}</p>
            ${step.actions.length ? `<div class="step-actions">${step.actions.map(action => `<span class="action-tag">${action}</span>`).join('')}</div>` : ''}
        `;
        container.appendChild(stepElement);
    });
}

function buildAutomationInsights() {
    const list = document.getElementById('automationList');
    if (!list) return;

    list.innerHTML = '';
    const insights = [];

    const automationCandidates = new Set();
    ['tools', 'technology'].forEach(category => {
        (activeQuestions[category] || []).forEach(question => {
            const answerValue = assessmentState.answers[question.id];
            if (answerValue && answerValue <= 2) {
                automationCandidates.add(question.id);
            }
        });
    });

    if (automationCandidates.size === 0) {
        const lowCategories = ['tools', 'technology'].filter(cat => (assessmentState.categoryScores[cat]?.percentage || 0) < 70);
        if (lowCategories.length) {
            lowCategories.slice(0, 2).forEach(cat => {
                const li = document.createElement('li');
                const insight = ROADMAP_CATEGORY_NOTES[cat];
                insights.push(insight);
                li.innerHTML = `<i class="fas fa-bolt"></i><span>${insight}</span>`;
                list.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            const insight = 'Digital workflows already look streamlined. Revisit quarterly for new automation wins.';
            insights.push(insight);
            li.innerHTML = `<i class="fas fa-check"></i><span>${insight}</span>`;
            list.appendChild(li);
        }
        assessmentState.automationInsights = insights;
        return;
    }

    Array.from(automationCandidates).slice(0, 6).forEach(questionId => {
        const insight = AUTOMATION_LIBRARY[questionId] || getSpecificRecommendation(questionId) || findQuestionById(questionId)?.question || 'Investigate manual workflow for automation potential.';
        insights.push(insight);
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-bolt"></i><span>${insight}</span>`;
        list.appendChild(li);
    });

    assessmentState.automationInsights = insights;
}

function findQuestionById(questionId) {
    for (const category of ASSESSMENT_CONFIG.categories) {
        const match = (activeQuestions[category] || []).find(question => question.id === questionId);
        if (match) {
            return match;
        }
    }
    return null;
}

// Build Detailed Recommendations Section
function buildDetailedRecommendations() {
    const container = document.getElementById('detailedRecommendationsContainer');
    if (!container) return;

    container.innerHTML = '';
    const detailedRecs = [];

    ASSESSMENT_CONFIG.categories.forEach(category => {
        const score = assessmentState.categoryScores[category]?.percentage || 0;
        const recData = DETAILED_RECOMMENDATIONS[category];
        if (!recData) return;

        // Determine score tier
        let tier, scoreClass, scoreLabel;
        if (score < 40) {
            tier = 'lowScore';
            scoreClass = 'score-low';
            scoreLabel = 'Needs Attention';
        } else if (score < 70) {
            tier = 'mediumScore';
            scoreClass = 'score-medium';
            scoreLabel = 'Developing';
        } else if (score < 90) {
            tier = 'highScore';
            scoreClass = 'score-good';
            scoreLabel = 'Good';
        } else {
            tier = 'highScore';
            scoreClass = 'score-excellent';
            scoreLabel = 'Excellent';
        }

        const tierData = recData[tier];
        const categoryName = ASSESSMENT_CONFIG.categoryNames[category];

        // Get question-specific recommendations for low-scoring questions
        const questionSpecificRecs = [];
        (activeQuestions[category] || []).forEach(q => {
            const answerValue = assessmentState.answers[q.id];
            if (answerValue && answerValue <= 2) {
                const specificRec = getSpecificRecommendation(q.id);
                if (specificRec && specificRec !== 'Review this area for potential improvements.') {
                    questionSpecificRecs.push({
                        title: q.question,
                        desc: specificRec,
                        priority: answerValue === 1 ? 'critical' : 'high',
                        tags: ['Question-Specific', 'Improvement']
                    });
                }
            }
        });

        // Combine general tier actions with question-specific recommendations
        const allActions = [...tierData.actions, ...questionSpecificRecs];

        // Store for export
        detailedRecs.push({
            category: categoryName,
            score: Math.round(score),
            scoreLabel,
            summary: tierData.summary,
            actions: allActions
        });

        // Build HTML
        const categoryElement = document.createElement('div');
        categoryElement.className = 'detailed-rec-category';

        let actionsHtml = '';
        if (allActions.length > 0) {
            actionsHtml = `
                <div class="detailed-rec-actions">
                    <h5><i class="fas fa-tasks me-2"></i>Action Items</h5>
                    <ul class="rec-action-list">
                        ${allActions.map(action => `
                            <li class="rec-action-item">
                                <div class="rec-action-icon priority-${action.priority}">
                                    <i class="fas ${action.priority === 'critical' ? 'fa-exclamation' : action.priority === 'high' ? 'fa-arrow-up' : action.priority === 'medium' ? 'fa-minus' : 'fa-check'}"></i>
                                </div>
                                <div class="rec-action-content">
                                    <div class="rec-action-title">${action.title}</div>
                                    <div class="rec-action-desc">${action.desc}</div>
                                    ${action.tags ? `<div class="rec-action-meta">${action.tags.map(tag => `<span class="rec-action-tag">${tag}</span>`).join('')}</div>` : ''}
                                </div>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        } else {
            actionsHtml = `
                <div class="rec-no-actions">
                    <i class="fas fa-trophy"></i>
                    <p>Excellent work! No specific improvements needed at this time.</p>
                </div>
            `;
        }

        categoryElement.innerHTML = `
            <div class="detailed-rec-header">
                <h4><i class="fas ${recData.icon} me-2"></i>${categoryName}</h4>
                <div class="rec-score-indicator">
                    <span class="rec-score-value ${scoreClass}">${Math.round(score)}%</span>
                    <span class="rec-score-label ${scoreClass}">${scoreLabel}</span>
                </div>
            </div>
            <div class="detailed-rec-summary">
                <p>${tierData.summary}</p>
            </div>
            ${actionsHtml}
        `;

        container.appendChild(categoryElement);
    });

    // Store for export
    assessmentState.detailedRecommendations = detailedRecs;
}

function getCssVariableValue(variableName) {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

function hexToRgba(hex, alpha) {
    if (!hex) {
        return `rgba(37, 99, 235, ${alpha})`;
    }
    let parsedHex = hex.replace('#', '');
    if (parsedHex.length === 3) {
        parsedHex = parsedHex.split('').map(char => char + char).join('');
    }
    const intValue = parseInt(parsedHex, 16);
    if (Number.isNaN(intValue)) {
        return `rgba(37, 99, 235, ${alpha})`;
    }
    const r = (intValue >> 16) & 255;
    const g = (intValue >> 8) & 255;
    const b = intValue & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function ensureResultsReady() {
    if (!Object.keys(assessmentState.categoryScores || {}).length) {
        alert('Complete the assessment and view your results before downloading.');
        return false;
    }
    return true;
}

function formatDepartmentLabel(value) {
    if (!value) {
        return 'Not specified';
    }
    return DEPARTMENT_LABELS[value] || value.charAt(0).toUpperCase() + value.slice(1);
}

function buildResultsExportData() {
    const generatedAt = new Date();
    const stageInfo = assessmentState.overallStage || getStageInfo(assessmentState.overallScore || 0);

    const categories = ASSESSMENT_CONFIG.categories.map(key => {
        const categoryScore = assessmentState.categoryScores[key] || {};
        const totalQuestions = categoryScore.total || (activeQuestions[key]?.length || 0);
        return {
            key,
            label: ASSESSMENT_CONFIG.categoryNames[key],
            score: Math.round(categoryScore.percentage || 0),
            answered: categoryScore.answered || 0,
            total: totalQuestions
        };
    });

    return {
        generatedAt,
        role: assessmentState.role || 'Not specified',
        department: formatDepartmentLabel(assessmentState.department),
        overallScore: assessmentState.overallScore || 0,
        stageTitle: stageInfo.title,
        stageDescription: stageInfo.description,
        categories,
        roadmap: assessmentState.roadmapSteps || [],
        automation: assessmentState.automationInsights || [],
        detailedRecommendations: assessmentState.detailedRecommendations || [],
        answers: assessmentState.answers
    };
}

function triggerFileDownload(filename, blob) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function downloadPdfResults() {
    if (!ensureResultsReady()) {
        return;
    }
    printResults();
}

function downloadCsvResults() {
    if (!ensureResultsReady()) {
        return;
    }

    const data = buildResultsExportData();
    const rows = [];
    rows.push(['Digital Readiness Check Results']);
    rows.push(['Generated At', data.generatedAt.toLocaleString()]);
    rows.push(['Role', data.role]);
    rows.push(['Department', data.department]);
    rows.push(['Overall Score', data.overallScore]);
    rows.push(['Stage', data.stageTitle]);
    rows.push(['Stage Description', data.stageDescription]);
    rows.push([]);
    rows.push(['Category Scores']);
    rows.push(['Category', 'Score (%)', 'Answered', 'Total Questions']);
    data.categories.forEach(category => {
        rows.push([category.label, category.score, category.answered, category.total]);
    });
    rows.push([]);
    rows.push(['Roadmap Steps']);
    if (data.roadmap.length) {
        rows.push(['#', 'Category', 'Priority', 'Description', 'Action Tags']);
        data.roadmap.forEach(step => {
            rows.push([
                step.order,
                step.category,
                step.priority,
                step.description,
                (step.actions || []).join(' | ')
            ]);
        });
    } else {
        rows.push(['No roadmap data available']);
    }
    rows.push([]);
    rows.push(['Automation Opportunities']);
    if (data.automation.length) {
        data.automation.forEach((item, index) => {
            rows.push([index + 1, item]);
        });
    } else {
        rows.push(['No automation insights captured']);
    }
    rows.push([]);
    rows.push(['Detailed Recommendations Report']);
    if (data.detailedRecommendations && data.detailedRecommendations.length) {
        data.detailedRecommendations.forEach(catRec => {
            rows.push([]);
            rows.push([`${catRec.category} (${catRec.score}% - ${catRec.scoreLabel})`]);
            rows.push(['Summary', catRec.summary]);
            if (catRec.actions && catRec.actions.length) {
                rows.push(['Action Items:']);
                rows.push(['Priority', 'Title', 'Description', 'Tags']);
                catRec.actions.forEach(action => {
                    rows.push([
                        action.priority ? action.priority.toUpperCase() : '',
                        action.title,
                        action.desc,
                        (action.tags || []).join(', ')
                    ]);
                });
            }
        });
    } else {
        rows.push(['No detailed recommendations available']);
    }

    const csvContent = rows
        .map(row => row.map(value => {
            const cell = value == null ? '' : String(value);
            if (/[",\n]/.test(cell)) {
                return `"${cell.replace(/"/g, '""')}"`;
            }
            return cell;
        }).join(','))
        .join('\n');

    triggerFileDownload(`digital-readiness-results-${Date.now()}.csv`, new Blob([csvContent], { type: 'text/csv;charset=utf-8;' }));
}

function escapeHtml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function downloadExcelResults() {
    if (!ensureResultsReady()) {
        return;
    }

    const data = buildResultsExportData();
    const categoriesRows = data.categories.map(category => `
        <tr>
            <td>${escapeHtml(category.label)}</td>
            <td>${category.score}</td>
            <td>${category.answered}</td>
            <td>${category.total}</td>
        </tr>
    `).join('');

    const roadmapRows = (data.roadmap.length ? data.roadmap : [{
        order: '-',
        category: 'No roadmap data available',
        priority: '',
        description: '',
        actions: []
    }]).map(step => `
        <tr>
            <td>${escapeHtml(step.order)}</td>
            <td>${escapeHtml(step.category)}</td>
            <td>${escapeHtml(step.priority)}</td>
            <td>${escapeHtml(step.description)}</td>
            <td>${escapeHtml((step.actions || []).join(' | '))}</td>
        </tr>
    `).join('');

    const automationRows = (data.automation.length ? data.automation : ['No automation insights captured']).map((item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${escapeHtml(item)}</td>
        </tr>
    `).join('');

    // Build detailed recommendations rows
    let detailedRecsHtml = '';
    if (data.detailedRecommendations && data.detailedRecommendations.length) {
        data.detailedRecommendations.forEach(catRec => {
            const actionsRows = (catRec.actions && catRec.actions.length)
                ? catRec.actions.map(action => `
                    <tr>
                        <td>${escapeHtml(action.priority ? action.priority.toUpperCase() : '')}</td>
                        <td>${escapeHtml(action.title)}</td>
                        <td>${escapeHtml(action.desc)}</td>
                        <td>${escapeHtml((action.tags || []).join(', '))}</td>
                    </tr>
                `).join('')
                : '<tr><td colspan="4">No action items</td></tr>';

            detailedRecsHtml += `
                <br />
                <table border="1">
                    <tr><th colspan="4" style="background-color: #f0f0f0;">${escapeHtml(catRec.category)} - ${catRec.score}% (${escapeHtml(catRec.scoreLabel)})</th></tr>
                    <tr><td colspan="4"><strong>Summary:</strong> ${escapeHtml(catRec.summary)}</td></tr>
                    <tr>
                        <th>Priority</th>
                        <th>Action Item</th>
                        <th>Description</th>
                        <th>Tags</th>
                    </tr>
                    ${actionsRows}
                </table>
            `;
        });
    } else {
        detailedRecsHtml = `
            <br />
            <table border="1">
                <tr><th>Detailed Recommendations</th></tr>
                <tr><td>No detailed recommendations available</td></tr>
            </table>
        `;
    }

    const htmlContent = `
        <html>
            <head><meta charset="UTF-8" /></head>
            <body>
                <table border="1">
                    <tr><th colspan="2">Overview</th></tr>
                    <tr><td>Generated</td><td>${escapeHtml(data.generatedAt.toLocaleString())}</td></tr>
                    <tr><td>Role</td><td>${escapeHtml(data.role)}</td></tr>
                    <tr><td>Department</td><td>${escapeHtml(data.department)}</td></tr>
                    <tr><td>Overall Score</td><td>${escapeHtml(data.overallScore)}</td></tr>
                    <tr><td>Stage</td><td>${escapeHtml(data.stageTitle)}</td></tr>
                    <tr><td>Stage Description</td><td>${escapeHtml(data.stageDescription)}</td></tr>
                </table>
                <br />
                <table border="1">
                    <tr><th colspan="4">Category Scores</th></tr>
                    <tr>
                        <th>Category</th>
                        <th>Score (%)</th>
                        <th>Answered</th>
                        <th>Total Questions</th>
                    </tr>
                    ${categoriesRows}
                </table>
                <br />
                <table border="1">
                    <tr><th colspan="5">Digital Transformation Roadmap</th></tr>
                    <tr>
                        <th>#</th>
                        <th>Category</th>
                        <th>Priority</th>
                        <th>Description</th>
                        <th>Action Tags</th>
                    </tr>
                    ${roadmapRows}
                </table>
                <br />
                <table border="1">
                    <tr><th colspan="2">Automation Opportunities</th></tr>
                    <tr>
                        <th>#</th>
                        <th>Insight</th>
                    </tr>
                    ${automationRows}
                </table>
                <br />
                <h3>Detailed Recommendations Report</h3>
                ${detailedRecsHtml}
            </body>
        </html>
    `;

    triggerFileDownload(`digital-readiness-results-${Date.now()}.xls`, new Blob([htmlContent], { type: 'application/vnd.ms-excel' }));
}

function formatAnswerLabel(question, answerValue) {
    if (!question || answerValue == null) {
        return 'Not answered';
    }
    const option = question.options?.find(opt => Number(opt.value) === Number(answerValue));
    if (option) {
        return `${answerValue} - ${option.text}`;
    }
    return String(answerValue);
}

function downloadResponsesText() {
    if (!ensureResultsReady()) {
        return;
    }

    const data = buildResultsExportData();
    const lines = [];
    lines.push('Digital Readiness Check – Response Log');
    lines.push(`Generated: ${data.generatedAt.toLocaleString()}`);
    lines.push(`Role       : ${data.role}`);
    lines.push(`Department : ${data.department}`);
    lines.push(`Overall Score: ${data.overallScore}`);
    lines.push(`Stage: ${data.stageTitle}`);
    lines.push(`Stage Summary: ${data.stageDescription}`);
    lines.push('');

    ASSESSMENT_CONFIG.categories.forEach(categoryKey => {
        const questions = activeQuestions[categoryKey] || [];
        if (!questions.length) {
            return;
        }
        lines.push(`${ASSESSMENT_CONFIG.categoryNames[categoryKey]} Responses`);
        questions.forEach((question, index) => {
            const answerValue = assessmentState.answers[question.id];
            lines.push(`  ${index + 1}. ${question.question}`);
            lines.push(`     Answer: ${formatAnswerLabel(question, answerValue)}`);
            if (question.description) {
                lines.push(`     Context: ${question.description}`);
            }
        });
        lines.push('');
    });

    if ((assessmentState.roadmapSteps || []).length) {
        lines.push('Roadmap Highlights:');
        assessmentState.roadmapSteps.forEach(step => {
            lines.push(`  [${step.priority?.toUpperCase() || 'N/A'}] ${step.category}: ${step.description}`);
        });
        lines.push('');
    }

    if ((assessmentState.automationInsights || []).length) {
        lines.push('Automation Opportunities:');
        assessmentState.automationInsights.forEach((item, idx) => {
            lines.push(`  ${idx + 1}. ${item}`);
        });
        lines.push('');
    }

    const footer = 'End of response log';
    lines.push(footer);

    const textContent = lines.join('\n');
    triggerFileDownload(`digital-readiness-responses-${Date.now()}.txt`, new Blob([textContent], { type: 'text/plain;charset=utf-8;' }));
}

function collectAnswerDetailsForLog() {
    const entries = [];
    ASSESSMENT_CONFIG.categories.forEach(categoryKey => {
        const questions = activeQuestions[categoryKey] || [];
        questions.forEach((question, index) => {
            const answerValue = assessmentState.answers[question.id];
            if (answerValue == null) {
                return;
            }
            entries.push({
                category: ASSESSMENT_CONFIG.categoryNames[categoryKey],
                questionId: question.id,
                questionNumber: index + 1,
                questionText: question.question,
                answerValue,
                answerLabel: formatAnswerLabel(question, answerValue)
            });
        });
    });
    return entries;
}

function getMasterLogEntries() {
    try {
        const stored = localStorage.getItem(MASTER_LOG_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.warn('Unable to parse master log; resetting storage.', error);
        localStorage.removeItem(MASTER_LOG_STORAGE_KEY);
        return [];
    }
}

function saveMasterLogEntries(entries) {
    localStorage.setItem(MASTER_LOG_STORAGE_KEY, JSON.stringify(entries));
}

function updateMasterLogCount() {
    const countElement = document.getElementById('masterLogCount');
    if (!countElement) {
        return;
    }
    const entries = getMasterLogEntries();
    countElement.textContent = entries.length;
}

function recordSubmissionForMasterLog() {
    if (assessmentState.submissionLogged) {
        return;
    }
    const exportData = buildResultsExportData();
    const logEntry = {
        id: `submission_${Date.now()}`,
        generatedAt: new Date().toISOString(),
        role: exportData.role,
        department: exportData.department,
        overallScore: exportData.overallScore,
        stageTitle: exportData.stageTitle,
        stageDescription: exportData.stageDescription,
        categoryScores: exportData.categories,
        roadmap: exportData.roadmap,
        automation: exportData.automation,
        answeredCount: Object.keys(assessmentState.answers || {}).length,
        answerDetails: collectAnswerDetailsForLog()
    };

    const entries = getMasterLogEntries();
    entries.push(logEntry);
    saveMasterLogEntries(entries);
    assessmentState.submissionLogged = true;
    updateMasterLogCount();
}

function downloadMasterLog() {
    const entries = getMasterLogEntries();
    if (!entries.length) {
        alert('No submissions recorded yet. Complete an assessment first.');
        return;
    }

    const lines = [];
    lines.push('Digital Readiness Check – Master Submission Log');
    lines.push(`Total submissions: ${entries.length}`);
    lines.push('');

    entries.forEach((entry, index) => {
        lines.push(`Submission ${index + 1}`);
        lines.push(`Timestamp : ${new Date(entry.generatedAt).toLocaleString()}`);
        lines.push(`Role      : ${entry.role}`);
        lines.push(`Department: ${entry.department}`);
        lines.push(`Overall   : ${entry.overallScore}`);
        lines.push(`Stage     : ${entry.stageTitle}`);
        lines.push(`Questions Answered: ${entry.answeredCount}`);
        lines.push('Category Scores:');
        (entry.categoryScores || []).forEach(category => {
            lines.push(`  - ${category.label}: ${category.score}% (Answered ${category.answered}/${category.total})`);
        });
        if ((entry.roadmap || []).length) {
            lines.push('Roadmap Highlights:');
            entry.roadmap.forEach(step => {
                lines.push(`  [${step.priority?.toUpperCase() || 'N/A'}] ${step.category}: ${step.description}`);
            });
        }
        if ((entry.automation || []).length) {
            lines.push('Automation Opportunities:');
            entry.automation.forEach((item, idx) => {
                lines.push(`  ${idx + 1}. ${item}`);
            });
        }
        if ((entry.answerDetails || []).length) {
            lines.push('Responses:');
            entry.answerDetails.forEach(detail => {
                lines.push(`  (${detail.category}) ${detail.questionNumber}. ${detail.questionText}`);
                lines.push(`     → ${detail.answerLabel}`);
            });
        }
        lines.push('');
        lines.push('---');
        lines.push('');
    });

    const textContent = lines.join('\n');
    triggerFileDownload(`digital-readiness-master-log-${Date.now()}.txt`, new Blob([textContent], { type: 'text/plain;charset=utf-8;' }));
}

// Save Results
async function saveResults() {
    const results = {
        timestamp: new Date().toISOString(),
        overallScore: Math.round(Object.values(assessmentState.categoryScores).reduce((sum, score) => sum + score.percentage, 0) / 5),
        categoryScores: assessmentState.categoryScores,
        answers: assessmentState.answers,
        role: assessmentState.role,
        department: assessmentState.department,
        overallStage: assessmentState.overallStage,
        roadmapSteps: assessmentState.roadmapSteps,
        automationInsights: assessmentState.automationInsights
    };

    try {
        // Save to localStorage for demonstration
        const savedResults = JSON.parse(localStorage.getItem('drc_results') || '[]');
        savedResults.push(results);
        localStorage.setItem('drc_results', JSON.stringify(savedResults));

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        alert('Results saved successfully!');
        console.log('Results saved:', results);

    } catch (error) {
        console.error('Error saving results:', error);
        alert('Error saving results. Please try again.');
    }
}

// Print Results
function printResults() {
    window.print();
}

// Restart Assessment
function restartAssessment() {
    if (confirm('Are you sure you want to start a new assessment? Your current progress will be lost.')) {
        prepareActiveQuestionSet();
        renderQuestions();

        // Reset UI
        document.getElementById('results-section').classList.add('d-none');
        document.getElementById('welcome-section').classList.remove('d-none');
        document.getElementById('sectionProgress').classList.add('d-none');
        showValidationMessage(false);

        // Reset progress
        updateProgress();
        buildSectionProgressDots();
        updateSectionProgress();
        showValidationMessage(false);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeAssessment);