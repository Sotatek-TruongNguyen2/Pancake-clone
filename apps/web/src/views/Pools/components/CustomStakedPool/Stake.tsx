import React from 'react'
import { Button, Text } from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from '@pancakeswap/localization'
import { Token } from '@pancakeswap/sdk'
import { ActionContainer, ActionContent, ActionTitles } from '../PoolsTable/ActionPanel/styles'
import { VaultStakeButtonGroup } from '../Vault/VaultStakeButtonGroup'

interface StakeProps {
  isApproved: boolean
  pendingTx: boolean
  stakingToken: Token
  isFinished: boolean
}
const Stake = ({ isApproved, pendingTx, stakingToken, isFinished }: StakeProps) => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const handleApprove = () => {
    console.log('handleEnablePool')
  }

  const handleStake = () => {
    console.log('handleStake')
  }

  const handleFlexibleClick = () => {
    console.log('handleFlexibleClick')
  }

  const handleLockedClick = () => {
    console.log('handleLockedClick')
  }
  if (!account) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
            {t('Start staking')}
          </Text>
        </ActionTitles>
        <ActionContent>
          <ConnectWalletButton width="100%" />
        </ActionContent>
      </ActionContainer>
    )
  }

  if (!isApproved) {
    return (
      <ActionContainer>
        <ActionTitles>
          <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
            {t('Enable pool')}
          </Text>
        </ActionTitles>
        <ActionContent>
          <Button width="100%" disabled={pendingTx} onClick={handleApprove} variant="secondary">
            {t('Enable')}
          </Button>
        </ActionContent>
      </ActionContainer>
    )
  }

  return (
    <ActionContainer>
      <ActionTitles>
        <Text fontSize="12px" bold color="secondary" as="span" textTransform="uppercase">
          {t('Stake')}{' '}
        </Text>
        <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
          {stakingToken.symbol}
        </Text>
      </ActionTitles>
      <ActionContent>
        {true ? (
          <VaultStakeButtonGroup onFlexibleClick={handleFlexibleClick} onLockedClick={handleLockedClick} />
        ) : (
          <Button width="100%" onClick={handleStake} variant="secondary" disabled={isFinished}>
            {t('Stake')}
          </Button>
        )}
      </ActionContent>
    </ActionContainer>
  )
}

export default Stake
