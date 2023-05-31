import styled, { keyframes, css } from 'styled-components'
import { Flex, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { FC, ReactNode } from 'react'

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
const Divider = styled.div<{ color: string }>`
  width: 100%;
  background-color: ${({ color }) => color};
  height: 5px;
  border-radius: 3px;
  margin: 5px 0px 10px;
`

const StatWrapper: FC<React.PropsWithChildren<{ label: ReactNode }>> = ({ children, label }) => {
  return (
    <Flex mb="2px" justifyContent="space-between" alignItems="center" width="100%">
      {label}
      <Flex alignItems="center">{children}</Flex>
    </Flex>
  )
}

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
}
const ActionPanel: React.FC<React.PropsWithChildren<ActionPanelProps>> = ({ expanded }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  return (
    <StyledActionPanel expanded={expanded}>
      <Flex
        flexDirection={isMobile ? 'column' : 'row'}
        justifyContent="space-between"
        width="100%"
        style={{ gap: '40px' }}
      >
        <Flex flexDirection="column" width="100%">
          <Text color="textSubtle">1000 - 16.000 NKS</Text>
          <Divider color="#53DEE9" />
          <StatWrapper
            label={
              <Text color="textSubtle" small>
                {t('Monthly APR')}:
              </Text>
            }
          >
            <Text ml="4px" small>
              6%
            </Text>
          </StatWrapper>
          <StatWrapper
            label={
              <Text color="textSubtle" small>
                {t('Mining Duration')}:
              </Text>
            }
          >
            <Text ml="4px" small>
              547 {t('days')}
            </Text>
          </StatWrapper>
          <StatWrapper
            label={
              <Text color="textSubtle" small>
                {t('Lock Time')}:
              </Text>
            }
          >
            <Text ml="4px" small>
              547 {t('days')}
            </Text>
          </StatWrapper>
          <StatWrapper
            label={
              <Text color="textSubtle" small>
                {t('Distribute')}:
              </Text>
            }
          >
            <Text ml="4px" small>
              100 {t('days')}
            </Text>
          </StatWrapper>
        </Flex>
        <Flex flexDirection="column" width="100%">
          <Text color="textSubtle">16.100 - 60.000 NKS</Text>
          <Divider color="#4c95e0" />
          <StatWrapper
            label={
              <Text color="textSubtle" small>
                {t('Monthly APR')}:
              </Text>
            }
          >
            <Text ml="4px" small>
              7%
            </Text>
          </StatWrapper>
          <StatWrapper
            label={
              <Text color="textSubtle" small>
                {t('Mining Duration')}:
              </Text>
            }
          >
            <Text ml="4px" small>
              547 {t('days')}
            </Text>
          </StatWrapper>
          <StatWrapper
            label={
              <Text color="textSubtle" small>
                {t('Lock Time')}:
              </Text>
            }
          >
            <Text ml="4px" small>
              547 {t('days')}
            </Text>
          </StatWrapper>
          <StatWrapper
            label={
              <Text color="textSubtle" small>
                {t('Distribute')}:
              </Text>
            }
          >
            <Text ml="4px" small>
              100 {t('days')}
            </Text>
          </StatWrapper>
        </Flex>
        <Flex flexDirection="column" width="100%">
          <Text color="textSubtle">60.100 - 155.000 NKS</Text>
          <Divider color="#7645D9" />
          <StatWrapper
            label={
              <Text color="textSubtle" small>
                {t('Monthly APR')}:
              </Text>
            }
          >
            <Text ml="4px" small>
              8%
            </Text>
          </StatWrapper>
          <StatWrapper
            label={
              <Text color="textSubtle" small>
                {t('Mining Duration')}:
              </Text>
            }
          >
            <Text ml="4px" small>
              547 {t('days')}
            </Text>
          </StatWrapper>
          <StatWrapper
            label={
              <Text color="textSubtle" small>
                {t('Lock Time')}:
              </Text>
            }
          >
            <Text ml="4px" small>
              547 {t('days')}
            </Text>
          </StatWrapper>
          <StatWrapper
            label={
              <Text color="textSubtle" small>
                {t('Distribute')}:
              </Text>
            }
          >
            <Text ml="4px" small>
              100 {t('days')}
            </Text>
          </StatWrapper>
        </Flex>
        <Flex flexDirection="column" width="100%">
          <Text color="textSubtle">160.000- 300.000 NKS</Text>
          <Divider color="#ED4B9E" />
          <StatWrapper
            label={
              <Text color="textSubtle" small>
                {t('Monthly APR')}:
              </Text>
            }
          >
            <Text ml="4px" small>
              10%
            </Text>
          </StatWrapper>
          <StatWrapper
            label={
              <Text color="textSubtle" small>
                {t('Mining Duration')}:
              </Text>
            }
          >
            <Text ml="4px" small>
              547 {t('days')}
            </Text>
          </StatWrapper>
          <StatWrapper
            label={
              <Text color="textSubtle" small>
                {t('Lock Time')}:
              </Text>
            }
          >
            <Text ml="4px" small>
              547 {t('days')}
            </Text>
          </StatWrapper>
          <StatWrapper
            label={
              <Text color="textSubtle" small>
                {t('Distribute')}:
              </Text>
            }
          >
            <Text ml="4px" small>
              100 {t('days')}
            </Text>
          </StatWrapper>
        </Flex>
      </Flex>
    </StyledActionPanel>
  )
}

export default ActionPanel
