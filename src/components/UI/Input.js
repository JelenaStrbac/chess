import styled from "styled-components";

const Input = (props) => {
  return (
    <InputStyled
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onInputChangeHandler}
      required
    />
  );
};

const InputStyled = styled.input`
  outline: none;
  padding: 0.5rem;
  margin-top: 0.5rem;
`;

export default Input;
