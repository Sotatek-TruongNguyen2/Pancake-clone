import React from 'react'
import styled, { keyframes } from 'styled-components'

const correct = keyframes`
0% {
  transform: rotateZ(360deg);
}

100% {
  transform: rotateZ(0deg);
}
`
const rotate = keyframes`
0%{
  transform: rotateZ(0deg) ;
}
100%{
  transform: rotateZ(360deg)  ;
}
`
const Container = styled.div`
  width: 576px;
  height: 576px;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-image: url('/images/solar-bg.png');
  // background-position: center;
  // background-size: contain;
  // background-repeat: no-repeat;
`
const Sun = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-image: url('/images/nika-token.png');
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
  animation: ${rotate} 6s infinite linear;
  position: absolute;
`
const Route3 = styled.div`
  width: 100%;
  height: 100%;
  animation: ${rotate} 12s infinite linear;
  position: absolute;
`
const Route4 = styled.div`
  width: 100%;
  height: 100%;
  animation: ${rotate} 8s infinite linear;
  position: absolute;
`
const Route5 = styled.div`
  width: 100%;
  height: 100%;
  animation: ${rotate} 15s infinite linear;
  position: absolute;
`
const Route6 = styled.div`
  width: 100%;
  height: 100%;
  animation: ${rotate} 16s infinite linear;
  position: absolute;
`
const Route7 = styled.div`
  width: 100%;
  height: 100%;
  animation: ${rotate} 27s infinite linear;
  position: absolute;
`
const Route8 = styled.div`
  width: 100%;
  height: 100%;
  animation: ${rotate} 25s infinite linear;
  position: absolute;
`
const PlanetContainer2 = styled.div`
  width: 24px;
  height: 24px;
  animation: ${correct} 6s infinite linear;
  position: absolute;
`
const PlanetContainer3 = styled.div`
  width: 33px;
  height: 33px;
  animation: ${correct} 12s infinite linear;
  position: absolute;
`
const PlanetContainer4 = styled.div`
  width: 27px;
  height: 27px;
  animation: ${correct} 8s infinite linear;
  position: absolute;
  left: 105px;
`
const PlanetContainer5 = styled.div`
  width: 37px;
  height: 37px;
  animation: ${correct} 15s infinite linear;
  position: absolute;
  left: 15px;
`
const PlanetContainer6 = styled.div`
  width: 34px;
  height: 34px;
  animation: ${correct} 16s infinite linear;
  position: absolute;
  left: 25px;
`
const PlanetContainer7 = styled.div`
  width: 40px;
  height: 40px;
  animation: ${correct} 27s infinite linear;
  position: absolute;
  left: 30px;
`
const PlanetContainer8 = styled.div`
  width: 30px;
  height: 30px;
  animation: ${correct} 25s infinite linear;
  position: absolute;
  left: 55px;
`
const PolygonPlanet = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transform: scaleX(0.5);
  background-image: url('/images/polygon-coin.png');
  background-size: contain;
`
const AvalanchePlanet = styled.div`
  width: 33px;
  height: 33px;
  border-radius: 50%;
  transform: scaleX(0.5);
  background-image: url('/images/avalanche-logo.png');
  background-size: contain;
`
const SolanaPlanet = styled.div`
  width: 27px;
  height: 27px;
  border-radius: 50%;
  transform: scaleX(0.5);
  background-image: url('/images/solana-logo.png');
  background-size: contain;
`
const EthereumPlanet = styled.div`
  width: 37px;
  height: 37px;
  border-radius: 50%;
  transform: scaleX(0.5);
  background-image: url('/images/ethereum-coin.png');
  background-size: contain;
`
const FantomPlanet = styled.div`
  width: 37px;
  height: 37px;
  border-radius: 50%;
  transform: scaleX(0.5);
  background-image: url('/images/fantom-coin.png');
  background-size: contain;
`
const CardanoPlanet = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: scaleX(0.5);
  background-image: url('/images/cardano-coin.png');
  background-size: contain;
`
const TelcoinPlanet = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transform: scaleX(0.5);
  background-image: url('/images/telcoin-logo.png');
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
