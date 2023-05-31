import { Flex, TokenPairImage, Skeleton, Pool, useModal, Button, Text, Box } from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import { useTranslation } from '@pancakeswap/localization'
import { useState } from 'react'
import styled from 'styled-components'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { LightGreyCard } from 'components/Card'
import { BuyInPoolModal } from '../BuyInPoolRow/BuyInPoolModal'
import TokenPrice from './TokenPrice'
import CardFooter from './CardFooter'

export const ActionContainer = styled(Flex)`
  flex-direction: column;
  padding: 16px;
  margin-bottom: 16px;
`

interface BuyInPoolCardProps {
  showSkeleton?: boolean
}

const BuyInPoolCard = ({ showSkeleton = false }: BuyInPoolCardProps) => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const [status, setStatus] = useState('Open')
  const [onPresentBuyInPoolModal] = useModal(
    <BuyInPoolModal
      buyingTokenDecimals={18}
      buyingTokenSymbol="NIKA"
      buyingTokenAddress="0x483Ed007BA31da2D570bA816F028135d1F0c60A6" // to show token image
    />,
  )

  return (
    <Pool.StyledCard isActive>
      <Pool.PoolCardHeader>
        {!showSkeleton ? (
          <>
            <Pool.PoolCardHeaderTitle title={t('Buy NIKA')} subTitle={t('Stake, Earn – And more!')} />
            <TokenPairImage
              primarySrc="/images/tokens/0x483Ed007BA31da2D570bA816F028135d1F0c60A6.png"
              secondarySrc="/images/tokens/autorenew.svg"
              width={64}
              height={64}
            />
          </>
        ) : (
          <Flex width="100%" justifyContent="space-between">
            <Flex flexDirection="column">
              <Skeleton width={100} height={26} mb="4px" />
              <Skeleton width={65} height={20} />
            </Flex>
            <Skeleton width={58} height={58} variant="circle" />
          </Flex>
        )}
      </Pool.PoolCardHeader>
      <Box px="24px" pt="24px">
        <LightGreyCard>
          <Flex alignItems="center" justifyContent="space-between">
            <Text color="textSubtle" textTransform="uppercase" bold fontSize="12px">
              {t('Token Price')}
            </Text>
            <TokenPrice />
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Text color="textSubtle" textTransform="uppercase" bold fontSize="12px">
              {t('Status')}
            </Text>
            <Text color={status === t('Active') || status === t('Open') ? 'primary' : 'text'}>{status}</Text>
          </Flex>
        </LightGreyCard>
      </Box>
      <ActionContainer>
        {account ? (
          <Button width={300} onClick={onPresentBuyInPoolModal}>
            {t('Buy')}
          </Button>
        ) : (
          <ConnectWalletButton width={300} />
        )}
      </ActionContainer>
      <CardFooter />
    </Pool.StyledCard>
  )
}

export default BuyInPoolCard
