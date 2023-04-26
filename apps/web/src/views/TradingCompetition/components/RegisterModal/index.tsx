import { Modal, Button, Flex } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { CompetitionProps } from '../../types'
import MakeProfile from './MakeProfile'
import ReactivateProfile from './ReactivateProfile'
import RegisterWithProfile from './RegisterWithProfile'

const RegisterModal: React.FC<React.PropsWithChildren<CompetitionProps>> = ({
  onDismiss,
  profile,
  onRegisterSuccess,
}) => {
  const { t } = useTranslation()

  const modalInner = () => {
    // No profile created
    if (!profile) {
      return <MakeProfile onDismiss={onDismiss} />
    }

    // Profile created and active
    if (profile?.isActive) {
      return <RegisterWithProfile profile={profile} onDismiss={onDismiss} onRegisterSuccess={onRegisterSuccess} />
    }

    // Profile created but not active
    return <ReactivateProfile onDismiss={onDismiss} />
  }

  return (
    <Modal title={t('Register')} onDismiss={onDismiss}>
      <Flex flexDirection="column" alignItems="center" maxWidth="400px">
        {modalInner()}
      </Flex>
      <Button variant="text" onClick={onDismiss}>
        {t('Close Window')}
      </Button>
    </Modal>
  )
}

export default RegisterModal
