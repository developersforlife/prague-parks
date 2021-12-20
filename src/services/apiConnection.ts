import config from "../config";

const getGardens = async (token: any) => {
  const endpoint = config.endpoint;
  const keyToUse = token ? token : config.token;
  try {
    const response = await fetch(endpoint, {
      //mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        "X-Access-Token": keyToUse,
      },
    });
    const textData = await response.text();
    return JSON.parse(textData);
  } catch (error) {
    return {
      error,
    };
  }
};
export default getGardens;
