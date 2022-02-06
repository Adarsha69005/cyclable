import React, {Component} from 'react';

class Footer extends Component {
    render() {
        return(
            <footer className="footer">
            <div className="sub-footer py-2">
              <div className="container">
                <div className="d-flex">
                  <div className="mr-auto p-2">
                    <p className="text">Copyrights &copy; 2018 All Rights Reserved by Cyclable</p>
                  </div>
                  <div className="p-2">
                    <p className="text">
                      <a href="#">Terms of Use</a> /
                      <a href="#">Private Policy</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </footer>
        );
    }
}


export default Footer;
