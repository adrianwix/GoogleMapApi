import React from 'react';
import './GoogleMap.css';

class GoogleMap extends React.Component {
    render() {
        return (
            <div>
                <div id="right-panel"></div>
                <div id="map"></div>
            </div>
        )
    }
}

export default GoogleMap;