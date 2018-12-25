import * as React from 'react';
import { Side } from './side.js';
import { InViewport } from './InViewport';
import Head from 'next/head';

const sizes = [480, 640, 800, 1080, 1280];

const getSource = (name, face, size) =>
    `static/portraits/${name}-${face}-${size}w.jpg`;

const getSrcset = (name, face) =>
    sizes.map(size => `${getSource(name, face, size)} ${size}w`).join(',');

const getMiddle = (min, max) => min + (max - min) / 2;

const getImageSize = (height, width) =>
    sizes.find((size, index) => {
        const lowerBound = index === 0 ? 0 : getMiddle(sizes[index - 1], size);
        const upperBound =
            index === sizes.length
                ? Infinity
                : getMiddle(size, sizes[index + 1]);
        const biggestDimension =
            Math.max(height, width) * window.devicePixelRatio;
        return biggestDimension >= lowerBound && biggestDimension <= upperBound;
    });

export class Portrait extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inViewport: false,
            side: 'back'
        };
    }
    showFront = () => {
        this.setState({
            side: 'front'
        });
    };
    showBack = () => {
        this.setState({
            side: 'back'
        });
    };
    onViewportChange = ({ inViewport, height, width }) => {
        this.setState({
            inViewport,
            height,
            width
        });
    };
    render() {
        const { name, id, placeholder } = this.props;
        const { side, inViewport, height, width } = this.state;

        const imageSize = height && width ? getImageSize(height, width) : null;
        const backSrc =
            imageSize === null ? null : getSource(name, 'back', imageSize);
        const frontSrc =
            imageSize === null ? null : getSource(name, 'front', imageSize);

        return (
            <div className="Portrait">
                {imageSize ? (
                    <Head>
                        <link
                            rel="preload"
                            href={inViewport ? frontSrc : backSrc}
                            as="image"
                        />
                    </Head>
                ) : null}
                <InViewport onChange={this.onViewportChange}>
                    <div
                        className="Portrait-mask"
                        onMouseDown={this.showFront}
                        onMouseUp={this.showBack}
                        onMouseLeave={this.showBack}
                        onTouchStart={() => {
                            this.valseTimer = setTimeout(() => {
                                this.showFront();
                            }, 150);
                        }}
                        onTouchEnd={this.showBack}
                        onTouchMove={() => {
                            clearTimeout(this.valseTimer);
                        }}
                    >
                        <div className="Portrait-id">
                            {`#${`00${id}`.substr(-3)}`}
                        </div>
                    </div>
                    {side === 'back' ? (
                        <Side
                            src={backSrc}
                            placeholder={placeholder['back']}
                            inViewport={inViewport}
                        />
                    ) : (
                        <Side
                            src={frontSrc}
                            placeholder={placeholder['front']}
                            inViewport={inViewport}
                        />
                    )}
                </InViewport>
                <style jsx>{`
                    .Portrait {
                        position: relative;
                        width: 100%;
                        float: left;
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
    }
}
