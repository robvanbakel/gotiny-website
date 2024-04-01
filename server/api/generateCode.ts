export default defineEventHandler(async (event) => {
  const { long } = await readBody<{ long: string }>(event);
  const { rootApi } = useRuntimeConfig(event);

  return $fetch<{ long: string; code: string }>(rootApi, {
    method: "POST",
    body: { long },
  });
});
