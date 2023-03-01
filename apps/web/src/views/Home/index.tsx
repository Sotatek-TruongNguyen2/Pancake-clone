import styled from 'styled-components'
import PageSection from 'components/PageSection'
import { useAccount } from 'wagmi'
import useTheme from 'hooks/useTheme'
import Container from 'components/Layout/Container'
import { PageMeta } from 'components/Layout/Page'
import { useTranslation } from '@pancakeswap/localization'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { ChainId } from '@pancakeswap/sdk'
import Image from 'next/legacy/image'
import { Link, Text } from '@pancakeswap/uikit'
import Hero from './components/Hero'
import { swapSectionData } from './components/SalesSection/data'
import MetricsSection from './components/MetricsSection'
import SalesSection from './components/SalesSection'
import FarmsPoolsRow from './components/FarmsPoolsRow'
import Footer from './components/Footer'
import CakeDataRow from './components/CakeDataRow'
import { WedgeTopLeft, InnerWedgeWrapper, OuterWedgeWrapper, WedgeTopRight } from './components/WedgeSvgs'
import UserBanner from './components/UserBanner'
import MultipleBanner from './components/Banners/MultipleBanner'
import ethereumIcon from '../../../public/images/home/chain/ethereum.svg'
import avalancheIcon from '../../../public/images/home/chain/avalanche.svg'
import solanaIcon from '../../../public/images/home/chain/solana.svg'
import bnbIcon from '../../../public/images/home/chain/bnb.svg'
import fantomIcon from '../../../public/images/home/chain/fantom.svg'
import polygonIcon from '../../../public/images/home/chain/polygon.svg'

const StyledHeroSection = styled(PageSection)`
  padding-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 48px;
  }
`

const UserBannerWrapper = styled(Container)`
  z-index: 1;
  position: absolute;
  width: 100%;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  padding-left: 0px;
  padding-right: 0px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 24px;
    padding-right: 24px;
  }
`
const ChainList = styled.div`
  display: flex;
  justify-content: space-between;
`

const ChainItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const chainList = [
  {
    icon: ethereumIcon,
    label: 'ethereum',
    link: 'https://ethereum.org/en/',
  },
  {
    icon: avalancheIcon,
    label: 'avalanche',
    link: 'https://www.avax.network/',
  },
  {
    icon: solanaIcon,
    label: 'solana',
    link: 'https://solana.com/',
  },
  {
    icon: bnbIcon,
    label: 'bnb',
    link: 'https://www.bnbchain.world/en',
  },
  {
    icon: fantomIcon,
    label: 'fantom',
    link: 'https://fantom.foundation/',
  },
  {
    icon: polygonIcon,
    label: 'polygon',
    link: 'https://polygon.technology/',
  },
]

const Home: React.FC<React.PropsWithChildren> = () => {
  const { theme } = useTheme()
  const { address: account } = useAccount()
  const { chainId } = useActiveChainId()

  const HomeSectionContainerStyles = { margin: '0', width: '100%', maxWidth: '968px' }

  const { t } = useTranslation()

  return (
    <>
      <PageMeta />
      <style jsx global>{`
        #home-1 .page-bg {
          background: linear-gradient(139.73deg, #e6fdff 0%, #f3efff 100%);
        }
        [data-theme='dark'] #home-1 .page-bg {
          background: radial-gradient(103.12% 50% at 50% 50%, #21193a 0%, #191326 100%);
        }
        #home-2 .page-bg {
          background: linear-gradient(180deg, #ffffff 22%, #d7caec 100%);
        }
        [data-theme='dark'] #home-2 .page-bg {
          background: linear-gradient(180deg, #09070c 22%, #201335 100%);
        }
        #home-3 .page-bg {
          background: linear-gradient(180deg, #6fb6f1 0%, #eaf2f6 100%);
        }
        [data-theme='dark'] #home-3 .page-bg {
          background: linear-gradient(180deg, #0b4576 0%, #091115 100%);
        }
        #home-4 .inner-wedge svg {
          fill: #d8cbed;
        }
        [data-theme='dark'] #home-4 .inner-wedge svg {
          fill: #201335;
        }
      `}</style>
      <StyledHeroSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home-1',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        {account && chainId === ChainId.BSC && (
          <UserBannerWrapper>
            <UserBanner />
          </UserBannerWrapper>
        )}
        <MultipleBanner />
        <Hero />
      </StyledHeroSection>
      <PageSection index={2}>
        <ChainList>
          {chainList.map(({ icon, link, label }) => (
            <Link href={link} style={{ textDecoration: 'none' }}>
              <ChainItemWrapper>
                <Image src={icon} priority width={200} />
                <Text
                  display="inline"
                  textAlign="center"
                  color="textSubtle"
                  mb="20px"
                  fontWeight={700}
                  textTransform="uppercase"
                >
                  {label}
                </Text>
              </ChainItemWrapper>
            </Link>
          ))}
        </ChainList>
      </PageSection>
      <PageSection index={2} hasCurvedDivider={false} background={theme.colors.background}>
        <OuterWedgeWrapper>
          <InnerWedgeWrapper top>
            <WedgeTopLeft />
          </InnerWedgeWrapper>
        </OuterWedgeWrapper>
        <SalesSection {...swapSectionData(t)} />
      </PageSection>

      <PageSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home-2',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <MetricsSection />
      </PageSection>

      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background="linear-gradient(180deg, #7645D9 0%, #5121B1 100%)"
        index={2}
        hasCurvedDivider={false}
      >
        <Footer />
      </PageSection>
    </>
  )
}

export default Home
