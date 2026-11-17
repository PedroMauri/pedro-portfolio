import { Helmet } from "react-helmet-async";
import {
  MAINTENANCE_EYEBROW,
  MAINTENANCE_ROBOTS,
  MAINTENANCE_TITLE,
} from "@/lib/maintenance-mode.mjs";

export default function Maintenance() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f4f9fa] px-8 text-center text-[#0b0b0b]">
      <Helmet htmlAttributes={{ lang: "pt" }}>
        <title>{MAINTENANCE_TITLE}</title>
        <meta name="robots" content={MAINTENANCE_ROBOTS} />
        <meta name="googlebot" content={MAINTENANCE_ROBOTS} />
        <meta name="description" content={`${MAINTENANCE_TITLE}. ${MAINTENANCE_EYEBROW}.`} />
      </Helmet>
      <div className="max-w-xl">
        <p className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[#076269]">
          {MAINTENANCE_EYEBROW}
        </p>
        <h1 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-tight tracking-tight">
          {MAINTENANCE_TITLE}
        </h1>
      </div>
    </main>
  );
}
