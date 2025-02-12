'use server';

type VerifyEmailResponse = {
  success?: boolean;
  error?: string;
  message?: string;
};

export async function verifyEmailToken(token: string): Promise<VerifyEmailResponse> {
  try {
    const response = await fetch('http://localhost:3001/api/verify-email/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'Token inválido ou expirado',
      };
    }

    return {
      success: true,
      message: data.message || 'Email verificado com sucesso!',
    };
  } catch {
    return {
      success: false,
      error: 'Erro ao conectar com o servidor',
    };
  }
}
