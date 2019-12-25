import React, { useReducer } from 'react';
import { reducer, initialState, LogStorageContext } from './common/log.storage';

import './app.style.sass';

import { NavbarComponent } from './layout/navbar/navbar.component';
import { ButtonContainerComponent } from './layout/button-container/button-container.component';
import { LogContainerComponent } from './layout/log-container/log-container.component';

export const AppComponent: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className="app">
            <NavbarComponent />
            <ButtonContainerComponent />
            <LogStorageContext.Provider value={{dispatch, state}}>
                <LogContainerComponent />
            </LogStorageContext.Provider>
        </div>
    );
}
