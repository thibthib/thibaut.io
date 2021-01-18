import "@emotion/react";
import { Theme as ThibautTheme } from "components/theme/theme";

declare module "@emotion/react" {
  export interface Theme extends ThibautTheme {}
}
