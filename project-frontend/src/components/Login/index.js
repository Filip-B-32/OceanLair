import React, { useEffect, useState } from "react";
import { useWindowSize } from "../../libs/hooks";
import chattingImage from "../../icons/people-video-chatting-at-home.png";
import { validateLoginForm } from "../../utils/validators";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/authActions";
import { getErrorActions } from "../../store/actions/errorActions";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = ({ login, errorMessageContent }) => {
  const isMobile = useWindowSize()[0] <= 768;
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  const handleLogin = (e) => {
    e.preventDefault();

    const userDetails = {
      mail,
      password,
    };
    login(userDetails, navigate);
  };

  return (
    <React.Fragment>
      <div className="login-page">
        <div className="right-side-wrapper">
          {!isMobile && <img className="chatting-image" src={chattingImage} />}
        </div>
        <div className="login">
          <div className="login-wrapper">
            <h2>Log In</h2>
            <h3>
              Welcome to OceanLair!<br></br> Login to your account
            </h3>
            {errorMessageContent && (
              <div className="error">{errorMessageContent}</div>
            )}
            <form className="form">
              <div className="textbox">
                <input
                  type="email"
                  id="mail"
                  onChange={(e) => setMail(e.target.value)}
                  value={mail}
                  required
                  placeholder="Mail"
                />
                <span className="material-symbols-outlined"> email </span>
              </div>

              <div className="textbox">
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password"
                  required
                />
                <span className="material-symbols-outlined"> key </span>
              </div>

              <p>
                Don't have an account?
                <a href="/signup">&#32;Sign Up here</a>
              </p>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin(e);
                }}
                className={`${!isFormValid && "disabled"}`}
                disabled={!isFormValid}
              >
                Login to OceanLair
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    errorMessageContent: state.error.errorMessageContent,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
