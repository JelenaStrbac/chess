import { useState } from "react";
import styled from "styled-components";

const Input = (props) => {
  const [isFocusRemoved, setIsFocusRemoved] = useState(false);
  const handleBlur = () => {
    setIsFocusRemoved(true);
  };

  const renderError = (message) => {
    if (
      (props.invalid && isFocusRemoved) ||
      (props.invalid && props.formError)
    ) {
      return <ErrorMessage>{message}</ErrorMessage>;
    }
  };

  return (
    <>
      {renderError(props.message)}
      <InputStyled
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onInputChangeHandler}
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
`;

const ErrorMessage = styled.div`
  outline: none;
  margin-top: 0.5rem;
  color: #000;
  font-size: 0.6rem;
`;

export default Input;
