import React,{Component} from 'react';

import  './css/Combo.css';
import './css/bootstrap.css';

class Combo extends Component{

    render(){
        const {items,val}=this.props;
        return(
                <select className="custom-select" id="inputGroupSelect01">
                    {items && items.map((item,key)=><option key={key} selected={key===val?(true):(false)}>{item.nombre}</option>)}
                </select>
        );
    }

}

export default Combo;