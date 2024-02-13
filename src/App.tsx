import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MiniDrawer from './components/sidebar/Sidebar';
import Login from "./login";
import Search from "./components/search/Search";
import AudioPlayer from "./components/player/AudioPlayer";
import {HomePageContent} from "./app/home/HomePageContent";
import HomePage from "./app/home/HomePage";
import usePlayer from "./hooks/usePlayer";

const Layout = ({ children }: any) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)', position: 'relative' }}>
                    {/* MiniDrawer */}
                    <MiniDrawer />

                    {/* Main content */}
                    <main style={{ flexGrow: 1, padding: '20px' }}>
                        {children}
                    </main>
                </div>
            </div>

            <AudioPlayer />
        </div>
    );
};

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                    <Layout>

                        <Routes>
                            <Route path={"/"} element={<HomePage/>}>
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
