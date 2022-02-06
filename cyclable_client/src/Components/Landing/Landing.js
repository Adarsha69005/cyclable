import React, {Component } from 'react';
import {ProgressBar} from 'react-bootstrap';
import Carousel from '../carousel';

export default class LandingPage extends Component {

  aboutUs = () => {
    window.location.href='/about'
  }

  products = () => {
    window.location.href='/product'
  }
    render() {
        return (
            <div className>
                <div className="row">
                  <Carousel />

              </div>
            <section className="what-we-do py-5">
                <div className="container">
                  <div className="col-md-12 col-lg-12 col-xl-12">
                    <div className="section-title text-center">
                      <h2 className="title-text pb-2">What We Do</h2>
                      <p className="head-description pb-5">We will help you connect world wide network of cyclists through a simple step of
                         registering on our platform. Connect with international or local cyclists from anyplace online. 
                         In general sense, we are the bridge between the cyclists. Enjoy! 
                        </p>
                  <div className="row">
                    <div className="col-lg-4 mb-2 ">
                      <div className="info media">
                        <div className="icon-cicle badge i">
                          <i className="fa fa-ticket icon" aria-hidden="true"></i>
                        </div>
                        <div className="media-body pl-3">
                          <h4 className="text">Gallary</h4>
                          <div className="description">
                            <p>Lorem ipsum dolor sit amet, consecd ipiscing elit, sed do eiusmod tempo.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <div className="info media">
                        <div className="icon-cicle badge i" onClick={this.products}>
                          <i className="fa fa-ticket icon" aria-hidden="true"></i>
                        </div>
                        <div className="media-body pl-3">
                          <h4 className="text">Cyclable Products</h4>
                          <div className="description">
                            <p>Lorem ipsum dolor sit amet, consecd ipiscing elit, sed do eiusmod tempo.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 mb-2">
                      <div className="info media">
                        <div className="icon-cicle badge i">
                          <i className="fa fa-ticket icon" aria-hidden="true"></i>
                        </div>
                        <div className="media-body pl-3">
                          <h4 className="text">Get in Touch</h4>
                          <div className="description">
                            <p>Lorem ipsum dolor sit amet, consecd ipiscing elit, sed do eiusmod tempo.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                </div>
                </div>
            </section>
            <section className="about-chart py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-6 about">
                  <div className="section-title">
                    <h3 className="title-text pb-2">About Us</h3>
                  </div>
                  <p className="pb-2">
                    Cyclists’ peddling throughout the world faces a serious problem with connecting local cyclists. 
                  </p>
                  <p className="description">
                    Furthermore, also with accommodation/where to stay and fooding. What if they want to connect with 
                    worldwide cyclists and ask for travelling (cycling) suggestions? So here we are with this 
                    Web Based Platform called ‘CYCLABLE’ to help cyclist to connect with the next 
                    local or International cyclist.
                  </p>
                  <button type="button" className="btn btn-sm" onClick={this.aboutUs}>Read More</button>
                </div>
                <div className="col-md-6 chart">
                  <div className="section-title">
                    <h3 className="title-text pb-2">Cyclist Chart</h3>
                  </div>
                  <p className="text">National Cyclist [Nepal]</p>
                  <div className="progress mb-3 ">
                    <ProgressBar now={15} label={'15%'} />;
                  </div>
                  <p className="text">International Cyclist</p>
                  <div className="progress mb-3">
                    <ProgressBar now={80} label={'80%'} />;
                  </div>
                  <p className="text">World Wide Explorer</p>
                  <div className="progress mb-3">
                  <ProgressBar now={10} label={'10%'} />;
                  </div>
                  <p className="text">Fun Riders</p>
                  <div className="progress mb-3">
                  <ProgressBar now={70} label={'70%'} />;
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="services py-5">
            <div className="container">
              <div className="row justify-content-md-center">
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div className="section-title title-ex1 text-center pb-3">
                    <h2 className="title-text pb-2">Our Services</h2>
                    <p className="head-description pb-5">Inventore cillum soluta inceptos eos platea, soluta class laoreet
                      repellendus imperdiet optio.</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-4">
                  <div className="info pr-2 pb-3 media">
                    <div className="icon-cicle text-center">
                      <i className="fa fa-ticket icon" aria-hidden="true"></i>
                    </div>
                    <div className="media-body pl-3">
                      <h5 className="mt-0 text ">Hotel Booking</h5>
                      <p className="mt-0 text">Lorem ipsum dolor sit amet, consecdipiscing elit, sed do eiusmod tempo.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="info pr-2 pb-3 media">
                    <div className="icon-cicle text-center">
                      <i className="fa fa-info-circle icon" aria-hidden="true"></i>
                    </div>
                    <div className="media-body pl-3">
                      <h5 className="mt-0 text ">Site Seeing</h5>
                      <p className="mt-0 text">Lorem ipsum dolor sit amet, consecdipiscing elit, sed do eiusmod tempo.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="info pr-2 pb-3 media">
                    <div className="icon-cicle text-center">
                      <i className="fa fa-snowflake-o icon" aria-hidden="true"></i>
                    </div>
                    <div className="media-body pl-3">
                      <h5 className="mt-0 text ">Safari</h5>
                      <p className="mt-0 text">Lorem ipsum dolor sit amet, consecdipiscing elit, sed do eiusmod tempo.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="info pr-2 pb-3 media">
                    <div className="icon-cicle text-center">
                      <i className="fa fa-money icon" aria-hidden="true"></i>
                    </div>
                    <div className="media-body pl-3">
                      <h5 className="mt-0 text ">Sky Diving</h5>
                      <p className="mt-0 text">Lorem ipsum dolor sit amet, consecdipiscing elit, sed do eiusmod tempo.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="info pr-2 pb-3 media">
                    <div className="icon-cicle text-center">
                      <i className="fa fa-book icon" aria-hidden="true"></i>
                    </div>
                    <div className="media-body pl-3">
                      <h5 className="mt-0 text ">Boating</h5>
                      <p className="mt-0 text">Lorem ipsum dolor sit amet, consecdipiscing elit, sed do eiusmod tempo.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="info pr-2 pb-3 media">
                    <div className="icon-cicle text-center">
                      <i className="fa fa-suitcase icon" aria-hidden="true"></i>
                    </div>
                    <div className="media-body pl-3">
                      <h5 className="mt-0 text ">Transportation</h5>
                      <p className="mt-0 text">Lorem ipsum dolor sit amet, consecdipiscing elit, sed do eiusmod tempo.</p>
                    </div>
                  </div>
                </div>
                </div>
                </div>
            </section>
            <section className="counter py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-lg-3">
                  <div className="info text-center info-count info-boxed">
                    <div className="icon icon-counter">
                      <i className="fa fa-check-square-o" aria-hidden="true"></i>
                    </div>
                    <div className="count_block">
                      <div className="count">27887234</div>
                      <p className="count-text">No of Tourists</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="info text-center info-count info-boxed">
                    <div className="icon icon-counter">
                      <i className="fa fa-users" aria-hidden="true"></i>
                    </div>
                    <div className="count_block">
                      <div className="count">24345</div>
                      <p className="count-text">No of Staffs</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="info text-center info-count info-boxed">
                    <div className="icon icon-counter">
                      <i className="fa fa-bed" aria-hidden="true"></i>
                    </div>
                    <div className="count_block">
                      <div className="count">134</div>
                      <p className="count-text">Hotels</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="info text-center info-count info-boxed">
                    <div className="icon icon-counter">
                      <i className="fa fa-cutlery" aria-hidden="true"></i>
                    </div>
                    <div className="count_block">
                      <div className="count">789</div>
                      <p className="count-text">Resturants</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </section>
            <section className="team  py-5" style={{padding:"20px"}}>
            <div className="container" >
              <div className="row justify-content-md-center">
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="section-title text-center title-ex1">
                    <h2>Team</h2>
                    <p className="head-description pb-5">Inventore cillum soluta inceptos eos platea, soluta class laoreet
                      repellendus imperdiet optio.</p>
                  </div>
                </div>
              </div>
              <div className="row" style={{paddingTop:"20px"}}>
                <div className="col-sm-6 col-md-6 col-lg-3 pt-3">
                  <div className="card">
                    <img className="card-img-top" src="images/team/image1.jpg" alt="Card image cap" />
                    <div className="card-body">
                      <h5>Eva Mari</h5>
                      <p className="card-text">Director</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3 pt-3">
                  <div className="card">
                    <img className="card-img-top" src="images/team/image2.jpg" alt="Card image cap" />
                    <div className="card-body">
                      <h5>Stefan Green</h5>
                      <p className="card-text">Co-Ordinator</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3 pt-3">
                  <div className="card">
                    <img className="card-img-top" src="images/team/image3.jpg" alt="Card image cap" />
                    <div className="card-body">
                      <h5>Leo Henry</h5>
                      <p className="card-text">Manager</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3 pt-3">
                  <div className="card ">
                    <img className="card-img-top" src="images/team/image4.jpg" alt="Card image cap" />
                    <div className="card-body">
                      <h5>Monika North</h5>
                      <p className="card-text">Cook Staff</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </section>
          </div> 
        );
}
}