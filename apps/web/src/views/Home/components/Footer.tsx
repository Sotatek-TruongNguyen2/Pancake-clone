import styled from 'styled-components'
import { Flex, Heading, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Container from 'components/Layout/Container'
import { useAccount } from 'wagmi'
import { useState } from 'react'
import CompositeImage from './CompositeImage'
import CompositeImageMobile from './CompositeImageMobile'

const Wrapper = styled(Flex)`
  width: 100%;
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
  visibility: visible;

  // ${({ theme }) => theme.mediaQueries.md} {
  //   visibility: visible;
  // }
`

const topLeftImage = {
  path: '/images/home/flying-pancakes/',
  attributes: [
    { src: 'avax-left', alt: 'Avax' },
    { src: 'arbitrum-left', alt: 'Arbitrum' },
    { src: 'phantom-left', alt: 'Phantom' },
    { src: 'polygon-left', alt: 'Polygon' },
    { src: 'bnb-right', alt: 'Bnb' },
    { src: 'chain-link-right', alt: 'ChainLink' },
    { src: 'ethereum-right', alt: 'Eth' },
    { src: 'tel-right', alt: 'Telcoin' },
  ],
}

const Sun = styled.div<{ theme }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 60px;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-image: url('/images/home/tokens/nika-full.png');
  background-size: contain;
  box-shadow: ${({ theme }) =>
    theme.isDark ? '0 0 60px #cfca86, 0 0 98px #cfca86' : '0 0 60px #b286db, 0 0 98px #b286db'};
  ${({ theme }) => theme.mediaQueries.md} {
    width: 170px;
    height: 170px;
  }
`

const Footer = () => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { isTablet, isDesktop, isMobile } = useMatchBreakpoints()
  const [showAnimation, setShowAnimation] = useState(false)

  return (
    <Container height={290}>
      {(isTablet || isDesktop) && (
        <FloatingPancakesWrapper>
          <CompositeImage {...topLeftImage} showAnimation={showAnimation} />
        </FloatingPancakesWrapper>
      )}

      {isMobile && (
        <FloatingPancakesWrapper>
          <CompositeImageMobile {...topLeftImage} showAnimation={showAnimation} />
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

        <Sun />
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
