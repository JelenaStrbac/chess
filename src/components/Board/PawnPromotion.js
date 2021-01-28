import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { promotePawnTo } from "../../store/slices/board/boardSlice";

const PawnPromotion = (props) => {
  const dispatch = useDispatch();
  const { pawnPromotion } = useSelector((state) => state.game);

  const onChangeHandler = (e) => {
    dispatch(promotePawnTo(e.target.value));
  };
  return (
    <Container>
      <label htmlFor="promotion">Pawn promotion to:</label>

      <select
        name="promotion"
        id="promotion"
        value={pawnPromotion["W"]}
        onChange={onChangeHandler}
      >
        <option value="Q">Queen</option>
        <option value="R">Rook</option>
        <option value="N">Night</option>
        <option value="B">Bishop</option>
      </select>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

export default PawnPromotion;
