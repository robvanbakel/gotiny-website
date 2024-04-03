import isUrl from "is-url";

export default (input: string): string => {
  const fullUrl = (input.startsWith("http") ? "" : "http://") + input;

  if (!isUrl(fullUrl)) throw new Error("Invalid URL provided");

  const parsed = new URL(fullUrl);

  if (parsed.username) throw new Error("URL cannot have a username");

  const normalized = parsed.href;

  return normalized;
};
