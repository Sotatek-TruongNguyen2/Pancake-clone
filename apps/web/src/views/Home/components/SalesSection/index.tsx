import { Flex, Text } from '@pancakeswap/uikit'
import ColoredWordHeading from '../ColoredWordHeading'

export interface SalesSectionProps {
  headingText: string
  bodyText1: string
  bodyText2: string
}

const SalesSection: React.FC<React.PropsWithChildren<SalesSectionProps>> = (props) => {
  const { headingText, bodyText1, bodyText2 } = props

  return (
    <Flex flexDirection="column">
      <Flex
        flexDirection={['column-reverse', null, null, 'row']}
        alignItems={['flex-end', null, null, 'center']}
        justifyContent="center"
      >
        <Flex flexDirection="column" margin="auto" alignSelf={['flex-start', null, null, 'center']} width="80%">
          <ColoredWordHeading text={headingText} textAlign="center" />
          <Text color="textSubtle" textAlign="center">
            {bodyText1}
          </Text>
          <Text color="textSubtle" mb="24px" textAlign="center">
            {bodyText2}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SalesSection
