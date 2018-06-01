import React,{Component} from 'react';
import {Modal,ModalManager,Effect} from 'react-dynamic-modal';
import './css/bootstrap.css';

class MyModal extends Component{

    constructor(){
        super();
        this.handlerGuardar=this.handlerGuardar.bind(this);
        this.texto=React.createRef();
        this.groupBy=this.groupBy.bind(this);
        this.state={
           data:null
        }
    }
      componentWillMount(){
        const {text} = this.props;
        this.setState({
          data:text
        });
        console.log(Object.keys(text)[0]);
        //console.log(text["FLORES RAMIREZ MARTHA POLI"]);
      }
    handlerGuardar(){
      //  let data=this.texto.current.value;
       // console.log(data);
        //this.props.change(data,this.props.id_rec);
        ModalManager.close();
    }
    groupBy(xs, key) {
      return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    }
    render(){
    //  console.log(this.state.data);
      const text=this.state.data;
      console.log(text);
        return (
            <Modal
                //onRequestClose={onRequestClose}
                effect={Effect.SlideFromBottom}>
                <div className="modal-body"  >
                    <div className="form-group">
                        <label htmlFor="message-text" className="col-form-label">Nombre: {Object.keys(this.state.data)[0]}</label>
                    </div>
                        <table className="tabla">
                            <thead>
                            <tr className="tabla-cabecera">
                                <th>Nro</th>
                                <th>Concepto</th>
                                <th>Recibo</th>
                                <th>Importe</th>
                                <th>Fecha</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>{text[Object.keys(this.state.data)[0]].map((dynamicData, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{dynamicData.concepto}</td>
                                    <td>{dynamicData.numero}</td>
                                    <td>{dynamicData.importe}</td>
                                    <td>{dynamicData.fecha}</td>
                                </tr>
                            )}
                              <tr></tr>
                            </tbody>
                          </table>


                    <div className="modal-footer">
                        <button type = "button" className = "btn btn-secondary" data-dismiss = "modal" onClick = {ModalManager.close}>Cerrar</button>
                        <button type = "button" className = "btn btn-primary" onClick = {this.handlerGuardar} >Imprimir</button>
                        <button type = "button" className = "btn btn-primary" onClick = {this.handlerGuardar} >Excel</button>
                        <button type = "button" className = "btn btn-primary" onClick = {this.handlerGuardar} >PDF</button>
                    </div>
                </div>

            </Modal>
        );
    }
}
export default MyModal;
