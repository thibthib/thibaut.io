import * as React from 'react';
import { css } from '@emotion/core';
import intersection from 'lodash/intersection';
import difference from 'lodash/difference';
import { getGroups } from './UnicodeRanges';
import { Font } from './font';
import { FontSize } from './FontSize';

export const RangeSelector: React.FunctionComponent<{
  selectedCharacters: number[];
  font: Font;
  onRangeSelect: (range: number[]) => void;
}> = ({ selectedCharacters, font, onRangeSelect }) => {
  const groups = React.useMemo(() => getGroups(font.characterSet), [font]);
  return (
    <div>
      <h2>Characters</h2>
      <div>
        {groups.map(group => {
          const isChecked = intersection(group.characters, selectedCharacters).length > 0;
          return (
            <label
              key={group.name}
              css={css`
                display: flex;
              `}
            >
              <input
                type={'checkbox'}
                checked={isChecked}
                onChange={event => {
                  if (event.target.checked) {
                    onRangeSelect([...selectedCharacters, ...group.characters]);
                  } else {
                    onRangeSelect(difference(selectedCharacters, group.characters));
                  }
                }}
              />
              <span
                css={css`
                  flex-grow: flex;
                `}
              >
                {group.name}{' '}
              </span>
              <FontSize font={font} characters={group.characters} />
            </label>
          );
        })}
      </div>
    </div>
  );
};
