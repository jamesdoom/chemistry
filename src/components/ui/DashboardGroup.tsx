import { useEffect, useRef, useState, type ReactNode } from "react";
export function DashboardGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [initialOpen] = useState(
    () => window.matchMedia("(min-width: 641px)").matches,
  );
  const details = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 641px)");
    // Let native details handle taps/keyboard. Only a breakpoint change resets its default.
    const update = () => {
      if (details.current) details.current.open = query.matches;
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return (
    <details ref={details} className="dashboard-group" open={initialOpen}>
      <summary>{title}</summary>
      <div className="dashboard-group-content">{children}</div>
    </details>
  );
}
