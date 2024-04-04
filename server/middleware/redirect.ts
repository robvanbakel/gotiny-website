import { kv } from "@vercel/kv";
import db from "~/server/db";

export default defineEventHandler(async (event) => {
  if (event.method === "POST" && event.path === "/api") {
    const body = await readBody(event);
    await kv.set(new Date().toISOString(), JSON.stringify(body));
    return setResponseStatus(event, 404);
  }

  if (event.method === "POST" || ["/"].includes(event.path)) return;

  const code = event.path.slice(1);

  const entry = await db.findOneAndUpdate(
    { code },
    { $inc: { visited: 1 }, $set: { lastActive: Date.now() } },
  );

  if (!entry) {
    setResponseStatus(event, 404);
    return;
  }

  return sendRedirect(event, entry?.long, 308);
});
