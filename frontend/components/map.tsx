import 'mapbox-gl/dist/mapbox-gl.css';
import { Component } from 'react';
import Map from 'react-map-gl';
import * as React from 'react';
import { useState } from 'react';
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
                    <GeocoderControl onResult={(e) => this.props.markerEvent(e)} onMarkerDrag={(e) => this.props.markerEvent(e)} mapboxAccessToken={TOKEN} position="top-left"></GeocoderControl>
                }
            </Map>
        );
    }
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

    // @ts-ignore (TS2339) private member
    if (geocoder._map) {
        if (geocoder.getProximity() !== props.proximity && props.proximity !== undefined) {
            geocoder.setProximity(props.proximity);
        }
        if (geocoder.getRenderFunction() !== props.render && props.render !== undefined) {
            geocoder.setRenderFunction(props.render);
        }
        if (geocoder.getLanguage() !== props.language && props.language !== undefined) {
            geocoder.setLanguage(props.language);
        }
        if (geocoder.getZoom() !== props.zoom && props.zoom !== undefined) {
            geocoder.setZoom(props.zoom);
        }
        if (geocoder.getFlyTo() !== props.flyTo && props.flyTo !== undefined) {
            geocoder.setFlyTo(props.flyTo);
        }
        if (geocoder.getPlaceholder() !== props.placeholder && props.placeholder !== undefined) {
            geocoder.setPlaceholder(props.placeholder);
        }
        if (geocoder.getCountries() !== props.countries && props.countries !== undefined) {
            geocoder.setCountries(props.countries);
        }
        if (geocoder.getTypes() !== props.types && props.types !== undefined) {
            geocoder.setTypes(props.types);
        }
        if (geocoder.getMinLength() !== props.minLength && props.minLength !== undefined) {
            geocoder.setMinLength(props.minLength);
        }
        if (geocoder.getLimit() !== props.limit && props.limit !== undefined) {
            geocoder.setLimit(props.limit);
        }
        if (geocoder.getFilter() !== props.filter && props.filter !== undefined) {
            geocoder.setFilter(props.filter);
        }
        if (geocoder.getOrigin() !== props.origin && props.origin !== undefined) {
            geocoder.setOrigin(props.origin);
        }
    }
    return marker;
}