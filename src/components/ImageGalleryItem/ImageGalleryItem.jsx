import { Component } from "react";
import { ImgGalleryItem, ImgGalleryImage } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
    render() {
        const { image, openModal } = this.props;

        return(
            <ImgGalleryItem className="gallery-item" onClick={e => openModal(image.largeImageURL, image.tags)}>
                <ImgGalleryImage src={image.webformatURL} alt={image.tags}/>
            </ImgGalleryItem>
        );
    }
}