import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Navigate, Route, Routes} from 'react-router-dom';

import {np_1, np_2, np_3} from "./app/floors";
import {renderFloor} from "./app/render";

function App() {
    return <Router>
        <nav style={{margin: 10}}>
            <Link to="/np1" style={{padding: 5}}>1.NP</Link>
            <Link to="/np2" style={{padding: 5}}>2.NP</Link>
            <Link to="/np3" style={{padding: 5}}>3.NP</Link>
        </nav>
        <div className={"main"}>
            <Routes>
                <Route path="/" element={<Navigate replace to="/np1"/>}/>
                <Route path="/np1" element={renderFloor(np_1)}/>
                <Route path="/np2" element={renderFloor(np_2)}/>
                <Route path="/np3" element={renderFloor(np_3)}/>
            </Routes>
        </div>
    </Router>
}

export default App;
