import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Authentication from '../Authentication/Authentication';
import { Link, withRouter } from 'react-router-dom';

class CycleNavBar extends Component {

  constructor(props){
    super(props)
  }

    logOut = () => {
      Authentication.logOut();
      window.location.href="/signin";
    }

    gotoProfile = () => {
      this.props.history.push('/profile')
    }
    render() {
        return (
            <div>
            <Navbar inverse className="navbar-default" collapseOnSelect style={{padding:'15px'}}>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href="/dashboard"><img src="/images/logo.png" alt="logoimage" height="50px" width="100px" /></a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav pullRight>
                    <NavItem eventKey={1} href="#">
                      <span><Link to='/dashboard'><i className="fa fa-home fa-2x blackiconcolor"></i></Link></span>
                    </NavItem>
                    <NavItem eventKey={1} href="#">
                      <span><i className="fa fa-cog fa-2x blackiconcolor"></i></span>
                    </NavItem>
                      <NavDropdown eventKey={3} title="Admin" id="basic-nav-dropdown" style={{color:"black"}}>
                      {Authentication.isAuthenticated()? <MenuItem eventKey={3.1} onClick={this.gotoProfile}>Profile</MenuItem>:null}
                        <MenuItem divider />
                      {Authentication.isAuthenticated()? <MenuItem eventKey={3.3} onClick={this.logOut}>LogOut</MenuItem>:null}
                       
                      </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        );
    }
}

export default withRouter(CycleNavBar);