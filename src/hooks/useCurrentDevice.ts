import {Device, DeviceType} from "../model/Device";
import {useBrowserName} from "./useBrowserName";

export function useCurrentDevice(): Device {
    const currentDeviceJson = localStorage.getItem('currentDevice');
    const browserName = useBrowserName()

    if (currentDeviceJson) {
        return JSON.parse(currentDeviceJson);
    }
    // create a new device, since we don't have saved one
    const device: Device = {
        id: generateDeviceId(16),
        deviceType: DeviceType.COMPUTER,
        name: `(${browserName})`,
        active: false,
        volume: 50
    }

    localStorage.setItem('currentDevice', JSON.stringify(device));

    return device;
}

function generateDeviceId(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}