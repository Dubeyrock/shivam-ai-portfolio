export type ProjectItem = {
  id: string;
  title: string;
  category: string;
  summary: string;
  tech: string[];
  github: string;
  demo?: string;
  highlight?: string;
  image?: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  org: string;
  desc: string;
  responsibilities?: string[];
  tech?: string[];
};

export const personal = {
  name: "Shivam Dubey",
  role: "AI/ML Engineer | Python | Machine Learning | Deep Learning | NLP | GenAI | LangChain | RAG | LLMs",
  location: "Faridabad, Haryana, India",
  email: "shivvam2002@gmail.com",
  summary:
    "B.Tech CSE (2024) graduate with 1+ year of hands-on experience building real-world AI, ML, and Generative AI solutions through internships and applied projects."
};

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/Dubeyrock" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shivam-dubey-371a591a8/" },
  { label: "Medium", href: "https://medium.com/@shivvam2002" },
  { label: "Kaggle", href: "https://www.kaggle.com/s00980" },
  { label: "YouTube", href: "https://www.youtube.com/@shivamdubey3798" },
  { label: "LeetCode", href: "https://leetcode.com/u/shivvam2002/" }
];

export const skills = [
  { name: "Python", level: 96 },
  { name: "Machine Learning", level: 92 },
  { name: "Deep Learning", level: 88 },
  { name: "NLP", level: 90 },
  { name: "LangChain", level: 94 },
  { name: "RAG", level: 93 },
  { name: "LLMs", level: 91 },
  { name: "Groq API", level: 90 },
  { name: "FAISS", level: 89 },
  { name: "Vector DBs", level: 88 },
  { name: "Streamlit", level: 94 },
  { name: "FastAPI", level: 82 }
];

export const timeline: TimelineItem[] = [
  {
    year: "Apr 2026 - Present",
    title: "Artificial Intelligence Engineer",
    org: "Recruweb · Noida",
    desc: "Building production AI workflows and applied solutions.",
    responsibilities: [
      "Developing end-to-end AI workflows for talent acquisition systems.",
      "Optimizing LLM prompts and retrieval accuracy for automated screening.",
      "Collaborating on product-level AI integration and deployment."
    ],
    tech: ["Python", "LangChain", "OpenAI API", "Vector Databases", "FastAPI"]
  },
  {
    year: "Sep 2024 - Jan 2025",
    title: "Data Science with GenAI Intern",
    org: "Innomatics Research Labs · Hyderabad",
    desc: "Built multimodal accessibility AI and RAG systems.",
    responsibilities: [
      "Architected a Multimodal RAG system for diverse document formats.",
      "Created accessibility tools using computer vision and speech synthesis.",
      "Conducted benchmarking of various LLMs for specialized domain tasks."
    ],
    tech: ["GenAI", "LangChain", "PyTorch", "Streamlit", "FAISS", "Whisper"]
  },
  {
    year: "Feb 2024 - Apr 2024",
    title: "AI / ML Intern",
    org: "Antihak Ai Cybersecurity Pvt Ltd · Greater Noida",
    desc: "Developed OCR-based transaction monitoring and fraud detection pipelines.",
    responsibilities: [
      "Engineered high-accuracy OCR pipelines for financial document processing.",
      "Implemented anomaly detection algorithms for fraud identification.",
      "Reduced manual verification time by automating data extraction flows."
    ],
    tech: ["OCR", "Tesseract", "Scikit-Learn", "Python", "OpenCV"]
  },
  {
    year: "Dec 2023 - Feb 2024",
    title: "Data Science Intern",
    org: "Suvidha Foundation · Nagpur",
    desc: "Worked on transformer-based summarization and preprocessing pipelines.",
    responsibilities: [
      "Fine-tuned transformer models for abstractive text summarization.",
      "Processed large-scale datasets for training sentiment analysis models.",
      "Designed visualization dashboards for model performance metrics."
    ],
    tech: ["Transformers", "NLTK", "Pandas", "Matplotlib", "Python"]
  }
];

export const certifications = [
  "Microsoft Learn AI Skill Challenges",
  "Advance Data Analysis Internship Certification",
  "Complete Machine Learning & Data Science Program (6 months)",
  "Advanced ML Gen AI",
  "Career Essentials in Data Analysis by Microsoft and LinkedIn"
];

