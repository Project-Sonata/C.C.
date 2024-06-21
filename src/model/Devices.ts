import {Device} from "./Device";

export interface Devices {

    devices: Device[]; // List of devices

    isEmpty(): boolean; // Check if the list is empty
    size(): number; // Get the size of the list
    get(index: number): Device; // Get device at specified index
}
