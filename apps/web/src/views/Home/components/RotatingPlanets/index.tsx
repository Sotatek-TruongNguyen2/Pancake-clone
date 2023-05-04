import React from 'react'
import styled, { keyframes } from 'styled-components'

const correct2 = keyframes`
0% {
  transform: rotateZ(360deg);
}

100% {
  transform: rotateZ(0deg);
}
`
const rotate2 = keyframes`
0%{
  transform: rotateZ(0deg) ;
}
100%{
  transform: rotateZ(360deg)  ;
}
`

const correct3 = keyframes`
0% {
  transform: rotateZ(260deg);
}
100% {
  transform: rotateZ(-100deg);
}
`
const rotate3 = keyframes`
0%{
  transform: rotateZ(100deg) ;
}
100%{
  transform: rotateZ(460deg)  ;
}
`

const correct4 = keyframes`
0% {
  transform: rotateZ(60deg);
}
100% {
  transform: rotateZ(-300deg);
}
`
const rotate4 = keyframes`
0%{
  transform: rotateZ(300deg) ;
}
100%{
  transform: rotateZ(660deg)  ;
}
`

const correct5 = keyframes`
0% {
  transform: rotateZ(160deg);
}
100% {
  transform: rotateZ(-200deg);
}
`
const rotate5 = keyframes`
0%{
  transform: rotateZ(200deg) ;
}
100%{
  transform: rotateZ(560deg)  ;
}
`

const correct6 = keyframes`
0% {
  transform: rotateZ(30deg);
}
100% {
  transform: rotateZ(-330deg);
}
`
const rotate6 = keyframes`
0%{
  transform: rotateZ(330deg) ;
}
100%{
  transform: rotateZ(690deg)  ;
}
`

const correct7 = keyframes`
0% {
  transform: rotateZ(120deg);
}
100% {
  transform: rotateZ(-240deg);
}
`
const rotate7 = keyframes`
0%{
  transform: rotateZ(240deg) ;
}
100%{
  transform: rotateZ(600deg)  ;
}
`

const correct8 = keyframes`
0% {
  transform: rotateZ(300deg);
}
100% {
  transform: rotateZ(-60deg);
}
`
const rotate8 = keyframes`
0%{
  transform: rotateZ(60deg) ;
}
100%{
  transform: rotateZ(420deg)  ;
}
`

const Container = styled.div`
  width: 576px;
  height: 576px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Sun = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-image: url('/images/home/tokens/nika.png');
  background-size: contain;
  box-shadow: 0 0 60px white, 0 0 98px white;
`
const Trajectory1 = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  transform: scaleX(2);
  border: solid 1px #d3d3d3;
  rotate: 170deg;
  position: absolute;
`
const Trajectory2 = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  transform: scaleX(2);
  border: solid 1px #d3d3d3;
  rotate: 170deg;
  position: absolute;
`
const Trajectory3 = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  transform: scaleX(2);
  border: solid 1px #d3d3d3;
  rotate: 170deg;
  position: absolute;
`
const Trajectory4 = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  transform: scaleX(2);
  border: solid 1px #d3d3d3;
  rotate: 170deg;
  position: absolute;
`
const Trajectory5 = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  transform: scaleX(2);
  border: solid 1px #d3d3d3;
  rotate: 170deg;
  position: absolute;
`
const Trajectory6 = styled.div`
  width: 210px;
  height: 210px;
  border-radius: 50%;
  transform: scaleX(2);
  border: solid 1px #d3d3d3;
  rotate: 170deg;
  position: absolute;
`
const Trajectory7 = styled.div`
  width: 240px;
  height: 240px;
  border-radius: 50%;
  transform: scaleX(2);
  border: solid 1px #d3d3d3;
  rotate: 170deg;
  position: absolute;
`
const Trajectory8 = styled.div`
  width: 270px;
  height: 270px;
  border-radius: 50%;
  transform: scaleX(2);
  border: solid 1px #d3d3d3;
  rotate: 170deg;
  position: absolute;
`
const Route2 = styled.div`
  width: 100%;
  height: 100%;
  animation: ${rotate2} 10s infinite linear;
  position: absolute;
  transform: rotateZ(50deg);
`
const Route3 = styled.div`
  width: 100%;
  height: 100%;
  animation: ${rotate3} 10s infinite linear;
  position: absolute;
`
const Route4 = styled.div`
  width: 100%;
  height: 100%;
  animation: ${rotate4} 10s infinite linear;
  position: absolute;
