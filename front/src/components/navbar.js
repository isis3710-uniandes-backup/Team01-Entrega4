import React, { Component } from 'react';
import '../styles/navbar.css';

export default class navbar extends Component{

    render() {
        return(
            <div className="container">
                <nav id="menu" className="menu">
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

            </div>
        )
    }
}
