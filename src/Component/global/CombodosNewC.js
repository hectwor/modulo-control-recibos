import React,{Component} from 'react';

import  './css/Combo.css';
import './css/bootstrap.css';

class Combo extends Component{
    constructor(){
        super();
        this.handlerGuardar=this.handlerGuardar.bind(this);
    }
    handlerGuardar(e){
        //let data=this.texto.current.value;

        let num=0;
        switch (e.target.value) {
            case "Banco":num=1;
                break;
            case "Manual":num=2;
                break;
            case "Seleccione Tipo":num="";
                break;
            default:
                num = "";
        }
        this.props.val(num,this.props.id_rec);
    }





    //selected={key===val?(true):(false)}>{item.nombre}

    render(){
        const {items}=this.props;
        return(
            <select className="custom-select" onChange={this.handlerGuardar} id="inputGroupSelect01" disabled>
                {items && items.map((item,key)=><option key={key} id={key} selected={key===this.props.tipo?(true):(false)}>{item.nombre}</option>)}
            </select>
        );
    }

}

export default Combo;
