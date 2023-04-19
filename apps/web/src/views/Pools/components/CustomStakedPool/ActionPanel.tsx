import styled, { keyframes, css } from 'styled-components'
import { Box, Flex, HelpIcon, Text, useMatchBreakpoints, Pool, TooltipText, LinkExternal } from '@pancakeswap/uikit'
import { useVaultPoolByKey } from 'state/pools/hooks'
import { getVaultPosition, VaultPosition } from 'utils/cakePool'
import BigNumber from 'bignumber.js'
import { VaultKey, DeserializedLockedCakeVault, DeserializedLockedVaultUser } from 'state/types'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { Token } from '@pancakeswap/sdk'
import { PoolCategory } from 'config/constants/types'
import { FC, ReactNode } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import Stake from './Stake'
import Harvest from './Harvest'

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 1000px;
  }
`

const collapseAnimation = keyframes`
  from {
    max-height: 1000px;
  }
  to {
    max-height: 0px;
  }
`

const StyledActionPanel = styled.div<{ expanded: boolean }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.dropdown};
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  padding: 12px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px 32px;
  }
`

const ActionContainer = styled.div<{ isAutoVault?: boolean; hasBalance?: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-wrap: wrap;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: ${({ isAutoVault }) => (isAutoVault ? 'row' : null)};
    align-items: ${({ isAutoVault, hasBalance }) => (isAutoVault ? (hasBalance ? 'flex-start' : 'stretch') : 'center')};
  }
`

type MediaBreakpoints = {
  isXs: boolean
  isSm: boolean
  isMd: boolean
  isLg: boolean
  isXl: boolean
  isXxl: boolean
}

interface ActionPanelProps {
  expanded: boolean
  breakpoints: MediaBreakpoints
  account: string
}

const InfoSection = styled(Box)`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;

  padding: 8px 8px;
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0;
    flex-basis: 230px;
    ${Text} {
      font-size: 14px;
    }
  }
`

const StatWrapper: FC<React.PropsWithChildren<{ label: ReactNode }>> = ({ children, label }) => {
  return (
    <Flex mb="2px" justifyContent="space-between" alignItems="center" width="100%">
      {label}
      <Flex alignItems="center">{children}</Flex>
    </Flex>
  )
}

const ActionPanel: React.FC<React.PropsWithChildren<ActionPanelProps>> = ({ expanded, account }) => {
  const { t } = useTranslation()
  const accountEllipsis = account ? `${account.substring(0, 2)}...${account.substring(account.length - 4)}` : null
  return (
    <StyledActionPanel expanded={expanded}>
      <InfoSection>
        <Flex flexDirection="column" mb="8px">
          <StatWrapper label={<Text small>{t('Monthly APR')}:</Text>}>
            <Text ml="4px" small>
              6%
            </Text>
          </StatWrapper>
          <StatWrapper label={<Text small>{t('Invite Commission')}:</Text>}>
            <Text ml="4px" small>
              6%
            </Text>
          </StatWrapper>
          <StatWrapper label={<Text small>{t('Referee Commission')}:</Text>}>
            <Text ml="4px" small>
              6%
            </Text>
          </StatWrapper>
          <StatWrapper label={<Text small>{t('Max Interest')}:</Text>}>
            <Text ml="4px" small>
              4000 NIKA
            </Text>
          </StatWrapper>
          <StatWrapper label={<Text small>{t('Claimed Interest')}:</Text>}>
            <Text ml="4px" small>
              4000 NIKA
            </Text>
          </StatWrapper>
          <StatWrapper label={<Text small>{t('F1-Referee')}:</Text>}>
            <Text ml="4px" small>
              1
            </Text>
          </StatWrapper>
          <StatWrapper label={<Text small>{t('Referee')}:</Text>}>
            <LinkExternal href={`https://testnet.bscscan.com/address/${account}`}>
              <Text ml="4px" small>
                {accountEllipsis}
              </Text>
            </LinkExternal>
          </StatWrapper>
          <StatWrapper label={<Text small>{t('Claim Ends In')}:</Text>}>
            <Text ml="4px" small>
              04/04/2023
            </Text>
          </StatWrapper>
          <StatWrapper label={<Text small>{t('Vesting Ends In')}:</Text>}>
            <Text ml="4px" small>
              04/04/2023
            </Text>
          </StatWrapper>
        </Flex>
      </InfoSection>
      <ActionContainer>
        <Box width="100%">
          <ActionContainer>
            <Harvest
              sousId={1}
              poolCategory={PoolCategory.BINANCE}
              earningToken={new Token(56, '0x483Ed007BA31da2D570bA816F028135d1F0c60A6', 18, 'NIKA')}
              userData={{
                allowance: new BigNumber(0),
                stakingTokenBalance: new BigNumber(0),
                stakedBalance: new BigNumber(0),
                pendingReward: new BigNumber(0),
              }}
              earningTokenPrice={1}
            />
            <Stake
              isApproved={false}
              pendingTx={false}
              stakingToken={new Token(56, '0x483Ed007BA31da2D570bA816F028135d1F0c60A6', 18, 'NIKA')}
              isFinished={false}
            />
          </ActionContainer>
        </Box>
      </ActionContainer>
    </StyledActionPanel>
  )
}

export default ActionPanel
