import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';

// import '../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import {AuthService} from '../../../services/';
import {GenUtil, ValidationUtil} from '../../../utility';

import {bindActionCreators} from 'redux';
import {AppActions} from '../../../actions';
import {InvalidIcon} from '../../../assets/images';

const translate = GenUtil.translate;

class SignUp1 extends React.Component {

    state = {
        username: '',
        password: '',
        isPasswordClicked: false,
        isUsernameClicked: false,
        errors:{
          username: null,
          password: null
        }
      };
    
      handleSubmit = (event) => {
        event.preventDefault();
    
        // if (this.state.errors.username !== null || this.state.errors.password !== null) {
        //   this.setState({
        //     loginDisabled: true
        //   });
    
        //   return;
        // }
    
        const account = {
          login: this.state.username,
          password: this.state.password
        };
    
        this.props.login(account);
      };
    
      handleUsernameChange = (user) => {
        this.setState({
          username: user,
          isUsernameClicked: true
        });
      };
    
      handlePasswordChange = (password) => {
        this.setState({
          password: password,
          isPasswordClicked: true
        });
      }
    
      logout = () => {
        AuthService.logout();
      };
    
      allowLogin = () => {
        return (this.state.errors.username === null && this.state.errors.password === null) && (this.state.username.length && this.state.password.length);
      };

    render() {

        const isValidUserName = () => {
            if (this.state.isUsernameClicked) {
              return ValidationUtil.emptyString(this.state.username).success;
            } else {
              return true;
            }
          };
          
        return (
            <Aux>
                <Breadcrumb />
                <form onSubmit={this.handleSubmit}>
                    <div className="auth-wrapper">
                        <div className="auth-content">
                            <div className="auth-bg">
                                <span className="r" />
                                <span className="r s" />
                                <span className="r s" />
                                <span className="r" />
                            </div>
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="mb-4">
                                        <i className="feather icon-unlock auth-icon" />
                                    </div>
                                    <h3 className="mb-4">Login</h3>

                                    <div className="input-group mb-3">
                                        <input 
                                            name='username'
                                            hasActiveGlow={ true }
                                            placeholder={ translate('login.enterUsername') }
                                            handleChange={ this.handleUsernameChange }
                                            iconRightActive={ InvalidIcon }
                                            isValid={ isValidUserName }
                                            // handleRightIconClick={ rightIconClickHandler }
                                        />
                                    </div>
                                    <div className="input-group mb-4">
                                        <input 
                                            name='password'
                                            type='password'
                                            hasActiveGlow={ true }
                                            placeholder={ translate('login.enterPassword') }
                                            handleChange={ this.handlePasswordChange }
                                        />
                                    </div>
                                    <button type="submit"  className="btn btn-primary shadow-2 mb-4">Login</button>
                                    <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p>
                                    <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-1">Signup</NavLink></p>
                                    {/* <LoginFooter></LoginFooter> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => ({isLoggedIn: state.getIn(['profiles', 'isLoggedIn'])});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    login: AppActions.login,
  },
  dispatch
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignUp1);