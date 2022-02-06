import React from 'react';
import { Carousel } from 'react-bootstrap';

function CarouselSlide(){
    return(
        <div className="col-md-12">
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/images/slide1.jpg"
                  alt="First slide"
                  
                  width="100%"
                  height="500px"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/images/slide2.jpg"
                  alt="Third slide"
                  width="100%"
                  height="500px"
                />

              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/images/slide3.jpg"
                  alt="Third slide"
                  width="100%"
                  height="500px"
                />

              </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default CarouselSlide;