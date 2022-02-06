import React, { Component } from 'react';
import Routes from './Router/Routes';
import CycleNavBar from './Components/Navbar/NavBar';
import Footer from "./Components/footer"

class App extends Component {
  render() {
    return (
      <div className="mainapp">
        <CycleNavBar />
        <Routes />
        <Footer />
      </div>
    );
  }
}

export default App;