import 'mapbox-gl/dist/mapbox-gl.css';
import { Component } from 'react';
import Map, { HeatmapLayer, CircleLayer, Layer, Popup, Source, MarkerDragEvent, Marker } from 'react-map-gl';
import GeocoderControl from './geocoder';

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export class PointSelectorMap extends Component<{ style: any }> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Map reuseMaps
                initialViewState={{
                    longitude: -79.347,
                    latitude: 43.651,
                    zoom: 5
                }}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                style={this.props.style}
                mapStyle="mapbox://styles/mapbox/satellite-v9">
                {TOKEN !== undefined &&
                    <GeocoderControl mapboxAccessToken={TOKEN} position="top-left"></GeocoderControl>
                }
            </Map>
        );
    }
}