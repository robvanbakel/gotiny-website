export default defineEventHandler(async (event) => {
  if (event.method === "POST" || ["/"].includes(event.path)) return;

  const { rootApi } = useRuntimeConfig(event);
  const endpoint = new URL(event.path, rootApi);

  try {
    const { long } = await $fetch<{ long: string }>(endpoint.href);
    return sendRedirect(event, long, 308);
  } catch (err) {
    console.log("Could not find code:", event.path);
  }
});
