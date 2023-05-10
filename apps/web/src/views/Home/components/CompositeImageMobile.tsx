import styled, { keyframes } from 'styled-components'
import { Box } from '@pancakeswap/uikit'

const floatingAnim = (x: string, y: string) => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(${x}, ${y});
  }
  to {
    transform: translate(0, 0px);
  }
`

const Wrapper = styled(Box)`
  position: relative;
  height: 100%;

  & :nth-child(2) {
    animation: ${floatingAnim('3px', '15px')} 3s ease-in-out infinite;
    animation-delay: 1s;
  }

  & :nth-child(3) {
    animation: ${floatingAnim('5px', '10px')} 3s ease-in-out infinite;
    animation-delay: 0.66s;
  }

  & :nth-child(4) {
    animation: ${floatingAnim('6px', '5px')} 3s ease-in-out infinite;
    animation-delay: 0.33s;
  }

  & :nth-child(5) {
    animation: ${floatingAnim('4px', '12px')} 3s ease-in-out infinite;
    animation-delay: 0s;
  }

  & :nth-child(6) {
    animation: ${floatingAnim('3px', '15px')} 3s ease-in-out infinite;
    animation-delay: 1s;
  }

  & :nth-child(7) {
    animation: ${floatingAnim('5px', '10px')} 3s ease-in-out infinite;
    animation-delay: 0.66s;
  }

  & :nth-child(8) {
    animation: ${floatingAnim('6px', '5px')} 3s ease-in-out infinite;
    animation-delay: 0.33s;
  }

  & :nth-child(9) {
    animation: ${floatingAnim('4px', '12px')} 3s ease-in-out infinite;
    animation-delay: 0s;
  }
`

const DummyImg = styled.img<{ maxHeight: string }>`
  max-height: ${({ maxHeight }) => maxHeight};
  visibility: hidden;
`
const ImageWrapper0 = styled(Box)`
  height: 100%;
  position: absolute;
  top: 170px;
  left: 40px;

  img {
    max-height: 40px;
    width: 40px;
  }
`
const ImageWrapper1 = styled(Box)`
  height: 100%;
  position: absolute;
  top: 210px;
  left: -10px;

  img {
    max-height: 100px;
    width: 60px;
  }
`
const ImageWrapper2 = styled(Box)`
  height: 100%;
  position: absolute;
  top: 280px;
  left: -50px;

  img {
    max-height: 120px;
    width: 80px;
  }
`
const ImageWrapper3 = styled(Box)`
  height: 100%;
  position: absolute;
  top: 340px;
  left: 30px;

  img {
    max-height: 40px;
    width: 40px;
  }
`
const ImageWrapper4 = styled(Box)`
  height: 100%;
  position: absolute;
  top: 170px;
  right: 40px;

  img {
    max-height: 40px;
    width: 40px;
  }
`
const ImageWrapper5 = styled(Box)`
  height: 100%;
  position: absolute;
  top: 210px;
  right: -10px;

  img {
    max-height: 60px;
    width: 60px;
  }
`
const ImageWrapper6 = styled(Box)`
  height: 100%;
  position: absolute;
  top: 280px;
  right: -50px;

  img {
    max-height: 120px;
    width: 80px;
  }
`
const ImageWrapper7 = styled(Box)`
  height: 100%;
  position: absolute;
  top: 340px;
  right: 30px;

  img {
    max-height: 40px;
    width: 40px;
  }
`
const animate0 = () => keyframes`
  0% {
    left: 50%;
    top: 70%;
    transform: translateX(-50%) rotate(40deg);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    transform: rotate(40deg);
    top: 170px;
    left: 40px;
    opacity: 0;
  }
`
const animate1 = () => keyframes`
  0% {
    left: 50%;
    top: 70%;
    transform: rotate(23deg) translateX(-50%)  ;
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    top: 230px;
    left: -10px;
    transform: rotate(23deg) ;
    opacity: 0;
  }
`
const animate2 = () => keyframes`
  0% {
    left: 50%;
    top: 70%;
    transform: translateX(-50%) rotate(-10deg) ;
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    top: 320px;
    left: -50px;
    transform: rotate(-10deg) ;
    opacity: 0;
  }
`
const animate3 = () => keyframes`
0% {
  left: 50%;
  top: 70%;
  transform: translateX(-50%) rotate(-30deg) ;
  opacity: 1;
}
50% {
  opacity: 1;
}
75% {
  opacity: 0;
}
100% {
  top: 370px;
  left: 30px;
  transform: rotate(-30deg) ;
  opacity: 0;
}
`
const animate4 = () => keyframes`
  0% {
    right: 50%;
    top: 70%;
    transform: translateX(-50%) rotate(145deg);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    transform: rotate(140deg);
    top: 170px;
    right: 40px;
    opacity: 0;
  }
