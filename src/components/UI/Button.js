import styled from "styled-components";

const Button = (props) => {
  return (
    <ButtonStyled type="submit" isDisabled={props.isDisabled}>
      {props.children}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button`
  background-image: linear-gradient(to right, #d18b47, #b7722e);
  color: white;
  text-decoration: none;
  text-align: center;
  font-style: none;
  font-family: Poppins;
  min-width: 10rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-weight: bold;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.4rem;
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
  outline: none;
  margin: 2.5rem;
  &:hover {
    box-shadow: ${(props) =>
      props.isDisabled ? "none" : "0px 15px 20px rgba(209, 139, 71, 0.4)"};
    transform: ${(props) => (props.isDisabled ? "none" : "translateY(3px)")};
  }
`;

export default Button;
