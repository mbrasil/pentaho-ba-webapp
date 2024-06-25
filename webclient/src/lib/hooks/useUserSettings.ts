import useSWR from "swr";
import { HOST } from "../utils";

const getUserSettings = async (url: string) => {
  try {
    const data =  await fetch(url).then((res) => res.text());

    const okButNotOkResponse = data.startsWith("<!doctype html>");
    if (!okButNotOkResponse) {
      return data;
    }
  } catch (error) {
    console.error(`error getting user setting from [${url}]`, error);
  }

  return null;
}

/*
 * Possible values
 *  - list: get all settings values in xml format
 *  - recent: stringified array with recent files
 *  - favorites: stringified array with favorites files
 *  - pentaho-user-theme: active theme
 *  - user_selected_language: active locale
 *  - MANTLE_SHOW_NAVIGATOR: ...
 *  - MANTLE_SHOW_HIDDEN_FILES: ...
 */
export default (setting = "list") => {
  return useSWR(`${HOST}/pentaho/api/user-settings/${setting}`, getUserSettings);
}
