import React, { memo, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { Heading, Text, Button, ArrowForwardIcon, PageHeader } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { usePollFarmsV1WithUserData } from 'state/farmsV1/hooks'
import { useFetchPublicPoolsData } from 'views/Migration/hook/V1/Pool/useFetchPublicPoolsData'
import Page from 'components/Layout/Page'
import ProgressSteps, { Step, ProgressStepsType } from './components/ProgressSteps'
import MigrationSticky from './components/MigrationSticky'

const MigrationPage: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [step, setStep] = useState<ProgressStepsType>(ProgressStepsType.STEP1)
  const steps: Step[] = [
    {
      stepId: ProgressStepsType.STEP1,
      canHover: true,
      text: t('Unstake LP tokens and NIKA from the old MasterChef contract.'),
    },
    {
      stepId: ProgressStepsType.STEP2,
      canHover: true,
      text: t('Stake LP tokens and NIKA to the new MasterChef v2 contract.'),
    },
  ]

  // v1 Farms
  usePollFarmsV1WithUserData()

  // v1 Pools
  useFetchPublicPoolsData()

  const scrollToTop = (): void => {
    window.scrollTo({
      top: tableWrapperEl.current.offsetTop,
      behavior: 'smooth',
    })
  }

  const handleMigrationStickyClick = () => {
    scrollToTop()
    if (step === ProgressStepsType.STEP1) {
      setStep(ProgressStepsType.STEP2)
    } else {
      router.push('/')
    }
  }

  return (
    <div ref={tableWrapperEl}>
      <PageHeader>
        <Heading as="h1" scale="xxl" color="secondary" mb="24px">
          {t('Migration')}
        </Heading>
        <Heading scale="lg" color="text">
          {t('Migrate your stakings to the new MasterChef contract.')}
        </Heading>

        <Button p="0" variant="text">
          <Text color="primary" bold fontSize="16px" mr="4px">
            {t('Learn more')}
          </Text>
          <ArrowForwardIcon color="primary" />
        </Button>
      </PageHeader>
      <Page>
        <ProgressSteps pickedStep={step} steps={steps} onClick={setStep} />
      </Page>
      <MigrationSticky step={step} handleClick={handleMigrationStickyClick} />
    </div>
  )
}

export default memo(MigrationPage)
