import {Device, DeviceType} from "../model/Device";
import {SONATA_CONNECT_API} from "./api/config";
import {secureFetch} from "./secureFetch";


export function useConnectDevice(device: Device) {
    const json = {
        "id": device.id,
        "name": device.name,
        "device_type": DeviceType[device.deviceType],
        "volume": device.volume
    };

    const onConnectRequest = () => {
        return secureFetch(`${SONATA_CONNECT_API}/v1/player/devices`,
            {
                method: 'POST',
                body: JSON.stringify(json)
            })
    };

    const onDisconnectRequest = () => {
        return secureFetch(`${SONATA_CONNECT_API}/v1/player/devices?device_id=${device.id}`,
            {
                method: 'DELETE',
            })
    };

    return [onConnectRequest, onDisconnectRequest];
}