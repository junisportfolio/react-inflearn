import React from 'react';
import Contact from './Contact';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    };

    render() {
        return (
            <Contact/>

            /*
            <div>
                <button onClick={()=> {this.setState({name: 'velopert'});}}>click me</button>
                <h1>Hello React Skeleton!!!@@@ {this.state.name}</h1>
            </div>
            */
        )
    }
}

export default App;