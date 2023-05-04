import { Component } from "react";

export class App extends Component {
    state = {
        query: '',
    }

    setQuery = query => {
        this.setState({query});
    }

    render() {
        return(
            <AppDiv className={AppDivStyle}>
                
            </AppDiv>
        )
    }
}