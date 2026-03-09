"use client";

import { useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  MarkerType,
  Handle,
  Position,
  Node,
  Edge,
} from "reactflow";
import { BrainCircuit, AlertCircle, CheckCircle2, Target } from "lucide-react";

// @ts-ignore - Bypassing strict TS for CSS import during the 24hr MVP sprint
import "reactflow/dist/style.css";

// --------------------------------------------------------
// 1. CUSTOM NODE COMPONENT (The Glassmorphic UI)
// --------------------------------------------------------
const CustomConceptNode = ({
  data,
}: {
  data: { label: string; status: "mastered" | "current" | "failed" };
}) => {
  let borderStyle = "";
  let bgStyle = "";
  let icon = null;

  // Enforcing the exact glowing border logic from the PRD
  switch (data.status) {
    case "mastered":
      borderStyle =
        "border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]";
      bgStyle = "bg-emerald-500/10 text-emerald-400";
      icon = <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      break;
    case "current":
      borderStyle =
        "border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.25)]";
      bgStyle = "bg-blue-500/10 text-blue-400";
      icon = <Target className="w-4 h-4 text-blue-400" />;
      break;
    case "failed":
      borderStyle =
        "border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)] animate-pulse";
      bgStyle = "bg-red-500/10 text-red-400 font-bold";
      icon = <AlertCircle className="w-4 h-4 text-red-400" />;
      break;
  }

  return (
    <div
      className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 backdrop-blur-xl ${borderStyle} ${bgStyle} min-w-[220px]`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-neutral-800 border-2 border-neutral-400 rounded-full"
      />
      {icon}
      <div className="text-sm tracking-wide">{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-neutral-800 border-2 border-neutral-400 rounded-full"
      />
    </div>
  );
};

// --------------------------------------------------------
// 2. HARDCODED GRAPH DATA (ISRO SC Demo Context)
// --------------------------------------------------------
const initialNodes: Node[] = [
  {
    id: "os-core",
    type: "concept",
    position: { x: 250, y: 0 },
    data: { label: "Operating Systems (Core)", status: "mastered" },
  },
  {
    id: "mem-mgmt",
    type: "concept",
    position: { x: 250, y: 120 },
    data: { label: "Memory Management", status: "mastered" },
  },
  {
    id: "virtual-mem",
    type: "concept",
    position: { x: 250, y: 240 },
    data: { label: "Virtual Memory", status: "current" },
  },
  {
    id: "page-repl",
    type: "concept",
    position: { x: 50, y: 380 },
    data: { label: "Replacement Algorithms", status: "mastered" },
  },
  {
    id: "paging-seg",
    type: "concept",
    position: { x: 450, y: 380 },
    data: { label: "Paging & Segmentation", status: "failed" }, // The missing prerequisite
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1",
    source: "os-core",
    target: "mem-mgmt",
    style: { stroke: "#34d399", strokeWidth: 2 },
    animated: true,
  },
  {
    id: "e2",
    source: "mem-mgmt",
    target: "virtual-mem",
    style: { stroke: "#34d399", strokeWidth: 2 },
    animated: true,
  },
  {
    id: "e3",
    source: "virtual-mem",
    target: "page-repl",
    style: { stroke: "#60a5fa", strokeWidth: 2 },
  },
  // The critical red failure trace
  {
    id: "e4",
    source: "virtual-mem",
    target: "paging-seg",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 3, strokeDasharray: "5,5" },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#ef4444",
      width: 20,
      height: 20,
    },
  },
];

// --------------------------------------------------------
// 3. MAIN COMPONENT EXPORT
// --------------------------------------------------------
export default function ConceptGraph() {
  // Memoize nodeTypes so ReactFlow doesn't re-render them constantly
  const nodeTypes = useMemo(() => ({ concept: CustomConceptNode }), []);

  return (
    <div className="w-full h-[600px] bg-neutral-950/80 border border-white/10 rounded-2xl overflow-hidden relative shadow-2xl">
      {/* Floating UI Legend */}
      <div className="absolute top-6 left-6 z-10 bg-neutral-900/80 p-5 rounded-xl border border-white/10 backdrop-blur-xl shadow-xl">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-purple-400" />
          AI Dependency Trace
        </h3>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center gap-3 text-emerald-400">
            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
            Mastered Domain
          </div>
          <div className="flex items-center gap-3 text-blue-400">
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
            Current Target Topic
          </div>
          <div className="flex items-center gap-3 text-red-400 font-medium">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,1)]"></div>
            Root Cause: Missing Prerequisite
          </div>
        </div>
      </div>

      {/* ReactFlow Canvas */}
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        className="bg-transparent"
        minZoom={0.5}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }} // Hides the ReactFlow watermark for a cleaner look
      >
        <Background color="#ffffff" gap={24} size={1} style={{ opacity: 0.05 }} />
        <Controls
          className="fill-white bg-neutral-900/80 border-white/10 backdrop-blur-md rounded-lg overflow-hidden shadow-lg"
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
}
