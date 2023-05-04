import { Component } from "react";
import { BsSearch } from 'react-icons/bs'
import { SearchHeader,SearchForm, SearchButton, SearchLabel, SearchFormInput } from './Searchbar.styled';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
    state = {
        input: '',
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.setQuery(this.state.input);
    }

    render() {
        return(
            <SearchHeader className="search-header">
                <SearchForm className="search-form" onSubmit={this.handleSubmit}>
                    <SearchButton type="submit" className="button">
                        <BsSearch/>
                    </SearchButton>
                    <SearchLabel className="button-label">
                        <span className="search-span">Search</span>
                    </SearchLabel>
                    <SearchFormInput 
                    className="input"
                    type="text"
                    value={this.state.input}
                    placeholder="Search images"
                    onChange={e => this.setState({input: e.target.value})}
                    />
                </SearchForm>
            </SearchHeader>
        );
    }
}

Searchbar.propTypes = {
    setQuery: PropTypes.func.isRequired,
  };