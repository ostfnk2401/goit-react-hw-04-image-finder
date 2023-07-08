import PropTypes from "prop-types";
import { useEffect } from "react";
import { Modal, Overlay } from "./Modal.styled";

export const ImageModal  = ({ onClose , image}) => {
  useEffect( () => {
    const handleKeyDown = (e) => {
    if (e.code === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose])

  

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) onClose();
  };

    const { image: url, alt } = image;
    return (
      <Overlay className="overlay" onClick={handleBackdropClick}>
        <Modal className="modal">
          <img src={url} alt={alt} />
        </Modal>
      </Overlay>
    );
  }


ImageModal.propTypes = {
  image: PropTypes.shape({
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
