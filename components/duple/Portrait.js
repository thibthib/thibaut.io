import * as React from 'react';
import { Side } from './Side.js';
import { ClosestSource } from './ClosestSource';
import Head from 'next/head';

export class Portrait extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
    render() {
        const { sources, id, placeholder } = this.props;
        const { side } = this.state;

        return (
            <div className="Portrait">
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
                <ClosestSource sources={sources}>
                    {({ source, inViewport }) => (
                        <React.Fragment>
                            {source !== undefined ? (
                                <Head>
                                    <link
                                        rel="preload"
                                        href={
                                            inViewport
                                                ? source.front
                                                : source.back
                                        }
                                        as="image"
                                    />
                                </Head>
                            ) : null}
                            {side === 'back' ? (
                                <Side
                                    src={inViewport ? source.back : null}
                                    placeholder={placeholder.back}
                                />
                            ) : (
                                <Side
                                    src={inViewport ? source.front : null}
                                    placeholder={placeholder.front}
                                />
                            )}
                        </React.Fragment>
                    )}
                </ClosestSource>
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