`
const Route5 = styled.div`
  width: 100%;
  height: 100%;
  animation: ${rotate5} 10s infinite linear;
  position: absolute;
`
const Route6 = styled.div`
  width: 100%;
  height: 100%;
  animation: ${rotate6} 10s infinite linear;
  position: absolute;
`
const Route7 = styled.div`
  width: 100%;
  height: 100%;
  animation: ${rotate7} 10s infinite linear;
  position: absolute;
`
const Route8 = styled.div`
  width: 100%;
  height: 100%;
  animation: ${rotate8} 10s infinite linear;
  position: absolute;
`
const PlanetContainer2 = styled.div`
  width: 24px;
  height: 24px;
  animation: ${correct2} 10s infinite linear;
  position: absolute;
`
const PlanetContainer3 = styled.div`
  width: 33px;
  height: 33px;
  animation: ${correct3} 10s infinite linear;
  position: absolute;
`
const PlanetContainer4 = styled.div`
  width: 27px;
  height: 27px;
  animation: ${correct4} 10s infinite linear;
  position: absolute;
  left: 15px;
`
const PlanetContainer5 = styled.div`
  width: 37px;
  height: 37px;
  animation: ${correct5} 10s infinite linear;
  position: absolute;
  left: 15px;
`
const PlanetContainer6 = styled.div`
  width: 34px;
  height: 34px;
  animation: ${correct6} 10s infinite linear;
  position: absolute;
  left: 25px;
`
const PlanetContainer7 = styled.div`
  width: 40px;
  height: 40px;
  animation: ${correct7} 10s infinite linear;
  position: absolute;
  left: 30px;
`
const PlanetContainer8 = styled.div`
  width: 30px;
  height: 30px;
  animation: ${correct8} 10s infinite linear;
  position: absolute;
  left: 55px;
`
const PolygonPlanet = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transform: scaleX(0.5);
  background-image: url('/images/home/tokens/polygon.png');
  background-size: contain;
`
const AvalanchePlanet = styled.div`
  width: 33px;
  height: 33px;
  border-radius: 50%;
  transform: scaleX(0.5);
  background-image: url('/images/home/tokens/avalanche.png');
  background-size: contain;
`
const SolanaPlanet = styled.div`
  width: 27px;
  height: 27px;
  border-radius: 50%;
  transform: scaleX(0.5);
  background-image: url('/images/home/tokens/solana.png');
  background-size: contain;
`
const EthereumPlanet = styled.div`
  width: 37px;
  height: 37px;
  border-radius: 50%;
  transform: scaleX(0.5);
  background-image: url('/images/home/tokens/ethereum.png');
  background-size: contain;
`
const FantomPlanet = styled.div`
  width: 37px;
  height: 37px;
  border-radius: 50%;
  transform: scaleX(0.5);
  background-image: url('/images/home/tokens/fantom.png');
  background-size: contain;
`
const CardanoPlanet = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: scaleX(0.5);
  background-image: url('/images/home/tokens/cardano.png');
  background-size: contain;
`
const TelcoinPlanet = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transform: scaleX(0.5);
  background-image: url('/images/home/tokens/tel.png');
  background-size: contain;
`

const RotatingPlanets = () => {
  return (
    <Container>
      <Sun />
      <Trajectory1 />
      <Trajectory2>
        <Route2>
          <PlanetContainer2>
            <PolygonPlanet />
          </PlanetContainer2>
        </Route2>
      </Trajectory2>

      <Trajectory3>
        <Route3>
          <PlanetContainer3>
            <AvalanchePlanet />
          </PlanetContainer3>
        </Route3>
      </Trajectory3>
      <Trajectory4>
        <Route4>
          <PlanetContainer4>
            <SolanaPlanet />
          </PlanetContainer4>
        </Route4>
      </Trajectory4>
      <Trajectory5>
        <Route5>
          <PlanetContainer5>
            <EthereumPlanet />
          </PlanetContainer5>
        </Route5>
      </Trajectory5>
      <Trajectory6>
        <Route6>
          <PlanetContainer6>
            <FantomPlanet />
          </PlanetContainer6>
        </Route6>
      </Trajectory6>
      <Trajectory7>
        <Route7>
          <PlanetContainer7>
            <CardanoPlanet />
          </PlanetContainer7>
        </Route7>
      </Trajectory7>
      <Trajectory8>
        <Route8>
          <PlanetContainer8>
            <TelcoinPlanet />
          </PlanetContainer8>
        </Route8>
      </Trajectory8>
    </Container>
  )
}

export default RotatingPlanets
