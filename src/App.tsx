import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MiniDrawer from './components/sidebar/Sidebar';
import Login from "./login";
import Search from "./components/search/Search";
import AudioPlayer from "./components/player/AudioPlayer";

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

            {/* AudioPlayer */}
            <AudioPlayer />
        </div>
    );
};

const PlayerLayout = ({children}: any) => {
    return (
        <div>
            {children}
        </div>
    );
}

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
