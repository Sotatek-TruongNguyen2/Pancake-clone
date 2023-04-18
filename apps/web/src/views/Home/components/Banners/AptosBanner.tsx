import { useTranslation } from '@pancakeswap/localization'
import { Button, Text, useMatchBreakpoints, Box, OpenNewIcon } from '@pancakeswap/uikit'
import Image from 'next/legacy/image'
import styled from 'styled-components'
import { Aptos, AptosXPancakeSwap } from './images'
import * as S from './Styled'

const RightWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: -10px;
  ${({ theme }) => theme.mediaQueries.sm} {
    right: 1px;
    bottom: -18px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    right: 0px;
    bottom: -21px;
  }
`
const AptosSubtitle = styled.div`
  font-family: 'Kanit';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
`
const AptosTitle = styled.div`
  font-family: 'Kanit';
  font-style: normal;
  font-weight: 600;
  font-size: 23px;
  line-height: 110%;
  color: #ffffff;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  margin-bottom: 21px;
  margin-top: 16px;

  @media screen and (max-width: 375px) {
    font-size: 21px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 35px;
    margin-top: 10px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 40px;
  }
`
const Actions = styled.div`
  display: flex;
  gap: 20px;
`

const AptosBanner = () => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  return (
    <S.Wrapper
      style={{
        background: `linear-gradient(180deg, #00BFA5 0%, #005A5A 100%)`,
        overflow: isMobile ? 'hidden' : 'visible',
      }}
    >
      <S.Inner>
        <S.LeftWrapper>
          <Box>
            <AptosSubtitle>PancakeSwap x Trustwallet</AptosSubtitle>
          </Box>
          <AptosTitle>{t('Trade and win $10,000 Prize Pool')}</AptosTitle>

          <Actions>
            <Button minHeight="48px">
              <Text color="invertedContrast" bold fontSize="16px" mr="4px">
                👋 {t('Trade now using Trust Wallet')}
              </Text>
              <OpenNewIcon color="invertedContrast" />
            </Button>
            <Button
              minHeight="48px"
              onClick={() => window?.open('https://trustwallet.com/download/', '_blank', 'noopener noreferrer')}
            >
              <Text color="invertedContrast" bold fontSize="16px" mr="4px">
                👋 {t('Download Trust Wallet')}
              </Text>
              <OpenNewIcon color="invertedContrast" />
            </Button>
          </Actions>
        </S.LeftWrapper>
        <RightWrapper>
          <Image
            src={Aptos}
            alt="aptosImage"
            width={isMobile ? 1100 : 930}
            height={isMobile ? 250 : 231}
            placeholder="blur"
          />
        </RightWrapper>
      </S.Inner>
    </S.Wrapper>
  )
}

export default AptosBanner
