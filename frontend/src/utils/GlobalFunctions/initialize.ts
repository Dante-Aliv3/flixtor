import { FetchAPIData } from "./fetch.ts";
import { sessionDataType } from "../types/app.types.ts";

export const init = async (
  dispatch: React.Dispatch<any>,
  sessionData: sessionDataType,
  service: string,
  state: [],
  reducer: any,
) => {
  if (state.length < 1 || state === undefined) {
    const [stateRes] = await Promise.all([FetchAPIData(service, sessionData)]);

    const { results: data } = await stateRes;
    dispatch(reducer(data));
  }
};
