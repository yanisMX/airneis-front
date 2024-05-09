import { ApiResponse } from "../interfaces/interfaces";

const postCallAPI = async (url: string, data: any) => {
    try {
        const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erreur lors de la connexion au serveur', error);
        return { success: false, message: 'Problème de connexion au serveur, veuillez réessayer plus tard.' };
    }
    }

    export default postCallAPI;