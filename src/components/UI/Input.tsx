import { FC, useState } from "react";
import styled from "styled-components";

type Props = {
  invalid: boolean;
  placeholder: string;
  formError: boolean;
  message: string;
  value: string;
  onInputChangeHandler: React.FormEventHandler<HTMLInputElement>;
};

const Input: FC<Props> = ({invalid, placeholder, formError, message, value, onInputChangeHandler}) => {
  const [isFocusRemoved, setIsFocusRemoved] = useState(false);
  const handleBlur = () => {
    setIsFocusRemoved(true);
  };

  const renderError = (errMessage: Props['message']) => {
    if (
      (invalid && isFocusRemoved) ||
      (invalid && formError)
    ) {
      return <ErrorMessage>{errMessage}</ErrorMessage>;
    }
  };

  return (
    <>
      {renderError(message)}
      <InputStyled
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onInputChangeHandler}
        onBlur={handleBlur}
        required
      />
    </>
  );
};

const InputStyled = styled.input`
  outline: none;
  padding: 0.5rem;
  margin-top: 0.5rem;
  font-family: Poppins;
  background-color: transparent;
  outline: none;
  color: white;
  border-style: none;
  border-bottom: 1px solid white;
  font-size: 1.1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const ErrorMessage = styled.div`
  outline: none;
  margin-top: 0.5rem;
  padding: 0 1rem;
  text-align: center;
  color: #000;
  font-size: 0.6rem;
`;

export default Input;
