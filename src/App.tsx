import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Navigate, Route, Routes} from 'react-router-dom';

import {np_1, np_2, np_3} from "./app/rooms/floors";
import {renderFloor} from "./app/render";
import {KnxSwitchReport} from "./app/reports/KnxSwitchReport";
import {AllItemsReport, MissingItemsReport} from "./app/reports/ItemsReport";
import {AllItemSummaryReport, MissingItemSummaryReport} from "./app/reports/ItemSummaryReport";

function App() {
    return <Router>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item"><Link className="nav-link" to="/np1">1.NP</Link>
                        </li>
                        <li className="nav-item"><Link className="nav-link" to="/np2">2.NP</Link>
                        </li>
                        <li className="nav-item"><Link className="nav-link" to="/np3">3.NP</Link>
                        </li>
                        <li className="nav-item"><Link className="nav-link" to="/AllItemsReport">Vsetky
                            zariadenia</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/MissingItemsReport"
                        >Chybajuce
                            zariadenia</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/AllItemSummaryReport">Vsetky
                            zariadenia - Sumar</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/MissingItemSummaryReport">Chybajuce
                            zariadenia - Sumar</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/KnxSwitchReport">KNX
                            tlacidla</Link></li>
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
                    <Route path="/MissingItemsReport" element={MissingItemsReport()}/>
                    <Route path="/AllItemSummaryReport" element={AllItemSummaryReport()}/>
                    <Route path="/MissingItemSummaryReport" element={MissingItemSummaryReport()}/>
                    <Route path="/KnxSwitchReport" element={KnxSwitchReport()}/>
                </Routes>
            </div>
        </main>
    </Router>
}

export default App;
