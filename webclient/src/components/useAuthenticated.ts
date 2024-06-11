import useSWR from "swr";
import {HOST} from "../pages/BrowseFiles/useBrowseFiles";

const getAuthenticated = async (url: string) => {
    let isAuthenticated = false;

    const response = await fetch(url, {
        credentials: "include",
    });

    const body = await response.text();

    if (body !== "anonymousUser") {
        isAuthenticated = true;
    }

    return isAuthenticated;
}

export default () => {
    // need to somehow eliminate the cache here or something else because I need to click twice on the menus for it to work
    const {
        data: isAuthenticated,
        ...others
    } = useSWR(() => `${HOST}/pentaho/api/session/userName`, getAuthenticated);

    return {isAuthenticated, ...others};
}
