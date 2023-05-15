import { Heading, Flex, Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import Carousel from './Carousel'

const MetricsSection = () => {
  const { t } = useTranslation()

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <Heading textAlign="center" scale="xl">
        {t('NKS is the hub of space activities')}
      </Heading>
      <Text textAlign="center" color="textSubtle" mt="20px" mb="20px">
        {t(
          'NKS token is at the heart of the NikaSwap ecosystem. Buy it, win it, spent it, stake it,... heck, you can even vote with it!',
        )}
      </Text>

      <Text textAlign="center" color="textSubtle" bold mb="32px">
        {t('Will you join them?')}
      </Text>

      <div style={{ width: '80%' }}>
        <Carousel />
      </div>
    </Flex>
  )
}

export default MetricsSection
