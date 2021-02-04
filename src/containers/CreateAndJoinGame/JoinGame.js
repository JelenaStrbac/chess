import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import Spinner from "../../components/UI/Spinner";
import Error from "../../components/UI/Error";
import { joinRoom } from "../../store/slices/rooms/roomsSlice";
import Chess from "../Board/Chess";
import { checkValidity } from "../../utils/createGameHelpers/checkValidity";

const JoinGame = (props) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.room);

  const [formError, setFormError] = useState(false);

  const [inputForm, setInputForm] = useState({
    name: {
      value: "",
      placeholder: "Enter your name",
      validation: {
        required: true,
        minLength: 2,
        maxLength: 20,
      },
      message: "Name must have minimum 2 and maximum 20 characters.",
      valid: false,
    },
    secretKey: {
      value: "",
      placeholder: "Secret key",
      validation: {
        required: true,
        length: 8,
      },
      message:
        "Secret key must have exactly 8 alphanumeric characters. Please try again with another secret key.",
      valid: false,
    },
  });

  const onInputChangeHandler = (e, inputIdentifier) => {
    const updatedInputForm = {
      ...inputForm,
    };

    const updatedFormElement = { ...updatedInputForm[inputIdentifier] };
    updatedFormElement.value = e.target.value;

    updatedInputForm[inputIdentifier] = updatedFormElement;

    // validation
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    let formIsValid = true;
    Object.keys(updatedInputForm).forEach((el) => {
      formIsValid = updatedInputForm[el].valid && formIsValid;
    });

    setInputForm(updatedInputForm);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (Object.keys(inputForm).every((el) => inputForm[el].valid === true)) {
      dispatch(
        joinRoom({
          roomID: inputForm.secretKey.value,
          name: inputForm.name.value,
        })
      );
    } else {
      setFormError(true);
    }
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
            formError={formError}
            invalid={!el.config.valid}
            message={el.config.message}
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
  } else if (status === "error") {
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
