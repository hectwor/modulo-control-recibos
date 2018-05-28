import React, {Component} from "react";
import './global/css/App.css';
import Header from './global/HeaderNewC';
import Content from './global/ContentNewC'
import Footer from './global/Footer'
class NewCollection extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Content/>
                <Footer/>
            </div>
        );
    }
}
export default NewCollection;