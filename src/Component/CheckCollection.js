import React, {Component} from "react";
import './global/css/App.css';
import Header from './global/Header';
import Content from './global/Content';
import Footer from './global/Footer';
class CheckCollection extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Content />
                <Footer />
            </div>
        );
    }
}
export default CheckCollection;