import React,{Component} from 'react';
import {Modal,ModalManager,Effect} from 'react-dynamic-modal';
import './css/bootstrap.css';
import './css/Modal2.css';
class MyModal extends Component{

    constructor(){
        super();
      //  this.handlerGuardar=this.handlerGuardar.bind(this);
        this.texto=React.createRef();
        this.groupBy=this.groupBy.bind(this);
        this.sumaT=this.sumaT.bind(this);
        this.state={
           data:null,
            index:0
        }
    }
      componentWillMount(){
        const {text,nombre} = this.props;
        let i=0;
        Object.keys(text).map((data,index)=>{
            if(data===nombre){
                i=index;
            }
            return null;
        });
        console.log(i);
        this.setState({
          data:text,
          index:i
        });
        //console.log(Object.keys(text));
        //console.log(text["FLORES RAMIREZ MARTHA POLI"]);
      }
    groupBy(xs, key) {
      return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    }
    sumaT(){
        let suma=0;
        {this.state.data[Object.keys(this.state.data)[this.state.index]].map((dynamicData, i) =>
            suma=suma+ parseFloat(dynamicData.importe)
        )}
       // console.log(suma);
            return suma;
    }
    render(){
    //  console.log(this.state.data);
      const text=this.state.data;
      //console.log(text);
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
                            <tbody>{text[Object.keys(this.state.data)[this.state.index]].map((dynamicData, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{dynamicData.concepto}</td>
                                    <td>{dynamicData.numero}</td>
                                    <td>{dynamicData.importe}</td>
                                    <td>{dynamicData.fecha}</td>
                                </tr>
                            )}
                              <tr >
                                  <td colSpan={3} >Total</td>
                                  <td className="total">{this.sumaT()}</td>
                              </tr>
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
