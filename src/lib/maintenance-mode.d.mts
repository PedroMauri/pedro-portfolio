export const MAINTENANCE_EYEBROW: string;
export const MAINTENANCE_TITLE: string;
export const MAINTENANCE_ROBOTS: string;
export const MAINTENANCE_HTML: string;

export function isMaintenanceDisabled(value: string | undefined | null): boolean;
export function normalizePathname(input: string): string;
export function isMaintenanceExemptRoute(input: string): boolean;
export function isEdgePassthrough(
  input: string,
  options?: { devServer?: boolean },
): boolean;
