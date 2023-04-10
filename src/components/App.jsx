import { fetchPics } from './apiService';
import { React, useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImagesGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { LoadMore } from './Button/LoadMore';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [currentImg, setCurrentImg] = useState(null);

  const onSubmit = searchQuery => {
    setQuery(searchQuery.trim());
    setGallery([]);
    setCurrentImg(null);
    setPage(1);
  };
  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    const loadImages = async () => {
      if (page === 0) {
        return;
      }
      try {
        setLoading(true);
        const response = await fetchPics(query, page);
        const images = response.hits.map(hit => {
          return {
            id: hit.id,
            smallImg: hit.webformatURL,
            largeImg: hit.largeImageURL,
            tags: hit.tags,
          };
        });
        setGallery(prevState => [...prevState, ...images]);
        setTotal(response.totalHits);
      } catch (error) {
        setErrorMsg('Error while loading data. Try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadImages();
  }, [query, page]);

  const onImageClick = e => {
    setOpenModal(true);
    const currentId = e.target.id;
    const currentObj = gallery.find(items => items.id === +currentId);
    setCurrentImg(currentObj);
  };

  const hideModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      {loading && <Loader />}
      <Searchbar onSubmit={onSubmit} />
      <ImagesGallery gallery={gallery} onImageClick={onImageClick} />

      {openModal && <Modal hideModal={hideModal} currentImg={currentImg} />}
      {gallery.length !== 0 && gallery.length < total && (
        <LoadMore onClick={loadMore} />
      )}
    </div>
  );
};
