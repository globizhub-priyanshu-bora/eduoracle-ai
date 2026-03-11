"use client";

import { useMemo, useState, useCallback, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  MarkerType,
  Handle,
  Position,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ReactFlowProvider,
  useReactFlow,
  NodeProps,
} from "reactflow";
import { 
  BrainCircuit, 
  AlertCircle, 
  CheckCircle2, 
  Target, 
  Link as LinkIcon, 
  Unlink, 
  Plus, 
  Trash2,
  X // Imported X for the delete button
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// @ts-ignore
import "reactflow/dist/style.css";

// --------------------------------------------------------
// 1. CUSTOM NODE COMPONENT (Now with Delete Button)
// --------------------------------------------------------
const CustomConceptNode = ({
  id,
  data,
}: NodeProps) => {
  // We use this hook to safely delete the node from the graph state
  const { deleteElements } = useReactFlow();
  
  let borderStyle = "";
  let bgStyle = "";
  let icon = null;

  switch (data.status) {
    case "mastered":
      borderStyle = "border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]";
      bgStyle = "bg-emerald-500/10 text-emerald-400";
      icon = <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
      break;
    case "current":
      borderStyle = "border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.25)]";
      bgStyle = "bg-blue-500/10 text-blue-400";
      icon = <Target className="w-4 h-4 text-blue-400 shrink-0" />;
      break;
    case "failed":
      borderStyle = "border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)] animate-pulse";
      bgStyle = "bg-red-500/10 text-red-400 font-bold";
      icon = <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />;
      break;
    case "new":
      borderStyle = "border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]";
      bgStyle = "bg-purple-500/10 text-purple-300 font-medium";
      icon = <BrainCircuit className="w-4 h-4 text-purple-400 shrink-0" />;
      break;
  }

  return (
    <div className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 backdrop-blur-xl ${borderStyle} ${bgStyle} min-w-[180px] max-w-[250px] relative group`}>
      
      {/* 🔴 NEW: Visual Delete Button (Appears on Hover) 🔴 */}
      <button 
        onClick={() => deleteElements({ nodes: [{ id }] })}
        className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 z-50"
      >
        <X className="w-3 h-3" />
      </button>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-neutral-800 border-2 border-white hover:bg-blue-400 transition-colors rounded-full"
      />
      {icon}
      <div className="text-sm tracking-wide break-words">{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-neutral-800 border-2 border-white hover:bg-blue-400 transition-colors rounded-full"
      />
    </div>
  );
};

// --------------------------------------------------------
// 2. INITIAL GRAPH DATA
// --------------------------------------------------------
const initialNodes: Node[] = [
  { id: "os-core", type: "concept", position: { x: 250, y: 0 }, data: { label: "Operating Systems (Core)", status: "mastered" } },
  { id: "mem-mgmt", type: "concept", position: { x: 250, y: 120 }, data: { label: "Memory Management", status: "mastered" } },
  { id: "virtual-mem", type: "concept", position: { x: 250, y: 240 }, data: { label: "Virtual Memory", status: "current" } },
  { id: "page-repl", type: "concept", position: { x: 50, y: 380 }, data: { label: "Replacement Algorithms", status: "mastered" } },
  { id: "paging-seg", type: "concept", position: { x: 450, y: 380 }, data: { label: "Paging & Segmentation", status: "failed" } },
];

const initialEdges: Edge[] = [
  { id: "e1", source: "os-core", target: "mem-mgmt", style: { stroke: "#34d399", strokeWidth: 2 }, animated: true },
  { id: "e2", source: "mem-mgmt", target: "virtual-mem", style: { stroke: "#34d399", strokeWidth: 2 }, animated: true },
  { id: "e3", source: "virtual-mem", target: "page-repl", style: { stroke: "#60a5fa", strokeWidth: 2 } },
  {
    id: "e4", source: "virtual-mem", target: "paging-seg", animated: true,
    style: { stroke: "#ef4444", strokeWidth: 3, strokeDasharray: "5,5" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#ef4444", width: 20, height: 20 },
  },
];

// --------------------------------------------------------
// 3. MAIN COMPONENT EXPORT
// --------------------------------------------------------
function FlowGraph() {
  const nodeTypes = useMemo(() => ({ concept: CustomConceptNode }), []);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [outcomeMsg, setOutcomeMsg] = useState<{ text: string, type: "connect" | "disconnect" | "add" | "delete" } | null>(null);
  
  const [newNodeName, setNewNodeName] = useState("");
  const graphRef = useRef<HTMLDivElement>(null);

  const showOutcome = (text: string, type: "connect" | "disconnect" | "add" | "delete") => {
    setOutcomeMsg({ text, type });
    setTimeout(() => setOutcomeMsg(null), 3000);
  };

  const onConnect = useCallback((params: Connection) => {
    showOutcome("Cognitive Link Established!", "connect");
    setEdges((eds) => addEdge({ 
      ...params, 
      animated: true, 
      style: { stroke: "#a855f7", strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: "#a855f7" }
    }, eds));
  }, [setEdges]);

  const onEdgesDelete = useCallback(() => {
    showOutcome("Cognitive Link Severed.", "disconnect");
  }, []);

  // Automatically triggers when the 'X' button on a node is clicked
  const onNodesDelete = useCallback(() => {
    showOutcome("Concept Purged from Graph.", "delete");
  }, []);

  const handleAddNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNodeName.trim()) return;

    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: "concept",
      position: { x: 250, y: 150 },
      data: { label: newNodeName, status: "new" },
    };

    setNodes((nds) => [...nds, newNode]);
    setNewNodeName("");
    showOutcome("New Concept Injected.", "add");
  };

  return (
    <div className="w-full h-[600px] bg-neutral-950/80 border border-white/10 rounded-2xl overflow-hidden relative shadow-2xl" ref={graphRef}>
      
      {/* 🌟 DYNAMIC OUTCOME TOAST 🌟 */}
      <AnimatePresence>
        {outcomeMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className={`absolute top-6 left-1/2 z-50 px-6 py-3 rounded-full border shadow-2xl flex items-center gap-3 backdrop-blur-md font-medium tracking-wide
              ${(outcomeMsg.type === "connect" || outcomeMsg.type === "add")
                ? "bg-purple-500/20 border-purple-500/50 text-purple-300" 
                : "bg-red-500/20 border-red-500/50 text-red-300"}`}
          >
            {outcomeMsg.type === "connect" && <LinkIcon className="w-4 h-4" />}
            {outcomeMsg.type === "disconnect" && <Unlink className="w-4 h-4" />}
            {outcomeMsg.type === "add" && <Plus className="w-4 h-4" />}
            {outcomeMsg.type === "delete" && <Trash2 className="w-4 h-4" />}
            {outcomeMsg.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚀 DYNAMIC NODE INJECTION TOOLBAR 🚀 */}
      <div className="absolute top-6 right-6 z-10">
        <form 
          onSubmit={handleAddNode}
          className="bg-neutral-900/80 p-2 rounded-xl border border-white/10 backdrop-blur-xl shadow-xl flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Add new concept..."
            value={newNodeName}
            onChange={(e) => setNewNodeName(e.target.value)}
            className="bg-black/50 border border-white/5 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50 w-40 transition-colors"
          />
          <button 
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-lg transition-colors shadow-[0_0_10px_rgba(147,51,234,0.3)]"
          >
            <Plus className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Floating UI Legend */}
      <div className="absolute top-6 left-6 z-10 bg-neutral-900/80 p-5 rounded-xl border border-white/10 backdrop-blur-xl shadow-xl hidden md:block pointer-events-none">
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
          <div className="flex items-center gap-3 text-purple-400 font-medium">
            <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]"></div>
            User Injected Concept
          </div>
          <div className="flex flex-col gap-1 text-neutral-400 font-medium pt-3 border-t border-white/10 mt-1">
             <span className="text-[11px] uppercase tracking-wider text-neutral-500">Controls</span>
             <span className="text-xs">Hover over node to delete. Drag handles to link.</span>
          </div>
        </div>
      </div>

      {/* ReactFlow Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgesDelete={onEdgesDelete}
        onNodesDelete={onNodesDelete}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        className="bg-transparent"
        minZoom={0.5}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#ffffff" gap={24} size={1} style={{ opacity: 0.05 }} />
        
        {/* 🔴 NEW: Fixed CSS for the Zoom Controls using Tailwind Arbitrary Selectors 🔴 */}
        <Controls
          position="bottom-right"
          className="mb-4 mr-4 flex flex-col overflow-hidden rounded-xl shadow-lg border border-white/10 [&>button]:bg-neutral-800 [&>button]:border-b [&>button]:border-neutral-700 hover:[&>button]:bg-neutral-700 [&>button>svg]:fill-black transition-colors text-black"
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
}

// ReactFlow needs to be wrapped in a provider if we are doing complex state management
export default function ConceptGraphWrapper() {
  return (
    <ReactFlowProvider>
      <FlowGraph />
    </ReactFlowProvider>
  );
}