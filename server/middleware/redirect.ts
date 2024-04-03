import db from "~/server/db";

export default defineEventHandler(async (event) => {
  if (event.path === "/api") {
    throw createError({ status: 400 });
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
