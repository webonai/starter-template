import { cn } from "./utils";

/**
 * Merges config data into props for an editable element.
 */
export function editable(
  data: any, 
  path: string, 
  type: string = 'text', 
  defaultClass: string = ""
) {
  if (!data) return { className: defaultClass };

  return {
    // Merge default Tailwind classes with User overrides
    className: cn(defaultClass, data.className),
    
    // Apply Hex colors (Background/Text)
    style: data.styles || {},
    
    // Editor Attributes
    "data-path": path,
    "data-type": type,
  };
}