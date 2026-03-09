"use client";

import { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  MarkerType,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
} from "reactflow";
import "reactflow/dist/style.css";

// We use the ISRO CS syllabus (Operating Systems) to prove the AI handles rigorous subjects
const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 250, y: 50 },
    data: { label: "Computer Architecture (Mastered)" },
    style: {
      background: "rgba(16, 185, 129, 0.1)", // Emerald tint
      color: "#34d399",
      border: "1px solid rgba(16, 185, 129, 0.5)",
      borderRadius: "8px",
      padding: "12px",
      fontWeight: "bold",
    },
  },
  {
    id: "2",
    position: { x: 250, y: 150 },
    data: { label: "Memory Hierarchy" },
    style: {
      background: "rgba(59, 130, 246, 0.1)", // Blue tint
      color: "#60a5fa",
      border: "1px solid rgba(59, 130, 246, 0.5)",
      borderRadius: "8px",
      padding: "12px",
    },
  },
  {
    id: "3",
    position: { x: 250, y: 250 },
    data: { label: "Operating Systems (Current)" },
    style: {
      background: "rgba(168, 85, 247, 0.1)", // Purple tint
      color: "#c084fc",
      border: "1px solid rgba(168, 85, 247, 0.5)",
      borderRadius: "8px",
      padding: "12px",
    },
  },
  {
    id: "4",
    position: { x: 250, y: 350 },
    data: { label: "Paging & Segmentation (Failed Concept)" },
    style: {
      background: "rgba(239, 68, 68, 0.1)", // Red tint
      color: "#f87171",
      border: "2px solid rgba(239, 68, 68, 0.8)",
      borderRadius: "8px",
      padding: "12px",
      fontWeight: "bold",
      boxShadow: "0 0 15px rgba(239, 68, 68, 0.3)", // Glowing effect
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    style: { stroke: "#34d399", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#34d399" },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
    style: { stroke: "#60a5fa", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#60a5fa" },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
    style: { stroke: "#f87171", strokeWidth: 3 }, // Thicker red line pointing to the failure
    markerEnd: { type: MarkerType.ArrowClosed, color: "#f87171" },
  },
];

export default function ConceptGraph() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  return (
    <div className="w-full h-[500px] bg-neutral-950/50 border border-white/10 rounded-2xl overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10 bg-black/60 px-3 py-1 rounded-full border border-white/10 text-xs text-neutral-400 backdrop-blur-md">
        Cognitive Dependency Map
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        className="dark">
        <Background color="#333" gap={16} size={1} />
        <Controls className="bg-neutral-900 border-white/10 fill-white" />
      </ReactFlow>
    </div>
  );
}
