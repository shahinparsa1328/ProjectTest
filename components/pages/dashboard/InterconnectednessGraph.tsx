
import React, { useState, useMemo } from 'react';
import { toPersianDigits } from '../../../utils';

export interface DomainNodeData {
  id: string;
  label: string;
  color: string; // Tailwind bg color class e.g., 'bg-blue-500'
  isCentral?: boolean;
}

export interface ConnectionData {
  sourceId: string;
  targetId: string;
  strength: number; // e.g., 1-3 for line thickness or opacity
}

export interface CorrelationExplanation {
    title: string;
    text: string;
    relatedDomains: string[];
}

export type CorrelationExplanationData = Record<string, CorrelationExplanation>;


interface InterconnectednessGraphProps {
  domains: DomainNodeData[];
  connections: ConnectionData[];
  explanations: CorrelationExplanationData;
}

const NODE_RADIUS = 35;
const CENTRAL_NODE_RADIUS = 45;
const CANVAS_WIDTH = 360; // Adjusted for typical mobile width, can be responsive
const CANVAS_HEIGHT = 300; // Increased height for better spacing

const InterconnectednessGraph: React.FC<InterconnectednessGraphProps> = ({ domains, connections, explanations }) => {
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null);

  const centralNode = domains.find(d => d.isCentral);
  const peripheralNodes = domains.filter(d => !d.isCentral);

  // Simple circular layout for peripheral nodes
  const nodePositions = useMemo(() => {
    const positions: Record<string, { x: number; y: number; radius: number }> = {};
    if (centralNode) {
      positions[centralNode.id] = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, radius: CENTRAL_NODE_RADIUS };
    }

    const angleStep = (2 * Math.PI) / peripheralNodes.length;
    const orbitRadius = Math.min(CANVAS_WIDTH, CANVAS_HEIGHT) / 2 - NODE_RADIUS - 30; // Adjusted orbitRadius

    peripheralNodes.forEach((node, index) => {
      const angle = angleStep * index - Math.PI / 2; // Start from top
      positions[node.id] = {
        x: (CANVAS_WIDTH / 2) + orbitRadius * Math.cos(angle),
        y: (CANVAS_HEIGHT / 2) + orbitRadius * Math.sin(angle),
        radius: NODE_RADIUS,
      };
    });
    return positions;
  }, [domains, centralNode, peripheralNodes]);

  const handleNodeClick = (domainId: string) => {
    setSelectedDomainId(prevId => prevId === domainId ? null : domainId);
  };
  
  const currentExplanation = selectedDomainId ? explanations[selectedDomainId] : null;

  const getLineOpacity = (sourceId: string, targetId: string) => {
    if (!selectedDomainId) return 'opacity-50'; // Default opacity
    if (sourceId === selectedDomainId || targetId === selectedDomainId) return 'opacity-100';
    // If a related domain of the selected one is part of the connection
    if (currentExplanation?.relatedDomains.includes(sourceId) || currentExplanation?.relatedDomains.includes(targetId)) {
         if (explanations[selectedDomainId]?.relatedDomains.includes(sourceId === selectedDomainId ? targetId : sourceId)) {
            return 'opacity-75'; // Slightly less emphasis for secondary connections
         }
    }
    return 'opacity-20'; // Dim unselected/unrelated connections
  };
  
  const getNodeColor = (node: DomainNodeData) => {
    if (selectedDomainId === node.id) return 'ring-2 ring-offset-2 ring-offset-slate-800 ring-white';
    if (selectedDomainId && currentExplanation?.relatedDomains.includes(node.id)) return 'ring-1 ring-offset-1 ring-offset-slate-800 ring-slate-400';
    return '';
  };


  return (
    <div className="flex flex-col items-center space-y-4">
      <svg width={CANVAS_WIDTH} height={CANVAS_HEIGHT} viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`} className="overflow-visible">
        {/* Lines (Connections) */}
        {connections.map((conn, index) => {
          const sourcePos = nodePositions[conn.sourceId];
          const targetPos = nodePositions[conn.targetId];
          if (!sourcePos || !targetPos) return null;
          
          const lineOpacityClass = getLineOpacity(conn.sourceId, conn.targetId);

          return (
            <line
              key={`conn-${index}`}
              x1={sourcePos.x}
              y1={sourcePos.y}
              x2={targetPos.x}
              y2={targetPos.y}
              strokeWidth={selectedDomainId && (conn.sourceId === selectedDomainId || conn.targetId === selectedDomainId) ? conn.strength * 1.5 : conn.strength}
              className={`stroke-current text-slate-500 transition-opacity duration-300 ${lineOpacityClass}`}
            />
          );
        })}

        {/* Nodes (Domains) */}
        {domains.map(node => {
          const pos = nodePositions[node.id];
          if (!pos) return null;
          const colorClass = node.color.replace('bg-', 'fill-'); // Convert bg to fill for SVG
          const ringClass = getNodeColor(node);

          return (
            <g key={node.id} transform={`translate(${pos.x}, ${pos.y})`} onClick={() => handleNodeClick(node.id)} className="cursor-pointer group">
              <circle
                cx="0"
                cy="0"
                r={pos.radius}
                className={`${colorClass} transition-all duration-300 group-hover:opacity-80 ${selectedDomainId === node.id ? 'opacity-100' : 'opacity-90'}`}
              />
              {ringClass && <circle cx="0" cy="0" r={pos.radius + 2} className={`fill-none ${ringClass.replace('ring-offset-slate-800', 'stroke-slate-800').replace(/ring-(\w+)/, 'stroke-$1')}`} strokeWidth={ringClass.includes('ring-2') ? 2 : 1.5} />}

              <text
                textAnchor="middle"
                dy=".3em"
                className={`fill-white text-[10px] font-medium transition-all duration-300 ${selectedDomainId === node.id ? 'font-bold' : ''}`}
              >
                {toPersianDigits(node.label)}
              </text>
            </g>
          );
        })}
      </svg>

      {currentExplanation && (
        <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600 w-full max-w-xs text-center">
          <h4 className="text-sm font-semibold text-sky-300 mb-1">{toPersianDigits(currentExplanation.title)}</h4>
          <p className="text-xs text-gray-300 leading-relaxed">{toPersianDigits(currentExplanation.text)}</p>
        </div>
      )}
       {!selectedDomainId && (
         <p className="text-xs text-gray-500 text-center mt-2">{toPersianDigits("روی یک حوزه کلیک کنید تا ارتباطات آن را مشاهده نمایید.")}</p>
       )}
    </div>
  );
};

export default InterconnectednessGraph;
