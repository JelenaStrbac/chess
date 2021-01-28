import CreateJoinGameLayout from "./CreateJoinGameLayout";

const CreateGame = () => {
  const inputForm = {
    name: {
      value: "",
      placeholder: "Enter your name",
    },
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // ovde ide dispatch akcije
  };

  return (
    <CreateJoinGameLayout
      title="Create game"
      buttonText="Create"
      inputForm={inputForm}
      onSubmitHandler={onSubmitHandler}
    />
  );
};

export default CreateGame;
