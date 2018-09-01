import React, { Component } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import GoogleMap from './components/GoogleMap';
import loadGoogleMapsAPI from 'load-google-maps-api';

const API_CONFIG = {
  key:'',
  language: 'en'
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        agent: {
          id: "1",
          name: "Iron Man",
          home: "50 Balmy St, San Francisco, CA 94110, EE. UU.",
          latitude: "37.752420",
          longitude: "-122.412450"
        },
        clients: [],
        googleMap: {}
    };
    this.map = {};
    this.directionsDisplay = {};
    this.directionsService = {};

    this.selectAgent = this.selectAgent.bind(this);
    this.selectClients = this.selectClients.bind(this);
    this.initMap = this.initMap.bind(this);
    this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this);
  }

  componentWillUnmount() {
    const allScripts = document.getElementsByTagName( 'script' );
    [].filter.call(
      allScripts,
      ( scpt ) => scpt.src.indexOf( 'key=' ) >= 0
    )[ 0 ].remove();
    window.google = {};
  }

  componentDidMount () {
    if(!this.state.googleMap) {
      loadGoogleMapsAPI( API_CONFIG ).then(googleMaps => {

        console.log(googleMaps);
        this.setState({googleMaps: googleMaps})

      }).catch(err => console.log(err));
    }
    
  }

  selectAgent(agent) {
    this.setState({
      agent: agent
    })
  }

  /**
   * 
   * @param {Object} client Clients to be added or remove 
   * @param {Boolen} checked Add or Deete client
   */
  selectClients(client, checked) {
    if (checked) {

      this.setState(
        prevState => ({clients: [...prevState.clients, client]}),
        () => console.log(this.state.clients)
      );   

    } else {

      const removeIndex = this.state.clients
                .map(item => item.id)
                .indexOf(client.id);

      const newClients= this.state.clients.slice();
      newClients.splice(removeIndex, 1);

      this.setState({
        clients: newClients
      })
    }
    
  }
  
  initMap() {
    
    if (this.state.agent.name === "Select an Agent!") {
      return;
    }
    let googleMaps = this.state.googleMap;
    this.directionsDisplay = new googleMaps.DirectionsRenderer;
    this.directionsService = new googleMaps.DirectionsService;

    console.log(this.state.agent);
    // Here I can enter the lat, lng of the Agents. Example {lat: 41.85, lng: -87.65}
    let map = new googleMaps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: this.state.agent.latitude, lng: this.state.agent.longitude}
    });
    this.directionsDisplay.setMap(map);
    this.directionsDisplay.setPanel(document.getElementById('right-panel'));

  }

  calculateAndDisplayRoute() {
    const {home} = this.state.agent;
    
    const waypoints= this.state.clients.map(waypoint => {
        return {
            location: waypoint.street + ", " + waypoint.city + waypoint.zip, 
            stopover: true
        }
    })

    if(!home) {
        console.log("This client doesnt have a home :C");
        return;
    }

    console.log(this.directionsService)
    this.directionsService.route(
    {
      origin: home, // var start
      destination: home, // var end
      waypoints: waypoints,
      travelMode: 'DRIVING'
    },
    function(response, status) {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <p>{this.state.agent.name}</p>
          </div>
        </div>
        <InputForm 
          selectAgent={this.selectAgent} 
          selectClients={this.selectClients} 
          initMap={this.initMap}
          displayMap={this.calculateAndDisplayRoute}
        />
        <GoogleMap/>
      </div>
    );
  }
}

export default App;
