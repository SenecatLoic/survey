export async function getDevices() {
  try {
    const response = await fetch("http://localhost:3000/api/devices", {
      method: "Get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}
