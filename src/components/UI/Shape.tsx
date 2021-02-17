import { FC } from "react";
import styled from "styled-components";

type Props = {
  remove?: string;
  width: number;
  height: number;
};

const Shape: FC<Props> = ({ remove, width, height }) => {
  return (
    <Container>
      <SVGStyle
        remove={remove}
        width={width}
        height={height}
        //viewBox={`0 0 ${props.height} ${props.width}`}
        viewBox="0 0 400 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M549.747 -394.726C617.226 -476.721 742.774 -476.721 810.253 -394.726C845.951 -351.349 900.899 -328.588 956.813 -334.019C1062.51 -344.284 1151.28 -255.507 1141.02 -149.813C1135.59 -93.8989 1158.35 -38.9506 1201.73 -3.2533C1283.72 64.2258 1283.72 189.774 1201.73 257.253C1158.35 292.951 1135.59 347.899 1141.02 403.813C1151.28 509.507 1062.51 598.284 956.813 588.019C900.899 582.589 845.951 605.349 810.253 648.726C742.774 730.721 617.226 730.721 549.747 648.726C514.049 605.349 459.101 582.589 403.187 588.019C297.493 598.284 208.716 509.507 218.981 403.813C224.412 347.899 201.651 292.951 158.274 257.253C76.2787 189.774 76.2787 64.2258 158.274 -3.2533C201.651 -38.9506 224.412 -93.8989 218.981 -149.813C208.716 -255.507 297.493 -344.284 403.187 -334.019C459.101 -328.588 514.049 -351.349 549.747 -394.726Z"
          fill="url(#paint0_linear)"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="0"
            y1="-553"
            x2="1639.46"
            y2="192.114"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7433FF" />
            <stop offset="1" stopColor="#FFA3FD" />
          </linearGradient>
        </defs>
      </SVGStyle>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
`;

const SVGStyle = styled.svg<{ remove?: string }>`
  @media only screen and (max-width: 480px) {
    width: ${(props) => (props.remove === "true" ? "0" : "300px")};
    height: ${(props) => (props.remove === "true" ? "0" : "600px")};
  }
`;

export default Shape;
