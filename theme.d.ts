declare module "treat/theme" {
  type MyTheme = import("components/theme/theme.treat").Theme;
  export interface Theme extends MyTheme {}
}
