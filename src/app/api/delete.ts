export const postCallAPIForDeleteCart = async (
  url: string,
  accessToken: string,
) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
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
