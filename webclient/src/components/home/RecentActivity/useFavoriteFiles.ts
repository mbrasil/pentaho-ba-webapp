import { parseUserSettingFiles } from "../../../lib/utils";
import {useEffect, useState} from "react";
import useUserSettings from "../../../lib/hooks/useUserSettings";

export const MOCK_DATA = [
  { fullPath: "/home/pat/baz.xanlyzer", title: "Baz", lastUse: 0 },
];

export default () => {
  const [favoriteFiles, setFavoriteFiles] = useState([]);

  const {
    data,
    isLoading,
    ...others
  } = useUserSettings("favorites");

  useEffect(() => {
    if (!isLoading && data != null) {
      setFavoriteFiles(parseUserSettingFiles(data));
    }
  }, [data, isLoading]);

  return { favoriteFiles, isLoading, ...others };
}
