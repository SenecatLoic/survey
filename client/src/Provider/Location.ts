import { getAll } from "./utils"

export const getLocations = getAll("/api/locations")
export async function updateLocation(location: any) {
    try {
        const response = await fetch(`http://${process.env.REACT_APP_SERVEUR}/api/locations/update/${location.id}`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: location.editedName })
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}


