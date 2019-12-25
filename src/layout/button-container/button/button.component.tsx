import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

import { rxEventBus } from '../../../common/rxeventbus';

import './button.style.sass';

export interface IButtonProps {
    variant  : any;
    position : number;
}

export const ButtonComponent: React.FC<IButtonProps> = (props: IButtonProps) => {
    // нажатие на кнопку
    const buttonClick: () => void = () => {
        rxEventBus.publish('button-click', {
            position: props.position,
            datetime: new Date()
        });
    };

    return (
        <Button type="button" variant={props.variant} size="lg" onClick={buttonClick}>
            <FontAwesomeIcon icon={faStopwatch} size="3x" /> <div>#{props.position}</div>
        </Button>
    );
}
