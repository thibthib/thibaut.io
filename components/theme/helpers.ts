import kebabCase from "lodash/kebabCase";

type ColorObject = { [name: string]: string };

export const mapColorObject = (
  colors: ColorObject,
  mapper: (colorKey: string, colorValue: string) => [string, string]
) => Object.fromEntries(Object.entries(colors).map(([key, value]) => mapper(key, value)));

export const getCSSVariableName = (colorName: string) => `--${kebabCase(colorName)}`;
