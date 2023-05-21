import { useState, SyntheticEvent, ChangeEvent } from 'react';
import { toast } from 'react-toastify';

export const useFormMessage = () => {
  const [formValues, setFormValues] = useState({
    message: '',
    nickname: '',
  });
  const [isNicknameDisabled, setIsNicknameDisabled] = useState(false);
  
  const clearMessage = () => {
    setFormValues({
        ...formValues,
        message: ''
      });
  };

  const selectNickname = (event: SyntheticEvent) => {
    event.preventDefault();
    if (formValues?.nickname) {
      setIsNicknameDisabled(true);
      return;
    }

    toast.error('¡El nickName no puede ser vacio!', {
      position: 'top-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  }

  return {
    ...formValues,
    isNicknameDisabled,
    clearMessage,
    selectNickname,
    handleInputChange,
  }
}
