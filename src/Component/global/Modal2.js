import React,{Component} from 'react';
import {Modal,ModalFooter,ModalHeader,ModalBody,Button,Label,Table } from 'reactstrap';
import './css/bootstrap.css';
import './css/Modal2.css';

class MyModal extends Component{

    constructor(){
        super();
        //  this.handlerGuardar=this.handlerGuardar.bind(this);
        this.texto=React.createRef();
        this.sumaT=this.sumaT.bind(this);
        this.close = this.close.bind(this);
     //   this.alterarArray = this.alterarArray.bind(this)
        this.state={
            data:null,
            dataAlterar: null,
            index:0,
            modal:false
        }
    }
    componentWillMount(){
        const {text,nombre,codigo,estado} = this.props;
        let arre = [];
      //  console.log(text);
        let i=0;

        //console.log(text[Object.keys(text)[0]]);
        if(codigo!=="0"){
            Object.keys(text).map((data,index)=>{
                if(data===codigo){
                    i=index;
                }
                return null;
            });
            arre = text[Object.keys(text)[i]].sort( (a, b)=> {
                if (a.concepto > b.concepto) {
                    return 1;
                }
                if (a.concepto < b.concepto) {
                    return -1;
                }
                //iguales
                return 0;
            });
        }else{
            Object.keys(text).map((data,index)=>{
                if(data===nombre){
                    i=index;
                }
                return null;
            });
            arre = text[Object.keys(text)[i]].sort( (a, b)=> {
                if (a.nombre > b.nombre) {
                    return 1;
                }
                if (a.nombre < b.nombre) {
                    return -1;
                }
                //iguales
                return 0;
            });
        }
        //console.log(i);
        this.setState({
            data:arre,
            dataAlterar:[...arre],
            index:i,
            modal:estado
        });
        // console.log(text["FLORES RAMIREZ MARTHA POLI"]);
        // console.log(text[Object.keys(this.state.data)[this.state.index]]);

    }
    ////<tbody>{text[Object.keys(this.state.data)[this.state.index]].map((dynamicData, i) =>
    sumaT(){
        let sumaT=0;
        let arr=this.state.data;
        arr.map((dynamicData, i) =>{
            if(dynamicData.numero !== 'SubSuma')
                sumaT = sumaT + parseFloat(dynamicData.importe);
            return null;
        });
        return sumaT;
    }

    alterarArray(){

        let suma=0;
        let arr=this.state.dataAlterar;
        let arrHueco = [];
        let ant=arr[0].concepto;
        let i = 0;
        while (i < arr.length) {
            if(ant === arr[i].concepto){
                suma = suma + parseFloat(arr[i].importe);
            }else{
                arr.splice(i, 0,[arrHueco]);
                arr[i].importe = suma;
                arr[i].numero = 'SUBSUMA';
                i++;
                ant = arr[i].concepto;
                suma = 0;
                suma = suma + parseFloat(arr[i].importe);
            }
            i++;
        }
        arr.splice(i, 0,[arrHueco]);
        arr[i].importe = suma;
        arr[i].numero = 'SUBSUMA';
    }
    close(){
        this.setState({
            modal:false
        })
    }

    render(){
        this.alterarArray();
        const text=this.state.dataAlterar;
        const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.close}>&times;</button>;
        let cont=0;
        return (
         <div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} external={externalCloseBtn} size={"lg"}>
                 <ModalHeader>
                    <Label>Nombre: {text[0].nombre}</Label>
                 </ModalHeader>
                 <ModalBody>
                     <Table responsive>
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
                                 {(dynamicData.numero==="SUBSUMA")?(<td colSpan={1}></td>):( <td>{cont+=1}</td>)}
                                 <td>{dynamicData.concepto}</td>
                                 {(dynamicData.numero==="SUBSUMA")?(<td colSpan={1} className="subTotal">{dynamicData.numero}</td>):( <td>{dynamicData.numero}</td>)}
                                 {(dynamicData.numero==="SUBSUMA")?(<td colSpan={1} className="subTotal">{dynamicData.importe}</td>):( <td>{dynamicData.importe}</td>)}
                                 <td>{dynamicData.fecha}</td>
                             </tr>
                         )}
                         <tr >
                             <td colSpan={3} >Total</td>
                             <td className="total">{this.sumaT()}</td>
                         </tr>
                         </tbody>
                     </Table>
                 </ModalBody>
                 <ModalFooter>
                     <button type = "button" className = "btn btn-primary" onClick = {window.print} >Imprimir</button>
                     <Button color="secondary" onClick={this.close}>Cancel</Button>
                 </ModalFooter>
            </Modal>
         </div>
        );
    }
}
export default MyModal;