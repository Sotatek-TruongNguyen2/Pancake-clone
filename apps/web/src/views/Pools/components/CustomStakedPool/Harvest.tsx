import React, { useEffect, useState } from 'react'
import { Balance, Button, Flex, Heading, Text, useModal } from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import { useTranslation } from '@pancakeswap/localization'
import { Token } from '@pancakeswap/sdk'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { formatNumber, getBalanceNumber, getFullDisplayBalance } from '@pancakeswap/utils/formatBalance'
import { PoolCategory } from 'config/constants/types'
import { useOracleContract } from 'hooks/useContract'
import { ActionContainer, ActionContent, ActionTitles } from '../PoolsTable/ActionPanel/styles'
import { CollectModalContainer } from '../Modals/CollectModal'

interface HarvestProps {
  pendingReward: number
  onClaim: () => void
}

const NIKA_ADDR = '0x1549C1A238B4b7aa396B5D8c315df53ceC1FEa51'

const Harvest = ({ pendingReward, onClaim }: HarvestProps) => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const earnings = pendingReward ? new BigNumber(pendingReward) : BIG_ZERO
  const hasEarnings = earnings.gt(0)
  const oracleContract = useOracleContract()
  const [usdcAmount, setUsdcAmount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      if (!pendingReward) return
      const _usdcAmount = await oracleContract.consult(
        NIKA_ADDR,
        new BigNumber(pendingReward || 0).times(new BigNumber(10).pow(18)).toString(),
      )
      setUsdcAmount(new BigNumber(_usdcAmount.toString() || 0).dividedBy(new BigNumber(10).pow(18)).toNumber())
    }
    fetchData()
  }, [pendingReward])

  if (!account) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Text fontSize="12px" bold color="secondary" as="span" textTransform="uppercase">
            {t(' NIKA Earned')}
          </Text>
        </ActionTitles>
        <ActionContent>
          <Heading>0</Heading>
          <Button disabled>{t('Harvest')}</Button>
        </ActionContent>
      </ActionContainer>
    )
  }

  return (
    <ActionContainer>
      <ActionTitles>
        <Text fontSize="12px" bold color="secondary" as="span" textTransform="uppercase">
          {t(' NIKA Earned')}
        </Text>
      </ActionTitles>
      <ActionContent>
        <Flex flex="1" flexDirection="column" alignSelf="flex-center">
          <>
            {hasEarnings ? (
              <>
                <Balance lineHeight="1" bold fontSize="20px" decimals={5} value={pendingReward} />

                <Balance
                  display="inline"
                  fontSize="12px"
                  color="textSubtle"
                  decimals={2}
                  prefix="~"
                  value={usdcAmount}
                  unit=" USDC"
                />
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
        <Button disabled={!hasEarnings} onClick={onClaim}>
          {t('Harvest')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default Harvest
