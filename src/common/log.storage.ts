import { createContext } from 'react';

// множество вариантов для действия с логом
export enum LogActionType {
    ADD,
    FLUSH
}

// действие с логом
export interface ILogAction {
    logEntry? : ILogEntry,
    type      : LogActionType
}

// одна запись в логе
export interface ILogEntry {
    position  : number;
    clickTime : Date;
    logTime   : Date;
}

// состояние лога: список записей
export interface ILogState {
    logEntries: ILogEntry[];
}

// исходное состояние лога: пустой список
export const initialState: ILogState = {
    logEntries: []
};

// редьюсер
export const reducer = (state: ILogState = initialState, action: ILogAction): ILogState => {
    switch(action.type) {
        // добавление новой записи в лог
        case LogActionType.ADD:
            return action.logEntry ? {
                logEntries: [action.logEntry, ...state.logEntries]
            } : state;
        // очистка лога
        case LogActionType.FLUSH:
            return {
                logEntries: []
            }
        default:
            return state
    }
}

// добавление записи в лог
export const add = (logEntry: ILogEntry): ILogAction => ({ type: LogActionType.ADD, logEntry })

// очистка лога
export const flush = (): ILogAction => ({ type: LogActionType.FLUSH })

// интерфейс для представления того, что есть в контексте
interface ILogStorageContext {
    dispatch? : React.Dispatch<ILogAction>,
    state     : ILogState
}

// создаем сам контекст
export const LogStorageContext = createContext({
    state: initialState
} as ILogStorageContext);
