import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { Global, css } from "@emotion/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Emphasis } from "components/Emphasis";
import { Code, InlineCode, Pre, CodeTheme } from "components/Code";
import { Link } from "components/Link";
import { h1, h2, h3, h4, h5, h6 } from "components/Title";
import { ArchiaPreload, CartographPreload } from "components/theme/typography";
import { ThemeProvider } from "components/theme/ThemeProvider";
import { MenuLink } from "./MenuLink";
import { h1 as H1 } from "./Title";
import { Favicon } from "./Favicon";

const components = {
  inlineCode: InlineCode,
  code: Code,
  pre: Pre,
  a: Link,
  em: Emphasis,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
};

type MetaData = {
  title: string;
  description: string;
  date: string;
  image?: string;
  emoji?: string;
};

export const BlogPost: React.FunctionComponent<{ meta: MetaData }> = ({ meta, children }) => {
  const router = useRouter();
  const url = encodeURIComponent(`https://thibaut.io${router.pathname}`);
  return (
    <ThemeProvider>
      <MDXProvider components={components}>
        <main>
          <Head>
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            <meta name="twitter:card" content={meta.image ? "summary_large_image" : "summary"} />
            <meta name="twitter:site" content="@thib_thib" />
            <meta name="twitter:title" content={meta.title} />
            <meta name="twitter:description" content={meta.description} />
            {meta.image ? <meta name="twitter:image" content={meta.image} /> : null}
            <meta property="og:title" content={meta.title} />
            <meta property="og:description" content={meta.description} />
            <ArchiaPreload />
            <CartographPreload />
          </Head>
          {meta.emoji ? <Favicon emoji={meta.emoji} /> : null}
          <Global
            styles={(theme) => css`
              body {
                background-color: ${theme.background};
                color: ${theme.text};
                ${theme.sansSerifFont}
                padding: calc(0.5rem + 3vh) calc(0.5rem + 4vw);
                box-sizing: unset;
                max-width: ${theme.lineLength}ch;
              }

              p {
                font-size: ${theme.fontSizes.medium};
                line-height: ${theme.spacing.medium};
                margin-top: 0;
                margin-bottom: ${theme.spacing.medium};
              }

              ul {
                margin-bottom: ${theme.spacing.medium};
              }
            `}
          />
          <CodeTheme />
          <MenuLink />
          <header>
            <H1>
              {`emoji=${meta.emoji} `}
              {meta.title}
              <p
                css={(theme) => css`
                  margin-top: 0;
                  color: ${theme.secondaryText};
                  font-size: ${theme.fontSizes.small};
                  font-weight: 300;
                `}
              >
                {meta.date}
              </p>
            </H1>
          </header>
          <article
            css={(theme) => css`
              margin-bottom: ${theme.spacing.medium};
            `}
          >
            {children}
          </article>
          <footer
            css={(theme) => css`
              padding-top: ${theme.spacing.medium};
              border-top: 1px solid ${theme.border};
            `}
          >
            💬 <Link href={`https://mobile.twitter.com/search?q=${url}`}>Discuss on twitter</Link>
          </footer>
        </main>
      </MDXProvider>
    </ThemeProvider>
  );
};
