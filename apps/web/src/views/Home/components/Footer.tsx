import styled from 'styled-components'
import { Flex, Heading, Text, Link, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Container from 'components/Layout/Container'
import { useAccount } from 'wagmi'
import { useState } from 'react'
import SunburstSvg from './SunburstSvg'
import CompositeImage from './CompositeImage'

const BgWrapper = styled.div`
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  // background-image: url('/images/cosmic.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

const StyledSunburst = styled(SunburstSvg)`
  height: 350%;
  width: 350%;

  ${({ theme }) => theme.mediaQueries.xl} {
    height: 400%;
    width: 400%;
  }
`

const Wrapper = styled(Flex)`
  z-index: 1;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  overflow: hidden;
  height: 100%;
  bottom: 0;
`

const FloatingPancakesWrapper = styled(Container)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  visibility: hidden;

  ${({ theme }) => theme.mediaQueries.md} {
    visibility: visible;
  }
`

const topLeftImage = {
  path: '/images/home/flying-pancakes/',
  attributes: [
    { src: 'AVAX-3D', alt: 'Avax' },
    { src: 'PHANTOM-3D', alt: 'Phantom' },
    { src: 'CAR-3D', alt: 'Cardano' },
    { src: 'POL-3D', alt: 'Polygon' },
    { src: 'BNB-3D', alt: 'Bnb' },
    { src: 'CHAINLINK-3D', alt: 'ChainLink' },
    { src: 'ETH-3D', alt: 'Eth' },
    { src: 'TEL-3D', alt: 'Telcoin' },
  ],
}

const Footer = () => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { isTablet, isDesktop } = useMatchBreakpoints()
  const [showAnimation, setShowAnimation] = useState(false)

  return (
    <Container height={250}>
      <BgWrapper>
        <Flex alignItems="center" justifyContent="center" width="100%" height="100%">
          {/* <StyledSunburst /> */}
        </Flex>
      </BgWrapper>
      {(isTablet || isDesktop) && (
        <FloatingPancakesWrapper>
          <CompositeImage {...topLeftImage} showAnimation={showAnimation} />
        </FloatingPancakesWrapper>
      )}
      <Wrapper>
        <Heading mb="24px" scale="xl" color="white">
          {t('Start in seconds.')}
        </Heading>
        <Text textAlign="center" color="white">
          {t('Connect your crypto wallet to start using the app in seconds.')}
        </Text>
        <Text mb="24px" bold color="white">
          {t('No registration needed.')}
        </Text>

        {/* <Link external href="">
          {t('Learn how to start')}
        </Link> */}
        {/* <Text>{t('Learn how to start')}</Text> */}
        {!account && (
          <ConnectWalletButton
            mt="24px"
            button={false}
            handleOpen={() => setShowAnimation(true)}
            handleClose={() => setShowAnimation(false)}
          />
        )}
      </Wrapper>
    </Container>
  )
}

export default Footer
