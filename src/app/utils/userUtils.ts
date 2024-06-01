import { UserData } from '../interfaces/interfaces';
import { putCallAPIWithToken } from '../api/putCallAPI';

export const getUser = (): UserData | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const handleModifyPersonalInformationClick = async (
  newValue: string | null,
  field: string,
) => {
  const user: UserData | null = getUser() || null; // Add this line to provide a default value for the 'user' variable
  if (newValue && user && user.accessToken) {
    try {
      const response = await putCallAPIWithToken(
        API_FOR_PERSONAL_INFORMATION_MODIFY,
        { [field]: newValue },
        user.accessToken,
      );
      if (response.success) {
        setUser({ ...user, [field]: newValue });
      } else {
        setErrorMessage(
          'Erreur lors de la modification des informations personnelles',
        );
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }
};
