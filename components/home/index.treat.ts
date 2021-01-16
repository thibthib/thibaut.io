import { style } from "treat";

export const main = style((theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: "10vh 0",
  margin: "0 auto",
  backgroundColor: theme.background,
  color: theme.text,
  ...theme.sansSerifFont,
  "@media": {
    "(min-width: 660px)": {
      flexDirection: "row",
      marginTop: 0,
      height: "100vh",
      padding: 0,
    },
  },
}));

export const linkLogo = style((theme) => ({
  fill: theme.secondaryText,
}));

export const leftColumn = style((theme) => ({
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
  width: "100vw",
  padding: theme.spacing.medium,
  "@media": {
    "(min-width: 660px)": {
      width: "43vw",
      padding: `0 ${theme.spacing.large} 0 ${theme.spacing.medium}`,
      alignItems: "flex-end",
    },
  },
}));

export const thibautTitle = style((theme) => ({
  marginBottom: theme.spacing.large,
  fontSize: theme.fontSizes.XXXLarge,
  whiteSpace: "nowrap",
}));

export const externalLinks = style((theme) => ({
  marginBottom: theme.spacing.medium,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  "@media": {
    "(min-width: 660px)": {
      alignItems: "flex-end",
    },
  },
}));

export const rightColumn = style((theme) => ({
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
  width: "100vw",
  padding: theme.spacing.medium,
  "@media": {
    "(min-width: 660px)": {
      width: "57vw",
      padding: `0 ${theme.spacing.medium} 0 ${theme.spacing.large}`,
    },
  },
}));

export const subTitle = style((theme) => ({
  fontSize: theme.fontSizes.XLarge,
  margin: `${theme.spacing.small} 0`,
  paddingLeft: 0,
  "@media": {
    "(min-width: 660px)": {
      margin: `${theme.spacing.large} 0 ${theme.spacing.small} ${theme.spacing.medium}`,
      paddingLeft: theme.spacing.small,
    },
  },
}));
