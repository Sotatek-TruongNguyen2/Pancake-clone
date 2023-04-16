import { useTranslation } from '@pancakeswap/localization'
import { WalletModalV2 } from '@pancakeswap/ui-wallets'
import { Button, ButtonProps, Text } from '@pancakeswap/uikit'
import { createWallets, getDocLink } from 'config/wallet'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useAuth from 'hooks/useAuth'
// @ts-ignore
// eslint-disable-next-line import/extensions
import { useActiveHandle } from 'hooks/useEagerConnect.bmp.ts'
import { useMemo, useState } from 'react'
import { useConnect } from 'wagmi'
import Trans from './Trans'

const ConnectWalletButton = ({
  children,
  button = true,
  handleOpen,
  handleClose,
  ...props
}: ButtonProps & { button?: boolean; handleOpen?: () => void; handleClose?: () => void }) => {
  const handleActive = useActiveHandle()
  const { login } = useAuth()
  const {
    t,
    currentLanguage: { code },
  } = useTranslation()
  const { connectAsync } = useConnect()
  const { chainId } = useActiveChainId()
  const [open, setOpen] = useState(false)

  const docLink = useMemo(() => getDocLink(code), [code])

  const handleClick = () => {
    if (typeof __NEZHA_BRIDGE__ !== 'undefined') {
      handleActive()
    } else {
      setOpen(true)
      if (handleOpen) handleOpen()
    }
  }

  const wallets = useMemo(() => createWallets(chainId, connectAsync), [chainId, connectAsync])

  return (
    <>
      {button ? (
        <Button onClick={handleClick} {...props}>
          {children || <Trans>Connect Wallet</Trans>}
        </Button>
      ) : (
        <Text
          {...props}
          style={{ position: 'absolute', bottom: '80px', cursor: 'pointer' }}
          color="white"
          bold
          onClick={handleClick}
        >
          {children || <Trans>Connect Wallet</Trans>}
        </Text>
      )}
      <WalletModalV2
        docText={t('Learn How to Connect')}
        docLink={docLink}
        isOpen={open}
        wallets={wallets}
        login={login}
        onDismiss={() => {
          setOpen(false)
          if (handleClose) handleClose()
        }}
      />
    </>
  )
}

export default ConnectWalletButton
