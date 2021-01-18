import React, {Component} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class FormFillersRow extends Component {
  render() {
    return (
      <tr>
        <td>
          <input
            className="iv-input"
            type="text"
            value={this.props.name ? this.props.name : ''} // lol wtf
            onChange={(e) => this.props.saveRow(this.props.formFillerIndex, this.props.index, 'name', e.target.value)}
          />
        </td>

        <td>
          <input
            className="iv-input"
            type="text"
            value={this.props.value ? this.props.value : ''}
            onChange={(e) => this.props.saveRow(this.props.formFillerIndex, this.props.index, 'value', e.target.value)}
            id={'ffv-' + this.props.formFillerIndex + '-' + this.props.index}
          />
        </td>

        <td className="iv-control">
          <div onClick={() => this.props.handlePick(this.props.formFillerIndex, this.props.index)}>
            <FontAwesomeIcon icon={['fas', 'crosshairs']}/>
          </div>

          <div className="iv-control__alert"
               onClick={() => this.props.deleteRow(this.props.formFillerIndex, this.props.index)}>
            <FontAwesomeIcon icon={['fas', 'times']}/>
          </div>
        </td>
      </tr>
    );
  }
}

export default FormFillersRow;
