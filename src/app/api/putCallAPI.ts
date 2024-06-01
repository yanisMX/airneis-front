import { Address } from "cluster";
import { ApiResponseForUserModification, UserData } from "../interfaces/interfaces";

export const putCallAPIWithToken = async (url: string, data: UserData | Address, accessToken: string) => {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        });
        const result : ApiResponseForUserModification = await response.json();
        return result;
    } catch(error) {
        console.error('Erreur lors de la connexion au serveur', error);
        return { success: false, message: 'Problème de connexion au serveur, veuillez réessayer plus tard.' };
    } 
}
