export default (input: string): string | null => {
  let urlPrefix = "";

  if (!input.startsWith("http")) {
    urlPrefix = "http://";
  }

  try {
    const urlObject = new URL(urlPrefix + input);
    return urlObject.href;
  } catch {
    return null;
  }
};
