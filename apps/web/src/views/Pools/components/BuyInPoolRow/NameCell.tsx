import { useTranslation } from '@pancakeswap/localization'
import { Pool, Skeleton, Text, TokenPairImage, useMatchBreakpoints } from '@pancakeswap/uikit'
import styled from 'styled-components'

const StyledCell = styled(Pool.BaseCell)`
  flex: 25;
  flex-direction: row;
  padding-left: 12px;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1 0 150px;
    padding-left: 32px;
  }
`

const NameCell = ({ title }: { title: string }) => {
  const { t } = useTranslation()
  const isLoaded = true
  const { isMobile } = useMatchBreakpoints()
  const showSubtitle = !isMobile
  return (
    <StyledCell role="cell">
      {isLoaded ? (
        <>
          <TokenPairImage
            primarySrc="/images/tokens/0x483Ed007BA31da2D570bA816F028135d1F0c60A6.png"
            secondarySrc="/images/tokens/autorenew.svg"
            mr="8px"
            width={40}
            height={40}
          />
          <Pool.CellContent>
            <Text bold={!isMobile} small={isMobile}>
              {title}
            </Text>
            {showSubtitle && (
              <Text fontSize="12px" color="textSubtle">
                {t('Share, Earn – And more!')}
              </Text>
            )}
          </Pool.CellContent>
        </>
      ) : (
        <>
          <Skeleton mr="8px" width={36} height={36} variant="circle" />
          <Pool.CellContent>
            <Skeleton width={30} height={12} mb="4px" />
            <Skeleton width={65} height={12} />
          </Pool.CellContent>
        </>
      )}
    </StyledCell>
  )
}

export default NameCell
