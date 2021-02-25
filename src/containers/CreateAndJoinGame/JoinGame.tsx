import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import Spinner from "../../components/UI/Spinner";
import Error from "../../components/UI/Error";
import { joinRoom } from "../../store/slices/rooms/roomsSlice";
import Chess from "../Board/Chess";
import { checkValidity } from "../../utils/createGameHelpers/checkValidity";
import background from "../../assets/background/chess-background.png";
import Shape from "../../components/UI/Shape";
import { RootState } from "../../types";
import { useAppDispatch } from "../../store/store";

const JoinGame = () => {
  const dispatch = useAppDispatch();
  const { status } = useSelector((state: RootState) => state.room);

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

  const onInputChangeHandler = (
    e: React.FormEvent<HTMLInputElement>,
    inputIdentifier: keyof typeof inputForm
  ) => {
    const updatedInputForm = JSON.parse(JSON.stringify(inputForm));

    const updatedFormElement = { ...updatedInputForm[inputIdentifier] };
    updatedFormElement.value = e.currentTarget.value;

    updatedInputForm[inputIdentifier] = updatedFormElement;

    // validation
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    let formIsValid = true;
    Object.keys(updatedInputForm).forEach((el) => {
      formIsValid =
        updatedInputForm[el as keyof typeof inputForm].valid && formIsValid;
    });

    setInputForm(updatedInputForm);
  };

  const onSubmitHandler = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    if (
      Object.keys(inputForm).every(
        (el) => inputForm[el as keyof typeof inputForm].valid === true
      )
    ) {
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

  const formElementsArray = Object.keys(inputForm).map((el) => {
    return {
      id: el as keyof typeof inputForm,
      config: inputForm[el as keyof typeof inputForm],
    };
  });

  let renderComponent = (
    <Container>
      <h1 style={{ zIndex: 1000 }}>Join game</h1>
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
      <ImgStyled src={background} alt="chess" />
      <Shape width={800} height={400} remove="true" />
      <Shape width={400} height={800} />
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
  z-index: 1000;
`;

const ImgStyled = styled.img`
  max-width: 300px;
  margin-top: 2rem;
  z-index: 1000;
`;

export default JoinGame;
