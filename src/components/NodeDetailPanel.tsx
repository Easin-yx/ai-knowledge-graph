import type { KnowledgeNode } from "../types";
import { NodeDetailContent, type Neighbor } from "./NodeDetailContent";

interface NodeDetailPanelProps {
  node: KnowledgeNode | null;
  neighbors: Neighbor[];
  onClose: () => void;
  onSelectNeighbor: (node: KnowledgeNode) => void;
  onCollapse: () => void;
  canCollapse: boolean;
}

export function NodeDetailPanel({
  node,
  neighbors,
  onClose,
  onSelectNeighbor,
  onCollapse,
  canCollapse,
}: NodeDetailPanelProps) {
  const open = node !== null;

  return (
    <aside
      aria-hidden={!open}
      className={`glass glass-highlight absolute right-3 top-20 bottom-3 z-20 flex w-[340px] flex-col overflow-hidden rounded-2xl transition-all duration-300 ease-out ${
        open
          ? "pointer-events-auto translate-x-0 opacity-100"
          : "pointer-events-none translate-x-[calc(100%+1.5rem)] opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="关闭详情面板（Esc）"
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--glass-border)] bg-white/5 text-[var(--akg-text)] transition hover:bg-white/15 active:scale-95"
      >
        <CloseIcon />
      </button>

      <div className="akg-scroll flex-1 overflow-y-auto px-5 py-6">
        {node && (
          <NodeDetailContent
            key={node.id}
            node={node}
            neighbors={neighbors}
            onSelectNeighbor={onSelectNeighbor}
            onCollapse={onCollapse}
            canCollapse={canCollapse}
          />
        )}
      </div>
    </aside>
  );
}


function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
