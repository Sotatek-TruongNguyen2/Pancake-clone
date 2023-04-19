import React from 'react'
import { Balance, Button, Flex, Heading, Text, useModal } from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import { useTranslation } from '@pancakeswap/localization'
import { Token } from '@pancakeswap/sdk'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { formatNumber, getBalanceNumber, getFullDisplayBalance } from '@pancakeswap/utils/formatBalance'
import { PoolCategory } from 'config/constants/types'
import { ActionContainer, ActionContent, ActionTitles } from '../PoolsTable/ActionPanel/styles'
import { CollectModalContainer } from '../Modals/CollectModal'

interface HarvestProps {
  sousId: number
  poolCategory: PoolCategory
  earningToken: Token
  userData: {
    allowance: BigNumber
    stakingTokenBalance: BigNumber
    stakedBalance: BigNumber
    pendingReward: BigNumber
  }
  earningTokenPrice: number
}
const Harvest = ({ sousId, poolCategory, earningToken, userData, earningTokenPrice }: HarvestProps) => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const earnings = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO
  const earningTokenBalance = getBalanceNumber(earnings, earningToken.decimals)
  const earningTokenDollarBalance = getBalanceNumber(earnings.multipliedBy(earningTokenPrice), earningToken.decimals)
  const hasEarnings = earnings.gt(0)
  const fullBalance = getFullDisplayBalance(earnings, earningToken.decimals)
  const formattedBalance = formatNumber(earningTokenBalance, 3, 3)
  const isBnbPool = poolCategory === PoolCategory.BINANCE

  const [onPresentCollect] = useModal(
    <CollectModalContainer
      formattedBalance={formattedBalance}
      fullBalance={fullBalance}
      earningTokenSymbol={earningToken.symbol}
      earningsDollarValue={earningTokenDollarBalance}
      sousId={sousId}
      isBnbPool={isBnbPool}
    />,
  )

  if (!account) {
    return (
      <ActionContainer>
        <ActionTitles>NIKA Earned</ActionTitles>
        <ActionContent>
          <Heading>0</Heading>
          <Button disabled>{t('Harvest')}</Button>
        </ActionContent>
      </ActionContainer>
    )
  }

  return (
    <ActionContainer>
      <ActionTitles>NIKA Earned</ActionTitles>
      <ActionContent>
        <Flex flex="1" flexDirection="column" alignSelf="flex-center">
          <>
            {hasEarnings ? (
              <>
                <Balance lineHeight="1" bold fontSize="20px" decimals={5} value={earningTokenBalance} />
                {earningTokenPrice > 0 && (
                  <Balance
                    display="inline"
                    fontSize="12px"
                    color="textSubtle"
                    decimals={2}
                    prefix="~"
                    value={earningTokenDollarBalance}
                    unit=" USD"
                  />
                )}
              </>
            ) : (
              <>
                <Heading color="textDisabled">0</Heading>
                <Text fontSize="12px" color="textDisabled">
                  0 USD
                </Text>
              </>
            )}
          </>
        </Flex>
        <Button disabled={!hasEarnings} onClick={onPresentCollect}>
          {t('Harvest')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default Harvest
