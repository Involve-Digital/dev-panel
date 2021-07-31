import React, {Component} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class UsefulLinksRow extends Component {
  render() {
    return (
      <tr>
        <td>
          <input
            className="iv-input"
            type="text"
            onChange={(e) => this.props.saveRow(this.props.index, 'title', e.target.value)}
            value={this.props.title}
          />
        </td>

        <td>
          <input
            className="iv-input"
            type="text"
            onChange={(e) => this.props.saveRow(this.props.index, 'link', e.target.value)}
            value={this.props.link}
          />
        </td>

        <td>
          <input
            className="iv-checkbox"
            type="checkbox"
            onChange={(e) => this.props.saveRow(this.props.index, 'newTab', e.target.checked)}
            checked={!!this.props.newTab}
          />
        </td>

        <td className="iv-control">
          <div onClick={() => this.props.moveUp(this.props.index)} data-tip="move up">
            <FontAwesomeIcon icon={['fas', 'arrow-up']}/>
          </div>

          <div onClick={() => this.props.moveDown(this.props.index)} data-tip="move down">
            <FontAwesomeIcon icon={['fas', 'arrow-down']}/>
          </div>
        </td>

        <td className="iv-control">
          <div className="iv-control__alert" onClick={() => this.props.deleteRow(this.props.index)} data-tip="delete-row">
            <FontAwesomeIcon icon={['fas', 'times']}/>
          </div>
        </td>
      </tr>
    );
  }
}

export default UsefulLinksRow;
