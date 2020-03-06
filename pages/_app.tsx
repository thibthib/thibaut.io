import React from 'react';
import App from 'next/app';
import { MDXProvider } from '@mdx-js/react';
import { Emphasis } from '../components/Emphasis';
import { ThemeProvider } from 'emotion-theming';
import { Code, InlineCode } from '../components/Code';
import { PostWrapper } from '../components/PostWrapper';
import { Link } from '../components/Link';
import { h1, h2, h3, h4, h5, h6 } from '../components/Title';
import { theme } from '../components/themes/NightOwl';

const components = {
  inlineCode: InlineCode,
  code: Code,
  a: Link,
  wrapper: PostWrapper,
  em: Emphasis,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
};

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <MDXProvider components={components}>
          <Component {...pageProps} />
        </MDXProvider>
      </ThemeProvider>
    );
  }
}