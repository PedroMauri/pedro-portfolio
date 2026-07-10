import { cn } from "@/lib/utils";

type PreviewVariant = "workflow" | "onboarding" | "community";

interface MockUIPreviewProps {
  variant?: PreviewVariant;
  className?: string;
  compact?: boolean;
}

export function MockUIPreview({ variant = "workflow", className, compact = false }: MockUIPreviewProps) {
  if (variant === "onboarding") {
    return (
      <div className={cn("flex h-full flex-col bg-slate-50 p-3", className)}>
        <div className="mb-3 h-2 w-24 rounded bg-slate-300" />
        <div className="space-y-2">
          {["Invite team", "Configure policies", "Connect payroll"].map((item, i) => (
            <div
              key={item}
              className={cn(
                "flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2",
                compact ? "py-1.5" : "py-2.5"
              )}
            >
              <div
                className={cn(
                  "size-4 rounded-full border-2",
                  i === 0 ? "border-emerald-500 bg-emerald-500" : "border-slate-300"
                )}
              />
              <span className={cn("text-slate-600", compact ? "text-[10px]" : "text-xs")}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "community") {
    return (
      <div className={cn("flex h-full flex-col bg-slate-50 p-3", className)}>
        <div className="mb-2 flex gap-2">
          <div className="h-3 w-16 rounded bg-violet-200" />
          <div className="h-3 w-10 rounded bg-slate-200" />
          <div className="h-3 w-10 rounded bg-slate-200" />
        </div>
        <div className="mb-3 grid grid-cols-3 gap-2">
          {["Members", "Topics", "Activity"].map((label) => (
            <div key={label} className="rounded-lg border border-slate-200 bg-white p-2 text-center">
              <div className="mx-auto mb-1 h-2 w-6 rounded bg-violet-300" />
              <span className={cn("text-slate-500", compact ? "text-[9px]" : "text-[10px]")}>{label}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 space-y-2">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-lg border border-slate-200 bg-white p-2">
              <div className="mb-1 h-1.5 w-3/4 rounded bg-slate-300" />
              <div className="h-1 w-full rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex h-full gap-2 bg-slate-50 p-3", className)}>
      <div className="w-2/5 space-y-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-lg border bg-white px-2 py-2",
              i === 1 ? "border-indigo-300 ring-1 ring-indigo-200" : "border-slate-200"
            )}
          >
            <div className="mb-1 h-1.5 w-3/4 rounded bg-slate-300" />
            <div className="h-1 w-1/2 rounded bg-slate-200" />
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-lg border border-slate-200 bg-white p-2">
        <div className="mb-2 flex gap-1">
          <div className="h-4 w-12 rounded bg-indigo-100" />
          <div className="h-4 w-10 rounded bg-slate-100" />
        </div>
        <div className="space-y-1.5">
          <div className="h-2 w-full rounded bg-slate-200" />
          <div className="h-2 w-4/5 rounded bg-slate-100" />
          <div className="mt-3 h-6 w-20 rounded bg-indigo-500" />
        </div>
      </div>
    </div>
  );
}
