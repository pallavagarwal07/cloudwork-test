import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { submit } from '../../state/workloads/actions';


interface WorkloadFormDispatchProps {
  submitWorkload: (complexity: number) => void;
}

interface WorkloadFormProps extends 
  WorkloadFormDispatchProps {}

interface WorkloadFormState {
  complexity: number;
}

class WorkloadForm extends React.PureComponent<WorkloadFormProps, WorkloadFormState> {
  defaultState = {
    complexity: 5,
  }

  state = this.defaultState;

  handleSubmit = (e: React.MouseEvent) => {
    this.props.submitWorkload(this.state.complexity);
    this.setState(this.defaultState);
    e.preventDefault();
  }

  render() {
    return (
      <form>
        <h2 className="CreateTitle">Create a workload</h2>
        
        <div>
          <label className="Complexity">
            Complexity: {this.state.complexity}
            <br />
            <input 
              value={this.state.complexity} 
              onChange={(e) => this.setState({ complexity: Number(e.target.value) })} 
              type="range" 
              min="1" 
              max="10" 
              className = "Slider"
            />
          </label>
        </div>

        <div>
          <button onClick={this.handleSubmit} type="submit" className="Submit">
            Start work
          </button>
        </div>
      </form>
    );
  }
}


const mapDispatchToProps = (dispatch: Dispatch): WorkloadFormDispatchProps => ({
  submitWorkload: (complexity: number) => dispatch(submit({ complexity })),
});

const WorkloadFormContainer = connect(null, mapDispatchToProps)(WorkloadForm);


export {
  WorkloadForm,
  WorkloadFormContainer,
}

export default WorkloadForm;
