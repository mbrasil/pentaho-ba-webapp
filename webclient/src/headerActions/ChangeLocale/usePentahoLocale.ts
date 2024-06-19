import { useCallback } from "react";
import useSWR from "swr";
import useAuthenticated from "../../components/useAuthenticated";

const HOST = import.meta.env.VITE_HOST ?? "";

export const setPentahoLocale = async (locale: string) => {
  try {
    const response = await fetch(`${HOST}/pentaho/api/system/locale`, {
      method: "POST",
      body: locale
    });

    if (!response.ok) {
      console.error("not ok:", response.statusText);
      return;
    }

    console.log(`Locale changed successfully to ${locale}`);
  } catch (error) {
    console.error("something went wrong:", error);
  }
}

const getLocale = async (url: string) => {
  try {
    const locale =  await fetch(url, {
      cache: "no-cache",
    }).then((res) => res.text());

    const okButNotOkResponse = locale.startsWith("<!doctype html>");
    if (!okButNotOkResponse) {
      console.log("current pentaho locale:", locale);

      return locale;
    }
  } catch (ex) {
    console.error("error fetching locale:", ex);
  }

  return null;
}

export default () => {
  const { isAuthenticated } = useAuthenticated();

  const fetchLocale = useCallback((url: string) => {
    if (!isAuthenticated) {
      return;
    }

    return getLocale(url);
  }, [isAuthenticated]);

  const {
    data: locale,
    ...others
  } = useSWR(() => `${HOST}/pentaho/api/system/locale`, fetchLocale);

  return { locale, ...others };
}
