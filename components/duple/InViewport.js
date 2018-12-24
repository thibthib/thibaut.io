import * as React from 'react';

const offset = 200;

export class InViewport extends React.Component {
    constructor(props) {
        super(props);

        this.ref = React.createRef();
    }
    onChange = () => {
        if (this.ref.current) {
            const { top, bottom } = this.ref.current.getBoundingClientRect();

            const inViewport =
                top <= window.innerHeight + offset && bottom >= -offset;

            this.props.onChange({ inViewport });
        }
    };
    attachListener = () => {
        window.addEventListener('scroll', this.onChange);
        window.addEventListener('resize', this.onChange);
    };
    removeListener = () => {
        window.removeEventListener('scroll', this.onChange);
        window.removeEventListener('resize', this.onChange);
    };
    componentDidMount() {
        this.attachListener();
        this.onChange();
    }
    render() {
        return <div ref={this.ref}>{this.props.children}</div>;
    }
}
