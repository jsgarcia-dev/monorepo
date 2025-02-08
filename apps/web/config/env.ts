export const env = {
  // Endpoints
  API_URL: process.env.NEXT_PUBLIC_API_URL!,
  APP_URL: process.env.NEXT_PUBLIC_APP_URL!,

  // Database
  DATABASE_URL: process.env.DATABASE_URL!,

  // Auth
  AUTH_SECRET: process.env.AUTH_SECRET!,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
} as const;

// Validação das variáveis de ambiente
const requiredEnvs: Record<keyof typeof env, string> = {
  API_URL: 'NEXT_PUBLIC_API_URL',
  APP_URL: 'NEXT_PUBLIC_APP_URL',
  DATABASE_URL: 'DATABASE_URL',
  AUTH_SECRET: 'AUTH_SECRET',
  GOOGLE_CLIENT_ID: 'GOOGLE_CLIENT_ID',
  GOOGLE_CLIENT_SECRET: 'GOOGLE_CLIENT_SECRET',
};

Object.entries(requiredEnvs).forEach(([key, value]) => {
  if (!env[key as keyof typeof env]) {
    throw new Error(`${value} é obrigatório`);
  }
});
