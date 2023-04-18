let swapSound: HTMLAudioElement

const swapSoundURL = ''

export const getSwapSound = () => {
  if (!swapSound) {
    swapSound = new Audio(swapSoundURL)
  }
  return swapSound
}
