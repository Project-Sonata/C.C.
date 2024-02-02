import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MiniDrawer from './components/sidebar/Sidebar';
import Login from "./login";
import Search from "./components/search/Search";


const Layout = ({children}: any) => {
    return (
        <div style={{display: 'flex'}}>
            <MiniDrawer/>
            <main style={{flexGrow: 1, padding: '20px'}}>
                {children}
            </main>
        </div>
    );
};

function Home() {
    return (
        <div>
            HOME
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <BrowserRouter>

                <Layout>
                    <Routes>
                        <Route path={"/"} element={<Home/>}>
                        </Route>
                        <Route path={"/search"} element={<Search/>}>
                        </Route>
                    </Routes>
                </Layout>
            </BrowserRouter>
        </div>
    );
}

export default App;
