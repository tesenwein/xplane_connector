import * as React from 'react';
import { AirportInterface } from "../../lib/Airport";
import AirportIndex from '../../lib/AirportIndex';
import { FlightData, AirpotDistanceInterface } from "../../lib/FlightData";
import ShortInfo from "../Airport/ShortInfo";

export interface ClosestAiprotsStates {
    connected: boolean
    airports: AirportInterface[]
}

export interface ClosestAiprotsProps {
}

export default class ClosestAiprots extends React.Component<ClosestAiprotsProps, ClosestAiprotsStates> {

    public componentMounted: boolean = false;


    public constructor(props: ClosestAiprotsProps) {
        super(props)

        this.state = {
            connected: false,
            airports: []
        }
    }


    public componentWillMount() {

        this.componentMounted = true

        const nearByCount = Math.floor(100 / parseInt(localStorage.getItem("lastZoomInFlightMap") || '13'))

        FlightData.nearbyAiports(nearByCount).then((airportList) => {
            this.setState({ airports: airportList })
        })

        FlightData.on("sig_postion", () => {
            if (this.componentMounted) {
                const nearByCount = Math.floor(100 / parseInt(localStorage.getItem("lastZoomInFlightMap") || '13'))
                FlightData.nearbyAiports(nearByCount).then((airportList) => {
                    this.setState({ airports: airportList })
                })
            }
        })
    }

    public componentWillUnmount(){
        this.componentMounted = false
    }

    public render() {

        const rows: JSX.Element[] = []
        let counter = 0;

        this.state.airports.map((airportItem) => {
            rows.push(<ShortInfo key={airportItem.toString() + counter} airport={airportItem} />);
            counter = counter + 1
        });

        return (
            <div>{rows}</div>
        );
    }
}
