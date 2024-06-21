export interface Device {
    id: string;
    name: string;
    active: boolean;
    volume: number;
    deviceType: DeviceType;
}

export enum DeviceType {
    COMPUTER
}