import React,{Component} from 'react';
import {Modal,ModalManager,Effect} from 'react-dynamic-modal';
import './css/bootstrap.css';

class MyModal extends Component{

    constructor(){
        super();
        this.handlerGuardar=this.handlerGuardar.bind(this);
        this.texto=React.createRef();
    }
    handlerGuardar(){
        let data=this.texto.current.value;
        console.log(data);
        this.props.change(data,this.props.id_rec);
        ModalManager.close();
    }
    render(){
        const {text} = this.props;
        return (
            <Modal
                //onRequestClose={onRequestClose}
                effect={Effect.SlideFromBottom}>
                <div className="modal-body"  >
                    <div className="form-group">
                        <label htmlFor="message-text" className="col-form-label">Observacion:</label>
                        <textarea className = "form-control" id = "message-text" ref={this.texto} defaultValue={text!=="0"?(text):(null)}></textarea>
                    </div>
                    <div className="modal-footer">
                        <button type = "button" className = "btn btn-secondary" data-dismiss = "modal" onClick = {ModalManager.close}>Cerrar</button>
                        <button type = "button" className = "btn btn-primary" onClick = {this.handlerGuardar} >Guardar</button>
                    </div>
                </div>

            </Modal>
        );
    }
}
export default MyModal;
