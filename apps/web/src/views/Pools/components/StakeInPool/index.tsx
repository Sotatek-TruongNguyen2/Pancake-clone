import { useTranslation } from '@pancakeswap/localization'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import { formatNumber } from '@pancakeswap/utils/formatBalance'
import { AutoRenewIcon, BalanceInput, Button, Flex, Image, Text, Modal, Input, useToast } from '@pancakeswap/uikit'
import getThemeValue from '@pancakeswap/uikit/src/util/getThemeValue'
import { useNikaStakingContract, useOracleContract, useTokenContract } from 'hooks/useContract'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useAccount, useWaitForTransaction } from 'wagmi'
import { MaxUint256 } from '@ethersproject/constants'
import useCatchTxError from 'hooks/useCatchTxError'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { NIKA_ADDR, NULL_ADDR } from 'config/constants/nikaContract'
import { useAppDispatch } from 'state'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { fetchNikaPoolData } from 'state/nikaPool'

interface StakeInPoolModalProps {
  // Pool attributes
  stakingTokenDecimals: number
  stakingTokenSymbol: string
  stakingTokenAddress: string
  onDismiss?: () => void
  imageUrl?: string
}

const MIN_AMOUNT = 100

export const StakeInPoolModal: React.FC<React.PropsWithChildren<StakeInPoolModalProps>> = ({
  stakingTokenDecimals,
  stakingTokenSymbol,
  stakingTokenAddress,
  onDismiss,
  imageUrl = '/images/tokens/',
}) => {
  const { t } = useTranslation()
  const theme = useTheme()
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

      dispatch(fetchNikaPoolData({ account, chainId }))
    }
  }

  useWaitForTransaction({
    hash: approveTxHash as any,
    onSuccess: async () => {
      stakeToken()
    },
  })

  const usdValueStaked = new BigNumber(minApproveAmount ? minApproveAmount.toString() : 0).dividedBy(
    new BigNumber(10).pow(18),
  )
  const formattedUsdValueStaked = !usdValueStaked.isNaN() && formatNumber(usdValueStaked.toNumber())

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
      const _stakeAmount = new BigNumber(stakeAmount || 0)
      const isValid = _stakeAmount.gte(MIN_AMOUNT)
      const minAmount = await oracleContract.consult(
        NIKA_ADDR,
        _stakeAmount.times(new BigNumber(10).pow(18)).toString(),
      )
      setIsValidAmount(isValid)
      setMinApproveAmount(minAmount)
    }
    updateData()
  }, [stakeAmount])

  return (
    <Modal
      minWidth="346px"
      title={t('Stake in Pool')}
      onDismiss={onDismiss}
      headerBackground={getThemeValue(theme, 'colors.gradientCardHeader')}
    >
      <Flex alignItems="center" justifyContent="space-between" mb="8px">
        <Text bold>{t('Stake')}:</Text>
        <Flex alignItems="center" minWidth="70px">
          <Image src={`${imageUrl}${stakingTokenAddress}.png`} width={24} height={24} alt={stakingTokenSymbol} />
          <Text ml="4px" bold>
            {stakingTokenSymbol}
          </Text>
        </Flex>
      </Flex>
      <BalanceInput
        value={stakeAmount}
        onUserInput={handleStakeInputChange}
        currencyValue={`~${formattedUsdValueStaked || 0} USDC`}
        decimals={stakingTokenDecimals}
        isWarning={!isValidAmount}
      />
      <Text ml="auto" color="textSubtle" fontSize="12px" mb="8px">
        {t('Minimum amount of NIKA to stake is 50 tokens')}
      </Text>

      <Flex alignItems="center" justifyContent="space-between" mb="8px" mt="16px">
        <Text bold>{t('Referrer address')}:</Text>
      </Flex>
      <Input onChange={handleAddressChange} value={address} />

      <Button
        isLoading={pendingTx}
        endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
        onClick={handleSubmit}
        disabled={!stakeAmount || parseFloat(stakeAmount) === 0 || !isValidAmount}
        mt="24px"
      >
        {pendingTx ? t('Confirming') : t('Confirm')}
      </Button>
    </Modal>
  )
}
