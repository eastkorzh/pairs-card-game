import React from 'react';

class TimeLog extends React.Component {
    constructor(props) {
        super(props);
        this.createTimeTable = this.createTimeTable.bind(this);
    }

    createTimeTable() {
        const timeLog4 = this.props.timeLog4;
        const timeLog6 = this.props.timeLog6;
        const elements = [];

        if (!timeLog4[0] && !timeLog6[0]) return <div className="nothing">It's nothing here yet</div>;        

        if (this.props.mode === 'x4') {
            for (let i = timeLog4.length; i > 0 ; i--) {               
                let elem = <div key = {i}>{timeLog4[i - 1]}</div>
                elements.push(elem)
            }
        } else {
            for (let i = timeLog6.length; i > 0 ; i--) {               
                let elem = <div key = {i}>{timeLog6[i - 1]}</div>
                elements.push(elem)
            }
        }

        return elements;
    }

    render() {
        return (
            <div className = "time-log">
                <p>Best time</p>
                {this.createTimeTable()}
            </div>
        )
    }
}

export default TimeLog;