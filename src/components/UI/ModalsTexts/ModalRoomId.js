import styled from "styled-components";
import Modal from "../Modal";

const ModalRoomId = ({ isShowing, toggle, roomID }) => {
  return (
    <Modal isShowing={isShowing} hide={toggle}>
      <h2>Invite your friend</h2>
      <Key>{roomID}</Key>
      <div>
        Share the secret key above with your friend, so he can join this game!
      </div>
      <ButtonStyle onClick={toggle}>GOT IT</ButtonStyle>
    </Modal>
  );
};

const Key = styled.span`
  padding: 1rem 2rem;
  border-radius: 0.4rem;
  margin-bottom: 2.5rem;
  font-size: 1.4rem;
  font-weight: bold;
  background-color: #b7722e;
  color: #e9c7a6;
`;

const ButtonStyle = styled.button`
  background-image: linear-gradient(to right, #d18b47, #b7722e);
  color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-weight: bold;
  text-align: center;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.4rem;
  cursor: pointer;
  outline: none;
  margin: 2.5rem;
  &:hover {
    box-shadow: ${(props) =>
      props.isDisabled ? "none" : "0px 15px 20px rgba(209, 139, 71, 0.4)"};
    transform: ${(props) => (props.isDisabled ? "none" : "translateY(3px)")};
  }
`;

export default ModalRoomId;
