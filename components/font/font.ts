import { parse, Font as OpenTypeFont, LocalizedName } from 'opentype.js';

enum FontType {
  ttf = 'ttf',
  woff = 'woff',
  woff2 = 'woff2',
  eot = 'eot',
  otf = 'otf',
  svg = 'svg',
}

type Glyph = {
  name: string;
  code: number | number[];
};

export type Font = {
  familyName: string;
  styleName: string;
  fullName?: string;
  postScriptName?: string;
  designer?: string;
  designerURL?: string;
  manufacturer?: string;
  manufacturerURL?: string;
  license?: string;
  licenseURL?: string;
  version?: string;
  description?: string;
  copyright?: string;
  trademark?: string;
  unitsPerEm: number;
  ascender: number;
  descender: number;
  numGlyphs: number;
  glyphs: Glyph[];
  features: string[];
  base64: string;
  size: number;
  type: FontType;
  buffer: ArrayBuffer;
  opentypeFont: OpenTypeFont;
};

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = evt => {
      if (evt.target && evt.target.result !== null && typeof evt.target.result === 'string') {
        resolve(evt.target.result);
      }
    };
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });

const toArrayBuffer = (file: File) =>
  new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(evt) {
      if (evt.target && evt.target.result !== null && typeof evt.target.result !== 'string') {
        resolve(evt.target.result);
      }
    };
    reader.onerror = error => reject(error);
    reader.readAsArrayBuffer(file);
  });

export const getFont = (file: File): Promise<Font> => {
  const extension = file.name.split('.').pop();
  if (extension && extension in FontType) {
    const type = FontType[extension as FontType];
    return Promise.all([toArrayBuffer(file), toBase64(file)]).then(([buffer, base64]) => {
      const font = parse(buffer);
      const info = getFontInfo(font);

      return {
        ...info,
        type,
        buffer,
        size: buffer.byteLength,
        base64,
        opentypeFont: font,
      };
    });
  }
  return Promise.reject('Font type is not supported');
};

const readLocalized = (loca?: LocalizedName) => (loca !== undefined && loca.en ? loca.en : '');

export const getSubsetFont = ({ opentypeFont }: Font, glyphsNames: string[]): ArrayBuffer => {
  const { names, unitsPerEm, ascender, descender } = opentypeFont;
  const font = new OpenTypeFont({
    familyName: readLocalized(names.fontFamily),
    styleName: readLocalized(names.fontSubfamily),
    fullName: readLocalized(names.fullName),
    postScriptName: readLocalized(names.postScriptName),
    designer: readLocalized(names.designer),
    designerURL: readLocalized(names.designerURL),
    manufacturer: readLocalized(names.manufacturer),
    manufacturerURL: readLocalized(names.manufacturerURL),
    license: readLocalized(names.license),
    licenseURL: readLocalized(names.licenseURL),
    version: readLocalized(names.version),
    description: readLocalized(names.description),
    copyright: readLocalized(names.copyright),
    trademark: readLocalized(names.trademark),
    unitsPerEm,
    ascender,
    descender,
    glyphs: glyphsNames.map(name => opentypeFont.nameToGlyph(name)),
  });

  return font.toArrayBuffer();
};

const getFontInfo = (font: opentype.Font) => {
  (window as any).font = font;

  const features = new Set<string>();
  const glyphs: Glyph[] = [];
  const characterSet: number[] = [];
  for (let i = 0; i < font.numGlyphs; i++) {
    const glyph = font.glyphs.get(i);
    if (glyph.unicode) {
      glyphs.push({ name: glyph.name, code: glyph.unicode });
    } else if (glyph.name.includes('.')) {
      const [chars, feature] = glyph.name.split('.');
      if (chars !== '') {
        const charNames = chars.split('_');
        console.log(charNames);
        const codes = charNames.map(charName => {
          return font.nameToGlyph(charName).unicode;
        });
        features.add(feature);
        glyphs.push({ name: glyph.name, code: codes });
      }
    }
  }

  characterSet.sort((a: number, b: number) => a - b);

  return {
    familyName: readLocalized(font.names.fontFamily),
    styleName: readLocalized(font.names.fontSubfamily),
    fullName: readLocalized(font.names.fullName),
    postScriptName: readLocalized(font.names.postScriptName),
    designer: readLocalized(font.names.designer),
    designerURL: readLocalized(font.names.designerURL),
    manufacturer: readLocalized(font.names.manufacturer),
    manufacturerURL: readLocalized(font.names.manufacturerURL),
    license: readLocalized(font.names.license),
    licenseURL: readLocalized(font.names.licenseURL),
    version: readLocalized(font.names.version),
    description: readLocalized(font.names.description),
    copyright: readLocalized(font.names.copyright),
    trademark: readLocalized(font.names.trademark),
    unitsPerEm: font.unitsPerEm,
    ascender: font.ascender,
    descender: font.descender,
    numGlyphs: font.numGlyphs,
    glyphs,
    features: [...features],
  };
};
