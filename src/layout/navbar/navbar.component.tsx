import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { Navbar, Nav } from 'react-bootstrap';

import { rxEventBus } from '../../common/rxeventbus';

export const NavbarComponent: React.FC = () => {
    // уведомить все компоненты о сбросе
    const reset = () => {
        rxEventBus.publish('reset-click');
    };

    return (
        <Navbar bg="info" variant="dark" fixed="top" className="justify-content-between">
            <Navbar.Brand href="#!">
                <FontAwesomeIcon icon={faClock} size="lg" fixedWidth /> КНОПКИ-СЧЕТЧИКИ
            </Navbar.Brand>
            <Nav>
                <Nav.Item>
                    <Nav.Link eventKey="reset" onClick={reset}>
                        <FontAwesomeIcon icon={faTimes} size="sm" /> Сброс
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar>
    );
}
