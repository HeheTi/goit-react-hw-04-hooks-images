import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useLockBodyScroll } from "react-use";

import PropTypes from "prop-types";

const modalRef = document.querySelector("#modal-root");

const Modal = ({ onCloseModal, data }) => {
  useLockBodyScroll(true);

  useEffect(() => {
    const onEscPress = (e) => {
      if (e.code === "Escape") {
        onCloseModal();
      }
    };

    window.addEventListener("keydown", onEscPress);

    return () => {
      window.removeEventListener("keydown", onEscPress);
    };
  }, [onCloseModal]);

  const onclickBackdrop = (e) => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={onclickBackdrop}>
      <div className="modal">
        <img src={data.bigImg} alt={data.tags} />
      </div>
    </div>,
    modalRef
  );
};

Modal.propTypes = {
  bigImg: PropTypes.string,
  tags: PropTypes.string,
};

export default Modal;
