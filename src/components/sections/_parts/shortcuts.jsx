import React, {Component} from "react";

class Shortcuts extends Component {
  render() {
    return (
      <>
        {this.props.shortcuts.map((value, index) => {
          return <div className="iv-help" key={index}>
            <span className="iv-help__key">Shift</span>
            <span> + </span>
            <span className="iv-help__key">{value.key}</span>
            <span> = </span>
            <span>{value.description}</span>
          </div>
        })}
      </>
    );
  }
}

export default Shortcuts;
