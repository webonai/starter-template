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
    className: data.className ? cn(defaultClass, data.className) : defaultClass,
    style: data.styles || {},
    "data-path": path,
    "data-type": type,
  };

  if (data.href !== undefined) props.href = data.href;
  if (data.src !== undefined) props.src = data.src;
  if (data.alt !== undefined) props.alt = data.alt;
  if (data.id !== undefined) props.id = data.id;
  if (data.name !== undefined) props.name = data.name;
  if (data.type !== undefined) props.type = data.type;
  if (data.placeholder !== undefined) props.placeholder = data.placeholder;
  if (data.value !== undefined) props.value = data.value;
  if (data.target !== undefined) props.target = data.target;
  if (data.rel !== undefined) props.rel = data.rel;
  if (data.text !== undefined && type === 'text') props.children = data.text;

  return props;
}
