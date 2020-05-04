import React from 'react';
import App from 'next/app';
import { datadogRum } from '@datadog/browser-rum';
import { MDXProvider } from '@mdx-js/react';
import { Emphasis } from '../components/Emphasis';
import { ThemeProvider } from 'emotion-theming';
import { Code, InlineCode, Pre } from '../components/Code';
import { PostWrapper } from '../components/PostWrapper';
import { Link } from '../components/Link';
import { h1, h2, h3, h4, h5, h6 } from '../components/Title';
import { theme } from '../components/themes/NightOwl';

datadogRum.init({
  applicationId: '9a14efdd-aeb9-4f66-ba0a-232b42032043',
  clientToken: 'puba9fe9045f841f0404364249bbd53f08e',
  datacenter: 'us',
  sampleRate: 100,
});

const components = {
  inlineCode: InlineCode,
  code: Code,
  pre: Pre,
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