export const blogs = [
  {
    title: "RAG vs Fine-Tuning vs Agentic RAG: When to Use What in AI Systems",
    href: "https://medium.com/@shivvam2002/rag-vs-fine-tuning-vs-agentic-rag-when-to-use-what-in-ai-systems-d67d1d85b34a"
  },
  {
    title: "Evolution of Language Representation Techniques: A Journey from BoW to GPT",
    href: "https://medium.com/@shivvam2002/evolution-of-language-representation-techniques-a-journey-from-bow-to-gpt-c472c285d532"
  },
  {
    title: "The Rise of Large Language Models: From Hype to Real-World Impact",
    href: "https://medium.com/@shivvam2002/the-rise-of-large-language-models-from-hype-to-real-world-impact-767a55282168"
  }
];

export const projectsSeed: ProjectItem[] = [
  {
    id: "voiceiq",
    title: "VoiceIQ — AI Voice Assistant Pipeline",
    category: "GenAI",
    summary: "Speech-to-text, LLM reasoning, and TTS in a modular low-latency pipeline.",
    tech: ["Whisper", "Groq API", "LLaMA 3.1", "gTTS", "Streamlit"],
    github: "https://github.com/Dubeyrock/voice-ai-pipeline",
    demo: "https://bgn8srjiwytnmstra3pfdf.streamlit.app/",
    highlight: "No all-in-one assistant API used.",
    image: "/projects/voiceiq.png"
  },
  {
    id: "calling-assistant",
    title: "AI-Powered Voice Calling & Assistant System",
    category: "Voice AI",
    summary: "Omnichannel assistant with web UI and telephony integration.",
    tech: ["FreeSWITCH", "Whisper", "Groq", "ElevenLabs", "Redis"],
    github: "https://github.com/Dubeyrock/ai_calling_assistant",
    highlight: "Supports call flows and admin monitoring.",
    image: "/projects/calling-assistant.png"
  },
  {
    id: "rag",
    title: "Advanced RAG System with LangChain & Groq",
    category: "RAG",
    summary: "Document Q&A pipeline with multi-format ingestion and FAISS retrieval.",
    tech: ["LangChain", "FAISS", "Groq", "Python"],
    github: "https://github.com/Dubeyrock/---Advanced---RAG---System---with--LangChain----Groq-API..",
    highlight: "Persistent embeddings with smart chunking.",
    image: "/projects/rag.png"
  },
  {
    id: "visually-impaired",
    title: "AI Assistive Tool for Visually Impaired",
    category: "Computer Vision",
    summary: "Scene understanding, OCR, object detection, and audio assistance.",
    tech: ["Streamlit", "Gemini", "Tesseract", "OpenCV", "YOLO"],
    github: "https://github.com/Dubeyrock/AI-Powered-Solution-for-Assisting-Visually-Impaired-Individuals.",
    demo: "https://ai-powered-solution-for-assisting-visually-impaired-individual.streamlit.app/",
    highlight: "Accessibility-first AI solution.",
    image: "/projects/visually-impaired.png"
  },
  {
    id: "cricket",
    title: "Cricket Analytics Dashboard",
    category: "Computer Vision",
    summary: "Player and ball detection with heatmaps, tactical maps, and stats.",
    tech: ["YOLOv8", "Streamlit", "OpenCV", "Python"],
    github: "https://github.com/Dubeyrock/Cricket-Sports-Analytics_computerVision",
    highlight: "Recruiter-friendly analytics and export features.",
    image: "/projects/cricket.png"
  },
  {
    id: "code-reviewer",
    title: "AI-Powered Code Reviewer",
    category: "GenAI",
    summary: "AI tool to review code, identify bugs, and propose fixes.",
    tech: ["Generative AI", "Python", "Streamlit"],
    github: "https://github.com/Dubeyrock/GenAI-App-AI-Code-Reviewer",
    demo: "https://m2w6epek2n32glgsdbxxvp.streamlit.app/",
    highlight: "Fast feedback on code quality.",
    image: "/projects/code-reviewer.png"
  }
];
