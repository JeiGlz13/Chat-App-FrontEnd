import { useState, SyntheticEvent, ChangeEvent } from 'react';

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
    setIsNicknameDisabled(true);
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
