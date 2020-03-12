import { createContext } from 'react';

// enum of action types
export enum LogActionType {
    ADD,
    FLUSH
}

// single log action
export interface ILogAction {
    logEntry? : ILogEntry,
    type      : LogActionType
}

// single log record
export interface ILogEntry {
    position  : number;
    clickTime : Date;
    logTime   : Date;
}

// log state: the list of log records
export interface ILogState {
    logEntries: ILogEntry[];
}

// initial log state: an empty list
export const initialState: ILogState = {
    logEntries: []
};

// just the reducer
export const reducer = (state: ILogState = initialState, action: ILogAction): ILogState => {
    switch(action.type) {
        // add a new record to log
        case LogActionType.ADD:
            return action.logEntry ? {
                logEntries: [action.logEntry, ...state.logEntries]
            } : state;
        // flush the log
        case LogActionType.FLUSH:
            return {
                logEntries: []
            }
        default:
            return state
    }
}

// add a new record to log
export const add = (logEntry: ILogEntry): ILogAction => ({ type: LogActionType.ADD, logEntry })

// flush the log
export const flush = (): ILogAction => ({ type: LogActionType.FLUSH })

// interface to describe the context content
interface ILogStorageContext {
    dispatch? : React.Dispatch<ILogAction>,
    state     : ILogState
}

// create the  context instance
export const LogStorageContext = createContext({
    state: initialState
} as ILogStorageContext);
