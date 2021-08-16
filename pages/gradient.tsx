import { ColorSpace, CSSSpace } from "@color-spaces/convert";
import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import { Favicon } from "components/Favicon";
import {
  Colors,
  ColorTheme,
  colorVariables,
  getColorsVariablesCSS,
  getCSSVariableName,
} from "components/theme/colors";
import { ThemeProvider } from "components/theme/ThemeProvider";
import { h1 as H1 } from "components/Title";
import * as React from "react";
import Color from "components/color/color.esm";
import { GradientText } from "components/GradientText";

const Gradient: React.FunctionComponent<{ colors: string[] | null; showCSS?: boolean }> = ({
  colors,
  showCSS,
  children,
}) => {
  const background = `linear-gradient(to right, ${colors?.join(", ")})`;
  return (
    <div
      css={(theme) => css`
        background: ${background};
        height: ${theme.spacing.XXLarge};
        width: 100%;
        padding: ${theme.spacing.medium};
        font-size: ${theme.fontSizes.XSmall};
        color: ${theme.background};
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        ${theme.monospaceFont}

        > * {
          opacity: 0.1;
          transition: opacity 100ms;
        }

        &:hover > * {
          opacity: 1;
        }
      `}
    >
      {children}
      {showCSS ? (
        <span
          css={(theme) => css`
            background-color: ${theme.secondaryBackground};
            color: ${colors?.[0]};
            border-radius: 4px;
            padding: 0.1em 0.25em 0.25em;
          `}
        >
          {background}
        </span>
      ) : null}
    </div>
  );
};

enum OutputSpaces {
  "sRGB",
  "P3",
  "LCH",
}

enum InterpolationSpaces {
  "XYZ",
  "Lab",
  "LCH",
  "sRGB",
  "sRGB-linear",
  "HSL",
  "HWB",
  "HSV",
  "P3",
  "a98rgb",
  "ProPhoto",
  "REC2020",
  "absxyzd65",
  "Jzazbz",
  "JzCzHz",
  "ICtCp",
  "rec2100pq",
  "OKLab",
  "OKLCH",
  "acescc",
}

type Variant = {
  interpolationSpace: keyof typeof InterpolationSpaces;
};

const Select: React.FunctionComponent<{
  value: string;
  options: string[];
  onChange: (newValue: string) => void;
}> = ({ value, options, onChange }) => {
  return (
    <select
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    >
      {options.map((value) => (
        <option key={value}>{value}</option>
      ))}
    </select>
  );
};

const GradientVariant: React.FunctionComponent<
  Variant & { onChange: (newVariant: Variant) => void }
> = ({ interpolationSpace, onChange }) => {
  const steps = Color.steps(
    Color.range(
      new Color(ColorTheme.accent1alt).to(interpolationSpace).toString(),
      new Color(ColorTheme.accent3).to(interpolationSpace).toString(),
      {
        space: interpolationSpace,
      }
    ),
    {
      maxDeltaE: 3,
    }
  );

  return (
    <div
      css={(theme) => css`
        position: relative;
        font-size: ${theme.fontSizes.small};
        color: ${theme.background};
      `}
    >
      <Global
        styles={css`
          ${getColorsVariablesCSS(
            steps.reduce((aggr, step, index) => {
              aggr[`${interpolationSpace}-${index}`] = step.toString();
              return aggr;
            }, {})
          )}
        `}
      />
      <Gradient
        colors={steps.map(
          (step, index) => `var(${getCSSVariableName(`${interpolationSpace}-${index}`)})`
        )}
      >
        <div>
          <span>Interpolation </span>
          <Select
            value={interpolationSpace}
            options={
              Object.values(InterpolationSpaces).filter((value) => isNaN(Number(value))) as string[]
            }
            onChange={(newValue) => {
              onChange({
                interpolationSpace: newValue as keyof typeof InterpolationSpaces,
              });
            }}
          />
        </div>
      </Gradient>
    </div>
  );
};

const Page = () => {
  const [variants, setVariants] = React.useState<Variant[]>([{ interpolationSpace: "sRGB" }]);

  return (
    <ThemeProvider>
      <Favicon emoji={"🎨"} />
      <div
        css={(theme) => css`
          ${theme.serifFont}
          color: ${theme.text};
        `}
      >
        <H1>
          <GradientText>Gradients</GradientText>
        </H1>
        <Gradient
          colors={[
            `var(${getCSSVariableName("accent1alt")})`,
            `var(${getCSSVariableName("accent3")})`,
          ]}
          showCSS={true}
        />
        {variants.map((variant, index) => (
          <GradientVariant
            key={index}
            {...variant}
            onChange={(newVariant) => {
              setVariants([...variants.slice(0, index), newVariant, ...variants.slice(index + 1)]);
            }}
          />
        ))}
        <button
          onClick={() => {
            setVariants([...variants, variants[variants.length - 1]]);
          }}
        >
          Add variant ➕
        </button>
      </div>
    </ThemeProvider>
  );
};

export default Page;
