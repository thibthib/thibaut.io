import { theme } from './themes/NightOwl';

export const syntaxTheme = {
  'pre[class*="language-"]': {
    color: '#d6deeb',
    background: '#011627',

    fontFeatureSettings: 'initial',
    fontWeight: 400,
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'keep-all',
    wordWrap: 'normal',
    overflowX: 'auto',
    overflowY: 'hidden',
    hyphens: 'none',
    padding: theme.spacing.small,
    margin: `0 -6vw ${theme.spacing.medium}`,
    borderRadius: '4px',
  },
  'code[class*="language-"]': {
    fontFamily: theme.monospaceFont,
  },
  'pre[class*="language-"]::selection': {
    'text-shadow': 'none',
    background: 'rgba(29, 59, 83, 0.99)',
  },
  'code[class*="language-"]::selection': {
    'text-shadow': 'none',
    background: 'rgba(29, 59, 83, 0.99)',
  },
  comment: {
    color: 'rgb(99, 119, 119)',
  },
  prolog: {
    color: 'rgb(99, 119, 119)',
    'font-style': 'italic',
  },
  cdata: {
    color: 'rgb(99, 119, 119)',
    'font-style': 'italic',
  },
  punctuation: {
    color: 'rgb(214, 222, 235)',
  },
  '.namespace': {
    color: 'rgb(178, 204, 214)',
  },
  deleted: {
    color: 'rgba(239, 83, 80, 0.56)',
    'font-style': 'italic',
  },
  symbol: {
    color: 'rgb(128, 203, 196)',
  },
  property: {
    color: 'rgb(128, 203, 196)',
  },
  tag: {
    color: 'rgb(127, 219, 202)',
  },
  operator: {
    color: 'rgb(199, 146, 234)',
  },
  keyword: {
    color: 'rgb(199, 146, 234)',
  },
  boolean: {
    color: 'rgb(255, 88, 116)',
  },
  number: {
    color: 'rgb(247, 140, 108)',
  },
  constant: {
    color: 'rgb(130, 170, 255)',
  },
  function: {
    color: 'rgb(130, 170, 255)',
  },
  builtin: {
    color: 'rgb(130, 170, 255)',
  },
  char: {
    color: 'rgb(130, 170, 255)',
  },
  selector: {
    color: 'rgb(199, 146, 234)',
  },
  doctype: {
    color: 'rgb(199, 146, 234)',
  },
  'attr-name': {
    color: 'rgb(173, 219, 103)',
  },
  inserted: {
    color: 'rgb(173, 219, 103)',
  },
  string: {
    color: 'rgb(255, 203, 139)',
  },
  url: {
    color: 'rgb(173, 219, 103)',
  },
  entity: {
    color: 'rgb(173, 219, 103)',
  },
  '.language-css .token.string': {
    color: 'rgb(173, 219, 103)',
  },
  '.style .token.string': {
    color: 'rgb(173, 219, 103)',
  },
  'class-name': {
    color: 'rgb(255, 203, 139)',
  },
  atrule: {
    color: 'rgb(255, 203, 139)',
  },
  'attr-value': {
    color: 'rgb(255, 203, 139)',
  },
  regex: {
    color: 'rgb(214, 222, 235)',
  },
  variable: {
    color: 'rgb(214, 222, 235)',
  },
  important: {
    color: 'rgb(214, 222, 235)',
    'font-weight': 'bold',
  },
  bold: {
    'font-weight': 'bold',
  },
  italic: {
    'font-style': 'italic',
  },
};
