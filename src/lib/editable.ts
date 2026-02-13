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

  const props: any = {
    // Merge default Tailwind classes with User overrides or complete replacement
    className: data.className ? cn(defaultClass, data.className) : defaultClass,
    
    // Apply Hex colors (Background/Text)
    style: data.styles || {},
    
    // Editor Attributes
    "data-path": path,
    "data-type": type
  };

  // Preserve interactive props
  if (data.href !== undefined) props.href = data.href;
  if (data.src !== undefined) props.src = data.src;
  if (data.alt !== undefined) props.alt = data.alt;
   if (data.text !== undefined && type === 'text') props.children = data.text;

  // if (data.onClick) props.onClick = data.onClick;
  // if (data.type) props.type = data.type;
  // if (data.id) props.id = data.id;
  // if (data.name) props.name = data.name;
  // if (data.placeholder) props.placeholder = data.placeholder;

  return props;
}