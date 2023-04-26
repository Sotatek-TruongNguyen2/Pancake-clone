import React from 'react'
import styled from 'styled-components'
import { Button, Flex, Pool, useModal } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useAccount } from 'wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { BuyInPoolModal } from './BuyInPoolModal'
import NameCell from '../CustomStakedPool/NameCell'
import Status from '../CustomStakedPool/Status'
import TokenPrice from './TokenPrice'

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
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  padding-right: 12px;
  padding-left: 0px;
  ${({ theme }) => theme.mediaQueries.md} {
    flex: 0 0 120px;
    padding-right: 32px;
    padding-left: 8px;
  }
`

const StyledCell = styled(Pool.BaseCell)`
  flex: 4.5;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1 0 120px;
  }
`
const BuyInPool = () => {
  const { t } = useTranslation()
  const { address: account } = useAccount()

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
      <TokenPrice />
      <Status status="Open" />
      <StyledCell />
      <ActionWrapper>
        {account ? (
          <Button width={300} onClick={onPresentBuyInPoolModal}>
            {t('Buy')}
          </Button>
        ) : (
          <ConnectWalletButton />
        )}
      </ActionWrapper>
    </BuyContainer>
  )
}

export default BuyInPool
