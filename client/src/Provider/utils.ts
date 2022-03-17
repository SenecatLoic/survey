export function getAll(url: string) {
  return async function () {
    try {
      const response = await fetch(
        `https://${process.env.REACT_APP_SERVEUR}${url}`,
        {
          method: "Get",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
}
