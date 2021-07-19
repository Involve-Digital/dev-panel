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

        <td className="iv-control">
          <div className="iv-control__alert" onClick={() => this.props.deleteRow(this.props.index)}>
            <FontAwesomeIcon icon={['fas', 'times']}/>
          </div>
        </td>
      </tr>
    );
  }
}

export default UsefulLinksRow;
