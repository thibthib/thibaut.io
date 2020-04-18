import range from 'lodash/range';
import intersection from 'lodash/intersection';

const getDeci = (s: string) => parseInt(s, 16);

type Group = {
  name: string;
  characters: number[];
};

export const getGroups = (fontCharacters: number[]): Group[] => {
  return [
    {
      name: 'Latin',
      characters:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
    {
      name: 'Latin extended',
      characters:
        'U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF',
    },
    {
      name: 'Cyrillic',
      characters: 'U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116',
    },
    {
      name: 'Cyrillic extended',
      characters: 'U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F',
    },
    {
      name: 'Greek extended',
      characters: 'U+1F00-1FFF',
    },
    {
      name: 'Greek',
      characters: 'U+0370-03FF',
    },
  ].reduce((acc: Group[], { name, characters }) => {
    const groupCharacters = characters.split(', ').reduce((acc: number[], unicode) => {
      const hexa = unicode.replace('U+', '');
      if (hexa.includes('-')) {
        const [start, end] = hexa.split('-').map(getDeci);
        return [...acc, ...intersection(range(start, end), fontCharacters)];
      }

      const character = getDeci(hexa);
      return fontCharacters.includes(character) ? [...acc, character] : acc;
    }, []);

    return groupCharacters.length > 0 ? [...acc, { name, characters: groupCharacters }] : acc;
  }, []);
};

const UnicodeRanges = [
  {
    name: 'Basic Latin',
    characters: range(0, 127),
  },
  {
    name: 'C1 Controls and Latin-1 Supplement',
    characters: range(128, 255),
  },
  {
    name: 'Latin Extended-A',
    characters: range(256, 383),
  },
  {
    name: 'Latin Extended-B',
    characters: range(384, 591),
  },
  {
    name: 'IPA Extensions',
    characters: range(592, 687),
  },
  {
    name: 'Spacing Modifier Letters',
    characters: range(688, 767),
  },
  {
    name: 'Combining Diacritical Marks',
    characters: range(768, 879),
  },
  {
    name: 'Greek/Coptic',
    characters: range(880, 1023),
  },
  {
    name: 'Cyrillic',
    characters: range(1024, 1279),
  },
  {
    name: 'Cyrillic Supplement',
    characters: range(1280, 1327),
  },
  {
    name: 'Armenian',
    characters: range(1328, 1423),
  },
  {
    name: 'Hebrew',
    characters: range(1424, 1535),
  },
  {
    name: 'Arabic',
    characters: range(1536, 1791),
  },
  {
    name: 'Syriac',
    characters: range(1792, 1871),
  },
  {
    name: 'Thaana',
    characters: range(1920, 1983),
  },
  {
    name: 'Devanagari',
    characters: range(2304, 2431),
  },
  {
    name: 'Bengali/Assamese',
    characters: range(2432, 2559),
  },
  {
    name: 'Gurmukhi',
    characters: range(2560, 2687),
  },
  {
    name: 'Gujarati',
    characters: range(2688, 2815),
  },
  {
    name: 'Oriya',
    characters: range(2816, 2943),
  },
  {
    name: 'Tamil',
    characters: range(2944, 3071),
  },
  {
    name: 'Telugu',
    characters: range(3072, 3199),
  },
  {
    name: 'Kannada',
    characters: range(3200, 3327),
  },
  {
    name: 'Malayalam',
    characters: range(3328, 3583),
  },
  {
    name: 'Sinhala',
    characters: range(3456, 3583),
  },
  {
    name: 'Thai',
    characters: range(3584, 3711),
  },
  {
    name: 'Lao',
    characters: range(3712, 3839),
  },
  {
    name: 'Tibetan',
    characters: range(3840, 4095),
  },
  {
    name: 'Myanmar',
    characters: range(4096, 4255),
  },
  {
    name: 'Georgian',
    characters: range(4256, 4351),
  },
  {
    name: 'Hangul Jamo',
    characters: range(4352, 4607),
  },
  {
    name: 'Ethiopic',
    characters: range(4608, 4991),
  },
  {
    name: 'Cherokee',
    characters: range(5024, 5119),
  },
  {
    name: 'Unified Canadian Aboriginal Syllabics',
    characters: range(5120, 5759),
  },
  {
    name: 'Ogham',
    characters: range(5760, 5791),
  },
  {
    name: 'Runic',
    characters: range(5792, 5887),
  },
  {
    name: 'Tagalog',
    characters: range(5888, 5919),
  },
  {
    name: 'Hanunoo',
    characters: range(5920, 5951),
  },
  {
    name: 'Buhid',
    characters: range(5952, 5983),
  },
  {
    name: 'Tagbanwa',
    characters: range(5984, 6015),
  },
  {
    name: 'Khmer',
    characters: range(6016, 6143),
  },
  {
    name: 'Mongolian',
    characters: range(6144, 6319),
  },
  {
    name: 'Limbu',
    characters: range(6400, 6479),
  },
  {
    name: 'Tai Le',
    characters: range(6480, 6527),
  },
  {
    name: 'Khmer Symbols',
    characters: range(6624, 6655),
  },
  {
    name: 'Phonetic Extensions',
    characters: range(7424, 7551),
  },
  {
    name: 'Latin Extended Additional',
    characters: range(7680, 7935),
  },
  {
    name: 'Greek Extended',
    characters: range(7936, 8191),
  },
  {
    name: 'General Punctuation',
    characters: range(8192, 8303),
  },
  {
    name: 'Superscripts and Subscripts',
    characters: range(8304, 8351),
  },
  {
    name: 'Currency Symbols',
    characters: range(8352, 8399),
  },
  {
    name: 'Combining Diacritical Marks for Symbols',
    characters: range(8400, 8447),
  },
  {
    name: 'Letterlike Symbols',
    characters: range(8448, 8527),
  },
  {
    name: 'Number Forms',
    characters: range(8528, 8591),
  },
  {
    name: 'Arrows',
    characters: range(8592, 8703),
  },
  {
    name: 'Mathematical Operators',
    characters: range(8704, 8959),
  },
  {
    name: 'Miscellaneous Technical',
    characters: range(8960, 9215),
  },
  {
    name: 'Control Pictures',
    characters: range(9216, 9279),
  },
  {
    name: 'Optical Character Recognition',
    characters: range(9280, 9311),
  },
  {
    name: 'Enclosed Alphanumerics',
    characters: range(9312, 9471),
  },
  {
    name: 'Box Drawing',
    characters: range(9472, 9599),
  },
  {
    name: 'Block Elements',
    characters: range(9600, 9631),
  },
  {
    name: 'Geometric Shapes',
    characters: range(9632, 9727),
  },
  {
    name: 'Miscellaneous Symbols',
    characters: range(9728, 9983),
  },
  {
    name: 'Dingbats',
    characters: range(9984, 10175),
  },
  {
    name: 'Miscellaneous Mathematical Symbols-A',
    characters: range(10176, 10223),
  },
  {
    name: 'Supplemental Arrows-A',
    characters: range(10224, 10239),
  },
  {
    name: 'Braille Patterns',
    characters: range(10240, 10495),
  },
  {
    name: 'Supplemental Arrows-B',
    characters: range(10496, 10623),
  },
  {
    name: 'Miscellaneous Mathematical Symbols-B',
    characters: range(10624, 10751),
  },
  {
    name: 'Supplemental Mathematical Operators',
    characters: range(10752, 11007),
  },
  {
    name: 'Miscellaneous Symbols and Arrows',
    characters: range(11008, 11263),
  },
  {
    name: 'CJK Radicals Supplement',
    characters: range(11904, 12031),
  },
  {
    name: 'Kangxi Radicals',
    characters: range(12032, 12255),
  },
  {
    name: 'Ideographic Description Characters',
    characters: range(12272, 12287),
  },
  {
    name: 'CJK Symbols and Punctuation',
    characters: range(12288, 12351),
  },
  {
    name: 'Hiragana',
    characters: range(12352, 12447),
  },
  {
    name: 'Katakana',
    characters: range(12448, 12543),
  },
  {
    name: 'Bopomofo',
    characters: range(12544, 12591),
  },
  {
    name: 'Hangul Compatibility Jamo',
    characters: range(12592, 12687),
  },
  {
    name: 'Kanbun (Kunten)',
    characters: range(12688, 12703),
  },
  {
    name: 'Bopomofo Extended',
    characters: range(12704, 12735),
  },
  {
    name: 'Katakana Phonetic Extensions',
    characters: range(12784, 12799),
  },
  {
    name: 'Enclosed CJK Letters and Months',
    characters: range(12800, 13055),
  },
  {
    name: 'CJK Compatibility',
    characters: range(13056, 13311),
  },
  {
    name: 'CJK Unified Ideographs Extension A',
    characters: range(13312, 19903),
  },
  {
    name: 'Yijing Hexagram Symbols',
    characters: range(19904, 19967),
  },
  {
    name: 'CJK Unified Ideographs',
    characters: range(19968, 40879),
  },
  {
    name: 'Yi Syllables',
    characters: range(40960, 42127),
  },
  {
    name: 'Yi Radicals',
    characters: range(42128, 42191),
  },
  {
    name: 'Hangul Syllables',
    characters: range(44032, 55215),
  },
  {
    name: 'High Surrogate Area',
    characters: range(55296, 56319),
  },
  {
    name: 'Low Surrogate Area',
    characters: range(56320, 57343),
  },
  {
    name: 'Private Use Area',
    characters: range(57344, 63743),
  },
  {
    name: 'CJK Compatibility Ideographs',
    characters: range(63744, 64255),
  },
  {
    name: 'Alphabetic Presentation Forms',
    characters: range(64256, 64335),
  },
  {
    name: 'Arabic Presentation Forms-A',
    characters: range(64336, 65023),
  },
  {
    name: 'Variation Selectors',
    characters: range(65024, 65039),
  },
  {
    name: 'Combining Half Marks',
    characters: range(65056, 65071),
  },
  {
    name: 'CJK Compatibility Forms',
    characters: range(65072, 65103),
  },
  {
    name: 'Small Form Variants',
    characters: range(65104, 65135),
  },
  {
    name: 'Arabic Presentation Forms-B',
    characters: range(65136, 65279),
  },
  {
    name: 'Halfwidth and Fullwidth Forms',
    characters: range(65280, 65519),
  },
  {
    name: 'Specials',
    characters: range(65520, 65535),
  },
  {
    name: 'Linear B Syllabary',
    characters: range(65536, 65663),
  },
  {
    name: 'Linear B Ideograms',
    characters: range(65664, 65791),
  },
  {
    name: 'Aegean Numbers',
    characters: range(65792, 65855),
  },
  {
    name: 'Old Italic',
    characters: range(66304, 66351),
  },
  {
    name: 'Gothic',
    characters: range(66352, 66383),
  },
  {
    name: 'Ugaritic',
    characters: range(66432, 66463),
  },
  {
    name: 'Deseret',
    characters: range(66560, 66639),
  },
  {
    name: 'Shavian',
    characters: range(66640, 66687),
  },
  {
    name: 'Osmanya',
    characters: range(66688, 66735),
  },
  {
    name: 'Cypriot Syllabary',
    characters: range(67584, 67647),
  },
  {
    name: 'Byzantine Musical Symbols',
    characters: range(118784, 119039),
  },
  {
    name: 'Musical Symbols',
    characters: range(119040, 119295),
  },
  {
    name: 'Tai Xuan Jing Symbols',
    characters: range(119552, 119647),
  },
  {
    name: 'Mathematical Alphanumeric Symbols',
    characters: range(119808, 120831),
  },
  {
    name: 'CJK Unified Ideographs Extension B',
    characters: range(131072, 173791),
  },
  {
    name: 'CJK Compatibility Ideographs Supplement',
    characters: range(194560, 195103),
  },
  {
    name: 'Tags',
    characters: range(917504, 917631),
  },
  {
    name: 'Variation Selectors Supplement',
    characters: range(917760, 917999),
  },
  {
    name: 'Supplementary Private Use Area-A',
    characters: range(983040, 1048573),
  },
  {
    name: 'Supplementary Private Use Area-B',
    characters: range(1048576, 1114109),
  },
];
