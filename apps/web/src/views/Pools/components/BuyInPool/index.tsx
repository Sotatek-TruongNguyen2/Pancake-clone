import React from 'react'
import styled from 'styled-components'
import { Button, Flex, Text, useModal } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import BigNumber from 'bignumber.js'
import { ActionContent, ActionTitles } from '../PoolsTable/ActionPanel/styles'
import { BuyInPoolModal } from './BuyInPoolModal'

const BuyContainer = styled(Flex)`
  flex-direction: column;
  padding: 16px;
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

const BuyInPool = () => {
  const { t } = useTranslation()

  const [onPresentBuyInPoolModal] = useModal(
    <BuyInPoolModal
      stakingTokenDecimals={18}
      stakingTokenSymbol="NIKA"
      stakingTokenAddress="0x483Ed007BA31da2D570bA816F028135d1F0c60A6"
      apr={1}
      stakingLimit={new BigNumber(1000)}
      earningTokenPrice={1}
      earningTokenSymbol="BUSD"
      userDataStakedBalance={new BigNumber(1000)}
      userDataStakingTokenBalance={new BigNumber(1000)}
      enableEmergencyWithdraw={false}
      stakingTokenBalance={new BigNumber(1000)}
      stakingTokenPrice={1}
      handleConfirmClick={() => {
        console.log('confirm')
      }}
      account="0x483Ed007BA31da2D570bA816F028135d1F0c60A6"
      pendingTx={false}
    />,
  )
  return (
    <BuyContainer>
      <ActionTitles>
        <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
          {t('Start buying')}
        </Text>
      </ActionTitles>
      <ActionContent>
        <Button width={400} onClick={onPresentBuyInPoolModal}>
          Buy
        </Button>
      </ActionContent>
    </BuyContainer>
  )
}

export default BuyInPool
