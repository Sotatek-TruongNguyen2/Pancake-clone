import { Button, Text } from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from '@pancakeswap/localization'
import { Token } from '@pancakeswap/sdk'
import { ActionContent, ActionTitles } from '../PoolsTable/ActionPanel/styles'

interface StakeProps {
  isApproved: boolean
  pendingTx: boolean
  stakingToken: Token
  onStake: () => void
  onApprove: () => void
}
const Stake = ({ isApproved, pendingTx, stakingToken, onStake, onApprove }: StakeProps) => {
  const { t } = useTranslation()
  const { address: account } = useAccount()

  if (!account) {
    return (
      <>
        <ActionTitles>
          <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
            {t('Start staking')}
          </Text>
        </ActionTitles>
        <ActionContent>
          <ConnectWalletButton width="100%" />
        </ActionContent>
      </>
    )
  }

  if (!isApproved) {
    return (
      <>
        <ActionTitles>
          <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
            {t('Enable pool')}
          </Text>
        </ActionTitles>
        <ActionContent>
          <Button width="100%" disabled={pendingTx} onClick={onApprove} variant="secondary">
            {t('Enable')}
          </Button>
        </ActionContent>
      </>
    )
  }
  return (
    <>
      <ActionTitles>
        <Text fontSize="12px" bold color="secondary" as="span" textTransform="uppercase">
          {t('Stake')}
        </Text>
        <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
          {stakingToken.symbol}
        </Text>
      </ActionTitles>
      <ActionContent>
        <Button width="100%" onClick={onStake} variant="secondary" disabled={pendingTx}>
          {t('Stake')}
        </Button>
      </ActionContent>
    </>
  )
}

export default Stake
