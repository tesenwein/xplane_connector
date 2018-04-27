
declare module 'react-leaflet-rotatedmarker' {

    import { Marker, MarkerProps, MarkerEvents, Path } from 'react-leaflet';
    import { MarkerOptions } from 'leaflet';

    import * as Leaflet from 'leaflet';
    import * as React from 'react';

    export default class RotatedMarker<P extends RotatedMarkerProps = RotatedMarkerProps, E extends Leaflet.Marker = Leaflet.Marker> extends Marker<P, E> {
        
    }

    export interface RotatedMarkerProps extends MarkerProps {
        rotationAngle?: number
        rotationOrigin?: string
    }
}
