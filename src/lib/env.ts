function getEnv(key: string): string {
  const value = process.env[key]

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }

  return value
}

export const env = {
  RESEND_API_KEY: getEnv("RESEND_API_KEY"),
  CONTACT_EMAIL: getEnv("CONTACT_EMAIL"),
  CONTACT_FROM_EMAIL: getEnv("CONTACT_FROM_EMAIL"),
  CONTACT_AUTO_REPLY: process.env.CONTACT_AUTO_REPLY === "true",
}
