import { MaxUint256 } from '@ethersproject/constants'
import { useTranslation } from '@pancakeswap/localization'
import { AutoRenewIcon, BalanceInput, Button, Flex, Input, Text, useToast } from '@pancakeswap/uikit'
import { formatLpBalance, getDecimalAmount } from '@pancakeswap/utils/formatBalance'
import BigNumber from 'bignumber.js'
import { ToastDescriptionWithTx } from 'components/Toast'
import { NIKA_ADDR, NULL_ADDR } from 'config/constants/nikaContract'
import { useCurrency } from 'hooks/Tokens'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxError from 'hooks/useCatchTxError'
import { useNikaStakingContract, useOracleContract, useTokenContract } from 'hooks/useContract'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from 'state'
import { fetchNikaPoolData } from 'state/nikaPool'
import { useNikaPool } from 'state/nikaPool/hooks'
import { NikaPoolState } from 'state/types'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useAccount, useWaitForTransaction } from 'wagmi'

const MIN_AMOUNT = 50

const StakeNika = ({ onDismiss }) => {
  const { t } = useTranslation()
  const [stakeAmount, setStakeAmount] = useState('')
  const [address, setAddress] = useState('')
  const nikaStakingContract = useNikaStakingContract()
  const oracleContract = useOracleContract()
  const nikaTokenContract = useTokenContract(NIKA_ADDR)
  const { toastSuccess } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { address: account } = useAccount()
  const [approveTxHash, setApproveTxHash] = useState<string>()
  const [isValidAmount, setIsValidAmount] = useState(true)
  const [minApproveAmount, setMinApproveAmount] = useState<BigNumber>()
  const dispatch = useAppDispatch()
  const { chainId } = useActiveChainId()
  const currency = useCurrency(NIKA_ADDR)
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const {
    userData: { joinByReferral },
  } = useNikaPool() as NikaPoolState

  const handleSubmit = async () => {
    const approvedAmount = await nikaTokenContract.allowance(account, nikaStakingContract.address)
    if (new BigNumber(approvedAmount.toString()).gte(new BigNumber(minApproveAmount || 0))) {
      stakeToken()
    } else {
      const receipt = await fetchWithCatchTxError(() => {
        return callWithGasPrice(nikaTokenContract, 'approve', [nikaStakingContract.address, MaxUint256])
      })
      if (receipt?.status) {
        setApproveTxHash(receipt.transactionHash)
      }
    }
  }
  const stakeToken = async () => {
    if (!stakeAmount || new BigNumber(stakeAmount).lt(MIN_AMOUNT)) return
    const receipt = await fetchWithCatchTxError(() => {
      return nikaStakingContract.deposit(
        new BigNumber(stakeAmount).times(new BigNumber(10).pow(18)).toString(),
        address || NULL_ADDR,
      )
    })
    if (receipt?.status) {
      onDismiss()
      toastSuccess(
        `${t('Stake')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {`You have successfully staked ${stakeAmount} NIKA`}
        </ToastDescriptionWithTx>,
      )

      if (account) {
        dispatch(fetchNikaPoolData({ account, chainId }))
      }
    }
  }

  useWaitForTransaction({
    hash: approveTxHash as any,
    onSuccess: async () => {
      stakeToken()
    },
  })

  const usdValueStaked = formatLpBalance(minApproveAmount, 18)

  const handleStakeInputChange = (input: string) => {
    setStakeAmount(input)
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      setAddress(e.currentTarget.value.replace(/,/g, '.'))
    }
  }

  useEffect(() => {
    const updateData = async () => {
      const bigStakeAmount = new BigNumber(stakeAmount || 0)
      const isValid = bigStakeAmount.gte(MIN_AMOUNT)
      const minAmount = await oracleContract.consult(NIKA_ADDR, getDecimalAmount(bigStakeAmount).toString())
      setIsValidAmount(isValid)
      if (minAmount) setMinApproveAmount(new BigNumber(minAmount.toString()))
    }
    updateData()
  }, [stakeAmount, oracleContract])

  return (
    <>
      <Text ml="auto" color="textSubtle" fontSize="14px">
        {t('Balance')}: {selectedCurrencyBalance?.toFixed(4)} NIKA
      </Text>
      <BalanceInput
        value={stakeAmount}
        onUserInput={handleStakeInputChange}
        currencyValue={`~${usdValueStaked || 0} USDT`}
        decimals={18}
        isWarning={!isValidAmount}
      />
      <Text ml="auto" color="textSubtle" fontSize="12px" mb="8px">
        {t('Minimum amount of NIKA to stake is 50 tokens')}
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
        disabled={!stakeAmount || parseFloat(stakeAmount) === 0 || !isValidAmount}
        mt="24px"
      >
        {pendingTx ? t('Confirming') : t('Confirm')}
      </Button>
    </>
  )
}

export default StakeNika
