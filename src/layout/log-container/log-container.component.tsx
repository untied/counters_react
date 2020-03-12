import React, { useContext, useEffect } from 'react';

import { rxEventBus } from '../../common/rxeventbus';
import { ILogEntry, LogStorageContext, add, flush } from '../../common/log.storage';

import { LogEntryComponent } from './log-entry/log-entry.component';

import './log-container.style.sass';

// mount effect
const useMountEffect = (fn: () => void) => useEffect(fn, []);


export const LogContainerComponent: React.FC = () => {
    // get state and dispatch method from the context
    const { state, dispatch } = useContext(LogStorageContext);

    // got a new event to write in the log
    const onLogEntry = (data: any): void => {
        if (dispatch) {
            dispatch(
                add({
                    position  : data.position,
                    clickTime : data.clickTime,
                    logTime   : data.logTime
                })
            );
        }
    };

    // got a new event to reset the log
    const onLogFlush = (): void => {
        if (dispatch) {
            dispatch(flush());
        }
    };

    // subscribe on events
    useMountEffect(() => {
        rxEventBus.subscribe('log-entry', onLogEntry);
        rxEventBus.subscribe('reset-click', onLogFlush);
    });

    return (
        <section>
            <div className="log-container__header">Event Log / Number of Records: {state.logEntries.length}</div>
            <div className="log-container__body">
                {
                    state.logEntries.map((logEntry: ILogEntry, index: number) => (
                        <LogEntryComponent
                            position={logEntry.position}
                            logTime={logEntry.logTime}
                            clickTime={logEntry.clickTime}
                            key={index + 1}
                        />
                    ))
                }
            </div>
        </section>
    );
}
