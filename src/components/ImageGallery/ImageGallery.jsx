import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ImgGallery } from "./ImageGallery.styled";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { ImageModal } from "../Modal/Modal";
import { fetchImages } from "../../FetchApi/FetchApi";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";

 export const ImageGallery = ({ query }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataModal, setDataModal] = useState({
    image: '',
    alt: '',
  });
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (query) {
      getSearchedImages();
    }
  }, [query, page]);

  const getSearchedImages = async () => {
    setIsLoading(true);
    try {
      const data = await fetchImages(query, page);
      setImages(prevImages => [...prevImages, ...data.hits]);
      setLoadMore(page * 12 < data.totalHits);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const changePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (image, alt) => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
    setDataModal({ image, alt });
  };

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
      {isLoading && <Loader />}
      {loadMore && <Button onClick={changePage} />}
      {isModalOpen && (
        <ImageModal image={dataModal} onClose={openModal} />
      )}
    </>
  );
};

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};