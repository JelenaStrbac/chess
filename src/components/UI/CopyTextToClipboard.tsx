import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { copy } from "./Icons";
import { RootState } from "../../types";

const CopyTextToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const { roomID } = useSelector((state: RootState) => state.room);

  return (
    <div
      className="CopyTextToClipboard"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <CopyToClipboard text={roomID || ""} onCopy={() => setCopied(true)}>
        <BtnStyled>{copy}</BtnStyled>
      </CopyToClipboard>

      {copied ? (
        <span
          style={{
            color: "red",
            fontSize: "0.7rem",
            position: "absolute",
            bottom: "50%",
            right: "20%",
          }}
        >
          Copied!
        </span>
      ) : null}
    </div>
  );
};

const BtnStyled = styled.button`
  outline: none;
  border: none;
  padding: 1rem;
  background-color: #7433ff;
  margin-left: 0.3rem;
`;

export default CopyTextToClipboard;
