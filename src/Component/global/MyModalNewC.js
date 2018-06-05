import React,{Component} from 'react';
import {Modal,ModalManager,Effect} from 'react-dynamic-modal';
import './css/bootstrap.css';

class MyModal extends Component{

    constructor(){
        super();
        // this.handlerGuardar=this.handlerGuardar.bind(this);
        // this.texto=React.createRef();
    }
    handlerGuardar(){
        let data=this.texto.current.value;
       // console.log(data);
        this.props.change(data,this.props.id_rec);
        ModalManager.close();
    }
    render(){
        const {text} = this.props;
        return (
            <Modal
                effect={Effect.SlideFromBottom}>
            <div>
                <span>Nombre </span><input type='text'/><br></br>
                <span>Concepto </span><input type='text' /><br></br>
                <span>Codigo </span><input type='text'/><br></br>
                <span>Recibo </span><input type='text'/><br></br>
                <span>Importe </span><input type='text'/><br></br>
                <span>Fecha </span><input type='date' aria-label='Username' aria-describedby='basic-addon1' /><br></br>
                <span>Ubicacion </span>
                  <select>
                    <option value="0">Seleccione ubicación</option>
                    <option value="1">Físico</option>
                    <option value="2">Cópia</option>
                    <option value="3">no disponíble</option>
                  </select>
                <br></br>
                <span>Tipo </span>
                  <select>
                    <option value="0">Seleccione Tipo</option>
                    <option value="1">Banco</option>
                    <option value="2">Manual</option>
                  </select>
                <br></br>
                <span>Observacion</span>
                <textarea rows="4" cols="50">
                </textarea>
                <br></br>
                <button>Registrar</button>
            </div>

            </Modal>
        );
    }
}
export default MyModal;
