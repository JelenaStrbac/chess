import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { createRoom, startGame } from "../../store/slices/rooms/roomsSlice";
import { database } from "../../services/firebase";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import Spinner from "../../components/UI/Spinner";
import Error from "../../components/UI/Error";
import Chess from "../Board/Chess";
//import Modal from "../../components/UI/Modal";
import useModal from "../../hooks/useModal";
import ModalRoomId from "../../components/UI/ModalsTexts/ModalRoomId";

const CreateGame = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.room);
  const { roomID } = useSelector((state) => state.room);

  const { isShowing, toggle } = useModal();

  const [inputForm, setInputForm] = useState({
    name: {
      value: "",
      placeholder: "Enter your name",
    },
  });

  useEffect(() => {
    let statusRef;

    if (status === "loading") {
      statusRef = database.ref("rooms/" + roomID + "/status");
      statusRef.on("value", (snapshot) => {
        const data = snapshot.val();

        if (data === "started") {
          dispatch(startGame());
        }
      });
    }
    return () => statusRef && statusRef.off();
  }, [status, roomID, dispatch]);

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

    dispatch(createRoom(inputForm.name.value));
    toggle();
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
      <h1>Create game</h1>
      <FormStyled autoComplete="off" onSubmit={onSubmitHandler}>
        {formElementsArray.map((el) => (
          <Input
            key={el.id}
            placeholder={el.config.placeholder}
            value={el.config.value}
            onInputChangeHandler={(e) => onInputChangeHandler(e, el.id)}
          />
        ))}
        <Button>Create</Button>
      </FormStyled>
    </Container>
  );

  // const modal = (
  //   <Modal isShowing={isShowing} hide={toggle}>
  //     <h2>Invite your friend</h2>
  //     <span>{roomID}</span>
  //     <div>
  //       Share the secret key above with your friend, so he can join this game!
  //     </div>
  //     <Button>GOT IT</Button>
  //   </Modal>
  // );

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
`;

export default CreateGame;
