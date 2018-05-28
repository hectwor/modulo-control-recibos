import React, { Component } from 'react';

import './css/Header.css';


class Header extends Component {
    render() {
        return (
            <div className="header">
                <header className="Logo">
                    <h2 className="titulo">Módulo Control de Recibos </h2>
                    <h3 className="titulo">Nueva Recaudación </h3>
                </header>

            </div>
        );
    }
}

export default Header;