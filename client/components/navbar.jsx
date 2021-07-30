import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  render() {
    const { user, handleSignOut } = this.context;
    return (
      <nav className="navbar navbar-dark bg-leaf">
        <div className="container">
          <a className="navbar-brand" href="#">
            <i className="fas  me-2" />
            Home Automation
          </a>
          <div>
            { user !== null &&
              <button className="btn btn-dark" onClick={handleSignOut}>
                Sign Out
              </button>
            }
            { user === null &&
              <>
                <a href="#sign-in" className="btn btn-dark">
                  Sign In
                </a>
                <i className="ms-2" />
              <a href="#sign-up" className="btn btn-dark">
                  Sign Up
                </a>
              </>
            }
          </div>
        </div>
      </nav>
    );
  }
}
Navbar.contextType = AppContext;
