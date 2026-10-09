
export default defineEventHandler(async (event) => {
  const body = await readBody<{ question?: string }>(event)

  const question = body?.question?.trim()

  if (!question) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Question is required',
    })
  }

  return {
    success: true,
    message: `Hello from the Nuxt server! You asked: "${question}"`,
    question,
  }
})