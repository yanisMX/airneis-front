import { UserData } from '../interfaces/interfaces';
import { patchCallApi } from '../api/patch';

export const getUser = (): UserData | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};



export const handleModifyPersonalInformationClick = async (
  newInformation: string,
  informationType: 'name' | 'email',
  ref: React.RefObject<HTMLInputElement>,
  user: UserData | null,
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>,
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  ENDPOINT_FOR_PERSONAL_INFORMATION_MODIFY: string
) => {
  if (newInformation) {
    try {
      const response = await patchCallApi(
        ENDPOINT_FOR_PERSONAL_INFORMATION_MODIFY,
        { [informationType]: newInformation },
        user?.accessToken,
      );
      if (response.success) {
        setUser({
          ...user,
          [informationType]: newInformation,
          email: user?.email || '', 
        });
        setSuccessMessage('Informations personnelles mises à jour avec succès');
        if (ref.current) {
          ref.current.setAttribute('readonly', 'true');
        }

        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        setErrorMessage('Erreur lors de la modification des informations personnelles');

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error((error as Error).message);
      setErrorMessage('Erreur lors de la modification des informations personnelles');

      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }
};

