import propTypes from 'prop-types';
import { useEffect } from 'react';
import css from './Modal.module.css';
import { GrClose } from 'react-icons/gr';

export const Modal = ({ hideModal, currentImg }) => {
  useEffect(() => {
    const handlePressEsc = e => {
      if (e.code === 'Escape') {
        hideModal();
      }
    };
    window.addEventListener('keydown', handlePressEsc);
    return () => {
      window.removeEventListener('keydown', handlePressEsc);
    };
  }, [hideModal]);

  return (
    <div className={css.overlay} onClick={hideModal}>
      <button className={css.close}>
        <GrClose onClick={hideModal} />
      </button>
      <div onClick={hideModal} className={css.modal}>
        <img src={currentImg.largeImg} alt={currentImg.tags} />
      </div>
    </div>
  );
};

Modal.prototype = {
  hideModal: propTypes.func.isRequired,
  currentImg: propTypes.shape({
    id: propTypes.number.isRequired,
    smallImg: propTypes.string.isRequired,
    largeImage: propTypes.string.isRequired,
    tags: propTypes.string.isRequired,
  }).isRequired,
};
