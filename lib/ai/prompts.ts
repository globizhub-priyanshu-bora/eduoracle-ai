export const STUDENT_INSIGHTS_PROMPT = (targetExam: string, weakSubjects: string[]) => `
  You are EduGlobiz, an advanced predictive educational data engine.
  Analyze this student's profile:
  Target Exam: ${targetExam}
  Recent Failure/Weakness: ${weakSubjects.join(", ")}

  Generate a predictive academic profile. Return ONLY a valid JSON object matching this exact schema. Do NOT wrap it in markdown block quotes.
  {
    "studentInsights": {
      "academicHealthScore": Number (0-100),
      "examProbability": Number (0-100),
      "learningDNA": { "type": String, "description": String },
      "careerEngine": [String, String, String]
    },
    "predictedBoardQuestions": [
      { "topic": String, "question": String },
      { "topic": String, "question": String }
    ],
    "academicGPS": [
      { "week": Number, "focus": String, "tasks": [String, String] },
      { "week": Number, "focus": String, "tasks": [String, String] }
    ]
  }
`;

export const TEACHER_RADAR_PROMPT = `
  Analyze the provided JSON array of class test scores.
  Identify 2 students who are currently passing but show a downward cognitive trajectory.
  Return a JSON object with their names, risk factors, and a 1-paragraph intervention strategy.
`;