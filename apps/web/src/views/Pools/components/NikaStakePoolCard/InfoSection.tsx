import styled, { keyframes, css } from 'styled-components'
import { Box, Flex, Text, LinkExternal, useToast, useModal, Skeleton, Balance } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { Token } from '@pancakeswap/sdk'
import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { useNikaStakingContract, useTokenContract } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { MaxUint256 } from '@ethersproject/constants'
import { ToastDescriptionWithTx } from 'components/Toast'
import useCatchTxError from 'hooks/useCatchTxError'
import AddToWalletButton, { AddToWalletTextOptions } from 'components/AddToWallet/AddToWalletButton'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useAccount } from 'wagmi'
import { format } from 'date-fns'
import { formatNumber, formatLpBalance } from '@pancakeswap/utils/formatBalance'
import StakedActionComponent from '@pancakeswap/uikit/src/widgets/Farm/components/FarmTable/Actions/StakedActionComponent'
import { NIKA_ADDR } from 'config/constants/nikaContract'
import { NikaPoolState } from 'state/types'
import { useNikaPool } from 'state/nikaPool/hooks'

const StatWrapper: FC<React.PropsWithChildren<{ label: ReactNode }>> = ({ children, label }) => {
  return (
    <Flex mb="2px" justifyContent="space-between" alignItems="center" width="100%">
      {label}
      <Flex alignItems="center">{children}</Flex>
    </Flex>
  )
}

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`

const formatTime = (time: string | undefined) => {
  const type = 'HH:mm MM/dd/yyyy'
  if (!time) return ''
  console.log('time: ', time)
  return format(new Date(Number(time)), type)
}

const formatPercent = (number: any) => {
  // if (number.isNaN) return '0.00'
  return formatNumber(new BigNumber(number.toString()).dividedBy(100).toNumber(), 2, 4)
}

const TotalToken = ({ value, unit }: { value: number; unit?: string }) => {
  if (value >= 0) {
    return <Balance small value={value} decimals={0} unit={unit} />
  }
  return <Skeleton width="90px" height="21px" />
}

const LoadingData = ({ value, unit }: { value: string; unit?: string }) => {
  if (value) {
    return (
      <Text ml="4px" small>
        {`${value} ${unit || ''}`}
      </Text>
    )
  }
  return <Skeleton width="90px" height="21px" />
}

const InfoSection = () => {
  const { t } = useTranslation()
  const { chainId } = useActiveChainId()
  const { address: account } = useAccount()
  const nikaStakingContract = useNikaStakingContract()
  const nikaTokenContract = useTokenContract(NIKA_ADDR)
  const blockExplorers = chainId === 97 ? 'https://testnet.bscscan.com/' : 'https://bscscan.com/'
  const {
    poolPendingRewardPerDay,
    f1Referee,
    referrer,
    userData: {
      totalStakes,
      totalClaimed,
      maxClaim,
      vestingDuration,
      interestDuration,
      lastTimeDeposited,
      interestRates,
      directBonus,
      matchingBonus,
    },
  } = useNikaPool() as NikaPoolState

  const claimEndsInAsBigNumber = new BigNumber(lastTimeDeposited).plus(interestDuration)
  const vestingEndsInAsBigNumber = claimEndsInAsBigNumber.plus(vestingDuration)

  const monthlyAPR = formatPercent(interestRates || 0)
  const maxInterest = formatLpBalance(new BigNumber(maxClaim), 18)
  const formattedDirectBonus = formatLpBalance(new BigNumber(directBonus), 18)
  const formattedMatchingBonus = formatLpBalance(new BigNumber(matchingBonus), 18)
  const claimedInterest = formatLpBalance(new BigNumber(totalClaimed), 18)
  const formattedReferrer = referrer ? `${referrer.substring(0, 2)}...${referrer.substring(referrer.length - 4)}` : ''
  const claimEndsIn = claimEndsInAsBigNumber.lte(0)
    ? 'No Data'
    : formatTime(claimEndsInAsBigNumber.times(1000).toString())
  const vestingEndsIn = vestingEndsInAsBigNumber.lte(0)
    ? 'No Data'
    : formatTime(vestingEndsInAsBigNumber.times(1000).toString())
  // const pendingRewards = formatLpBalance(new BigNumber(poolPendingRewardPerDay), 18)
  // const totalStaked = formatLpBalance(new BigNumber(totalStakes), 18)

  return (
    <Flex flexDirection="column" mb="8px">
      <StatWrapper label={<Text small>{t('Monthly APR')}:</Text>}>
        <LoadingData value={monthlyAPR} unit="%" />
      </StatWrapper>
      <StatWrapper label={<Text small>{t('Max Interest')}:</Text>}>
        <Text ml="4px" small>
          <TotalToken value={Number(maxInterest)} unit=" NIKA" />
        </Text>
      </StatWrapper>
      <StatWrapper label={<Text small>{t('Claimed Interest')}:</Text>}>
        <Text ml="4px" small>
          <TotalToken value={Number(claimedInterest)} unit=" NIKA" />
        </Text>
      </StatWrapper>
      <StatWrapper label={<Text small>{t('Direct Bonus')}:</Text>}>
        <Text ml="4px" small>
          <TotalToken value={Number(formattedDirectBonus)} unit=" NIKA" />
        </Text>
      </StatWrapper>
      <StatWrapper label={<Text small>{t('Matching Bonus')}:</Text>}>
        <Text ml="4px" small>
          <TotalToken value={Number(formattedMatchingBonus)} unit=" NIKA" />
        </Text>
      </StatWrapper>
      <StatWrapper label={<Text small>{t('F1-Referee')}:</Text>}>
        <Text ml="4px" small>
          <TotalToken value={Number(f1Referee)} />
        </Text>
      </StatWrapper>
      <StatWrapper label={<Text small>{t('Referrer')}:</Text>}>
        {formattedReferrer !== 'No data' ? (
          <LinkExternal href={`https://testnet.bscscan.com/address/${account}`}>
            <LoadingData value={formattedReferrer} />
          </LinkExternal>
        ) : (
          <LoadingData value={formattedReferrer} />
        )}
      </StatWrapper>
      <StatWrapper label={<Text small>{t('Claim Ends In')}:</Text>}>
        <LoadingData value={claimEndsIn} />
      </StatWrapper>
      <StatWrapper label={<Text small>{t('Vesting Ends In')}:</Text>}>
        <LoadingData value={vestingEndsIn} />
      </StatWrapper>
      <StyledLinkExternal isBscScan href={`${blockExplorers}address/${nikaTokenContract.address}`}>
        {t('See Token Contract')}
      </StyledLinkExternal>
      <Flex mb="2px" justifyContent="flex-start">
        <LinkExternal href="" bold={false} small>
          {t('View Tutorial')}
        </LinkExternal>
      </Flex>
      <StyledLinkExternal isBscScan href={`${blockExplorers}address/${nikaStakingContract.address}`}>
        {t('View Contract ')}
      </StyledLinkExternal>
      <Flex justifyContent="flex-start">
        <AddToWalletButton
          variant="text"
          p="0"
          height="auto"
          style={{ fontSize: '14px', fontWeight: '400', lineHeight: 'normal' }}
          marginTextBetweenLogo="4px"
          textOptions={AddToWalletTextOptions.TEXT}
          tokenAddress={NIKA_ADDR}
          tokenSymbol="NIKA"
          tokenDecimals={18}
          tokenLogo="https://tokens.pancakeswap.finance/images/0x483Ed007BA31da2D570bA816F028135d1F0c60A6.png"
        />
      </Flex>
    </Flex>
  )
}

export default InfoSection
