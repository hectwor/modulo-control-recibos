import React,{Component} from 'react';

import  './css/Combo.css';
import './css/bootstrap.css';

//import Datos from './Datos/Tipo';
class Combo extends Component{
    constructor(){
        super();
        this.handlerGuardar=this.handlerGuardar.bind(this);
    }
    handlerGuardar(e){
        //let data=this.texto.current.value;

        // let num=0;
        // switch (e.target.value) {
        //     case Datos[1].nombre:num=1;
        //         break;
        //     case Datos[2].nombre:num=2;
        //         break;
        //     case "Seleccione ubicación":num="";
        //         break;
        //     default:
        //         num = "";
        // }
        this.props.val(e.target.value,this.props.id_rec);
    }





    //selected={key===val?(true):(false)}>{item.nombre}

    render(){
        const {items}=this.props;
        return(
            <select className="custom-select" onChange={this.handlerGuardar} id="inputGroupSelect01">
                {items && items.map((item,key)=><option key={key} id={key} value={item.id_tipo} selected={key===this.props.tipo?(true):(false)}>{item.descripcion}</option>)}
            </select>
        );
    }

}

export default Combo;
