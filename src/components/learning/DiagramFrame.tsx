import type { ReactNode } from "react";
export function DiagramFrame({
  label,
  children,
  compact = false,
}: {
  label: string;
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <>
      <p className="diagram-scroll-hint">
        Swipe sideways if needed to read all diagram labels.
      </p>
      <div
        className={`diagram-scroll ${compact ? "diagram-compact" : ""}`}
        role="region"
        aria-label={label}
        tabIndex={0}
      >
        {children}
      </div>
    </>
  );
}
