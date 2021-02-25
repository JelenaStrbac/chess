import { FC } from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const Button: FC<Props> = ({ children }) => {
  return (
    <ButtonStyled type="submit">
      {children}
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
  outline: none;
  margin: 2.5rem;
  &:hover {
    box-shadow: "0px 15px 20px rgba(209, 139, 71, 0.4)";
    transform: "translateY(3px)";
  }
`;

export default Button;
