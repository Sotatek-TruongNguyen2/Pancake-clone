import styled from 'styled-components'
import { Flex, Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { FC, ReactNode } from 'react'

const Divider = styled.div<{ color: string }>`
  width: 100%;
  background-color: ${({ color }) => color};
  height: 5px;
  border-radius: 3px;
  margin: 5px 0px 10px;
`

const StatWrapper: FC<React.PropsWithChildren<{ label: ReactNode }>> = ({ children, label }) => {
  return (
    <Flex mb="2px" justifyContent="space-between" alignItems="center" width="100%">
      {label}
      <Flex alignItems="center">{children}</Flex>
    </Flex>
  )
}

const BuyingPoolInfoSection = () => {
  const { t } = useTranslation()
  return (
    <>
      <Flex flexDirection="column" width="100%">
        <Text color="textSubtle">100 - 8.000 NKS</Text>
        <Divider color="#53DEE9" />
        <StatWrapper
          label={
            <Text color="textSubtle" small>
              {t('Monthly APR')}:
            </Text>
          }
        >
          <Text ml="4px" small>
            4%
          </Text>
        </StatWrapper>
        <StatWrapper
          label={
            <Text color="textSubtle" small>
              {t('Mining Duration')}:
            </Text>
          }
        >
          <Text ml="4px" small>
            547 {t('days')}
          </Text>
        </StatWrapper>
        <StatWrapper
          label={
            <Text color="textSubtle" small>
              {t('Distribute')}:
            </Text>
          }
        >
          <Text ml="4px" small>
            30 {t('days')}
          </Text>
        </StatWrapper>
      </Flex>
      <Flex flexDirection="column" width="100%">
        <Text color="textSubtle">8.100 - 20.000 NKS</Text>
        <Divider color="#4c95e0" />
        <StatWrapper
          label={
            <Text color="textSubtle" small>
              {t('Monthly APR')}:
            </Text>
          }
        >
          <Text ml="4px" small>
            5%
          </Text>
        </StatWrapper>
        <StatWrapper
          label={
            <Text color="textSubtle" small>
              {t('Mining Duration')}:
            </Text>
          }
        >
          <Text ml="4px" small>
            547 {t('days')}
          </Text>
        </StatWrapper>
        <StatWrapper
          label={
            <Text color="textSubtle" small>
              {t('Distribute')}:
            </Text>
          }
        >
          <Text ml="4px" small>
            30 {t('days')}
          </Text>
        </StatWrapper>
      </Flex>
      <Flex flexDirection="column" width="100%">
        <Text color="textSubtle">20.100 - 50.000 NKS</Text>
        <Divider color="#7645D9" />
        <StatWrapper
          label={
            <Text color="textSubtle" small>
              {t('Monthly APR')}:
            </Text>
          }
        >
          <Text ml="4px" small>
            6%
          </Text>
        </StatWrapper>
        <StatWrapper
          label={
            <Text color="textSubtle" small>
              {t('Mining Duration')}:
            </Text>
          }
        >
          <Text ml="4px" small>
            547 {t('days')}
          </Text>
        </StatWrapper>
        <StatWrapper
          label={
            <Text color="textSubtle" small>
              {t('Distribute')}:
            </Text>
          }
        >
          <Text ml="4px" small>
            30 {t('days')}
          </Text>
        </StatWrapper>
      </Flex>
      <Flex flexDirection="column" width="100%">
        <Text color="textSubtle">51.000- 120.000 NKS</Text>
        <Divider color="#ED4B9E" />
        <StatWrapper
          label={
            <Text color="textSubtle" small>
              {t('Monthly APR')}:
            </Text>
          }
        >
          <Text ml="4px" small>
            8%
          </Text>
        </StatWrapper>
        <StatWrapper
          label={
            <Text color="textSubtle" small>
              {t('Mining Duration')}:
            </Text>
          }
        >
          <Text ml="4px" small>
            547 {t('days')}
          </Text>
        </StatWrapper>
        <StatWrapper
          label={
            <Text color="textSubtle" small>
              {t('Distribute')}:
            </Text>
          }
        >
          <Text ml="4px" small>
            30 {t('days')}
          </Text>
        </StatWrapper>
      </Flex>
      <Flex flexDirection="column" width="100%">
        <Text color="textSubtle">{'>'} 120.000 NKS</Text>
        <Divider color="#d13f68" />
        <StatWrapper
          label={
            <Text color="textSubtle" small>
              {t('Monthly APR')}:
            </Text>
          }
        >
          <Text ml="4px" small>
            10%
          </Text>
        </StatWrapper>
        <StatWrapper
          label={
            <Text color="textSubtle" small>
              {t('Mining Duration')}:
            </Text>
          }
        >
          <Text ml="4px" small>
            547 {t('days')}
          </Text>
        </StatWrapper>
        <StatWrapper
          label={
            <Text color="textSubtle" small>
              {t('Distribute')}:
            </Text>
          }
        >
          <Text ml="4px" small>
            30 {t('days')}
          </Text>
        </StatWrapper>
      </Flex>
    </>
  )
}

export default BuyingPoolInfoSection
