import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderModal from '../LoaderModal/LoaderModal';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Modal from '../Modal';
import Button from '../Button';
import { fetchImagesApi } from '../../api/api.js';

class App extends Component {
  state = {
    pictures: [],
    dataModal: null,
    serchD: 'nature',
    isLoading: false,
    isModalOpen: false,
    page: 1,
    isShowBtn: false,
  };

  perPage = 12;

  componentDidMount() {
    const { serchD, page } = this.state;
    this.setState({ isLoading: true });
    this.fetchImages(serchD, page);
  }

  componentDidUpdate(provProps, prevState) {
    const { serchD, page } = this.state;

    if (prevState.page !== page || prevState.serchD !== serchD) {
      this.fetchImages(serchD, page);
    }
  }

  fetchImages = (serch, page) => {
    fetchImagesApi(serch, page)
      .then(({ totalHits, hits }) => {
        const totalPages = Math.ceil(totalHits / this.perPage);

        const normalizeDate = hits.map(
          ({ webformatURL, largeImageURL, tags }) => ({
            webformatURL,
            largeImageURL,
            tags,
          }),
        );

        if (totalHits < 1) {
          toast.info(`Sorry, no picture about ${serch}`, { autoClose: 2500 });
        }

        if (totalHits > 0 && page === 1) {
          toast.success(`Found picture about ${serch ? serch : 'everithing'}`, {
            autoClose: 2500,
          });
        }

        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...normalizeDate],
        }));

        if (totalPages > 1) {
          this.setState({ isShowBtn: true });
        }

        if (totalPages === this.state.page) {
          toast.info(`Dont have more picture about ${serch}`, {
            autoClose: 2500,
            delay: 1500,
          });
          this.setState({ isShowBtn: false });
          return false;
        }
      })
      .catch(err => toast.error(err.message, { autoClose: 2500 }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onenModal = () => this.setState({ isModalOpen: true });
  onCloseModal = () => this.setState({ isModalOpen: false, dataModal: null });

  onTakeBigPict = (bigImg, tags) => {
    this.setState({ dataModal: { bigImg, tags } });
    this.onenModal();
  };

  onLoadMore = () => {
    toast.info(
      `Uploading more pictures about ${
        this.state.serchD ? this.state.serchD : 'everything '
      }  ♥`,
      { autoClose: 1500 },
    );

    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoading: true,
    }));
  };

  onTakeDataForSerch = name => {
    const { serchD } = this.state;
    if (serchD === name) {
      toast.warn(
        `You look picture  about ${
          serchD ? serchD : 'everything'
        } now ;) Search something else!`,
        { autoClose: 3000 },
      );
      return false;
    }

    return this.setState({
      serchD: name,
      page: 1,
      pictures: [],
      isShowBtn: false,
      isLoading: true,
    });
  };

  render() {
    const { pictures, isLoading, isModalOpen, dataModal, isShowBtn } =
      this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.onTakeDataForSerch} />

        {isLoading && <LoaderModal />}

        {pictures.length > 0 && (
          <ImageGallery pictures={pictures} onClickImage={this.onTakeBigPict} />
        )}

        {isModalOpen && (
          <Modal data={dataModal} onCloseModal={this.onCloseModal} />
        )}

        {isShowBtn && <Button onClick={this.onLoadMore} />}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
