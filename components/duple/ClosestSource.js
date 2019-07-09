import * as React from 'react';

const offset = 200;

const getMiddle = (min, max) => min + (max - min) / 2;

const getClosestSize = (height, width, sizes) =>
  sizes.find((size, index) => {
    const lowerBound = index === 0 ? 0 : getMiddle(sizes[index - 1], size);
    const upperBound = index === sizes.length ? Infinity : getMiddle(size, sizes[index + 1]);
    const biggestDimension = Math.max(height, width) * window.devicePixelRatio;
    return biggestDimension >= lowerBound && biggestDimension <= upperBound;
  });

export class ClosestSource extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.ref = React.createRef();
  }
  onChange = () => {
    if (this.ref.current) {
      const { top, bottom, width, height } = this.ref.current.getBoundingClientRect();

      const inViewport = top <= window.innerHeight + offset && bottom >= -offset;

      this.setState({ inViewport, width, height });
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
  componentWillUnmount() {
    this.removeListener();
  }
  render() {
    const { inViewport, width, height } = this.state;
    const sizes = Object.keys(this.props.sources);

    // until the node is mounted and measured, we return an undefined source
    const closestSource =
      inViewport === undefined
        ? undefined
        : this.props.sources[getClosestSize(width, height, sizes)];

    return (
      <div ref={this.ref}>
        {this.props.children({
          inViewport,
          source: closestSource,
        })}
      </div>
    );
  }
}
