import { sessionDataType } from "../../context/session.context.tsx";

export const fetchAPIData = async (
  endpoint: string,
  sessionData: sessionDataType,
) => {
  const API_KEY: string | undefined = sessionData?.api.apiKey;
  const API_URL: string | undefined = sessionData?.api.apiUrl;

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
