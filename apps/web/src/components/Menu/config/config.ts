import {
  MenuItemsType,
  DropdownMenuItemType,
  SwapIcon,
  SwapFillIcon,
  EarnFillIcon,
  EarnIcon,
  TrophyIcon,
  TrophyFillIcon,
  NftIcon,
  NftFillIcon,
  MoreIcon,
  DropdownMenuItems,
} from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'
// import { nftsBaseUrl } from 'views/Nft/market/constants'
import { SUPPORT_ONLY_BSC } from 'config/constants/supportChains'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
  [
    {
      label: t('Trade'),
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      href: '/swap',
      showItemsOnMobile: false,
      items: [
        {
          label: t('Swap'),
          href: '/swap',
        },
        {
          label: t('Limit'),
          // href: '/limit-orders',
          supportChainIds: SUPPORT_ONLY_BSC,
        },
        {
          label: t('Liquidity'),
          href: '/liquidity',
        },
        {
          label: t('Perpetual'),
          // href: getPerpetualUrl({
          //   chainId,
          //   languageCode,
          //   isDark,
          // }),
          // type: DropdownMenuItemType.EXTERNAL_LINK,
        },
        {
          label: t('Bridge'),
          // href: 'https://bridge.pancakeswap.finance/',
          // type: DropdownMenuItemType.EXTERNAL_LINK,
        },
        {
          label: t('IDO'),
          // href: 'https://bridge.pancakeswap.finance/',
          // type: DropdownMenuItemType.EXTERNAL_LINK,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('IFO'),
      href: '/farms',
      icon: EarnIcon,
      fillIcon: EarnFillIcon,
      items: [
        {
          label: t('IFO'),
        },
        {
          label: t('Farms'),
          href: '/farms',
        },
        {
          label: t('Staking'),
          href: '/pools',
          supportChainIds: SUPPORT_ONLY_BSC,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    // {
    //   label: t('Win'),
    //   // href: '/prediction',
    //   href: null,
    //   icon: TrophyIcon,
    //   fillIcon: TrophyFillIcon,
    //   supportChainIds: SUPPORT_ONLY_BSC,
    //   items: [
    //     {
    //       label: t('Trading Competition'),
    //       // href: '/competition',
    //       href: null,
    //       hideSubNav: true,
    //     },
    //     {
    //       label: t('Prediction (BETA)'),
    //       // href: '/prediction',
    //       href: null,
    //     },
    //     {
    //       label: t('Lottery'),
    //       // href: '/lottery',
    //       href: null,
    //     },
    //     {
    //       label: t('Pottery (BETA)'),
    //       // href: '/pottery',
    //       href: null,
    //     },
    //   ],
    // },
    {
      label: t('NFT'),
      // href: `${nftsBaseUrl}`,
      href: null,
      icon: NftIcon,
      fillIcon: NftFillIcon,
      supportChainIds: SUPPORT_ONLY_BSC,
      items: [
        {
          label: t('Overview'),
          // href: `${nftsBaseUrl}`,
          href: null,
        },
        {
          label: t('Collections'),
          // href: `${nftsBaseUrl}/collections`,
          href: null,
        },
        {
          label: t('Activity'),
          // href: `${nftsBaseUrl}/activity`,
          href: null,
        },
      ],
    },
    {
      label: '',
      // href: '/info',
      icon: MoreIcon,
      hideSubNav: true,
      items: [
        {
          label: t('Info'),
          // href: '/info',
          href: null,
        },
        {
          label: t('Voting'),
          // href: '/voting',
          href: null,
          supportChainIds: SUPPORT_ONLY_BSC,
        },
        {
          type: DropdownMenuItemType.DIVIDER,
        },
        {
          label: t('Leaderboard'),
          // href: '/teams',
          href: null,
          supportChainIds: SUPPORT_ONLY_BSC,
        },
        {
          type: DropdownMenuItemType.DIVIDER,
        },
        // {
        //   label: t('Blog'),
        //   // href: 'https://medium.com/pancakeswap',
        //   type: DropdownMenuItemType.EXTERNAL_LINK,
        // },
        // {
        //   label: t('Docs'),
        //   // href: 'https://docs.pancakeswap.finance',
        //   type: DropdownMenuItemType.EXTERNAL_LINK,
        // },
        {
          label: t('Trading Competition'),
          // href: '/competition',
          href: null,
          hideSubNav: true,
        },
        {
          label: t('Prediction (BETA)'),
          // href: '/prediction',
          href: null,
        },
        {
          label: t('Lottery'),
          // href: '/lottery',
          href: null,
        },
        {
          label: t('Pottery (BETA)'),
          // href: '/pottery',
          href: null,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
