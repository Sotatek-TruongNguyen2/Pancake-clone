import { useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import { Flex, CardFooter as Footer, ExpandableLabel, HelpIcon, Pool, Farm as FarmUI } from '@pancakeswap/uikit'
import BuyingPoolInfoSection from '../BuyingPoolInfoSection'

interface CardFooterProps {
  defaultExpanded?: boolean
}

const ExpandableButtonWrapper = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  button {
    padding: 0;
  }
`
const ExpandedWrapper = styled(Flex)`
  svg {
    height: 14px;
    width: 14px;
  }
`

const { CompoundingPoolTag, ManualPoolTag, LockedPoolTag, LockedOrAutoPoolTag } = FarmUI.Tags

const CardFooter: React.FC<React.PropsWithChildren<CardFooterProps>> = ({ defaultExpanded }) => {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(defaultExpanded || false)

  return (
    <Footer>
      <ExpandableButtonWrapper>
        <CompoundingPoolTag />
        <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? t('Hide') : t('Details')}
        </ExpandableLabel>
      </ExpandableButtonWrapper>
      {isExpanded && (
        <ExpandedWrapper flexDirection="column">
          <Flex flexDirection="column" justifyContent="space-between" width="100%" style={{ gap: '40px' }}>
            <BuyingPoolInfoSection />
          </Flex>
        </ExpandedWrapper>
      )}
    </Footer>
  )
}

export default CardFooter
