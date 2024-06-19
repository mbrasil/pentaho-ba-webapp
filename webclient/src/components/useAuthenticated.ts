import useSWR from "swr";

export const HOST = import.meta.env.VITE_HOST ?? "";

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
    const {
        data: isAuthenticated,
        ...others
    } = useSWR(() => `${HOST}/pentaho/api/session/userName`, getAuthenticated);

    return {isAuthenticated, ...others};
}
