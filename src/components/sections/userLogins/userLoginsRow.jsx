import React, {Component} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class UserLoginsRow extends Component {
  render() {
    return (
      <tr>
        <td>
          <input
            className="iv-input"
            type="text"
            onChange={(e) => this.props.saveRow(this.props.index, 'title', e.target.value)}
            value={this.props.title}/>
        </td>

        <td>
          <input
            className="iv-input"
            type="text"
            onChange={(e) => this.props.saveRow(this.props.index, 'username', e.target.value)}
            value={this.props.username}
          />
        </td>

        <td>
          <input
            className="iv-input"
            type="text"
            onChange={(e) => this.props.saveRow(this.props.index, 'password', e.target.value)}
            value={this.props.password}
          />
        </td>

        <td>
          <input
            className="iv-input"
            type="text"
            onChange={(e) => this.props.saveRow(this.props.index, 'redirect', e.target.value)}
            value={this.props.redirect}
          />
        </td>

        <td>
          <input
            className="iv-checkbox"
            type="checkbox"
            onChange={(e) => this.props.saveQuickLogin(this.props.index, 'admin', e.target.checked)}
            checked={this.props.admin}
          />
        </td>

        <td>
          <input
            className="iv-checkbox"
            type="checkbox"
            onChange={(e) => this.props.saveQuickLogin(this.props.index, 'customer', e.target.checked)}
            checked={this.props.customer}
          />
        </td>

        <td className="iv-control">
          <div className="iv-control__alert" onClick={() => this.props.deleteRow(this.props.index)} data-tip="delete row">
            <FontAwesomeIcon icon={['fas', 'times']}/>
          </div>
        </td>
      </tr>
    );
  }
}

export default UserLoginsRow;
