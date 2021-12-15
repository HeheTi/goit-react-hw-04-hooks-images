import { Component } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

const modalRef = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscPress);
  }

  onclickBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  onEscPress = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  render() {
    const {
      data: { bigImg, tags },
    } = this.props;

    return createPortal(
      <div className="Overlay" onClick={this.onclickBackdrop}>
        <div className="modal">
          <img src={bigImg} alt={tags} />
        </div>
      </div>,
      modalRef,
    );
  }
}

Modal.propTypes = {
  bigImg: PropTypes.string,
  tags: PropTypes.string,
};

export default Modal;
