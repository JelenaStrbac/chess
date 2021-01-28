import { useState } from "react";
import styled from "styled-components";

import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";

const CreateJoinGameLayout = (props) => {
  const [inputForm, setInputForm] = useState(props.inputForm);

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

  const formElementsArray = [];
  Object.keys(inputForm).forEach((el) => {
    formElementsArray.push({
      id: el,
      config: inputForm[el],
    });
  });

  return (
    <Container>
      <h1>{props.title}</h1>
      <FormStyled autoComplete="off" onSubmit={props.onSubmitHandler}>
        {formElementsArray.map((el) => (
          <Input
            key={el.id}
            placeholder={el.config.placeholder}
            value={el.config.value}
            onInputChangeHandler={(e) => onInputChangeHandler(e, el.id)}
          />
        ))}
        <Button>{props.buttonText}</Button>
      </FormStyled>
    </Container>
  );
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

export default CreateJoinGameLayout;
