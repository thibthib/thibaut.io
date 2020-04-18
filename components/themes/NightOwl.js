const fontSizeRatio = 1.25;

const fontSizes = {
  small: `${Math.pow(fontSizeRatio, -1)}rem`,
  medium: `1rem`,
  large: `${Math.pow(fontSizeRatio, 1)}rem`,
  XLarge: `${Math.pow(fontSizeRatio, 2)}rem`,
  XXLarge: `${Math.pow(fontSizeRatio, 4)}rem`,
};

const spacingBase = 1.625;

const spacing = {
  xxsmall: `${spacingBase / 6}rem`,
  xsmall: `${spacingBase / 4}rem`,
  small: `${spacingBase / 2}rem`,
  medium: `${spacingBase}rem`,
  large: `${spacingBase * 2}rem`,
};

const gradientStart = 'hsl(208, 94%, 56%)';
const gradientEnd = 'hsl(169, 75%, 50%)';

export const theme = {
  text: 'hsl(217, 34%, 88%)',
  secondaryText: 'hsl(217, 34%, 78%)',
  highlightedText: 'hsl(169, 56%, 68%)',
  secondaryHighlight: 'hsl(208, 94%, 56%)',
  background: 'hsl(207, 92%, 10%)',
  secondaryBackgound: 'hsl(207, 95%, 8%)',
  border: 'hsl(207, 95%, 16%)',
  gradientStart,
  gradientEnd,
  gradientText: `linear-gradient(120deg, ${gradientStart}, ${gradientEnd});`,
  monospaceFont:
    'Cartograph, "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
  fontSizes,
  spacing,
};
