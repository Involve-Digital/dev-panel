import React, {Component} from "react";

import UsefulLinks from "../sections/usefulLinks/usefulLinks";
import FormFillers from "../sections/formFillers/formFillers";
import UserLogins from "../sections/userLogins/userLogins";
import CacheCleaner from "../sections/cacheCleaner/cacheCleaner";
import Help from "../sections/help/help";

class Body extends Component {
  render() {
    return (
      <div className="iv-panel__body">
        <div>
          <UsefulLinks/>
          <FormFillers toggle={this.props.toggle}/>
          <UserLogins/>
          <CacheCleaner/>
          <Help/>
        </div>
      </div>
    );
  }
}

export default Body;
