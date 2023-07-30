import { MaxUint256 } from '@ethersproject/constants'
import { useTranslation } from '@pancakeswap/localization'
import { AutoRenewIcon, BalanceInput, Button, Flex, Input, Text, useToast } from '@pancakeswap/uikit'
import { formatLpBalance, getDecimalAmount } from '@pancakeswap/utils/formatBalance'
import BigNumber from 'bignumber.js'
import { ToastDescriptionWithTx } from 'components/Toast'
import { NULL_ADDR, USDT_ADDR } from 'config/constants/nikaContract'
import { useCurrency } from 'hooks/Tokens'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxError from 'hooks/useCatchTxError'
import { useNikaIdoPoolContract, useOracleContract, useTokenContract } from 'hooks/useContract'
import React, { useEffect, useState } from 'react'
import { useNikaPool } from 'state/nikaPool/hooks'
import { NikaPoolState } from 'state/types'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useAccount, useWaitForTransaction } from 'wagmi'

const MIN_AMOUNT = 50

const BuyNika = ({ onDismiss }) => {
  const { t } = useTranslation()
  const [buyAmount, setBuyAmount] = useState('')
  const [address, setAddress] = useState('')
  const idoContract = useNikaIdoPoolContract()
  const oracleContract = useOracleContract()
  const usdtTokenContract = useTokenContract(USDT_ADDR)
  const { toastSuccess } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { address: account } = useAccount()
  const [approveTxHash, setApproveTxHash] = useState<string>()
  const [isValidAmount, setIsValidAmount] = useState(true)
  const [minApproveAmount, setMinApproveAmount] = useState<BigNumber>(new BigNumber(0))
  const currency = useCurrency(USDT_ADDR)
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const {
    userData: { joinByReferral },
  } = useNikaPool() as NikaPoolState

  const handleSubmit = async () => {
    const approvedAmount = await usdtTokenContract.allowance(account, idoContract.address)
    if (new BigNumber(approvedAmount.toString()).gte(new BigNumber(minApproveAmount || 0))) {
      buyToken()
    } else {
      const receipt = await fetchWithCatchTxError(() => {
        return callWithGasPrice(usdtTokenContract, 'approve', [idoContract.address, MaxUint256])
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
          {t('You have successfully bought %buyAmount% NIKA', {
            buyAmount,
          })}
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
      const minAmount = await oracleContract.consult(USDT_ADDR, getDecimalAmount(bigBuyAmount).toString())
      setIsValidAmount(isValid)
      if (minAmount) setMinApproveAmount(new BigNumber(minAmount.toString()))
    }
    updateData()
  }, [buyAmount, oracleContract])
  return (
    <>
      <Text ml="auto" color="textSubtle" fontSize="14px">
        {t('Balance')}: {selectedCurrencyBalance?.toFixed(4)} USDT
      </Text>
      <BalanceInput
        value={buyAmount}
        onUserInput={handleBuyInputChange}
        currencyValue={`~${usdValueStaked || 0} NIKA`}
        decimals={18}
        isWarning={!isValidAmount}
      />

      <Text ml="auto" color="textSubtle" fontSize="12px" mb="8px">
        {t('Minimum amount of NIKA to buy is 1000 USDT')}
      </Text>

      {!joinByReferral && (
        <>
          <Flex alignItems="center" justifyContent="space-between" mb="8px" mt="16px">
            <Text bold>{t('Referrer address')}:</Text>
          </Flex>
          <Input onChange={handleAddressChange} value={address} />
        </>
      )}

      <Button
        isLoading={pendingTx}
        endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
        onClick={handleSubmit}
        disabled={!buyAmount || parseFloat(buyAmount) === 0 || !isValidAmount}
        mt="24px"
      >
        {pendingTx ? t('Confirming') : t('Confirm')}
      </Button>
    </>
  )
}

export default BuyNika
