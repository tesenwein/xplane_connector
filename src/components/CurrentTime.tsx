import * as React from 'react';
import * as dateFormat from 'dateformat';

interface ICurrentTimeState {
    currentTime: string;
}

export class CurrentTime extends React.Component<{}, ICurrentTimeState> {
    private currentTime: string = '';
    private intervaller: any = null;
    private date: Date;

    public constructor(props: any) {
        super(props);
        this.state = { currentTime: '' };
        this.date = new Date();
    }

    public render() {
        setInterval(() => {
            this.date = new Date();
            this.setState({ currentTime: dateFormat(this.date, 'isoUtcDateTime') });
        }, 1000);

        return <div>{this.state.currentTime}</div>;
    }
}

export default CurrentTime;
