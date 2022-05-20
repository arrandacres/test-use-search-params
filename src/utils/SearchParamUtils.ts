export const getObjectFromSearchParams = (urlSearchParams: URLSearchParams) => {
  const urlSearchParamsEntries = Array.from(urlSearchParams.entries());

  const urlSearchParamsObject = urlSearchParamsEntries.reduce(
    (uspo, [entryKey, entryValue]) => ({
      ...uspo,
      [entryKey]: entryValue
    }),
    {}
  );

  return urlSearchParamsObject;
};
