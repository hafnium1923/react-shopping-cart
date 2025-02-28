import styled from "styled-components";
import { spin } from "../styles/GlobalStyle";

const LoadingPage = () => {
  const balls = Array.from({ length: 10 }, (_, index) => (
    <Styled.Ball key={index} />
  ));
  return (
    <Styled.Container>
      <Styled.Loader>{balls}</Styled.Loader>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.div`
    width: 100vw;
    height: 100vh;
  `,
  Loader: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    animation: ${spin} 0.6s linear infinite reverse;
  `,
  Ball: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    animation: ${spin} 1s infinite ease-in-out;

    &::after {
      content: "";
      position: absolute;
      background-color: #333333;
      width: 5px;
      height: 5px;
      border-radius: 100%;
      top: 0;
    }

    &:nth-child(2) {
      animation-delay: -0.1s;
    }
    &:nth-child(3) {
      animation-delay: -0.2s;
    }
    &:nth-child(4) {
      animation-delay: -0.3s;
    }
    &:nth-child(5) {
      animation-delay: -0.4s;
    }
    &:nth-child(6) {
      animation-delay: -0.5s;
    }
    &:nth-child(7) {
      animation-delay: -0.6s;
    }
    &:nth-child(8) {
      animation-delay: -0.7s;
    }
    &:nth-child(9) {
      animation-delay: -0.8s;
    }
    &:nth-child(10) {
      animation-delay: -0.9s;
    }
  `,
};

export default LoadingPage;
