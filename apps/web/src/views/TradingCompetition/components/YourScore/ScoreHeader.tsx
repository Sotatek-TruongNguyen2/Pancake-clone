import styled from 'styled-components'
import { LaurelLeftIcon, LaurelRightIcon } from '@pancakeswap/uikit'
import { YourScoreProps } from '../../types'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const LaurelWrapper = styled.div<{ dir?: 'left' | 'right' }>`
  transform: ${({ dir }) => (dir === 'left' ? 'rotate(30deg)' : 'rotate(-30deg)')};
  svg {
    fill: #27262c;
    opacity: 0.5;
    height: 32px;
    width: auto;
    ${({ theme }) => theme.mediaQueries.sm} {
      height: 45px;
    }
  }
`

const ScoreHeader: React.FC<React.PropsWithChildren<YourScoreProps>> = ({ profile, isLoading }) => {
  return (
    <Wrapper>
      <LaurelWrapper dir="left">
        <LaurelLeftIcon />
      </LaurelWrapper>

      <LaurelWrapper dir="right">
        <LaurelRightIcon />
      </LaurelWrapper>
    </Wrapper>
  )
}

export default ScoreHeader
