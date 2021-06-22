import React from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import Section from "../parts/section";
import Slat from "../parts/slat";
import Settings from "../parts/settings";
import Modal from "../parts/modal";
import SaveButton from "../parts/saveButton";
import Tooltip from "../parts/tooltip";

import Shortcuts from "../parts/shortcuts";
import UserLoginsRow from "./userLoginsRow";
import {store} from "react-notifications-component";

class UserLogins extends Section {
  constructor(props) {
    super(props, 'user-logins');

    this.state.userLogins = JSON.parse(JSON.stringify(window.devPanel.userLogins));

    this.addRow = this.addRow.bind(this);
    this.saveRow = this.saveRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.saveQuickLogin = this.saveQuickLogin.bind(this);
    this.save = this.save.bind(this);

    this.handleQuickLogIn = this.handleQuickLogIn.bind(this);
    this.handleQuickLogOut = this.handleQuickLogOut.bind(this);
  }

  componentDidMount() {
    super.componentDidMount();

    window.addEventListener('keydown', this.handleQuickLogIn);
    window.addEventListener('keydown', this.handleQuickLogOut);
  }

  handleQuickLogIn(e) {
    if (this.shouldBeEventStopped(e)) {
      return;
    }

    let logins = window.devPanel.userLogins.logins;

    if (e.code === 'KeyA') {
      for (let i = 0; i < logins.length; i++) {
        if (logins[i].admin) {
          this.logInAs(logins[i]);
          return;
        }
      }
    }

    if (e.code === 'KeyK') {
      for (let i = 0; i < logins.length; i++) {
        if (logins[i].customer) {
          this.logInAs(logins[i]);
          return;
        }
      }
    }
  }

  handleQuickLogOut(e) {
    if (this.shouldBeEventStopped(e)) {
      return;
    }

    if (e.code === 'KeyO') {
      this.logOut();
    }
  }

  saveField(field, value) {
    const userLogins = this.state.userLogins;
    userLogins[field] = value;

    this.setState({
      userLogins: userLogins
    });
  }

  addRow() {
    const userLogins = this.state.userLogins;
    userLogins.logins.push({title: '', username: '', password: '', redirect: '', admin: false, customer: false});

    this.setState({
      userLogins: userLogins
    });
  }

  saveRow(index, field, value) {
    const userLogins = this.state.userLogins;
    userLogins.logins[index][field] = value;

    this.setState({
      userLogins: userLogins
    });
  }

  saveQuickLogin(index, type, value) {
    const userLogins = this.state.userLogins;

    for (let i = 0; i < userLogins.logins.length; i++) {
      userLogins.logins[i][type] = false;
    }

    userLogins.logins[index][type] = value;

    this.setState({
      userLogins: userLogins
    });
  }

  deleteRow(index) {
    const userLogins = this.state.userLogins;

    if (userLogins.logins.length <= 1) {
      userLogins.logins[index] = {title: '', username: '', password: '', redirect: '', admin: false, customer: false};
    } else {
      userLogins.logins.splice(index, 1);
    }

    this.setState({
      userLogins: userLogins
    });
  }

  save() {
    window.devPanel.userLogins = JSON.parse(JSON.stringify(this.state.userLogins));
    window.saveDevPanelData();

    this.toggleModal();

    store.flashMessage('data saved successfully');
  }

  logInAs(login) {
    let logInLink = window.devPanel.userLogins.logInLink;

    let firstJoint = '?';
    if (logInLink.includes('?')) {
      firstJoint = '&;'
    }

    logInLink = logInLink + firstJoint
      + 'username=' + login.username
      + '&password=' + login.password
      + '&redirect=' + login.redirect;

    var url = new URL(window.location.href);
    var backlink = url.searchParams.get('backlink');

    if (backlink) {
      logInLink = logInLink + '&backlink=' + backlink;
    }

    window.location.href = logInLink;
  }

  logOut() {
    window.location.href = window.devPanel.userLogins.logOutLink;
  }

  render() {
    return (
      <div className="iv-accordion">
        <Slat
          isOpened={this.state.isOpened}
          toggle={this.toggle}
          icon="user"
          text="User logins"
        />

        <div className={'iv-accordion__content' + (this.state.isOpened ? ' opened' : '')}>
          <ul className="iv-list iv-list--links">
            {window.devPanel.userLogins.logins.map((value, index) => {
              return <li key={index}><a type="button" onClick={() => this.logInAs(value)}>
                <FontAwesomeIcon icon={['fas', 'user-lock']}/>
                {value.title}
              </a>
              </li>
            })}
            <li>
              <a onClick={() => this.logOut()} type="button">
                <FontAwesomeIcon icon={['fas', 'user-times']}/>
                Log-out
              </a>
            </li>

          </ul>

          <hr className="iv-hr"/>

          <Shortcuts shortcuts={[
            {key: 'a', description: 'log-in as admin'},
            {key: 'k', description: 'log-in as customer'},
            {key: 'o', description: 'log-out'},
          ]}
          />

          <hr className="iv-hr"/>

          <Settings buttons={[{icon: 'user-edit', onClick: this.toggleModal}]}/>
        </div>

        <Modal
          opened={this.state.isModalOpened}
          close={this.toggleModal}
          width={900}
          title="Useful links"
          content={
            <>
              <table className="iv-table">
                <thead>
                  <tr>
                    <th>
                      Log-in link
                      <Tooltip text="Link to where you will be redirected while logging-in; Backend logic for log-in is on specified URL; username and password are passed as URL parameters"/>
                    </th>
                    <th>
                      Log-out link
                      <Tooltip text="Link to where you will be redirected while logging-out; Backend logic for log-out is on specified URL"/>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      <input
                        className="iv-input"
                        type="text"
                        onChange={(e) => this.saveField('logInLink', e.target.value)}
                        value={this.state.userLogins.logInLink}
                      />
                    </td>
                    <td>
                      <input
                        className="iv-input"
                        type="text"
                        onChange={(e) => this.saveField('logOutLink', e.target.value)}
                        value={this.state.userLogins.logOutLink}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <hr className="iv-hr"/>

              <table className="iv-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>
                      Redirect
                      <Tooltip text="Link to where you will be redirected after as logging specified user"/>
                    </th>
                    <th>
                      ad.
                      <Tooltip text='User login, that will be used for keyboard combo "shift + a"'/>
                    </th>
                    <th>
                      cu.
                      <Tooltip text='User login, that will be used for keyboard combo "shift + k"'/>
                    </th>
                    <th className="iv-control">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.userLogins.logins.map((value, index) => {
                    return <UserLoginsRow
                      key={index}
                      index={index}
                      title={value.title}
                      username={value.username}
                      password={value.password}
                      redirect={value.redirect}
                      admin={value.admin}
                      customer={value.customer}
                      saveRow={this.saveRow}
                      deleteRow={this.deleteRow}
                      saveQuickLogin={this.saveQuickLogin}
                    />
                  })}

                  <tr>
                    <td colSpan="6"></td>
                    <td className="iv-control">
                      <div className="iv-control__success">
                        <FontAwesomeIcon
                          icon={['fas', 'plus']}
                          onClick={() => this.addRow()}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <hr className="iv-hr"/>

              <SaveButton onClick={this.save}/>
            </>
          }
        />
      </div>
    );
  }
}

export default UserLogins;
