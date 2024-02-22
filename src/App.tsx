import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Navigate, Route, Routes} from 'react-router-dom';

import {np_1, np_2, np_3} from "./app/floors";
import {renderFloor} from "./app/render";
import {KnxSwitchReport} from "./app/reports/KnxSwitchReport";
import {AllItemsReport, MissingItemsReport} from "./app/reports/ItemsReport";

function App() {
    return <Router>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item"><Link className="nav-link" to="/np1" style={{padding: 5}}>1.NP</Link>
                        </li>
                        <li className="nav-item"><Link className="nav-link" to="/np2" style={{padding: 5}}>2.NP</Link>
                        </li>
                        <li className="nav-item"><Link className="nav-link" to="/np3" style={{padding: 5}}>3.NP</Link>
                        </li>
                        <li className="nav-item"><Link className="nav-link" to="/AllItemsReport" style={{padding: 5}}>Vsetky
                            zariadenia</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/MissingItemsReport"
                                                       style={{padding: 5}}>Chybajuce
                            zariadenia</Link></li>
                        {/*<li className="nav-item"><Link className="nav-link" to="/KnxSwitchReport" style={{padding: 5}}>KNX*/}
                        {/*    tlacidla</Link></li>*/}
                    </ul>

                </div>
            </div>
        </nav>

        <main className="container-fluid">
            <div className="bg-light p-5 rounded">
                <Routes>
                    <Route path="/" element={<Navigate replace to="/np1"/>}/>
                    <Route path="/np1" element={renderFloor(np_1)}/>
                    <Route path="/np2" element={renderFloor(np_2)}/>
                    <Route path="/np3" element={renderFloor(np_3)}/>
                    <Route path="/AllItemsReport" element={AllItemsReport()}/>
                    <Route path="/KnxSwitchReport" element={KnxSwitchReport()}/>
                    <Route path="/MissingItemsReport" element={MissingItemsReport()}/>
                </Routes>
            </div>
        </main>
    </Router>
}

export default App;
