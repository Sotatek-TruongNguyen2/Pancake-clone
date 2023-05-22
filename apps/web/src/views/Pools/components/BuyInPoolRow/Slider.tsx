import React, { ChangeEvent, InputHTMLAttributes, useCallback } from 'react'
import { Box, SliderProps } from '@pancakeswap/uikit'
import {
  BarBackground,
  BarProgress,
  BunnyButt,
  BunnySlider,
  SliderLabel,
  SliderLabelContainer,
} from '@pancakeswap/uikit/src/components/Slider/styles'
import styled from 'styled-components'

interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isMax: boolean
}

interface DisabledProp {
  disabled?: boolean
}

const getCursorStyle = ({ disabled = false }: DisabledProp) => {
  return disabled ? 'not-allowed' : 'cursor'
}

const getBaseThumbStyles = ({ isMax, disabled }: StyledInputProps) => `
  -webkit-appearance: none;
  background-image: url('./images/nika-token.png');
  background-color: transparent;
  box-shadow: none;
  border: 0;
  cursor: ${getCursorStyle};
  width: 24px;
  height: 24px;
  filter: ${disabled ? 'grayscale(100%)' : 'none'};
  transform: translate(-2px, -2px);
  transition: 200ms transform;
  &:hover {
    transform: ${disabled ? 'scale(1) translate(-2px, -2px)' : 'scale(1.1) translate(-3px, -3px)'};
  }
`

export const StyledInput = styled.input<StyledInputProps>`
  cursor: ${getCursorStyle};
  height: 32px;
  position: relative;
  ::-webkit-slider-thumb {
    ${getBaseThumbStyles}
  }
  ::-moz-range-thumb {
    ${getBaseThumbStyles}
  }
  ::-ms-thumb {
    ${getBaseThumbStyles}
  }
`

const Slider: React.FC<React.PropsWithChildren<SliderProps>> = ({
  name,
  min,
  max,
  value,
  onValueChanged,
  valueLabel,
  step = 'any',
  disabled = false,
  ...props
}) => {
  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      onValueChanged(parseFloat(target.value))
    },
    [onValueChanged],
  )

  const progressPercentage = (value / max) * 100
  const isMax = value === max
  let progressWidth: string
  if (progressPercentage <= 10) {
    progressWidth = `${progressPercentage + 0.5}%`
  } else if (progressPercentage >= 90) {
    progressWidth = `${progressPercentage - 4}%`
  } else if (progressPercentage >= 60) {
    progressWidth = `${progressPercentage - 2.5}%`
  } else {
    progressWidth = `${progressPercentage}%`
  }
  const labelProgress = isMax ? 'calc(100% - 12px)' : `${progressPercentage}%`
  const displayValueLabel = isMax ? 'MAX' : valueLabel

  return (
    <Box position="relative" height="48px" {...props}>
      {/* <BunnyButt disabled={disabled} /> */}
      <BunnySlider>
        <BarBackground disabled={disabled} />
        <BarProgress style={{ width: progressWidth }} disabled={disabled} />
        <StyledInput
          name={name}
          type="range"
          min={min}
          max={max}
          value={value}
          step={step}
          onChange={handleChange}
          isMax={isMax}
          disabled={disabled}
        />
      </BunnySlider>
      {valueLabel && (
        <SliderLabelContainer>
          <SliderLabel progress={labelProgress}>{displayValueLabel}</SliderLabel>
        </SliderLabelContainer>
      )}
    </Box>
  )
}

export default Slider
