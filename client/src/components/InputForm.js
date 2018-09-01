import React from 'react';
import ClientsTable from './ClientsTable';
import Select from './Select';


class InputForm extends React.Component {

    render() {
        
        return (
            <div className="row my-4">
                <div className="col-6">
                    <Select selectAgent={this.props.selectAgent} />
                    <button 
                        className="btn btn-primary" 
                        onClick={this.props.initMap}>
                        Initialize
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={this.props.displayMap}>
                        Display Map
                    </button>
                </div>
                <div className="col-6">
                    <h2>Clients</h2>
                    <ClientsTable selectClients={this.props.selectClients}/>
                </div>
            </div>
        )
    }
}

export default InputForm;