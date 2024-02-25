import {Device, DeviceType} from "../model/Device";


export function useConnectDevice(device: Device) {
    const token = 'Bearer token1'
    const json = {
        "id": device.id,
        "name": device.name,
        "device_type": DeviceType[device.deviceType],
        "volume": device.volume
    };

    const onConnectRequest = () => {
        console.log('sedning connect device request')
        return fetch('http://localhost:8080/v1/player/device/connect',
            {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(json)
            })
    };

    const onDisconnectRequest = () => {
        console.log('sedning disconnect device request')
        return fetch('http://localhost:8080/v1/player/device?device_id=' + device.id,
            {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            })
    };

    return [onConnectRequest, onDisconnectRequest];
}