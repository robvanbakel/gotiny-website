import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefhkmnprstwxyz2345678");

export default (length = 6): string => {
  const code = nanoid(length);

  return code;
};
