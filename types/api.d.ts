// types/api.d.ts
import { CSSProperties } from "react";

/**
 * 🤖 UPASANA <---> 🎨 PRIYANSHU : STUDENT MODE CONTRACT
 */
export interface LearningDNA {
  type: string;
  description: string;
}

export interface PredictedQuestion {
  topic: string;
  question: string;
}

export interface GPSTask {
  week: number;
  focus: string;
  tasks: string[];
}

export interface AIStudentResponse {
  studentInsights: {
    academicHealthScore: number; // 0-100
    examProbability: number;     // 0-100
    learningDNA: LearningDNA;
    careerEngine: string[];      // e.g., ["Data Scientist", "Cloud Architect"]
  };
  predictedBoardQuestions: PredictedQuestion[];
  academicGPS: GPSTask[];
}


/**
 * 🤖 UPASANA <---> 🎨 PRIYANSHU : TEACHER MODE CONTRACT
 */
export interface AtRiskStudent {
  name: string;
  riskFactor: string; // e.g., "Failing prerequisites in Memory Management"
  recommendedAction: string;
}

export interface AITeacherRadarResponse {
  flaggedStudents: AtRiskStudent[];
  classInterventionStrategy: string;
}


/**
 * 🤖 UPASANA <---> 🕸️ PRANTIK : GRAPH VIZ CONTRACT
 * Prantik will use these to type his ReactFlow nodes and edges.
 */
export interface GraphNodeData {
  label: string;
}

export interface GraphNode {
  id: string;
  position: { x: number; y: number }; // Hardcoded coordinates for the 24-hour MVP
  data: GraphNodeData;
  style?: CSSProperties; // Allows passing Tailwind hex colors for glowing effects
}

export interface GraphEdge {
  id: string;
  source: string; // ID of the parent node
  target: string; // ID of the child node
  animated?: boolean;
  style?: CSSProperties;
}