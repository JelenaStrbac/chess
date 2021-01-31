import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import Spinner from "../../components/UI/Spinner";
import Error from "../../components/UI/Error";
import { joinRoom } from "../../store/slices/rooms/roomsSlice";
import Chess from "../Board/Chess";

const JoinGame = (props) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.room);

  const [inputForm, setInputForm] = useState({
    name: {
      value: "",
      placeholder: "Enter your name",
    },
    secretKey: {
      value: "",
      placeholder: "Secret key",
    },
  });

  const onInputChangeHandler = (e, inputIdentifier) => {
    const updatedInputForm = {
      ...inputForm,
    };

    const updatedFormElement = { ...updatedInputForm[inputIdentifier] };
    updatedFormElement.value = e.target.value;

    updatedInputForm[inputIdentifier] = updatedFormElement;
    // ovde uradi validaciju naknadno

    setInputForm(updatedInputForm);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      joinRoom({
        roomID: inputForm.secretKey.value,
        name: inputForm.name.value,
      })
    );
  };

  const formElementsArray = [];
  Object.keys(inputForm).forEach((el) => {
    formElementsArray.push({
      id: el,
      config: inputForm[el],
    });
  });

  let renderComponent = (
    <Container>
      <h1>Join game</h1>
      <FormStyled autoComplete="off" onSubmit={onSubmitHandler}>
        {formElementsArray.map((el) => (
          <Input
            key={el.id}
            placeholder={el.config.placeholder}
            value={el.config.value}
            onInputChangeHandler={(e) => onInputChangeHandler(e, el.id)}
          />
        ))}
        <Button>Join</Button>
      </FormStyled>
    </Container>
  );

  if (status === "loading") {
    renderComponent = <Spinner />;
  } else if (status === "started") {
    renderComponent = <Chess />;
  } else if (status === "started") {
    renderComponent = <Error />;
  }

  return <>{renderComponent}</>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export default JoinGame;
