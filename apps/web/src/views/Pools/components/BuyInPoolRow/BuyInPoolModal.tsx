import { useTranslation } from '@pancakeswap/localization'
import { useState } from 'react'
import { useTheme } from 'styled-components'
import { Flex, Text, Modal } from '@pancakeswap/uikit'
import getThemeValue from '@pancakeswap/uikit/src/util/getThemeValue'
import TokenSwitcher from './TokenSwitcher'
import BuyNika from './BuyNika'
import StakeNika from './StakeNika'

interface BuyInPoolModalProps {
  onDismiss?: () => void
}

const NIKA_INFO = { address: '0x483Ed007BA31da2D570bA816F028135d1F0c60A6', symbol: 'NIKA', decimals: 18 }
const USDT_INFO = { address: '0x40af3827F39D0EAcBF4A168f8D4ee67c121D11c9', symbol: 'USDT', decimals: 18 }
const itemsList = [NIKA_INFO, USDT_INFO]

export const BuyInPoolModal: React.FC<React.PropsWithChildren<BuyInPoolModalProps>> = ({ onDismiss }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const [activeToken, setActiveToken] = useState(USDT_INFO)

  const isNikaToken = activeToken.address === NIKA_INFO.address
  return (
    <Modal
      minWidth="346px"
      title={isNikaToken ? t('Stake in Pool') : t('Buy in Pool')}
      onDismiss={onDismiss}
      headerBackground={getThemeValue(theme, 'colors.gradientCardHeader')}
    >
      <Flex alignItems="center" justifyContent="space-between" mb="8px">
        <Text bold>{isNikaToken ? t('Stake') : t('Buy')}:</Text>

        <TokenSwitcher activeToken={activeToken} setActiveToken={setActiveToken} itemsList={itemsList} />
      </Flex>
      {isNikaToken ? <StakeNika onDismiss={onDismiss} /> : <BuyNika onDismiss={onDismiss} />}
    </Modal>
  )
}