`
const animate5 = () => keyframes`
  0% {
    right: 50%;
    top: 70%;
    transform: rotate(157deg) translateX(-50%)  ;
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    top: 230px;
    right: -10px;
    transform: rotate(157deg) ;
    opacity: 0;
  }
`
const animate6 = () => keyframes`
  0% {
    right: 50%;
    top: 70%;
    transform: translateX(-50%) rotate(190deg) ;
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    top: 320px;
    right: -50px;
    transform: rotate(190deg) ;
    opacity: 0;
  }
`
const animate7 = () => keyframes`
0% {
  right: 50%;
  top: 70%;
  transform: translateX(-50%) rotate(210deg) ;
  opacity: 1;
}
50% {
  opacity: 1;
}
75% {
  opacity: 0;
}
100% {
  top: 370px;
  right: 30px;
  transform: rotate(210deg) ;
  opacity: 0;
}
`
const hidden = () => keyframes`
  0% {
    width: 0px;
  }
  70% {
    width: 50px;
  }
  100% {
    width: 50px;
  }
`
const Meteor0 = styled.section`
  position: absolute;
  width: 1px;
  height: 1px;
  background: #ffffff;
  border-radius: 50%;
  animation: ${animate0} 1s linear infinite;
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 2px;
    background: linear-gradient(90deg, #ffffff, transparent);
    animation: ${hidden} 1s linear infinite;
  }
`
const Meteor1 = styled.section`
  position: absolute;
  width: 1px;
  height: 1px;
  background: #ffffff;
  border-radius: 50%;
  animation: ${animate1} 1s linear infinite;
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 3px;
    background: linear-gradient(90deg, #ffffff, transparent);
    animation: ${hidden} 1s linear infinite;
  }
`
const Meteor2 = styled.section`
  position: absolute;
  width: 1px;
  height: 1px;
  background: #ffffff;
  border-radius: 50%;
  animation: ${animate2} 1s linear infinite;
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 3px;
    background: linear-gradient(90deg, #ffffff, transparent);
    animation: ${hidden} 1s linear infinite;
  }
`
const Meteor3 = styled.section`
  position: absolute;
  width: 1px;
  height: 1px;
  background: #ffffff;
  border-radius: 50%;
  animation: ${animate3} 1s linear infinite;
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 2px;
    background: linear-gradient(90deg, #ffffff, transparent);
    animation: ${hidden} 1s linear infinite;
  }
`
const Meteor4 = styled.section`
  position: absolute;
  width: 1px;
  height: 1px;
  background: #ffffff;
  border-radius: 50%;
  animation: ${animate4} 1s linear infinite;
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 2px;
    background: linear-gradient(90deg, #ffffff, transparent);
    animation: ${hidden} 1s linear infinite;
  }
`
const Meteor5 = styled.section`
  position: absolute;
  width: 1px;
  height: 1px;
  background: #ffffff;
  border-radius: 50%;
  animation: ${animate5} 1s linear infinite;
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 3px;
    background: linear-gradient(90deg, #ffffff, transparent);
    animation: ${hidden} 1s linear infinite;
  }
`
const Meteor6 = styled.section`
  position: absolute;
  width: 1px;
  height: 1px;
  background: #ffffff;
  border-radius: 50%;
  animation: ${animate6} 1s linear infinite;
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 3px;
    background: linear-gradient(90deg, #ffffff, transparent);
    animation: ${hidden} 1s linear infinite;
  }
`
const Meteor7 = styled.section`
  position: absolute;
  width: 1px;
  height: 1px;
  background: #ffffff;
  border-radius: 50%;
  animation: ${animate7} 1s linear infinite;
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 2px;
    background: linear-gradient(90deg, #ffffff, transparent);
    animation: ${hidden} 1s linear infinite;
  }
