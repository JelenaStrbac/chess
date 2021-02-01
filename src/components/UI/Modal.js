import ReactDOM from "react-dom";
import styled from "styled-components";

const Modal = ({ isShowing, hide, children }) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <ModalOverlay />
          <ModalWrapper
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <ModalMain>
              <ModalHeader>
                <StyledButton
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </StyledButton>
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
            </ModalMain>
          </ModalWrapper>
        </>,
        document.body
      )
    : null;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1140;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1150;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalMain = styled.div`
  z-index: 100;
  background: white;
  position: relative;
  margin: 30px auto;
  border-radius: 3px;
  max-width: 500px;
  padding: 2rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: black;
`;

const StyledButton = styled.button`
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  opacity: 0.3;
  cursor: pointer;
  border: none;
`;

export default Modal;
