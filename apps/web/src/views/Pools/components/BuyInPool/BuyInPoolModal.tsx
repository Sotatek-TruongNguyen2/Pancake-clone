import { useTranslation } from '@pancakeswap/localization'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import { getDecimalAmount, formatLpBalance } from '@pancakeswap/utils/formatBalance'
import { AutoRenewIcon, BalanceInput, Button, Flex, Image, Text, Modal, Input, useToast } from '@pancakeswap/uikit'
import getThemeValue from '@pancakeswap/uikit/src/util/getThemeValue'
import { useNikaIdoPoolContract, useOracleContract, useTokenContract } from 'hooks/useContract'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useAccount, useWaitForTransaction } from 'wagmi'
import { MaxUint256 } from '@ethersproject/constants'
import useCatchTxError from 'hooks/useCatchTxError'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { NIKA_ADDR, NULL_ADDR, USDC_ADDR } from 'config/constants/nikaContract'

interface BuyInPoolModalProps {
  // Pool attributes
  buyingTokenDecimals: number
  buyingTokenSymbol: string
  buyingTokenAddress: string
  onDismiss?: () => void
  imageUrl?: string
}

const MIN_AMOUNT = 100

export const BuyInPoolModal: React.FC<React.PropsWithChildren<BuyInPoolModalProps>> = ({
  buyingTokenDecimals,
  buyingTokenSymbol,
  buyingTokenAddress,
  onDismiss,
  imageUrl = '/images/tokens/',
}) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const [buyAmount, setBuyAmount] = useState('')
  const [address, setAddress] = useState('')
  const idoContract = useNikaIdoPoolContract()
  const oracleContract = useOracleContract()
  const usdcTokenContract = useTokenContract(USDC_ADDR)
  const { toastSuccess } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { address: account } = useAccount()
  const [approveTxHash, setApproveTxHash] = useState<string>()
  const [isValidAmount, setIsValidAmount] = useState(true)
  const [minApproveAmount, setMinApproveAmount] = useState<BigNumber>(new BigNumber(0))

  const handleSubmit = async () => {
    const approvedAmount = await usdcTokenContract.allowance(account, idoContract.address)
    if (new BigNumber(approvedAmount.toString()).gte(new BigNumber(minApproveAmount || 0))) {
      buyToken()
    } else {
      const receipt = await fetchWithCatchTxError(() => {
        return callWithGasPrice(usdcTokenContract, 'approve', [idoContract.address, MaxUint256])
      })
      if (receipt?.status) {
        setApproveTxHash(receipt.transactionHash)
      }
    }
  }

  const buyToken = async () => {
    if (!buyAmount) return
    const bigBuyAmount = new BigNumber(buyAmount)
    if (bigBuyAmount.lt(MIN_AMOUNT)) return
    const receipt = await fetchWithCatchTxError(() => {
      return idoContract.buyToken(getDecimalAmount(bigBuyAmount).toString(), address || NULL_ADDR)
    })
    if (receipt?.status) {
      onDismiss()
      toastSuccess(
        `${t('Bought')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {`You have successfully bought ${buyAmount} NIKA`}
        </ToastDescriptionWithTx>,
      )
    }
  }

  useWaitForTransaction({
    hash: approveTxHash as any,
    onSuccess: async () => {
      buyToken()
    },
  })

  const usdValueStaked = formatLpBalance(minApproveAmount, 18)
  // console.log('minApproveAmount: ', minApproveAmount)
  console.log('usdValueStaked: ', usdValueStaked.toString())
  // const formattedUsdValueBought = !usdValueStaked.isNaN() && formatNumber(usdValueStaked.toNumber())
  // console.log('formattedUsdValueBought: ', formattedUsdValueBought)

  const handleBuyInputChange = (input: string) => {
    setBuyAmount(input)
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      setAddress(e.currentTarget.value.replace(/,/g, '.'))
    }
  }

  useEffect(() => {
    const updateData = async () => {
      const bigBuyAmount = new BigNumber(buyAmount || 0)
      const isValid = bigBuyAmount.gte(MIN_AMOUNT)
      const minAmount = await oracleContract.consult(NIKA_ADDR, getDecimalAmount(bigBuyAmount).toString())
      setIsValidAmount(isValid)
      if (minAmount) setMinApproveAmount(new BigNumber(minAmount.toString()))
    }
    updateData()
  }, [buyAmount])

  return (
    <Modal
      minWidth="346px"
      title={t('Buy in Pool')}
      onDismiss={onDismiss}
      headerBackground={getThemeValue(theme, 'colors.gradientCardHeader')}
    >
      <Flex alignItems="center" justifyContent="space-between" mb="8px">
        <Text bold>{t('Buy')}:</Text>
        <Flex alignItems="center" minWidth="70px">
          <Image src={`${imageUrl}${buyingTokenAddress}.png`} width={24} height={24} alt={buyingTokenSymbol} />
          <Text ml="4px" bold>
            {buyingTokenSymbol}
          </Text>
        </Flex>
      </Flex>
      <BalanceInput
        value={buyAmount}
        onUserInput={handleBuyInputChange}
        currencyValue={`~${usdValueStaked || 0} USDC`}
        decimals={buyingTokenDecimals}
        isWarning={!isValidAmount}
      />

      <Text ml="auto" color="textSubtle" fontSize="12px" mb="8px">
        {t('Minimum amount of NIKA to buy is 100 tokens')}
      </Text>

      <Flex alignItems="center" justifyContent="space-between" mb="8px" mt="16px">
        <Text bold>Referrer address:</Text>
      </Flex>
      <Input onChange={handleAddressChange} value={address} />

      <Button
        isLoading={pendingTx}
        endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
        onClick={handleSubmit}
        disabled={!buyAmount || parseFloat(buyAmount) === 0 || !isValidAmount}
        mt="24px"
      >
        {pendingTx ? t('Confirming') : t('Confirm')}
      </Button>
    </Modal>
  )
}
