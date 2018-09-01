import React from 'react';
import clients from '../fakeApi/clients';

class ClientsTable extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let checked = event.target.checked;
        let waypoint = clients.filter(client => client.id === event.target.value)[0];
        this.props.selectClients(waypoint, checked)
    }

    render() {
        let clientsRows = clients.map((client, index) => {
            return <tr key={index}>
                    <th scope="row">{client.id}</th>
                    <td>{client.name}</td>
                    <td>{client.street}</td>
                    <td>{client.city}</td>
                    <td>{client.zip}</td>
                    <td className="text-center">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            value={client.id}
                            onChange={this.handleChange}                    
                        />
                    </td>
                </tr>
            
        })
        
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Street</th>
                    <th scope="col">City</th>
                    <th scope="col">Zip</th>
                    <th scope="col">Visit</th>
                    </tr>
                </thead>
                <tbody>                            
                    {clientsRows}
                </tbody>
            </table>
            
        )
    }
}

export default ClientsTable;