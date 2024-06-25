import { parseUserSettingFiles } from "../../../lib/utils";
import {useEffect, useState} from "react";
import useUserSettings from "../../../lib/hooks/useUserSettings";

export const MOCK_DATA = [
  { fullPath: "/home/admin/foo.xanlyzer", title: "Foo", lastUse: 0 },
  { fullPath: "/home/suzy/bar.xanlyzer", title: "Bar", lastUse: 0 },
  { fullPath: "/home/pat/baz.xanlyzer", title: "Baz", lastUse: 0 },
];

export default () => {
  const [recentFiles, setRecentFiles] = useState([]);

  const {
    data,
    isLoading,
    ...others
  } = useUserSettings("recent");

  useEffect(() => {
    if (!isLoading && data != null) {
      setRecentFiles(parseUserSettingFiles(data));
    }
  }, [data, isLoading]);

  return { recentFiles, isLoading, ...others };
}
