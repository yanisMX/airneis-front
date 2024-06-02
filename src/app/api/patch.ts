export const patchCallApi = async (
  url: string,
  data: any,
  accessToken?: string,
) => {
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la connexion au serveur', error);
    return {
      success: false,
      message:
        'Problème de connexion au serveur, veuillez réessayer plus tard.',
    };
  }
};
