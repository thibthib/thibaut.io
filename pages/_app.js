import React from 'react';
import App, { Container } from 'next/app';
import { MDXProvider } from '@mdx-js/react';
import { css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { Code, InlineCode } from '../components/Code';
import { PostWrapper } from '../components/PostWrapper';
import { Link } from '../components/Link';
import { theme } from '../components/themes/NightOwl';

const components = {
  inlineCode: props => <InlineCode {...props} />,
  code: props => <Code {...props} />,
  a: props => <Link {...props} />,
  wrapper: props => <PostWrapper {...props} />,
  em: props => (
    <em
      {...props}
      css={theme => css`
        color: ${theme.secondaryText};
      `}
    />
  ),
};

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <MDXProvider components={components}>
            <Component {...pageProps} />
          </MDXProvider>
        </ThemeProvider>
      </Container>
    );
  }
}