`
enum Resolution {
  MD = '1.5x',
  LG = '2x',
}
interface ImageAttributes {
  src: string
  alt: string
}

export interface CompositeImageMobileProps {
  path: string
  attributes: ImageAttributes[]
}

interface ComponentProps extends CompositeImageMobileProps {
  animate?: boolean
  maxHeight?: string
  showAnimation?: boolean
}

export const getImageUrl = (base: string, imageSrc: string, resolution?: Resolution, extension = '.png'): string =>
  `${base}${imageSrc}${resolution ? `@${resolution}${extension}` : extension}`

export const getSrcSet = (base: string, imageSrc: string, extension = '.png') => {
  return `${getImageUrl(base, imageSrc, undefined, extension)} 512w,
  ${getImageUrl(base, imageSrc, Resolution.MD, extension)} 768w,
  ${getImageUrl(base, imageSrc, Resolution.LG, extension)} 1024w,`
}

const CompositeImageMobile: React.FC<React.PropsWithChildren<ComponentProps>> = ({
  path,
  attributes,
  maxHeight = '512px',
  showAnimation = false,
}) => {
  return (
    <>
      <Wrapper>
        <DummyImg
          srcSet={getSrcSet(path, attributes[0].src, '.webp')}
          maxHeight={maxHeight}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const fallbackSrcSet = getSrcSet(path, attributes[0].src)
            if (e.currentTarget.srcset !== '' && e.currentTarget.srcset !== fallbackSrcSet) {
              // eslint-disable-next-line no-param-reassign
              e.currentTarget.srcset = fallbackSrcSet
            } else {
              const fallbackSrc = getImageUrl(path, attributes[0].src)
              if (e.currentTarget.srcset !== '' && !e.currentTarget.src.endsWith(fallbackSrc)) {
                // eslint-disable-next-line no-param-reassign
                e.currentTarget.srcset = ''
                // eslint-disable-next-line no-param-reassign
                e.currentTarget.src = fallbackSrc
              }
            }
          }}
        />

        <ImageWrapper0 key={attributes[0].src}>
          <img
            srcSet={getSrcSet(path, attributes[0].src, '.webp')}
            alt={attributes[0].alt}
            onError={(e) => {
              const fallbackSrcSet = getSrcSet(path, attributes[0].src)
              if (e.currentTarget.srcset !== '' && e.currentTarget.srcset !== fallbackSrcSet) {
                // eslint-disable-next-line no-param-reassign
                e.currentTarget.srcset = fallbackSrcSet
              } else {
                const fallbackSrc = getImageUrl(path, attributes[0].src)
                if (e.currentTarget.srcset !== '' && !e.currentTarget.src.endsWith(fallbackSrc)) {
                  // eslint-disable-next-line no-param-reassign
                  e.currentTarget.srcset = ''
                  // eslint-disable-next-line no-param-reassign
                  e.currentTarget.src = fallbackSrc
                }
              }
            }}
          />
        </ImageWrapper0>
        <ImageWrapper1 key={attributes[1].src}>
          <img
            srcSet={getSrcSet(path, attributes[1].src, '.webp')}
            alt={attributes[1].alt}
            onError={(e) => {
              const fallbackSrcSet = getSrcSet(path, attributes[1].src)
              if (e.currentTarget.srcset !== '' && e.currentTarget.srcset !== fallbackSrcSet) {
                // eslint-disable-next-line no-param-reassign
                e.currentTarget.srcset = fallbackSrcSet
              } else {
                const fallbackSrc = getImageUrl(path, attributes[1].src)
                if (e.currentTarget.srcset !== '' && !e.currentTarget.src.endsWith(fallbackSrc)) {
                  // eslint-disable-next-line no-param-reassign
                  e.currentTarget.srcset = ''
                  // eslint-disable-next-line no-param-reassign
                  e.currentTarget.src = fallbackSrc
                }
              }
            }}
          />
        </ImageWrapper1>
        <ImageWrapper2 key={attributes[2].src}>
          <img
            srcSet={getSrcSet(path, attributes[2].src, '.webp')}
            alt={attributes[2].alt}
            onError={(e) => {
              const fallbackSrcSet = getSrcSet(path, attributes[2].src)
              if (e.currentTarget.srcset !== '' && e.currentTarget.srcset !== fallbackSrcSet) {
                // eslint-disable-next-line no-param-reassign
                e.currentTarget.srcset = fallbackSrcSet
              } else {
                const fallbackSrc = getImageUrl(path, attributes[2].src)
                if (e.currentTarget.srcset !== '' && !e.currentTarget.src.endsWith(fallbackSrc)) {
                  // eslint-disable-next-line no-param-reassign
                  e.currentTarget.srcset = ''
                  // eslint-disable-next-line no-param-reassign
                  e.currentTarget.src = fallbackSrc
                }
              }
            }}
          />
        </ImageWrapper2>
        <ImageWrapper3 key={attributes[3].src}>
          <img
            srcSet={getSrcSet(path, attributes[3].src, '.webp')}
            alt={attributes[3].alt}
            onError={(e) => {
              const fallbackSrcSet = getSrcSet(path, attributes[3].src)
              if (e.currentTarget.srcset !== '' && e.currentTarget.srcset !== fallbackSrcSet) {
                // eslint-disable-next-line no-param-reassign
                e.currentTarget.srcset = fallbackSrcSet
              } else {
                const fallbackSrc = getImageUrl(path, attributes[3].src)
                if (e.currentTarget.srcset !== '' && !e.currentTarget.src.endsWith(fallbackSrc)) {
                  // eslint-disable-next-line no-param-reassign
                  e.currentTarget.srcset = ''
                  // eslint-disable-next-line no-param-reassign
                  e.currentTarget.src = fallbackSrc
                }
              }
            }}
          />
        </ImageWrapper3>
        <ImageWrapper4 key={attributes[4].src}>
          <img
            srcSet={getSrcSet(path, attributes[4].src, '.webp')}
            alt={attributes[4].alt}
            onError={(e) => {
              const fallbackSrcSet = getSrcSet(path, attributes[4].src)
              if (e.currentTarget.srcset !== '' && e.currentTarget.srcset !== fallbackSrcSet) {
                // eslint-disable-next-line no-param-reassign
                e.currentTarget.srcset = fallbackSrcSet
              } else {
                const fallbackSrc = getImageUrl(path, attributes[4].src)
                if (e.currentTarget.srcset !== '' && !e.currentTarget.src.endsWith(fallbackSrc)) {
                  // eslint-disable-next-line no-param-reassign
                  e.currentTarget.srcset = ''
                  // eslint-disable-next-line no-param-reassign
                  e.currentTarget.src = fallbackSrc
                }
              }
            }}
          />
        </ImageWrapper4>
        <ImageWrapper5 key={attributes[5].src}>
          <img
            srcSet={getSrcSet(path, attributes[5].src, '.webp')}
            alt={attributes[5].alt}
            onError={(e) => {
              const fallbackSrcSet = getSrcSet(path, attributes[5].src)
              if (e.currentTarget.srcset !== '' && e.currentTarget.srcset !== fallbackSrcSet) {
                // eslint-disable-next-line no-param-reassign
                e.currentTarget.srcset = fallbackSrcSet
              } else {
                const fallbackSrc = getImageUrl(path, attributes[5].src)
                if (e.currentTarget.srcset !== '' && !e.currentTarget.src.endsWith(fallbackSrc)) {
                  // eslint-disable-next-line no-param-reassign
                  e.currentTarget.srcset = ''
                  // eslint-disable-next-line no-param-reassign
                  e.currentTarget.src = fallbackSrc
                }
              }
            }}
          />
        </ImageWrapper5>
        <ImageWrapper6 key={attributes[6].src}>
          <img
            srcSet={getSrcSet(path, attributes[6].src, '.webp')}
            alt={attributes[6].alt}
            onError={(e) => {
              const fallbackSrcSet = getSrcSet(path, attributes[6].src)
              if (e.currentTarget.srcset !== '' && e.currentTarget.srcset !== fallbackSrcSet) {
                // eslint-disable-next-line no-param-reassign
                e.currentTarget.srcset = fallbackSrcSet
              } else {
                const fallbackSrc = getImageUrl(path, attributes[6].src)
                if (e.currentTarget.srcset !== '' && !e.currentTarget.src.endsWith(fallbackSrc)) {
                  // eslint-disable-next-line no-param-reassign
                  e.currentTarget.srcset = ''
                  // eslint-disable-next-line no-param-reassign
                  e.currentTarget.src = fallbackSrc
                }
              }
            }}
          />
        </ImageWrapper6>
        <ImageWrapper7 key={attributes[7].src}>
          <img
            srcSet={getSrcSet(path, attributes[7].src, '.webp')}
            alt={attributes[7].alt}
            onError={(e) => {
              const fallbackSrcSet = getSrcSet(path, attributes[7].src)
              if (e.currentTarget.srcset !== '' && e.currentTarget.srcset !== fallbackSrcSet) {
                // eslint-disable-next-line no-param-reassign
                e.currentTarget.srcset = fallbackSrcSet
              } else {
                const fallbackSrc = getImageUrl(path, attributes[7].src)
                if (e.currentTarget.srcset !== '' && !e.currentTarget.src.endsWith(fallbackSrc)) {
                  // eslint-disable-next-line no-param-reassign
                  e.currentTarget.srcset = ''
                  // eslint-disable-next-line no-param-reassign
                  e.currentTarget.src = fallbackSrc
                }
              }
            }}
          />
        </ImageWrapper7>

        {showAnimation && (
          <>
            <Meteor0 />
            <Meteor1 />
            <Meteor2 />
            <Meteor3 />
            <Meteor4 />
            <Meteor5 />
            <Meteor6 />
            <Meteor7 />
          </>
        )}
      </Wrapper>
    </>
  )
}

export default CompositeImageMobile
