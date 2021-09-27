import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

window.devPanel = {
  links: {
    obtainConfigurations: 'http://involve-cms/utils/dev-panel/obtain-configurations',
    exportConfiguration: 'http://involve-cms/utils/dev-panel/export-configuration',
    obtainData: 'http://involve-cms/utils/dev-panel/obtain-data',
    saveData: 'http://involve-cms/utils/dev-panel/save-data',
  },

  getCurrentConfiguration: function () {
    let name = 'dev-panel-configuration' + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return 'default';
  },

  loadConfigurations: function () {
    var request = new XMLHttpRequest();
    request.open('GET', window.devPanel.links.obtainConfigurations, false);
    request.onload = function () {
      window.devPanel.configurations = JSON.parse(this.response);
    };
    request.send();
  },

  exportConfiguration: function (configuration) {
    if (!configuration) {
      configuration = window.devPanel.getCurrentConfiguration();
    }

    window.location.href = window.devPanel.links.exportConfiguration + '?configuration=' + configuration;
  },

  loadData: function (configuration) {
    if (!configuration) {
      configuration = window.devPanel.getCurrentConfiguration();
    }

    var request = new XMLHttpRequest();
    request.open('GET', window.devPanel.links.obtainData + '?configuration=' + configuration, false);
    request.onload = function () {
      window.devPanel.data = JSON.parse(this.response);
    };
    request.send();
  },

  saveData: function () {
    let configuration = window.devPanel.getCurrentConfiguration();

    var request = new XMLHttpRequest();
    request.open('POST', window.devPanel.links.saveData + '?configuration=' + configuration, true);
    request.send(JSON.stringify(window.devPanel.data));
  }
};

window.devPanel.loadConfigurations();
window.devPanel.loadData();

ReactDOM.render(<App/>, document.getElementById('dev-panel'));
