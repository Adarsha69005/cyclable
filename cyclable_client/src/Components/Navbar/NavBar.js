import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Authentication from '../../Authentication/Authentication';

class CycleNavBar extends Component {

    constructor(props){
      super(props)
    }

    componentDidMount(){
      console.log(this.props);
    }
  
    onLogout = (event) => {
      Authentication.logOut();
      this.props.history.push('/register');
    }

    render() {
        return (
            <div>
            <Navbar inverse collapseOnSelect style={{padding:"10px", backgroundColor:"white", borderColor:'white'}}>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href="/"><img src="images/logo.png" alt="logo.png" height="50px" width="80px" /></a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav pullRight>
                  {Authentication.isAuthenticated() ? <NavItem eventKey={1}>
                      <span onClick={this.onLogout}>LogOut</span>
                    </NavItem>: <NavItem eventKey={1}>
                      <Link to="/register"><span>Login/Register</span></Link>
                    </NavItem>}
                     
                      <NavDropdown eventKey={3} title="Cyclable" id="basic-nav-dropdown">
                      <MenuItem eventKey={3.1}><Link to="/user">Track</Link></MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.2}><Link to="/about">About Us</Link></MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.3}><Link to="/product">Products</Link></MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.4}><Link to="/faq">FAQ</Link></MenuItem>
                      </NavDropdown>
                      <NavItem eventKey={1} href="/">
                      <span><i className="fa fa-home fa-2x"></i></span>
                    </NavItem>
                    {/* <NavItem eventKey={1} href="#">
                      <span>LogOut</span>
                    </NavItem> */}
                  </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        );
    }
}

export default withRouter(CycleNavBar);