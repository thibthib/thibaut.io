import * as React from "react";
import Image from "next/image";
import styled from "@emotion/styled";

const Placeholder = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  /* Adjust the content to fit */
  object-fit: cover;
  object-position: center;
  /* Blur the image and scale to avoid transparent corners */
  filter: blur(2rem);
  transform: scale(1.2);
`;

export const Portrait: React.FunctionComponent<{
  id: number;
  name: string;
  placeholder: string;
}> = ({ name, id, placeholder }) => {
  const [side, setSide] = React.useState("back");
  const valseTimer = React.useRef<number>();

  return (
    <div className={`Portrait Portrait-show-${side}`}>
      <div className={"Portrait-back"}>
        <Placeholder aria-hidden="true" alt="" src={placeholder} />
        <Image
          src={`/portraits/${name}-back.jpg`}
          height={1280}
          width={1280}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          alt={`Back portrait of ${name}`}
        />
      </div>
      <div className={"Portrait-front"}>
        <Image
          src={`/portraits/${name}-front.jpg`}
          height={1280}
          width={1280}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          alt={`Front portrait of ${name}`}
        />
      </div>
      <div
        role="button"
        className="Portrait-mask"
        onMouseDown={() => setSide("front")}
        onMouseUp={() => setSide("back")}
        onMouseLeave={() => setSide("back")}
        onTouchStart={() => {
          valseTimer.current = window.setTimeout(() => {
            setSide("front");
          }, 150);
        }}
        onTouchEnd={() => setSide("back")}
        onTouchMove={() => {
          clearTimeout(valseTimer.current);
        }}
      >
        <div className="Portrait-id">{`#${`00${id}`.substr(-3)}`}</div>
      </div>
      <style jsx>{`
        .Portrait {
          position: relative;
          width: 100%;
          float: left;
        }

        .Portrait-front {
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }

        .Portrait-back {
          position: relative;
          overflow: hidden;
        }

        .Portrait-show-front .Portrait-front {
          opacity: 1;
        }

        .Portrait-mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 3;

          cursor: pointer;
          user-select: none;

          -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
          -webkit-tap-highlight-color: transparent;
        }

        .Portrait-id {
          position: absolute;
          bottom: 0;
          right: 0;
          color: white;
          opacity: 0;
          font-size: 26px;
          padding: 5px 15px;
          cursor: pointer;
          user-select: none;

          transition: opacity 200ms;
        }

        .Portrait-mask:hover .Portrait-id {
          opacity: 0.75;
        }

        .Portrait-id:hover {
          opacity: 1 !important;
        }

        @media screen and (min-width: 768px) {
          .Portrait,
          .Tutorial {
            width: 50%;
          }
        }

        @media screen and (min-width: 1024px) {
          .Portrait,
          .Tutorial {
            width: 33.33%;
          }
        }
      `}</style>
    </div>
  );
};
