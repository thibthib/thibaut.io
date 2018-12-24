import * as React from 'react';

export class Side extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        };
    }
    loadImage = () => {
        const { src, srcSet } = this.props;
        const image = new Image();
        image.onload = () => {
            this.setState({ loaded: true });
        };
        image.srcset = srcSet;
        image.src = src;
    };
    componentDidMount() {
        if (this.props.inViewport) {
            this.loadImage();
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.inViewport && !prevProps.inViewport) {
            this.loadImage();
        }
    }
    render() {
        const { loaded } = this.state;
        const { src, srcSet, placeholder } = this.props;
        return (
            <div className={'Side'}>
                {loaded ? (
                    <img
                        ref={this.picture}
                        srcSet={srcSet}
                        src={src}
                        sizes={
                            '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                        }
                        className={'Side-picture'}
                    />
                ) : null}
                <img
                    src={placeholder}
                    className={`Side-placeholder${loaded ? '--hidden' : ''}`}
                />
                <style jsx>{`
                    .Side {
                        overflow: hidden;
                        position: relative;
                    }

                    img {
                        height: 100%;
                        width: 100%;
                    }

                    .Side-placeholder--hidden,
                    .Side-placeholder {
                        position: relative;
                        filter: blur(20px);
                        transform: scale(1.1);
                        z-index: 1;
                        opacity: 1;
                        transition: opacity 200ms;
                    }

                    .Side-placeholder--hidden {
                        opacity: 0;
                    }

                    .Side-picture {
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 0;
                    }
                `}</style>
            </div>
        );
    }
}
