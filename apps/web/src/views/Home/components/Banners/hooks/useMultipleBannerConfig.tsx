import { ReactElement, useMemo } from 'react'
import IFOBanner from '../IFOBanner'
import useIsRenderIfoBanner from './useIsRenderIFOBanner'
import AptosBanner from '../AptosBanner'

interface IBannerConfig {
  shouldRender: boolean
  banner: ReactElement
}

/**
 * make your custom hook to control should render specific banner or not
 * add new campaign banner easily
 *
 * @example
 * ```ts
 *  {
 *    shouldRender: isRenderIFOBanner,
 *    banner: <IFOBanner />,
 *  },
 * ```
 */
export const useMultipleBannerConfig = () => {
  const isRenderIFOBanner = useIsRenderIfoBanner()

  return useMemo(() => {
    const NO_SHUFFLE_BANNERS: IBannerConfig[] = [
      { shouldRender: true, banner: <AptosBanner /> },
      {
        shouldRender: isRenderIFOBanner,
        banner: <IFOBanner />,
      },
    ]

    return NO_SHUFFLE_BANNERS.filter((bannerConfig: IBannerConfig) => bannerConfig.shouldRender).map(
      (bannerConfig: IBannerConfig) => bannerConfig.banner,
    )
  }, [isRenderIFOBanner])
}
