import { useSelector } from 'react-redux'
import { nikaPoolSelector } from './selectors'

export const useNikaPool = () => {
  return useSelector(nikaPoolSelector)
}
