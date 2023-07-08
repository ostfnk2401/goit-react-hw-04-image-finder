import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { AppDiv } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { useEffect } from 'react';
import { fetchImages } from 'FetchApi/FetchApi';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ImageModal } from './Modal/Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataModal, setDataModal] = useState({
    image: '',
    alt: '',
  });
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (!query) return;
    const getSearchedImages = async () => {
      setIsLoading(true);
      try {
        const data = await fetchImages(query, page);
        setImages(prevImages => [...prevImages, ...data.hits]);
        setLoadMore(page * 12 < data.totalHits);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getSearchedImages();
  }, [query, page]);

  const handleSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const changePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (image, alt) => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
    setDataModal({ image, alt });
  };
  return (
    <AppDiv>
      <Searchbar setQuery={handleSubmit} />
      <ImageGallery images={images} openModal={openModal} />
      {isLoading && <Loader />}
      {loadMore && <Button onClick={changePage} />}
      {isModalOpen && <ImageModal image={dataModal} onClose={openModal} />}
    </AppDiv>
  );
};
