import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderModal from "../LoaderModal/LoaderModal";
import Searchbar from "../Searchbar";
import ImageGallery from "../ImageGallery";
import Modal from "../Modal";
import Button from "../Button";
import { fetchImagesApi } from "../../api/api.js";

const App = () => {
  const [pictures, setPictures] = useState([]);
  const [dataModal, setDataModal] = useState(null);
  const [serchD, setSerchD] = useState("nature");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isShowBtn, setIsShowBtn] = useState(false);

  const perPage = 12;

  useEffect(() => {
    const fetchImages = (serch, page) => {
      fetchImagesApi(serch, page)
        .then(({ totalHits, hits }) => {
          const totalPages = Math.ceil(totalHits / perPage);

          const normalizeDate = hits.map(
            ({ webformatURL, largeImageURL, tags }) => ({
              webformatURL,
              largeImageURL,
              tags,
            })
          );

          if (totalHits < 1) {
            toast.info(`Sorry, no picture about ${serch}`, { autoClose: 2500 });
          }

          if (totalHits > 0 && page === 1) {
            toast.success(
              `Found picture about ${serch ? serch : "everithing"}`,
              {
                autoClose: 2500,
              }
            );
          }

          setPictures((prevState) => [...prevState, ...normalizeDate]);

          if (totalPages > 1) {
            setIsShowBtn(true);
          }

          if (totalPages === page) {
            toast.info(`Dont have more picture about ${serch}`, {
              autoClose: 2500,
              delay: 1500,
            });
            setIsShowBtn(false);
            return false;
          }
        })
        .catch((err) => toast.error(err.message, { autoClose: 2500 }))
        .finally(() => setIsLoading(false));
    };

    let isFirstLOading = true;

    if (isFirstLOading) {
      setIsLoading(true);
      fetchImages(serchD, page);
      isFirstLOading = false;
      return;
    }

    fetchImages(serchD, page);
  }, [page, serchD]);

  const onenModal = () => setIsModalOpen(true);
  const onCloseModal = () => {
    setIsModalOpen(false);
    setDataModal(null);
  };

  const onTakeBigPict = (bigImg, tags) => {
    const obj = { bigImg, tags };

    setDataModal(obj);
    onenModal();
  };

  const onLoadMore = () => {
    toast.info(
      `Uploading more pictures about ${serchD ? serchD : "everything "}  ♥`,
      { autoClose: 1500 }
    );

    setPage((prevPage) => prevPage + 1);
    setIsLoading(true);
  };

  const resetForNewSerch = (name) => {
    setSerchD(name);
    setPage(1);
    setPictures([]);
    setIsShowBtn(false);
    setIsLoading(true);
  };

  const onTakeDataForSerch = (name) => {
    if (serchD === name) {
      toast.warn(
        `You look picture  about ${
          serchD ? serchD : "everything"
        } now ;) Search something else!`,
        { autoClose: 3000 }
      );
      return false;
    }

    return resetForNewSerch(name);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onTakeDataForSerch} />

      {isLoading && <LoaderModal />}

      {pictures.length > 0 && (
        <ImageGallery pictures={pictures} onClickImage={onTakeBigPict} />
      )}

      {isModalOpen && <Modal data={dataModal} onCloseModal={onCloseModal} />}

      {isShowBtn && <Button onClick={onLoadMore} />}
      <ToastContainer />
    </div>
  );
};

export default App;
