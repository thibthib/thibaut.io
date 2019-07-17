import React from 'react';
import App, { Container } from 'next/app';
import { MDXProvider } from '@mdx-js/react';
import { css } from '@emotion/core';
import { Code, InlineCode } from '../components/Code';

const components = {
  inlineCode: props => <InlineCode {...props} />,
  code: props => <Code {...props} />,
  a: props => (
    <a
      {...props}
      css={css`
        color: inherit;
      `}
    />
  ),
};

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <MDXProvider components={components}>
          <Component {...pageProps} />
        </MDXProvider>
      </Container>
    );
  }
}