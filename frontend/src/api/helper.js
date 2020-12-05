export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const handleApiResponse = async (resp) => {
  const json = await resp.json();
  if (json.status !== "SUCCESS") {
    throw Error(json.message);
  }
  return json;
};
