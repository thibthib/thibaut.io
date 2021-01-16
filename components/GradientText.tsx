import { useStyles } from "react-treat";
import * as styleRefs from "./GradientText.treat";

export const GradientText: React.FunctionComponent = ({ children }) => {
  const styles = useStyles(styleRefs);
  return <span className={styles.gradientText}>{children}</span>;
};
