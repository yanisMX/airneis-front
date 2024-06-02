export const getCallApi = async (endpoint: string, accessToken?: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
      console.error('API_BASE_URL is not defined in .env.local');
      throw new Error('API_BASE_URL is not defined in .env.local');
    }

    const url = `${baseUrl}${endpoint}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la connexion au serveur', error);
    return {
      success: false,
      message: 'Problème de connexion au serveur, veuillez réessayer plus tard.',
    };
  }
};


