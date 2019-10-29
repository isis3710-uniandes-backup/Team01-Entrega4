import React, { Component } from 'react';
import '../styles/navbar.css';

export default class navbar extends Component{

    render() {
        return(
            <div className="container">
                <nav id="menu" className="menu d-none d-md-block">
                    <div className="logo"><i className="fas fa-home"></i></div>
                    <div className="menu_section section_1">Section 1</div>
                    <div className="menu__wrap_1">
                        <ul data-menu="main" className="menu__level">
                            <li className="menu__item"><a className="menu__link" href="#"><i className="fas fa-igloo"></i>Item 1</a></li>
                            <li className="menu__item"><a className="menu__link" href="#"><i className="fas fa-igloo"></i>Item 2</a></li>
                            <li className="menu__item"><a className="menu__link" href="#"><i className="fas fa-igloo"></i>Item 3</a></li>
                            <li className="menu__item"><a className="menu__link" href="#"><i className="fas fa-igloo"></i>Item 4</a></li>
                        </ul>
                    </div>

                    <div className="menu_section section_2">Section 2</div>
                    <div className="menu__wrap_2">
                        <ul data-menu="main" className="menu__level">
                            <li className="menu__item"><a className="menu__link" href="#"><i className="fas fa-igloo"></i>Item 1</a></li>
                            <li className="menu__item"><a className="menu__link" href="#"><i className="fas fa-igloo"></i>Item 2</a></li>
                            <li className="menu__item"><a className="menu__link" href="#"><i className="fas fa-igloo"></i>Item 3</a></li>
                            <li className="menu__item"><a className="menu__link" href="#"><i className="fas fa-igloo"></i>Item 4</a></li>
                        </ul>
                    </div>
                </nav>

                <nav id="menu_movil" className="menu_movil d-block d-sm-block d-md-none">
                    <div className="row">
                        <div className="col-5">
                            <div className="row">
                                <div className="col-6">
                                    <li className="menu_movil__item"><a className="menu_movil__link" href="#"><i className="fas fa-igloo"></i>Item 1</a></li>
                                </div>
                                <div className="col-6">
                                    <li className="menu_movil__item"><a className="menu_movil__link" href="#"><i className="fas fa-igloo"></i>Item 1</a></li>
                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="logo_movil"><a href="#"><i className="fas fa-home"></i></a></div>
                        </div>
                        <div className="col-5">
                            <div className="row">
                                <div className="col-6">
                                    <li className="menu_movil__item"><a className="menu_movil__link" href="#"><i className="fas fa-igloo"></i>Item 1</a></li>
                                </div>
                                <div className="col-6">
                                    <li className="menu_movil__item"><a className="menu_movil__link" href="#"><i className="fas fa-igloo"></i>Item 1</a></li>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
