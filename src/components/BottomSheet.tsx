import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { KnowledgeNode } from "../types";
import type { NodeTypeStyle } from "../constants/theme";
import { NodeDetailContent, type Neighbor } from "./NodeDetailContent";

interface BottomSheetProps {
  node: KnowledgeNode | null;
  neighbors: Neighbor[];
  onClose: () => void;
  onSelectNeighbor: (node: KnowledgeNode) => void;
  onCollapse: () => void;
  canCollapse: boolean;
  typeStyles: Record<string, NodeTypeStyle>;
  typeOrder: string[];
  perspectiveLabels?: { front: string; back: string; frontHint?: string; backHint?: string };
}

type Snap = "default" | "full";

export function BottomSheet({
  node,
  neighbors,
  onClose,
  onSelectNeighbor,
  onCollapse,
  canCollapse,
  typeStyles,
  typeOrder,
  perspectiveLabels,
}: BottomSheetProps) {
  const open = node !== null;
  const [snap, setSnap] = useState<Snap>("default");
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startY = useRef(0);

  // 每次打开新节点时回到默认高度
  useEffect(() => {
    if (open) {
      setSnap("default");
      setDragY(0);
    }
  }, [node, open]);

  const onPointerDown = useCallback((e: ReactPointerEvent) => {
    setDragging(true);
    startY.current = e.clientY;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: ReactPointerEvent) => {
      if (!dragging) return;
      setDragY(e.clientY - startY.current);
    },
    [dragging]
  );

  const onPointerUp = useCallback(() => {
    if (!dragging) return;
    setDragging(false);
    const delta = dragY;
    setDragY(0);
    if (delta > 90) {
      // 向下拖：全屏→默认，默认→关闭
      if (snap === "full") setSnap("default");
      else onClose();
    } else if (delta < -60) {
      setSnap("full");
    }
  }, [dragging, dragY, snap, onClose]);

  const heightVh = snap === "full" ? 92 : 60;
  const translate = open ? Math.max(0, dragY) : window.innerHeight;

  return (
    <>
      {/* 背景遮罩，点击关闭 */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`absolute inset-0 z-30 bg-black/30 transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <section
        aria-hidden={!open}
        role="dialog"
        className={`glass-strong glass-highlight absolute inset-x-0 bottom-0 z-40 flex flex-col rounded-t-3xl ${
          dragging ? "" : "transition-transform duration-300 ease-out"
        }`}
        style={{
          height: `${heightVh}vh`,
          transform: `translateY(${translate}px)`,
        }}
      >
        {/* 拖拽把手区 */}
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="flex shrink-0 cursor-grab touch-none flex-col items-center gap-1 px-4 pb-2 pt-3 active:cursor-grabbing"
        >
          <span className="h-1.5 w-10 rounded-full bg-white/30" />
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="关闭"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--glass-border)] bg-white/5 text-[var(--akg-text)] transition active:scale-95"
        >
          <CloseIcon />
        </button>

        <div
          className="akg-scroll flex-1 overflow-y-auto px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2"
          style={{ overscrollBehavior: "contain" }}
        >
          {node && (
            <NodeDetailContent
              key={node.id}
              node={node}
              neighbors={neighbors}
              onSelectNeighbor={onSelectNeighbor}
              onCollapse={onCollapse}
              canCollapse={canCollapse}
              typeStyles={typeStyles}
              typeOrder={typeOrder}
              perspectiveLabels={perspectiveLabels}
            />
          )}
        </div>
      </section>
    </>
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
