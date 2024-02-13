import {Device} from "../model/Device";

export default function getDevicesForUser(): Promise<Device[]> {
    const devices: Device[] = [
        {
            active: false,
            name: "Odeyalo",
            id: "123"
        },
        {
            active: true,
            name: "Odeyalo_PC",
            id: "miku"
        }
    ]

    return Promise.all(devices)
}