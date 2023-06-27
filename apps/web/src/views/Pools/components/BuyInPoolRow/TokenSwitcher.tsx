import React, { useEffect, useState } from 'react'
import { Box, Flex, Image, Text, ChevronDownIcon } from '@pancakeswap/uikit'
import { usePopper } from 'react-popper'
import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'
import {
  UserMenuItemProps,
  UserMenuProps,
  variants,
} from '@pancakeswap/uikit/src/widgets/Menu/components/UserMenu/types'
import MenuIcon from '@pancakeswap/uikit/src/widgets/Menu/components/UserMenu/MenuIcon'

export const UserMenuItem = styled.button<UserMenuItemProps>`
  align-items: center;
  border: 0;
  background: transparent;
  color: ${({ theme, disabled }) => theme.colors[disabled ? 'textDisabled' : 'textSubtle']};
  cursor: pointer;
  display: flex;
  font-size: 16px;
  height: 48px;
  justify-content: space-between;
  outline: 0;
  padding-left: 16px;
  padding-right: 16px;
  width: 120px;

  &:is(button) {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.tertiary};
  }

  &:active:not(:disabled) {
    opacity: 0.85;
    transform: translateY(1px);
  }
`

export const StyledUserMenu = styled(Flex)<{ isOpen: boolean }>`
  align-items: center;
  // background-color: ${({ isOpen, theme }) => (isOpen ? theme.colors.tertiary : '')};
  // border-radius: 16px;
  // box-shadow: ${({ isOpen }) => (isOpen ? 'inset 0px -2px 0px rgba(0, 0, 0, 0.1)' : '')};
  cursor: pointer;
  display: inline-flex;
  height: 32px;
  padding-left: 32px;
  padding-right: 8px;
  position: relative;

  &:hover {
    // background-color: ${({ theme }) => theme.colors.tertiary};
    // box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
    opacity: 0.65;
  }
`

export const LabelText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  display: none;
  font-weight: 600;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
    margin-left: 8px;
    margin-right: 4px;
  }
`

const Menu = styled.div<{ isOpen: boolean }>`
  background-color: ${({ theme }) => theme.card.background};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 16px;
  padding-bottom: 4px;
  padding-top: 4px;
  pointer-events: auto;
  width: 120px;
  visibility: visible;
  z-index: 1001;

  ${({ isOpen }) =>
    !isOpen &&
    `
    pointer-events: none;
    visibility: hidden;
  `}

  ${UserMenuItem}:first-child {
    border-radius: 8px 8px 0 0;
  }

  ${UserMenuItem}:last-child {
    border-radius: 0 0 8px 8px;
  }
`

const UserMenu: React.FC<UserMenuProps> = ({
  account,
  text,
  avatarSrc,
  avatarClassName,
  variant = variants.DEFAULT,
  children,
  disabled,
  placement = 'bottom-end',
  recalculatePopover,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null)
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null)
  const accountEllipsis = account ? `${account.substring(0, 2)}...${account.substring(account.length - 4)}` : null
  const { styles, attributes, update } = usePopper(targetRef, tooltipRef, {
    strategy: 'fixed',
    placement,
    modifiers: [{ name: 'offset', options: { offset: [0, 0] } }],
  })

  // recalculate the popover position
  useEffect(() => {
    if (recalculatePopover && isOpen && update) update()
  }, [isOpen, update, recalculatePopover])

  useEffect(() => {
    const hideDropdownMenu = (evt: MouseEvent | TouchEvent) => {
      const target = evt.target as Node
      if (target && !tooltipRef?.contains(target)) {
        setIsOpen(false)
        evt.stopPropagation()
      }
    }

    document.addEventListener('mousedown', hideDropdownMenu)

    return () => {
      document.removeEventListener('mousedown', hideDropdownMenu)
    }
  }, [targetRef, tooltipRef, setIsOpen])

  return (
    <Flex alignItems="center" height="100%" ref={setTargetRef} {...props}>
      <StyledUserMenu onClick={() => setIsOpen(true)} isOpen={isOpen}>
        <MenuIcon className={avatarClassName} avatarSrc={avatarSrc} variant={variant} />
        <LabelText title={typeof text === 'string' ? text || account : account}>{text || accountEllipsis}</LabelText>
        {!disabled && <ChevronDownIcon color="text" width="24px" />}
      </StyledUserMenu>
      {!disabled && (
        <Menu style={styles.popper} ref={setTooltipRef} {...attributes.popper} isOpen={isOpen}>
          <Box onClick={() => setIsOpen(false)}>{children?.({ isOpen })}</Box>
        </Menu>
      )}
    </Flex>
  )
}

const imageUrl = '/images/tokens/'

const TokenSwitcher = ({ activeToken, setActiveToken, itemsList }) => {
  return (
    <UserMenu avatarSrc={`${imageUrl}${activeToken.address}.png`} text={activeToken.symbol}>
      {({ isOpen }) =>
        isOpen ? (
          <>
            {itemsList.map((token) => {
              const { address, symbol } = token
              if (address === activeToken.address) return <></>

              return (
                <UserMenuItem
                  onClick={() => {
                    setActiveToken(token)
                  }}
                >
                  <Flex alignItems="center" minWidth="70px">
                    <Image src={`${imageUrl}${address}.png`} width={24} height={24} alt={symbol} />
                    <Text ml="4px" bold>
                      {symbol}
                    </Text>
                  </Flex>
                </UserMenuItem>
              )
            })}
          </>
        ) : null
      }
    </UserMenu>
  )
}
export default TokenSwitcher
