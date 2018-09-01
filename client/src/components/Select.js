import React from 'react';
import agents from '../fakeApi/agents';

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        if (event.target.value === "") {
            return;
        }
        let agent = agents.filter(agent => { return agent.id === event.target.value});
        this.props.selectAgent(agent[0]);
    }

    render() {
        let options = agents.map(agent => {
            return <option key={agent.id} value={agent.id}>{agent.name}</option>
        })
    
        return (
            <select className="custom-select" onChange={this.handleChange}>
                <option value="">Select Agent</option>
                {options}
            </select>
        )
    }
    
}

export default Select;