import styled, { keyframes, css } from 'styled-components'
import { Flex, useMatchBreakpoints } from '@pancakeswap/uikit'
import { FC, ReactNode } from 'react'
import BuyingPoolInfoSection from '../BuyingPoolInfoSection'

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
  const { isMobile } = useMatchBreakpoints()
  return (
    <StyledActionPanel expanded={expanded}>
      <Flex
        flexDirection={isMobile ? 'column' : 'row'}
        justifyContent="space-between"
        width="100%"
        style={{ gap: '40px' }}
      >
        <BuyingPoolInfoSection />
      </Flex>
    </StyledActionPanel>
  )
}

export default ActionPanel
