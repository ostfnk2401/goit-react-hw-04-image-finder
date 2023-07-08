import { ImgGallery } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <>
      <ImgGallery className="gallery">
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            openModal={openModal}
          />
        ))}
      </ImgGallery>
    </>
  );
};

// ImageGallery.propTypes = {
//   query: PropTypes.string.isRequired,
// };
