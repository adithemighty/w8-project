import React from "react";

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }
  handleMouseIn = () => {
    this.setState({ hover: true });
  };

  handleMouseOut = () => {
    this.setState({ hover: false });
  };

  render() {
    const { element, tooltipText } = this.props;

    const visibility = this.state.hover
      ? "tooltip-visible "
      : "tooltip-invisible";

    return (
      <div className="tooltip-parent">
        <div onMouseOver={this.handleMouseIn} onMouseOut={this.handleMouseOut}>
          {element}
        </div>

        <div>
          <div className={visibility}>{tooltipText}</div>
        </div>
      </div>
    );
  }
}

export default Tooltip;
