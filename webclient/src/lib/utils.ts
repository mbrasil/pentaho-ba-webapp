export const HOST = import.meta.env.VITE_HOST ?? "";

export const range = (len: number) => Array.from(Array(len), (v, i) => i);

export const parseUserSettingFiles = (data: string) => {
  try {
    const list = data?.length > 0 ? JSON.parse(data) : [];

    // @ts-ignore
    return list.map(({ fullPath, title, lastUse }) => {
      const tokens = fullPath.split("/");
      const { [tokens.length - 1]: filename } = tokens;

      return {
        id: filename,
        name: title,
        type: filename.split(".")[1],
        owner: null,
        update: Date.now() - lastUse
      }
    });
  } catch (error) {
    console.error("error parsing user setting files", error);
  }

  return [];
}
