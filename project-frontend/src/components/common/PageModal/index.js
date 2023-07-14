import React from "react";
import closeButton from "../../../icons/close-button.png";
import "./page-modal.css";

const PageModal = (props) => {
  const { onToggle } = props;

  const closeModal = () => {
    onToggle();
  };

  return (
    <div className={`page-modal-wrapper ${props.className}`}>
      <div className="page-modal-overflow" onClick={closeModal} />
      <div className="page-modal">
        <div className="page-header">
          <div className="page-title">{props.title}</div>
          <div className="page-header-content">
            <div className="page-close">
              <img className="close-button" src={closeButton} onClick={closeModal} />
            </div>
          </div>
        </div>
        <div className="page-content">
            {props.children}
        </div>
      </div>
    </div>
  );
};

export default PageModal;
