import { getAll } from "./utils"

export const getDevices = getAll("/api/devices");

export async function updateDevice(device: any) {
    try {
        const response = await fetch(`http://${process.env.REACT_APP_SERVEUR}/api/devices/update/${device.id}`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ location: device.locationId, currentSurvey: device.currentSurvey })
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}