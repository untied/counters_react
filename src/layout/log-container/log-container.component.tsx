import React, { useContext, useEffect } from 'react';

import { rxEventBus } from '../../common/rxeventbus';
import { ILogEntry, LogStorageContext, add, flush } from '../../common/log.storage';

import { LogEntryComponent } from './log-entry/log-entry.component';

import './log-container.style.sass';

// эффект монтирования компонента, выполняется только один раз
const useMountEffect = (fn: () => void) => useEffect(fn, []);


export const LogContainerComponent: React.FC = () => {
    // забираем состояние и диспетчера из контекста
    const { state, dispatch } = useContext(LogStorageContext);

    // пришло новое событие для записи в лог
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

    // пришло новое событие для очистки лога
    const onLogFlush = (): void => {
        if (dispatch) {
            dispatch(flush());
        }
    }

    // подписка на события
    useMountEffect(() => {
        rxEventBus.subscribe('log-entry', onLogEntry);
        rxEventBus.subscribe('reset-click', onLogFlush);
    });

    return (
        <section>
            <div className="log-container__header">Лог событий / Записей: {state.logEntries.length}</div>
            <div className="log-container__body">
                {
                    state.logEntries.map((logEntry: ILogEntry, index: number) => {
                        return (
                            <LogEntryComponent
                                position={logEntry.position}
                                logTime={logEntry.logTime}
                                clickTime={logEntry.clickTime}
                                key={index + 1}
                            />
                        );
                    })
                }
            </div>
        </section>
    );
}
