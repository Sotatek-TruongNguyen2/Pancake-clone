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

const Wrapper = styled(Box)<{ maxHeight: string }>`
  position: relative;
  max-height: ${({ maxHeight }) => maxHeight};

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

// const ImageWrapper = styled(Box)`
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;

//   img {
//     max-height: 100%;
//     width: auto;
//   }
// `

const ImageWrapper0 = styled(Box)`
  height: 100%;
  position: absolute;
  top: 30px;
  left: 200px;

  img {
    max-height: 80px;
    width: 80px;
  }
`
const ImageWrapper1 = styled(Box)`
  height: 100%;
  position: absolute;
  top: 80px;
  left: 50px;

  img {
    max-height: 100px;
    width: 100px;
  }
`
const ImageWrapper2 = styled(Box)`
  height: 100%;
  position: absolute;
  top: 210px;
  left: -60px;

  img {
    max-height: 120px;
    width: 120px;
  }
`
const ImageWrapper3 = styled(Box)`
  height: 100%;
  position: absolute;
  top: 300px;
  left: 150px;

  img {
    max-height: 80px;
    width: 80px;
  }
`
const ImageWrapper4 = styled(Box)`
  height: 100%;
  position: absolute;
  top: 30px;
  right: 200px;

  img {
    max-height: 80px;
    width: 80px;
  }
`
const ImageWrapper5 = styled(Box)`
  height: 100%;
  position: absolute;
  top: 80px;
  right: 50px;

  img {
    max-height: 100px;
    width: 100px;
  }
`
const ImageWrapper6 = styled(Box)`
  height: 100%;
  position: absolute;
  top: 210px;
  right: -60px;

  img {
    max-height: 120px;
    width: 120px;
  }
`
const ImageWrapper7 = styled(Box)`
  height: 100%;
  position: absolute;
  top: 300px;
  right: 150px;

  img {
    max-height: 80px;
    width: 80px;
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

export interface CompositeImageProps {
  path: string
  attributes: ImageAttributes[]
}

interface ComponentProps extends CompositeImageProps {
  animate?: boolean
  maxHeight?: string
}

export const getImageUrl = (base: string, imageSrc: string, resolution?: Resolution, extension = '.png'): string =>
  `${base}${imageSrc}${resolution ? `@${resolution}${extension}` : extension}`

export const getSrcSet = (base: string, imageSrc: string, extension = '.png') => {
  return `${getImageUrl(base, imageSrc, undefined, extension)} 512w,
  ${getImageUrl(base, imageSrc, Resolution.MD, extension)} 768w,
  ${getImageUrl(base, imageSrc, Resolution.LG, extension)} 1024w,`
}

const CompositeImage: React.FC<React.PropsWithChildren<ComponentProps>> = ({
  path,
  attributes,
  maxHeight = '512px',
}) => {
  return (
    <Wrapper maxHeight={maxHeight}>
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
      {/* {attributes.map((image) => (
        <ImageWrapper key={image.src}>
          <img
            srcSet={getSrcSet(path, image.src, '.webp')}
            alt={image.alt}
            onError={(e) => {
              const fallbackSrcSet = getSrcSet(path, image.src)
              if (e.currentTarget.srcset !== '' && e.currentTarget.srcset !== fallbackSrcSet) {
                // eslint-disable-next-line no-param-reassign
                e.currentTarget.srcset = fallbackSrcSet
              } else {
                const fallbackSrc = getImageUrl(path, image.src)
                if (e.currentTarget.srcset !== '' && !e.currentTarget.src.endsWith(fallbackSrc)) {
                  // eslint-disable-next-line no-param-reassign
                  e.currentTarget.srcset = ''
                  // eslint-disable-next-line no-param-reassign
                  e.currentTarget.src = fallbackSrc
                }
              }
            }}
          />
        </ImageWrapper>
      ))} */}

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
    </Wrapper>
  )
}

export default CompositeImage
