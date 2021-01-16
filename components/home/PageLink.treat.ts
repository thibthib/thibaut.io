import { style } from "treat";

export const pageLinkWrapper = style((theme) => ({
  display: "inline-flex",
  justifyContent: "flex-start",
  alignItems: "center",
  marginTop: theme.spacing.medium,
  textDecoration: "none",
  color: theme.text,
}));

export const pageLinkLogoWrapper = style((theme) => ({
  marginRight: theme.spacing.small,
  width: theme.spacing.medium,
  height: theme.spacing.medium,
  fontSize: theme.fontSizes.XLarge,
}));

export const pageLink = style((theme) => ({
  display: "block",
  margin: 0,
  textDecoration: "underline",
  textDecorationColor: theme.secondaryText,
  fontSize: theme.fontSizes.large,
  whiteSpace: "nowrap",
}));

export const pageLinkDescription = style((theme) => ({
  marginTop: theme.spacing.XSmall,
  fontSize: theme.fontSizes.medium,
  fontStyle: "italic",
}));
