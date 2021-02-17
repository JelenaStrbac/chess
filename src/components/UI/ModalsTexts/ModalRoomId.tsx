import { FC } from "react";
import styled from "styled-components";
import CopyTextToClipboard from "../CopyTextToClipboard";
import Modal from "../Modal";

type Props = {
  isShowing: boolean;
  roomID: string | null;
  toggle: () => void;
};

const ModalRoomId: FC<Props> = ({ isShowing, toggle, roomID }) => {
  return (
    <Modal isShowing={isShowing} hide={toggle}>
      <h2>Invite your friend</h2>
      <KeyCopy>
        <Key>{roomID}</Key>
        <CopyTextToClipboard />
      </KeyCopy>

      <div style={{ padding: "0 2rem" }}>
        Share the secret key above, so your friend can join this game!
      </div>
      <ButtonStyle onClick={toggle}>GOT IT</ButtonStyle>
    </Modal>
  );
};

const Key = styled.span`
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: bold;
  background-color: #7433ff;
  color: #ae88ff;
`;

const KeyCopy = styled.div`
  display: flex;
  padding: 1rem 1.5rem;
  margin-bottom: 2.5rem;
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
    box-shadow: "0px 15px 20px rgba(209, 139, 71, 0.4)";
    transform: "translateY(3px)";
  }
`;

export default ModalRoomId;
