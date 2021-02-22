import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { createRoom, startGame } from "../../store/slices/rooms/roomsSlice";
import { database } from "../../services/firebaseDb";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import Spinner from "../../components/UI/Spinner";
import Error from "../../components/UI/Error";
import Chess from "../Board/Chess";
import useModal from "../../hooks/useModal";
import ModalRoomId from "../../components/UI/ModalsTexts/ModalRoomId";
import { checkValidity } from "../../utils/createGameHelpers/checkValidity";
import background from "../../assets/background/chess-background.png";
import Shape from "../../components/UI/Shape";
import { RootState } from "../../types";
import { useAppDispatch } from "../../store/store";

const CreateGame = () => {
  const dispatch = useAppDispatch();
  const { status } = useSelector((state: RootState) => state.room);
  const { roomID } = useSelector((state: RootState) => state.room);

  const { isShowing, toggle } = useModal();

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
  });

  useEffect(() => {
    let statusRef = database.ref("rooms/" + roomID + "/status");

    if (status === "loading") {
      //statusRef = database.ref("rooms/" + roomID + "/status");
      statusRef.on("value", (snapshot) => {
        const data = snapshot.val();

        if (data === "started") {
          dispatch(startGame());
        }
      });
    }
    return () => statusRef && statusRef.off();
  }, [status, roomID, dispatch]);

  const onInputChangeHandler = (
    e: React.FormEvent<HTMLInputElement>,
    inputIdentifier: keyof typeof inputForm
  ) => {
    const updatedInputForm = {
      ...inputForm,
    };

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
      dispatch(createRoom(inputForm.name.value));
      toggle();
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
      <h1 style={{ zIndex: 1000 }}>Create game</h1>
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
        <Button>Create</Button>
      </FormStyled>
      <ImgStyled src={background} alt="chess" />
      <Shape width={800} height={400} remove="true" />
      <Shape width={400} height={800} />
    </Container>
  );

  if (status === "loading") {
    renderComponent = (
      <Spinner showModal={isShowing}>
        <ModalRoomId isShowing={isShowing} toggle={toggle} roomID={roomID} />
      </Spinner>
    );
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

export default CreateGame;
