export const svgElement = <TagName extends keyof SVGElementTagNameMap>(
  tag: TagName
) => document.createElementNS("http://www.w3.org/2000/svg", tag)

export const htmlElement = <TagName extends keyof HTMLElementTagNameMap>(
  tag: TagName,
  options?: ElementCreationOptions
) => document.createElement(tag, options)
