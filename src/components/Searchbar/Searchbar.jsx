import React, { Component } from 'react';

import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    serchName: '',
  };

  onChangeSerchName = e => this.setState({ serchName: e.target.value });

  onSubmitForm = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.serchName);
    this.resetForm();
  };

  resetForm = () => this.setState({ serchName: '' });

  render() {
    const { serchName } = this.state;

    return (
      <header className="Searchbar">
        <form onSubmit={this.onSubmitForm} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            onChange={this.onChangeSerchName}
            placeholder="Search images and photos"
            value={serchName}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
