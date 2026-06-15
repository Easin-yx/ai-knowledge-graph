import { useState } from "react";
import type { NodeTypeStyle } from "../constants/theme";

interface LegendProps {
  styles: Record<string, NodeTypeStyle>;
  order: string[];
}

function LegendDots({ styles, order }: LegendProps) {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {order.map((type) => {
        const item = styles[type];
        if (!item) return null;
        return (
          <li key={type} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full ring-1 ring-white/40"
              style={{ backgroundColor: item.base }}
            />
            <span className="text-xs text-[var(--akg-text)]">{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
}

/** 桌面端：底部常驻图例栏 */
export function LegendBar({ styles, order }: LegendProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 hidden justify-center px-4 md:flex">
      <div className="glass glass-highlight pointer-events-auto rounded-2xl px-5 py-2.5">
        <LegendDots styles={styles} order={order} />
      </div>
    </div>
  );
}

/** 移动端：右下角浮动按钮，点击弹出图例 */
export function LegendFab({ styles, order }: LegendProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute bottom-4 right-4 z-20 flex flex-col items-end gap-2 md:hidden">
      {open && (
        <div className="glass glass-highlight akg-fade-in rounded-2xl px-4 py-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--akg-text-dim)]">
            节点类型
          </p>
          <ul className="flex flex-col gap-2">
            {order.map((type) => {
              const item = styles[type];
              if (!item) return null;
              return (
                <li key={type} className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full ring-1 ring-white/40"
                    style={{ backgroundColor: item.base }}
                  />
                  <span className="text-sm text-[var(--akg-text)]">
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="图例"
        aria-expanded={open}
        className="glass glass-highlight flex h-11 w-11 items-center justify-center rounded-full text-[var(--akg-text)] transition active:scale-95"
      >
        {open ? <CloseIcon /> : <InfoIcon />}
      </button>
    </div>
  );
}

function InfoIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
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
