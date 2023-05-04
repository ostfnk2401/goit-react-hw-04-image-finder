import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { AppDiv } from "./App.styled";
import { ImageGallery } from "./ImageGallery/ImageGallery";

export class App extends Component {
    state = {
        query: '',
    }

    setQuery = query => {
        this.setState({query});
    }

    render() {
        return(
            <AppDiv>
                <Searchbar setQuery={this.setQuery}/>
                <ImageGallery query={this.state.query} />
            </AppDiv>
        )
    }
}