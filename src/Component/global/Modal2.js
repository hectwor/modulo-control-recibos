import React,{Component} from 'react';
import {Modal,ModalManager,Effect} from 'react-dynamic-modal';
import './css/bootstrap.css';
import './css/Modal2.css';
class MyModal extends Component{

    constructor(){
        super();
        //  this.handlerGuardar=this.handlerGuardar.bind(this);
        this.texto=React.createRef();
        this.sumaT=this.sumaT.bind(this);
        this.state={
            data:null,
            index:0,
            data2:null
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
        //console.log(text[Object.keys(text)[0]]);
        let arre= text[Object.keys(text)[i]].sort( (a, b)=> {
            if (a.concepto > b.concepto) {
                return 1;
            }
            if (a.concepto < b.concepto) {
                return -1;
            }
            //iguales
            return 0;
        });

        //console.log(i);
        this.setState({
            data:arre,
            index:i,
            data2:arre
        });
        // console.log(text["FLORES RAMIREZ MARTHA POLI"]);
        // console.log(text[Object.keys(this.state.data)[this.state.index]]);
    }
    ////<tbody>{text[Object.keys(this.state.data)[this.state.index]].map((dynamicData, i) =>
    sumaT(){
      //  console.log(this.state.data);
       // console.log(this.state.data2);
        let suma=0;
        let sumaT=0;
        let arr=this.state.data2;
      //  let arrT=[];
        let ant=arr[0].concepto;
        console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
        arr.map((dynamicData, i) =>{
       //     console.log("------------------------------------");
       //     console.log("i : ",i);
            if(ant === dynamicData.concepto){
                suma = suma + parseFloat(dynamicData.importe);
            }else{

                // arr[i] = arrT[i].concat(suma);
                //arr.splice(i, 0,suma);
        //        console.log("igual : ", suma);
                suma = 0;
                suma = suma + parseFloat(dynamicData.importe);
            }

            sumaT=sumaT+suma;
            ant = dynamicData.concepto;
      //      console.log("ant : ",ant);
            return null;
        });
      //  console.log("u : ", suma);
        arr = arr.concat(suma);
      //  console.log(arr);
        return sumaT;
    }
    render(){

        const text=this.state.data;


      //   console.log("text: " +text);
        return (
            <Modal
                //onRequestClose={onRequestClose}
                effect={Effect.SlideFromBottom}>
                <div className="modal-body"  >
                    <div className="form-group">
                        <label htmlFor="message-text" className="col-form-label">Nombre: {text[0].nombre}</label>
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
                        <tbody>{text.map((dynamicData, i) =>
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
