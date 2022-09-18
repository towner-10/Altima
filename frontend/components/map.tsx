import 'mapbox-gl/dist/mapbox-gl.css';
import { Component } from 'react';
import Map, { MapRef } from 'react-map-gl';
import { useState, useRef } from 'react';
import { useControl, Marker, MarkerProps, ControlPosition } from 'react-map-gl';
import MapboxGeocoder, { GeocoderOptions } from '@mapbox/mapbox-gl-geocoder';
import Pin from './pin';

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type GeocoderControlProps = Omit<GeocoderOptions, 'accessToken' | 'mapboxgl' | 'marker'> & {
    mapboxAccessToken: string;
    marker?: boolean | Omit<MarkerProps, 'longitude' | 'latitude'>;

    position: ControlPosition;

    onLoading?: (e: object) => void;
    onResults?: (e: object) => void;
    onResult?: (e: object) => void;
    onError?: (e: object) => void;
    onMarkerDrag?: (e: object) => void;
};

GeocoderControl.defaultProps = {
    marker: true,
    onLoading: () => { },
    onResults: () => { },
    onResult: () => { },
    onError: () => { },
    onMarkerDrag: () => { }
};

export class PointSelectorMap extends Component<{ style: any, markerEvent: (e: object) => void }> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Map
                initialViewState={{
                    longitude: -79.347,
                    latitude: 43.651,
                    zoom: 5
                }}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                style={this.props.style}
                mapStyle="mapbox://styles/mapbox/satellite-v9">
                {TOKEN !== undefined &&
                    <GeocoderControl onResult={(e) => this.props.markerEvent(e)} onMarkerDrag={(e) => this.props.markerEvent(e)} mapboxAccessToken={TOKEN} position="top-left"></GeocoderControl>
                }
            </Map>
        );
    }
}

export function CheckMap(props: { location: any, style: any }) {

    const mapRef = useRef<MapRef>(null);

    return (
        <Map
            ref={mapRef}
            initialViewState={{
                longitude: -79.347,
                latitude: 43.651,
                zoom: 5
            }}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            style={props.style}
            mapStyle="mapbox://styles/mapbox/satellite-v9"
            onLoad={() => {
                mapRef.current?.flyTo({
                    center: {
                        lng: props.location.longitude,
                        lat: props.location.latitude
                    }, animate: true, zoom: 10, duration: 2000
                })
            }}>
            <Marker
                longitude={props.location.longitude}
                latitude={props.location.latitude}
                anchor="bottom"
            >
                <Pin size={20} />
            </Marker>
        </Map>
    );
}

function GeocoderControl(props: GeocoderControlProps) {
    const [marker, setMarker] = useState<React.ReactElement | null>(null);

    const geocoder = useControl<MapboxGeocoder>(
        () => {
            const ctrl = new MapboxGeocoder({
                ...props,
                marker: false,
                accessToken: props.mapboxAccessToken
            });

            if (props.onLoading !== undefined) ctrl.on('loading', props.onLoading);
            if (props.onResults !== undefined) ctrl.on('results', props.onResults);
            ctrl.on('result', evt => {
                const { result } = evt;
                const location = result && (result.center || (result.geometry?.type === 'Point' && result.geometry.coordinates));

                if (props.onResult !== undefined) props.onResult({
                    lng: location[0],
                    lat: location[1]
                });

                if (location && props.marker) {
                    setMarker(<Marker draggable={true} onDragEnd={(e) => {
                        if (props.onMarkerDrag !== undefined) props.onMarkerDrag({
                            lng: e.lngLat.lng,
                            lat: e.lngLat.lat
                        });
                    }} longitude={location[0]} latitude={location[1]}>
                        <Pin />
                    </Marker>);
                } else {
                    setMarker(null);
                }
            });

            if (props.onError !== undefined) ctrl.on('error', props.onError);

            return ctrl;
        },
        {
            position: props.position
        }
    );

    return marker;
}