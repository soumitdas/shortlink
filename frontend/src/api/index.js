import { API_BASE_URL, handleApiResponse } from "./helper";

const shorten = async (data) => {
  const resp = await fetch(`${API_BASE_URL}/shorten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleApiResponse(resp);
};

const shortenWithCustom = async (data, authToken) => {
  const resp = await fetch(`${API_BASE_URL}/shorten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(data),
  });
  return handleApiResponse(resp);
};

const getLinks = async (authToken, page, limit) => {
  const resp = await fetch(
    `${API_BASE_URL}/links?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return handleApiResponse(resp);
};

const getLinkByShortCode = async (shortCode) => {
  const resp = await fetch(`${API_BASE_URL}/links/${shortCode}`);
  return handleApiResponse(resp);
};

const getLinkAnalytics = async (shortCode, authToken) => {
  const resp = await fetch(`${API_BASE_URL}/links/${shortCode}/analytics`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return handleApiResponse(resp);
};

const api = {
  shorten,
  shortenWithCustom,
  getLinks,
  getLinkByShortCode,
  getLinkAnalytics,
};

export default api;
