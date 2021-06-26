import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as loginRedux from "../../redux/modules/authRedux";

export class login_ extends React.Component {
  constructor(props) {
    super(props);

    //read email from localStorage
    window.authEmail = "";
    if (typeof Storage !== "undefined") {
      window.authEmail = localStorage.getItem("authEmail");
    }

    this.state = {
      email: window.authEmail,
      password: "",
      isError: false
    };
  }

  onEmailChange = event => {
    this.setState({ email: event.target.value, isError: false });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value, isError: false });
  };

  onLoginClick = async () => {
    this.setState({ isError: false });

    let statusCode = await this.props.dispatch(loginRedux.login(this.state.email, this.state.password));

    if (statusCode === 403)
      this.setState({ isError: true });
  };

  render() {
    return (
      <div className="sigh-in flex ph-35 animated" id="wrapper">
        <form className="main-screen animated" action="#">
          <img
            className="main-screen__logo animated"
            src={ require("../../assets/img/svg/main-logo.svg")}
            alt="AppleStone Logo"
          />
          <div className="main-screen__title animated">
          Панель Администратора
          </div>
          <div className="main-screen__body animated">
            <div className="main-screen__inner animated">
              <div className="main-screen__fields animated">
                <div className="main-screen__fields--item animated">
                  <input
                    className="main-screen__fields--text is--error animated"
                    type="text"
                    value={this.state.email || ""}
                    placeholder="Email"
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className="main-screen__fields--item animated">
                  <input
                    className="main-screen__fields--text animated"
                    type="password"
                    value={this.state.password || ""}
                    placeholder="Пароль"
                    onChange={this.onPasswordChange}
                  />
                </div>

               

                {this.state.isError && (
                  <div className="main-screen__fields--item animated">
                    <div className="main-screen__fields--error animated">
                      Неверный емейл или пароль
                    </div>
                  </div>
                )}

                <div className="main-screen__fields--item animated">
                  <button
                    className="main-screen__fields--submit animated"
                    type="button"
                    onClick={this.onLoginClick}
                  >
                    Войти
                  </button>
                </div>
              </div>
            </div>
            <div className="main-screen__footnotes animated">
            Эта панель управления предназначена для администраторов и менеджеров.
            </div>
          </div>
        </form>
      </div>
    );
  }
}

login_.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isLoading: state.ui.isLoading
  };
}

export const login = connect(mapStateToProps)(login_);
