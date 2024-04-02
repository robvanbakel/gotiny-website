import db from "~/server/db";
import getNormalizedUrl from "~/utils/getNormalizedUrl";
import getRandomCode from "~/utils/getRandomCode";

export default defineEventHandler(async (event) => {
  const { long } = await readBody<{ long: string }>(event);

  const normalizedUrl = getNormalizedUrl(long);
  if (!normalizedUrl) throw new Error("No valid URL found");

  const code = getRandomCode();

  await db.insertOne({
    long: normalizedUrl,
    code,
    lastActive: null,
    createdAt: Date.now(),
    visited: 0,
  });

  return {
    code,
    long: normalizedUrl,
  };
});
