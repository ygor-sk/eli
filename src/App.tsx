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
        <Routes>
            <Route path="/" element={<Navigate replace to="/np1"/>}/>
            <Route path="/np1" element={renderFloor(np_1)}/>
            <Route path="/np2" element={renderFloor(np_2)}/>
            <Route path="/np3" element={renderFloor(np_3)}/>
        </Routes>
    </Router>


    // return (
    //     <Router>
    //         <div>
    //             <nav>
    //                 <ul>
    //                     <li>
    //                         <Link to="/">Home</Link>
    //                     </li>
    //                     <li>
    //                         <Link to="/about">About</Link>
    //                     </li>
    //                     <li>
    //                         <Link to="/users">Users</Link>
    //                     </li>
    //                 </ul>
    //             </nav>
    //
    //             {/* A <Switch> looks through its children <Route>s and
    //         renders the first one that matches the current URL. */}
    //             <Switch>
    //                 <Route path="/about">
    //                     <About/>
    //                 </Route>
    //                 <Route path="/users">
    //                     <Users/>
    //                 </Route>
    //                 <Route path="/">
    //                     <Home/>
    //                 </Route>
    //             </Switch>
    //         </div>
    //     </Router>
    // );
}

export default App;
