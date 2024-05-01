const getCallAPI = async (url: string) => {
    try {
        const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erreur lors de la connexion au serveur', error);
        return { success: false, message: 'Problème de connexion au serveur, veuillez réessayer plus tard.' };
    }
    }

    export default getCallAPI;