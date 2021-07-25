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

        <td>
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    className="iv-checkbox"
                    type="checkbox"
                    value="change"
                    checked={this.props.events.includes('change')}
                    onChange={(e) => this.props.saveRow(this.props.formFillerIndex, this.props.index, 'events', e.target.value, e.target.checked)}
                  />
                  <small>change</small>
                </td>

                <td>
                  <input
                    className="iv-checkbox"
                    type="checkbox"
                    value="input"
                    checked={this.props.events.includes('input')}
                    onChange={(e) => this.props.saveRow(this.props.formFillerIndex, this.props.index, 'events', e.target.value, e.target.checked)}
                  />
                  <small>input</small>
                </td>

                <td>
                  <input
                    className="iv-checkbox"
                    type="checkbox"
                    value="click"
                    checked={this.props.events.includes('click')}
                    onChange={(e) => this.props.saveRow(this.props.formFillerIndex, this.props.index, 'events', e.target.value, e.target.checked)}
                  />
                  <small>click</small>
                </td>

                <td>
                  <input
                    className="iv-checkbox"
                    type="checkbox"
                    value="keyup"
                    checked={this.props.events.includes('keyup')}
                    onChange={(e) => this.props.saveRow(this.props.formFillerIndex, this.props.index, 'events', e.target.value, e.target.checked)}
                  />
                  <small>keyup</small>
                </td>

                <td>
                  <input
                    className="iv-checkbox"
                    type="checkbox"
                    value="paste"
                    checked={this.props.events.includes('paste')}
                    onChange={(e) => this.props.saveRow(this.props.formFillerIndex, this.props.index, 'events', e.target.value, e.target.checked)}
                  />
                  <small>paste</small>
                </td>
              </tr>
            </tbody>
          </table>
        </td>

        <td className="iv-control">
          <div
            onClick={() => this.props.handlePick(this.props.formFillerIndex, this.props.index)}
            data-tip="pick input from page"
          >
            <FontAwesomeIcon icon={['fas', 'crosshairs']}/>
          </div>

          <div
            className="iv-control__alert"
            onClick={() => this.props.deleteRow(this.props.formFillerIndex, this.props.index)}
            data-tip="delete row"
          >
            <FontAwesomeIcon icon={['fas', 'times']}/>
          </div>
        </td>
      </tr>
    );
  }
}

export default FormFillersRow;
