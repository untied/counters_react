import React from 'react';

import './button-container.style.sass';

import { ButtonComponent } from './button/button.component';

export const ButtonContainerComponent: React.FC = () => {
    return (
        <div className="button-container">
            <ButtonComponent variant="success" position={1} />
            <ButtonComponent variant="warning" position={2} />
            <ButtonComponent variant="danger"  position={3} />
        </div>
    );
}
