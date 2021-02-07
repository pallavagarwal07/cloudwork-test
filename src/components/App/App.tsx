import React, { PureComponent } from 'react';

import { WorkloadListContainer } from '../WorkloadList';
import { WorkloadFormContainer } from '../WorkloadForm';
import './App.css';


class App extends PureComponent {
  render() {
    return (
      <div className="m80 off10">
        <h1 id="heading">CloudWork</h1>
        <hr />

        <div className="m60">
          <h2>Workloads</h2>
          <WorkloadListContainer />
        </div>
        
        <div className="m40 boundary WorkloadForm">
          <WorkloadFormContainer />
        </div>
      </div>
    );
  }
}

export default App;
