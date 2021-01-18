import React from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import Section from "../parts/section";
import Slat from "../parts/slat";
import Settings from "../parts/settings";
import Modal from "../parts/modal";
import SaveButton from "../parts/saveButton";
import Tooltip from "../parts/tooltip";

import UsefulLinksRow from "./usefulLinksRow";

import { store } from 'react-notifications-component';

class UsefulLinks extends Section {
  constructor(props) {
    super(props, 'useful-links');

    this.state.usefulLinks = JSON.parse(JSON.stringify(window.devPanel.usefulLinks));

    this.saveRow = this.saveRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.save = this.save.bind(this);
  }

  addRow() {
    const usefulLinks = this.state.usefulLinks;
    usefulLinks.push({title: '', link: ''});

    this.setState({
      usefulLinks: usefulLinks
    });
  }

  saveRow(index, field, value) {
    const usefulLinks = this.state.usefulLinks;

    usefulLinks[index][field] = value;

    this.setState({
      usefulLinks: usefulLinks
    });
  }

  deleteRow(index) {
    const usefulLinks = this.state.usefulLinks;

    if (usefulLinks.length <= 1) {
      usefulLinks[index] = {title: '', link: ''};
    } else {
      usefulLinks.splice(index, 1);
    }

    this.setState({
      usefulLinks: usefulLinks
    });
  }

  save() {
    store.addNotification({
      title: "dev-panel",
      message: "data saved successfully",
      type: "success",
      insert: "top",
      container: "bottom-left",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeIn"],
      dismiss: {
        duration: 2000,
        onScreen: true
      }
    });

    window.devPanel.usefulLinks = JSON.parse(JSON.stringify(this.state.usefulLinks));
    window.saveDevPanelData();

    this.toggleModal();
  }

  render() {
    return (
      <div className="iv-accordion">
        <Slat
          isOpened={this.state.isOpened}
          toggle={this.toggle}
          icon="external-link-alt"
          text="Useful links"
        />

        <div className={'iv-accordion__content' + (this.state.isOpened ? ' opened' : '')}>
          <ul className="iv-list iv-list--links">
            {window.devPanel.usefulLinks.map((value, index) => {
              return <li key={index}><a type="button" href={value.link}>
                <FontAwesomeIcon icon={['fas', 'external-link-alt']}/>
                {value.title}
              </a></li>
            })}
          </ul>

          <hr className="iv-hr"/>

          <Settings buttons={[{icon: 'anchor', onClick: this.toggleModal}]}/>
        </div>

        <Modal
          opened={this.state.isModalOpened}
          close={this.toggleModal}
          width={450}
          title="Useful links"
          content={
            <>
              <table className="iv-table">
                <thead>
                  <tr>
                    <th>
                      Title
                      <Tooltip text="Name of destination; is displayed in dev-panel" />
                    </th>
                    <th>Link #</th>
                    <th className="iv-control">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.usefulLinks.map((value, index) => {
                    return <UsefulLinksRow
                      key={index}
                      index={index}
                      title={value.title}
                      link={value.link}
                      saveRow={this.saveRow}
                      deleteRow={this.deleteRow}
                    />
                  })}

                  <tr>
                    <td colSpan="2"></td>
                    <td className="iv-control">
                      <div className="iv-control__success" onClick={() => this.addRow()}>
                        <FontAwesomeIcon icon={['fas', 'plus']}/>
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

export default UsefulLinks;
