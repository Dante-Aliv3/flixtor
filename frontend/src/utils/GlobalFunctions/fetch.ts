import { sessionDataType } from "../types/app.types.ts";

export const FetchAPIData = async (
  endpoint: string,
  { api: { apiKey: API_KEY, apiUrl: API_URL } }: sessionDataType,
) => {
  if (window.showSpinner) {
    window.showSpinner();
  }

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`,
  );

  const data = await response.json();

  window.hideSpinner();

  return data;
};
