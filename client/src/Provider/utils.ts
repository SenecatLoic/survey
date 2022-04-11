export function getAll(url: string) {
  return async function () {
    try {
      console.log(process.env.REACT_APP_SERVEUR);
      console.log(url);
      const response = await fetch(`${process.env.REACT_APP_SERVEUR}${url}`, {
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
  };
}
