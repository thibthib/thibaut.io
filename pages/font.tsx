import * as React from 'react';
import { Global, css } from '@emotion/core';
import { Font, getFont, getSubsetFont } from '../components/font/font';
import { saveAs } from 'file-saver';
import { RangeSelector } from '../components/font/RangeSelector';
import { Character } from '../components/font/Character';

const FontPage = () => {
  const [font, setFont] = React.useState<Font | null>(null);
  const [selectedGlyphs, setSelectedGlyphs] = React.useState<string[]>([]);
  return (
    <>
      <Global
        styles={theme => css`
          html {
            background: ${theme.background};
            color: ${theme.text};
          }
          body {
            margin: 0;
          }
        `}
      />

      <input
        type="file"
        id="files"
        name="files"
        onChange={event => {
          const file = event.target && event.target.files ? event.target.files[0] : undefined;
          if (file !== undefined) {
            getFont(file).then(font => {
              setFont(font);
              setSelectedGlyphs(font.glyphs.map(glyph => glyph.name));
            });
          }
        }}
      />
      <button
        onClick={() => {
          if (font !== null) {
            const buffer = getSubsetFont(font, selectedGlyphs);
            saveAs(new Blob([buffer]), font.fullName);
          }
        }}
        disabled={font === null}
      >
        Download
      </button>
      {font ? (
        <>
          <Global
            styles={css`
              @font-face {
                  font-family: 'TestFont';
                  font-style: normal;
                  font-weight: normal;
                  src: url('${font.base64}') format('${font.type}');
              }
            `}
          />
          <div
            css={css`
              font-family: 'TestFont';
            `}
          >
            <h1
              css={css`
                font-size: 3em;
              `}
            >
              {font.fullName}
            </h1>
            {/* <RangeSelector
              selectedGlyphs={selectedGlyphs}
              font={font}
              onRangeSelect={(characters: number[]) => {
                setSelectedGlyphs(characters);
              }}
            /> */}
            <ul
              css={theme => css`
                margin: 0;
                padding: ${theme.spacing.xxsmall};
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(${theme.spacing.large}, 1fr));
                grid-gap: ${theme.spacing.xxsmall};
                background: ${theme.secondaryBackgound};
              `}
            >
              {font.glyphs.map(glyph => {
                const isActive = selectedGlyphs.includes(glyph.name);

                return (
                  <Character
                    key={glyph.name}
                    code={glyph.code}
                    isActive={isActive}
                    onClick={() => {
                      if (isActive) {
                        setSelectedGlyphs(selectedGlyphs.filter(name => name !== glyph.name));
                      } else {
                        setSelectedGlyphs([...selectedGlyphs, glyph.name]);
                      }
                    }}
                  />
                );
              })}
            </ul>
          </div>
        </>
      ) : null}
    </>
  );
};

export default FontPage;
