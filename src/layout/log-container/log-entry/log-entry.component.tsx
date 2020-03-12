import React from 'react';
import Moment from 'react-moment';
import Badge from 'react-bootstrap/Badge';

import './log-entry.style.sass';

export interface ILogEntryProps {
    position: number;
    logTime: Date;
    clickTime: Date;
}

export const LogEntryComponent: React.FC<ILogEntryProps> = (props: ILogEntryProps) => {
    let variant: any;

    // select a variant to display the button pressed
    switch (props.position) {
        case 1:
            variant = 'success';
            break;
        case 2:
            variant = 'warning';
            break;
        case 3:
            variant = 'danger';
            break;
        default:
            variant = 'secondary';
    }

    return (
        <div className="log-entry">
            <div className="log-entry__log-time">
                <Moment format="HH:mm:ss.SSS">{props.logTime}</Moment>
            </div>
            <div className="log-entry__description">
                <Badge variant={variant}>Pressed button #{props.position}</Badge>
            </div>
            <div className="log-entry__click-time">
                click time:
                &nbsp;
                <span>
                    <Moment format="HH:mm:ss.SSS">{props.clickTime}</Moment>
                </span>
            </div>
        </div>
    );
}
