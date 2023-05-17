import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import BigNumber from 'bignumber.js'
import nikaStakingAbi from 'config/abi/nikaStakingAbi.json'
import { NULL_ADDR } from 'config/constants/nikaContract'
import { getNikaStakingAddress } from 'utils/addressHelpers'
import { multicallv3 } from 'utils/multicall'

export const fetchPoolData = async (account: string, chainId?: number) => {
  console.log('fetch nika pool data', account, chainId)
  const nikaStakingAddress = getNikaStakingAddress(chainId)
  try {
    const calls = ['poolPendingRewardPerday', 'getUserInformation', 'getF1Invited', 'getUserReferrer'].map(
      (method) => ({
        abi: nikaStakingAbi,
        address: nikaStakingAddress,
        name: method,
        params: [account],
      }),
    )

    const totalStakedCall = {
      abi: nikaStakingAbi,
      address: nikaStakingAddress,
      name: 'getTotalStaked',
    }

    const [[pendingRewards], [userInformation], [f1Referee], [referrer], [totalStaked]] = await multicallv3({
      calls: [...calls, totalStakedCall],
      allowFailure: true,
      chainId,
    })

    const pendingRewardsAsBigNumber = pendingRewards ? new BigNumber(pendingRewards.toString()) : BIG_ZERO

    const [
      totalStakes,
      totalWithdrawClaimed,
      totalClaimed,
      claimStakedPerDay,
      maxClaim,
      vestingDuration,
      interestDuration,
      lastClaimStaked,
      lastUpdatedTime,
      lastTimeDeposited,
      lastTimeClaimed,
      interestRates,
      joinByReferral,
    ] = userInformation

    const totalStakesAsBigNumber = totalStakes ? new BigNumber(totalStakes.toString()) : BIG_ZERO
    const totalWithdrawClaimedAsBigNumber = totalWithdrawClaimed
      ? new BigNumber(totalWithdrawClaimed.toString())
      : BIG_ZERO
    const totalClaimedAsBigNumber = totalClaimed ? new BigNumber(totalClaimed.toString()) : BIG_ZERO
    const claimStakedPerDayAsBigNumber = claimStakedPerDay ? new BigNumber(claimStakedPerDay.toString()) : BIG_ZERO
    const maxClaimAsBigNumber = maxClaim ? new BigNumber(maxClaim.toString()) : BIG_ZERO
    const vestingDurationAsBigNumber = vestingDuration ? new BigNumber(vestingDuration.toString()) : BIG_ZERO
    const interestDurationAsBigNumber = interestDuration ? new BigNumber(interestDuration.toString()) : BIG_ZERO
    const lastClaimStakedAsBigNumber = lastClaimStaked ? new BigNumber(lastClaimStaked.toString()) : BIG_ZERO
    const lastUpdatedTimeAsBigNumber = lastUpdatedTime ? new BigNumber(lastUpdatedTime.toString()) : BIG_ZERO
    const lastTimeDepositedAsBigNumber = lastTimeDeposited ? new BigNumber(lastTimeDeposited.toString()) : BIG_ZERO
    const lastTimeClaimedAsBigNumber = lastTimeClaimed ? new BigNumber(lastTimeClaimed.toString()) : BIG_ZERO
    const interestRatesAsNumber = interestRates ? Number(interestRates) : 0

    const f1RefereeAsBigNumber = f1Referee ? new BigNumber(f1Referee.toString()) : BIG_ZERO
    const referrerAsString = referrer as string
    const totalStakedAsBigNumber = totalStaked ? new BigNumber(totalStaked.toString()) : BIG_ZERO

    return {
      f1Referee: f1RefereeAsBigNumber.toJSON(),
      referrer: referrerAsString,
      poolPendingRewardPerDay: pendingRewardsAsBigNumber.toJSON(),
      totalStaked: totalStakedAsBigNumber.toJSON(),
      userData: {
        totalStakes: totalStakesAsBigNumber.toJSON(),
        totalWithdrawClaimed: totalWithdrawClaimedAsBigNumber.toJSON(),
        totalClaimed: totalClaimedAsBigNumber.toJSON(),
        claimStakedPerDay: claimStakedPerDayAsBigNumber.toJSON(),
        maxClaim: maxClaimAsBigNumber.toJSON(),
        vestingDuration: vestingDurationAsBigNumber.toJSON(),
        interestDuration: interestDurationAsBigNumber.toJSON(),
        lastClaimStaked: lastClaimStakedAsBigNumber.toJSON(),
        lastUpdatedTime: lastUpdatedTimeAsBigNumber.toJSON(),
        lastTimeDeposited: lastTimeDepositedAsBigNumber.toJSON(),
        lastTimeClaimed: lastTimeClaimedAsBigNumber.toJSON(),
        interestRates: interestRatesAsNumber,
        joinByReferral: joinByReferral as boolean,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      f1Referee: BIG_ZERO.toJSON(),
      referrer: NULL_ADDR,
      poolPendingRewardPerDay: BIG_ZERO.toJSON(),
      totalStaked: BIG_ZERO.toJSON(),
      userData: {
        totalStakes: BIG_ZERO.toJSON(),
        totalWithdrawClaimed: BIG_ZERO.toJSON(),
        totalClaimed: BIG_ZERO.toJSON(),
        claimStakedPerDay: BIG_ZERO.toJSON(),
        maxClaim: BIG_ZERO.toJSON(),
        vestingDuration: BIG_ZERO.toJSON(),
        interestDuration: BIG_ZERO.toJSON(),
        lastClaimStaked: BIG_ZERO.toJSON(),
        lastUpdatedTime: BIG_ZERO.toJSON(),
        lastTimeDeposited: BIG_ZERO.toJSON(),
        lastTimeClaimed: BIG_ZERO.toJSON(),
        interestRates: 0,
        joinByReferral: false,
      },
    }
  }
}
