import CreateJoinGameLayout from "./CreateJoinGameLayout";

const JoinGame = (props) => {
  const inputForm = {
    name: {
      value: "",
      placeholder: "Enter your name",
    },
    secretKey: {
      value: "",
      placeholder: "Secret key",
    },
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // ovde ide dispatch akcije
  };

  return (
    <CreateJoinGameLayout
      title="Join game"
      buttonText="Join"
      inputForm={inputForm}
      onSubmitHandler={onSubmitHandler}
    />
  );
};

export default JoinGame;
