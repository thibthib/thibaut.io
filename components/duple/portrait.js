import * as React from 'react';
import { Side } from './side.js';
import { InViewport } from './InViewport';

const getSource = (name, face, size) =>
    `static/portraits/${name}-${face}-${size}w.jpg`;

const getSrcset = (name, face) => {
    return [480, 640, 800, 1080, 1280]
        .map(size => `${getSource(name, face, size)} ${size}w`)
        .join(',');
};

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
    onViewportChange = ({ inViewport }) => {
        this.setState({
            inViewport
        });
    };
    render() {
        const { name, id, placeholder } = this.props;
        const { side, inViewport } = this.state;

        return (
            <div className="Portrait">
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
                    <Side
                        srcSet={getSrcset(name, side)}
                        src={getSource(name, side, 1080)}
                        placeholder={placeholder[side]}
                        inViewport={inViewport}
                    />
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
