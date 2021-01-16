import * as React from "react";
import { useStyles } from "react-treat";
import * as styleRefs from "./PageLink.treat";

export const PageLink = React.forwardRef<
  HTMLAnchorElement,
  {
    href?: string;
    label: string;
    description?: string;
    logo: React.ReactNode;
  }
>(({ href, label, description, logo }, ref) => {
  const styles = useStyles(styleRefs);
  return (
    <a href={href} ref={ref} className={styles.pageLinkWrapper}>
      <div className={styles.pageLinkLogoWrapper}>{logo}</div>
      <div>
        <p className={styles.pageLink}>{label}</p>
        {description ? <p className={styles.pageLinkDescription}>{description}</p> : null}
      </div>
    </a>
  );
});
