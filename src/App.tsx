import React, {useRef} from 'react';
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import MiniDrawer from './components/sidebar/Sidebar';
import Login from "./login";
import Search from "./components/search/Search";
import AudioPlayer from "./components/player/AudioPlayer";
import HomePage from "./app/home/HomePage";
import {useCurrentDevice} from "./hooks/useCurrentDevice";
import {useConnectDevice} from "./hooks/useConnectDevice";
import Queue from "./app/Queue";
import {Box, Typography} from "@mui/material";
import {PlaylistPage} from "./app/playlist/PlaylistPage";
import {ProtectedRoute} from "./components/ProtectedRoute";
import {ProfileCircle} from "./components/ProfileCircle";
import {ProfilePage} from "./components/ProfilePage";
import Registration from "./components/registration/Registration";
import {AuthProvider} from "./context/AuthContext";

const Layout = () => {
    const user = {
        name: "Odeyalo",
        avatarUrl: "https://i.pinimg.com/736x/16/76/32/167632879f6b035992e0a0fad48df605.jpg", // or your avatar URL
    };

    return (
        <Box sx={{display: "flex", maxHeight: "100vh", flexGrow: 1, position: "relative"}}>
            <MiniDrawer/>

            <Box sx={{flexGrow: 1, display: "flex", flexDirection: "column", overflow: "hidden"}}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        px: 3,
                        py: 2,
                        bgcolor: "background.paper",
                    }}
                >
                    <Typography variant="h5" fontWeight={600}>
                        Welcome back, {user.name}
                    </Typography>
                    <ProfileCircle userName={user.name} avatarUrl={user.avatarUrl}
                                   onLogout={() => console.log("logout")}/>
                </Box>

                <Box component="main" sx={{flexGrow: 1, overflow: "auto", px: 3, pb: 2}}>
                    <Outlet/>
                </Box>

                <AudioPlayer/>
            </Box>
        </Box>
    );
}

function App() {
    const currentDevice = useCurrentDevice();
    const [onConnectDevice, onDisconnectRequest] = useConnectDevice(currentDevice)
    const initialized = useRef(false)
    //
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
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoute/>}>
                        <Route element={<Layout/>}>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/search" element={<Search/>}/>
                            <Route path="/queue" element={<Queue/>}/>
                            <Route path="/playlist/:playlistId" element={<PlaylistPage/>}/>
                            <Route path="/user/:userId" element={<ProfilePage/>}/>
                        </Route>
                    </Route>

                    <Route path="/login" element={<Login/>}/>
                    <Route path="/sign-up" element={<Registration/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
