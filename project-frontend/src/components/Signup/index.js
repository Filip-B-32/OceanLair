import React, { useEffect, useState } from "react";
import { useWindowSize } from "../../libs/hooks";
import chattingImage from "../../icons/people-video-chatting-at-home.png";
import { validateSignupForm } from "../../utils/validators";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/authActions";
import { getErrorActions } from "../../store/actions/errorActions";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const Signup = ({ signup, errorMessageContent }) => {
  const isMobile = useWindowSize()[0] <= 768;
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(validateSignupForm({ name, mail, password }));
  }, [name, mail, password, setIsFormValid]);

  const handleSignup = (e) => {
    e.preventDefault();

    const userDetails = {
      name,
      mail,
      password,
    };

    signup(userDetails, navigate);
  };

  return (
    <React.Fragment>
      <div className="signup-page">
        <div className="right-side-wrapper">
          {!isMobile && <img className="chatting-image" src={chattingImage} />}
        </div>
        <div className="signup">
          <div className="signup-wrapper">
            <h2>Sign Up</h2>
            <h3>It's quick & simple</h3>

            {errorMessageContent && (
              <div className="error">{errorMessageContent}</div>
            )}

            <form className="form">
              <div className="textbox">
                <input
                  type="text"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  placeholder="Name"
                />
                <span className="material-symbols-outlined">
                  account_circle
                </span>
              </div>

              <div className="textbox">
                <input
                  type="email"
                  id="mail"
                  onChange={(e) => setMail(e.target.value)}
                  value={mail}
                  required
                  placeholder="Email"
                />
                <span className="material-symbols-outlined"> email </span>
              </div>

              <div className="textbox">
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  placeholder="Password"
                />
                <span className="material-symbols-outlined"> key </span>
              </div>

              <p>
                Signed up already?
                <a href="/login">&#32;Login here</a>
              </p>

              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSignup(e);
                }}
                className={`${!isFormValid && "disabled"}`}
                disabled={!isFormValid}
              >
                Join OceanLair
                <span className="material-symbols-outlined">
                  {" "}
                  arrow_forward{" "}
                </span>
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

export default connect(mapStateToProps, mapActionsToProps)(Signup);
