import useSWR from "swr";
import {HOST} from "../pages/BrowseFiles/useBrowseFiles";

const getAuthenticated = async (url: string) => {
    let isAuthenticated = false;

    try {
        const response = await fetch(url, {
            credentials: "include",
        });

        if (!response.ok) {
            console.error("not ok:", response.statusText);
        } else {
            isAuthenticated = true;
        }
    } catch (error) {
        console.error("something went wrong:", error);
    }

    return isAuthenticated;
}

export default () => {
    const {
        data: isAuthenticated,
        ...others
    } = useSWR(() => `${HOST}/pentaho/api/mantle/isAuthenticated`, getAuthenticated);

    return {isAuthenticated, ...others};
}
