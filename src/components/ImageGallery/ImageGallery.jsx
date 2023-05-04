import { Component } from "react";
import PropTypes from 'prop-types';
import { ImgGallery } from "./ImageGallery.styled";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Modal } from "../Modal/Modal.styled";
import { fetchImages } from "../FetchApi/FetchApi";
import { Button } from "../Button/Button";

export class ImageGallery extends Component {
    state = {
        image: [],
        query: '',
        page: 1,
        error: null,
        isLoading: false,
        isModalOpen: false,
        dataModal: {
            image: '',
            alt:'',
        }
    };

    static getStateProps(props, state) {
        const { query } = props;
        if (query !== state.query) {
            return { page: 1, query, images: [] };
        }
        return null;
    };
    
    getSnapshotBeforeUpdate() {
        return document.body.clientHeight + 72;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevProps.query !== this.props.query && this.props.query) ||
        prevState.page !== this.state.page) {
            this.getSearchedImages();
        }
        if (prevState.images !== this.state.images && this.state.page !== 1) {
            window.scrollTo({
                top: snapshot,
                behavior: 'smooth',
            });
        }
    };

    getSearchedImages = async () => {
        this.setState({ isLoading: true });
        try {
            const data = await fetchImages( this.props.query, this.state.page );
            this.setState( prev => ({ images: [...prev.images, ...data.hits] }));

        } catch (error) {
            this.setState({ error: error.message });
        } finally {
            this.setState({ isLoading: false });
        }
    };

    changePage = () => {
        this.setState( prev => ({ page: prev.page + 1 }));
    };

    openModal = (image, alt) => {
        this.setState(({ isModalOpen }) => ({
            isModalOpen: !isModalOpen,
            dataModal: { image, alt },
        }));
    };

    render() {
        return (
            <>
                <ImgGallery className="gallery">
                    {this.state.images.map(image => (
                        <ImageGalleryItem
                            key={image.id}
                            image={image}
                            openModal={this.openModal}
                        />
                    ))}
                </ImgGallery>
                    {this.state.isLoading && <Loader />}
                    {this.state.images.length > 0 && <Button onClick={this.changePage} />}
                    {this.state.isModalOpen && (
                        <Modal image={this.state.dataModal} onClose={this.openModal} />
                    )}
            </>
        );
    }
}

ImageGallery.propTypes = {
    query: PropTypes.string.isRequired,
};
