import React, {useCallback, useEffect, useRef} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MiniDrawer from './components/sidebar/Sidebar';
import Login from "./login";
import Search from "./components/search/Search";
import AudioPlayer from "./components/player/AudioPlayer";
import {HomePageContent} from "./app/home/HomePageContent";
import HomePage from "./app/home/HomePage";
import usePlayer from "./hooks/usePlayer";
import {useCurrentDevice} from "./hooks/useCurrentDevice";
import {useConnectDevice} from "./hooks/useConnectDevice";
import Queue from "./app/Queue";
import {Box} from "@mui/material";
import {PlaylistPage} from "./app/playlist/PlaylistPage";

const Layout = ({children}: any) => {
    return (

        <Box sx={{
            display: 'flex', position: 'relative',
            maxHeight: '100vh',
            flexGrow: 1,
        }}>
            <MiniDrawer/>
            {/* Main content */}
            <main style={{flexGrow: 1,width:"calc(100vh - 240px)", overflow: 'auto', height: 'calc(100vh - 100px)'}}>
                {children}
            </main>
            <AudioPlayer/>
        </Box>
    );
};

function App() {
    // const currentDevice = useCurrentDevice();
    // const [onConnectDevice, onDisconnectRequest] = useConnectDevice(currentDevice)
    const initialized = useRef(false)

    // useEffect(() => {
    //     if (!initialized.current) {
    //         initialized.current = true;
    //         onConnectDevice()
    //             .then(resp => console.log('connected device with status: ' + resp.status))
    //
    //         return () => {
    //             onDisconnectRequest().then(() => console.log('disconnected device'))
    //         }
    //     }
    //
    // }, [])

    return (
        <div className="App">
            <BrowserRouter>
                <Layout>

                    <Routes>
                        <Route path={"/"} element={<HomePage/>}/>
                        <Route path={"/search"} element={<Search/>}/>
                        <Route path={'/queue'} element={<Queue/>}/>
                        <Route path={"/playlist/:playlistId"} element={<PlaylistPage/>}/>
                    </Routes>
                </Layout>
            </BrowserRouter>
        </div>
    );
}

export default App;
