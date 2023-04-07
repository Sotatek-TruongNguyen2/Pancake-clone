import { Flex, Heading } from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'
import { SlideSvgDark, SlideSvgLight } from './SlideSvg'
import RotatingPlanets from './RotatingPlanets'

const BgWrapper = styled.div`
  z-index: -1;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0px;
  left: 0px;
`

const InnerWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: -3px;
`

const Hero = () => {
  const { t } = useTranslation()
  const { address: account } = useAccount()

  return (
    <>
      <style jsx global>
        {`
          .slide-svg-dark {
            display: none;
          }
          .slide-svg-light {
            display: block;
          }
          [data-theme='dark'] .slide-svg-dark {
            display: block;
          }
          [data-theme='dark'] .slide-svg-light {
            display: none;
          }
        `}
      </style>
      <BgWrapper>
        <InnerWrapper>
          <SlideSvgDark className="slide-svg-dark" width="100%" />
          <SlideSvgLight className="slide-svg-light" width="100%" />
        </InnerWrapper>
      </BgWrapper>
      <Flex
        position="relative"
        flexDirection={['column-reverse', null, null, 'row']}
        alignItems={['flex-end', null, null, 'center']}
        justifyContent="center"
        mt={[account ? '280px' : '50px', null, 0]}
        id="homepage-hero"
      >
        <Flex
          height={['192px', null, null, '100%']}
          width={['192px', null, null, '100%']}
          flex={[null, null, null, '1']}
          mb={['24px', null, null, '0']}
          position="relative"
        >
          <RotatingPlanets />
        </Flex>
        <Flex flex="1" flexDirection="column">
          <Heading scale="xxl" color="secondary" mb="24px" textAlign="center">
            {t('Multi chain decentralized protocols & services.')}
          </Heading>
          <Heading scale="md" mb="24px" textAlign="center">
            {t('Swap, monetize and build on the leading multi-chain decentralized crypto currency trading protocol.')}
          </Heading>
          {/* <Flex>
            {!account && <ConnectWalletButton mr="8px" />}
            <NextLinkFromReactRouter to="/swap">
              <Button variant={!account ? 'secondary' : 'primary'}>{t('Trade Now')}</Button>
            </NextLinkFromReactRouter>
          </Flex> */}
        </Flex>
      </Flex>
    </>
  )
}

export default Hero
