import React, {Component, Fragment} from 'react';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Loguot';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { 
    Collapse, 
    Navbar, 
    NavbarToggler, 
    NavbarBrand, 
    Nav, 
    NavItem,
    NavLink,
Container } from 'reactstrap';

class AppNavbar extends Component {
  state = {
        isOpen: false
      };

  static propTypes = {
    auth: PropTypes.object.isRequired
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {

    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className='navbar-text mr-3'>
            <strong>{ user ? `welcome ${user.name}`: ''  } </strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout/>
        </NavItem>
      </Fragment>
    );

    const gustLinks = (
      <Fragment>
        <NavItem>
              <RegisterModal/>
        </NavItem>
        <NavItem>
              <LoginModal/>
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="dark" dark  expand="sm" className="mb-5">
            <Container>
                <NavbarBrand href='/'>shoppingList</NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                      { isAuthenticated ? authLinks : gustLinks }
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar)