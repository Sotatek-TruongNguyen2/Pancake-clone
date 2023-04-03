import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styled from 'styled-components'

const images = [
  '/images/farm1.png',
  '/images/farm2.png',
  '/images/farm3.png',
  '/images/farm1.png',
  '/images/farm2.png',
  '/images/farm3.png',
]

const CardImage = styled('div')<{ url: string }>`
  max-width: 280px;
  min-height: 280px;
  width: 280px;
  height: 280px;
  background-image: ${(props) => `url('${props.url}')`};
  border-radius: 24px;
`
const Carousel = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div>
      <Slider {...settings}>
        {images.map((item) => (
          <CardImage key={item} url={item} />
        ))}
      </Slider>
    </div>
  )
}

export default Carousel
