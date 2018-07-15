import React from 'react';
import styled, { keyframes, withTheme } from 'styled-components';

const dots = keyframes`
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DefaultDot = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 100%;
    display: inline-block;
    background-color: ${(p : any) => p.color || p.theme.PRIMARY};
    animation: ${dots} 1.4s infinite ease-in-out both;
    animation-duration: 1.4s;
    margin: 3px;
`;

const Dot1 = DefaultDot.extend`
    animation-delay: -0.32s;
`;

const Dot2 = DefaultDot.extend`
    animation-delay: -0.16s;
`;

const Dot3 = DefaultDot.extend`
    animation-delay: -0s;
`;

const Spinner = ({
    color,
} : {
    color? : string
}) => (
    <Wrapper>
        <Dot1 color={color} />
        <Dot2 color={color} />
        <Dot3 color={color} />
    </Wrapper>
);

export default Spinner;
