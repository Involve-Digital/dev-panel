import React from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import DevPanel from "../../devPanel";
import Section from "../_parts/section";
import Slat from "../_parts/slat";
import Settings from "../_parts/settings";
import Modal from "../_parts/modal";
import SaveButton from "../_parts/saveButton";
import Tooltip from "../_parts/tooltip";

import UsefulLinksRow from "./usefulLinksRow";

import {store} from 'react-notifications-component';
import ReactTooltip from "react-tooltip";

class UsefulLinks extends Section {
  constructor(props) {
    super(props, 'useful-links');

    this.state.usefulLinks = DevPanel.clone(window.devPanel.data.usefulLinks);

    this.saveRow = this.saveRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.save = this.save.bind(this);
  }

  shouldComponentUpdate() {
    if (!window.devPanel.hasConfigurationJustChanged) {
      return true;
    }

    if (!DevPanel.equals(this.state.usefulLinks, window.devPanel.data.usefulLinks)) {
      this.state.usefulLinks = DevPanel.clone(window.devPanel.data.usefulLinks);
    }

    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    ReactTooltip.rebuild();
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

  moveUp(index) {
    const usefulLinks = this.state.usefulLinks;

    if (index === 0) {
      return;
    }

    const previousUsefulLink = usefulLinks[index - 1];

    usefulLinks[index - 1] = usefulLinks[index];
    usefulLinks[index] = previousUsefulLink;

    this.setState({
      usefulLinks: usefulLinks
    });
  }

  moveDown(index) {
    const usefulLinks = this.state.usefulLinks;

    if (index === usefulLinks.length - 1) {
      return;
    }

    const nextUsefulLink = usefulLinks[index + 1];

    usefulLinks[index + 1] = usefulLinks[index];
    usefulLinks[index] = nextUsefulLink;

    this.setState({
      usefulLinks: usefulLinks
    });
  }

  save() {
    window.devPanel.data.usefulLinks = DevPanel.clone(this.state.usefulLinks);
    window.devPanel.saveData();

    this.toggleModal();

    store.flashMessage('data saved successfully');
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
            {window.devPanel.data.usefulLinks.map((value, index) => {
              return <li key={index}>
                <a type="button" href={value.link} target={value.newTab ? '_blank' : ''}>
                  <FontAwesomeIcon icon={['fas', value.newTab ? 'external-link-alt' : 'arrow-circle-right']}/>
                  {value.title}
                </a>
              </li>
            })}
          </ul>

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
                      <Tooltip text="Name of destination; is displayed in dev-panel"/>
                    </th>
                    <th>Link #</th>
                    <th>New tab</th>
                    <th>Sort</th>
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
                      newTab={value.newTab}
                      saveRow={this.saveRow}
                      deleteRow={this.deleteRow}
                      moveUp={this.moveUp}
                      moveDown={this.moveDown}
                    />
                  })}

                  <tr>
                    <td colSpan="3"></td>
                    <td className="iv-control">
                      <div className="iv-control__success" onClick={() => this.addRow()} data-tip="add row">
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
