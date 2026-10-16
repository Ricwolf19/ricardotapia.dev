import type { ProjectCategory } from "@/types";

/** Category filters for /projects; "all" means no filter. */
export type WorkFilter = "all" | ProjectCategory;

export const workFilters: { value: WorkFilter; messageKey: string }[] = [
  { value: "all", messageKey: "filterAll" },
  { value: "saas", messageKey: "filterSaas" },
  { value: "erp", messageKey: "filterErp" },
  { value: "ecommerce", messageKey: "filterEcommerce" },
  { value: "platform", messageKey: "filterPlatform" },
  { value: "marketing", messageKey: "filterMarketing" },
  { value: "oss", messageKey: "filterOss" },
  { value: "game", messageKey: "filterGame" },
];
