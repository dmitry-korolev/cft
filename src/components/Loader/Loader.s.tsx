import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  100% {
    transform: rotate(calc(90deg + 45deg));
  }
`

const move = keyframes`
  50% {
    transform: translate(-30px, -30px);
  }
`

export const LoaderSVG = styled.svg`
  width: 100%;
  height: 100%;
`

export const LoaderInnerSquare = styled.rect`
  transform-origin: center;
  transform: rotate(45deg);
  animation: 1s ${rotate} ease-in-out infinite;
`

export const LoaderOuterSquare = styled(LoaderInnerSquare)`
  animation-direction: reverse;
`

export const LoaderAngle = styled.polyline`
  animation: 1s ${move} ease-in-out infinite;
`
