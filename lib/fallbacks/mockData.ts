export const fallbackStudentData = {
  studentInsights: {
    academicHealthScore: 72,
    examProbability: 85,
    learningDNA: {
      type: "Visual-Logical Learner",
      description: "Retains complex system architecture best through interactive node graphs and algorithmic step-by-step breakdowns."
    },
    careerEngine: ["Data Scientist", "Cloud Architect", "Systems Engineer"]
  },
  predictedBoardQuestions: [
    { 
      topic: "Operating Systems", 
      question: "Explain the difference between paging and segmentation with examples." 
    },
    { 
      topic: "Data Structures", 
      question: "Write an algorithm to traverse a Binary Search Tree in post-order." 
    }
  ],
  academicGPS: [
    { 
      week: 1, 
      focus: "Core Memory Management", 
      tasks: ["Review Virtual Memory", "Complete 5 Paging numericals"] 
    },
    { 
      week: 2, 
      focus: "Advanced Data Structures", 
      tasks: ["Implement AVL Trees", "Graph traversal mock test"] 
    }
  ]
};



export const mockTeacherRadar = [
  { id: '1', name: 'Rahul Sharma', currentGrade: 'A', predictedOutcome: 'Pass', riskLevel: 'Low', silentStruggler: false },
  { id: '2', name: 'Priya Patel', currentGrade: 'B+', predictedOutcome: 'Pass', riskLevel: 'Low', silentStruggler: false },
  { id: '3', name: 'Amit Singh', currentGrade: 'B-', predictedOutcome: 'Fail', riskLevel: 'Critical', silentStruggler: true },
  { id: '4', name: 'Neha Gupta', currentGrade: 'C', predictedOutcome: 'Fail', riskLevel: 'High', silentStruggler: false },
  { id: '5', name: 'Vikram Das', currentGrade: 'A-', predictedOutcome: 'Fail', riskLevel: 'Critical', silentStruggler: true },
  { id: '6', name: 'Rohan Verma', currentGrade: 'D', predictedOutcome: 'Fail', riskLevel: 'Severe', silentStruggler: false },
  { id: '7', name: 'Anjali Desai', currentGrade: 'A', predictedOutcome: 'Pass', riskLevel: 'Low', silentStruggler: false },
  { id: '8', name: 'Suresh Kumar', currentGrade: 'B', predictedOutcome: 'Pass', riskLevel: 'Low', silentStruggler: false },
  { id: '9', name: 'Kavita Iyer', currentGrade: 'B+', predictedOutcome: 'Fail', riskLevel: 'Critical', silentStruggler: true },
  { id: '10', name: 'Manoj Tiwari', currentGrade: 'C-', predictedOutcome: 'Fail', riskLevel: 'High', silentStruggler: false },
];