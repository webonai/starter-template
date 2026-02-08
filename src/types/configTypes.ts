export interface SiteConfig {
  meta: {
    siteName: string;
    description?: string;
    favicon?: string;
  };
  theme: {
    primary: string;
    secondary?: string;
    accent?: string;
    neutral?: string;
    destructive?: string;
    muted?: string;
    popover?: string;
    card?: string;
    border?: string;
    input?: string;
    ring?: string;
    background?: string;
    foreground?: string;
    fontHeading?: string;
    fontBody?: string;
    radius?: string;
    mode?: string;
  };
  layout: {
    order: string[];
  };
  sections: Record<string, any>; // Changed to any to allow flexible section types
  logo?: {
    src?: string;
    text?: string;
    styles?: Record<string, string | number>;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}