import React from 'react'
import styled from 'styled-components'
import { Button, Flex, useModal } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { BuyInPoolModal } from './BuyInPoolModal'
import NameCell from '../CustomStakedPool/NameCell'
import Status from '../CustomStakedPool/Status'

const BuyContainer = styled(Flex)`
background-color: ${({ theme }) => theme.card.background};
  display: flex;
  border: 2px solid ${({ theme }) => theme.colors.input};
  border-radius: 16px;
  margin-bottom: 16px!important;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-right: 12px;
    margin-bottom: 0;
  }
}

  ${({ theme }) => theme.mediaQueries.xl} {
    margin-right: 0;
  }
`
const ActionWrapper = styled(Flex)`
  padding-right: 32px;
  align-items: center;
`

const BuyInPool = () => {
  const { t } = useTranslation()

  const [onPresentBuyInPoolModal] = useModal(
    <BuyInPoolModal
      buyingTokenDecimals={18}
      buyingTokenSymbol="NIKA"
      buyingTokenAddress="0x483Ed007BA31da2D570bA816F028135d1F0c60A6" // to show token image
    />,
  )
  return (
    <BuyContainer>
      <NameCell title="Buy NIKA" />

      <Status status="Open" />
      <ActionWrapper>
        <Button width={400} onClick={onPresentBuyInPoolModal}>
          {t('Buy')}
        </Button>
      </ActionWrapper>
    </BuyContainer>
  )
}

export default BuyInPool
