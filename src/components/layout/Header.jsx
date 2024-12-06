import React, {useState} from "react"

function Header({setActiveComponent}) {
    return <div>
        <ul id="dropdown1" className="dropdown-content">
            <li><a href="#!">one</a></li>
            <li><a href="#!">two</a></li>
            <li className="divider"></li>
            <li><a href="#!">three</a></li>
        </ul>
        <nav>
            <div className="nav-wrapper">
                <a href="#!" className="brand-logo">MultiTools</a>
                <ul className="right hide-on-med-and-down">
                    <li onClick={() => setActiveComponent('timer')}>Timer</li>
                    <li onClick={() => setActiveComponent('randomizer')}>Randomizer</li>
                    <li onClick={() => setActiveComponent('calculator')}>Calculator</li>
                    <li onClick={() => setActiveComponent('converter')}>Converter</li>
                    <li><a className="dropdown-trigger" href="#!" data-target="dropdown1">Help<i className="material-icons right">arrow_drop_down</i></a></li>
                </ul>
            </div>
        </nav> 
    </div>
}

export {Header}