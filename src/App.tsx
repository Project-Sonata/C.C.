import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./login";

function App() {
    return (
        <div className="App">
            <h1>Application</h1>
            <BrowserRouter>
                <Routes>
                    <Route path={"/login"} element={<Login/>}>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
