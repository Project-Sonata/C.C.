import {create} from "zustand";
import {Device} from "../model/Device";


interface DeviceState {
    activeDevice?: Device,
    inactiveDevices: Device[],

    addInactiveDevice: (device: Device) => void,
    setActiveDevice: (device: Device) => void,
    setInactiveDevices: (devices: Device[]) => void,
}


const useDevices = create<DeviceState>((set, get) => ({
    activeDevice: undefined,
    inactiveDevices: [],
    addInactiveDevice: (device) => {
        get().inactiveDevices.push(device)
    },
    setActiveDevice: (device) => set({activeDevice: device}),
    setInactiveDevices: (inactiveDevices) => set({inactiveDevices: inactiveDevices})
}))

export default useDevices;