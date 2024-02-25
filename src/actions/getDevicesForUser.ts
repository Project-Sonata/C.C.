import {Device, DeviceType} from "../model/Device";

export default function getDevicesForUser(): Promise<Device[]> {
    const token = 'Bearer token1'

    return fetch('http://localhost:8080/v1/player/devices', {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (Object.keys(response.json.length !== 0)) {
           return response.json()
               .then(body => body.devices)
                .then(array => array.map((elem: any) => ({
                    id: elem.id,
                    name: elem.name,
                    active: elem.active,
                    volume: elem.volume,
                    deviceType: elem.deviceType
                })))
        } else {
            return []
        }
    })
}