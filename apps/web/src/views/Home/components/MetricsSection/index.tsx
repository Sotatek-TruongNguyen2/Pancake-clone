import { Heading, Flex, Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import GradientLogo from '../GradientLogoSvg'
import Carousel from './Carousel'

const MetricsSection = () => {
  const { t } = useTranslation()
  // const { theme } = useTheme()

  // const UsersCardData: IconCardData = {
  //   icon: <CommunityIcon color="secondary" width="36px" />,
  // }

  // const TradesCardData: IconCardData = {
  //   icon: <SwapIcon color="primary" width="36px" />,
  // }

  // const StakedCardData: IconCardData = {
  //   icon: <ChartIcon color="failure" width="36px" />,
  // }

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <GradientLogo height="48px" width="48px" mb="24px" />
      <Heading textAlign="center" scale="xl">
        {t('NKS is the hub of space activities')}
      </Heading>
      <Text textAlign="center" color="textSubtle" mb="20px">
        {t(
          'NKS token is at the heart of the NikaSwap ecosystem. Buy it, win it, spent it, stake it,... heck, you can even vote with it!',
        )}
      </Text>

      <Text textAlign="center" color="textSubtle" bold mb="32px">
        {t('Will you join them?')}
      </Text>

      <div style={{ width: '100%' }}>
        <Carousel />
      </div>

      {/* <Flex flexDirection={['column', null, null, 'row']}>
        <IconCard {...UsersCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <StatCardContent
            headingText={t('Pools')}
            bodyText={t('Provide liquidity for your favorite tokens and earn')}
            highlightColor={theme.colors.secondary}
          />
        </IconCard>
        <IconCard {...UsersCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <StatCardContent
            headingText={t('NFT')}
            bodyText={t('Provide liquidity for your favorite tokens and earn')}
            highlightColor={theme.colors.secondary}
          />
        </IconCard>
        <IconCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <StatCardContent
            headingText={t('Stake')}
            bodyText={t('Stake your $NKS to earn rewards and access exlusive benefits')}
            highlightColor={theme.colors.primary}
          />
        </IconCard>
        <IconCard {...StakedCardData}>
          <StatCardContent
            headingText={t('Farm')}
            bodyText={t('Earn more profit by depositing tokens to the farm to increase your wealth')}
            highlightColor={theme.colors.failure}
          />
        </IconCard>
      </Flex> */}
    </Flex>
  )
}

export default MetricsSection
