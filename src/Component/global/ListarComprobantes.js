import React, { Component } from 'react';
import {ModalManager} from 'react-dynamic-modal';
import MyModal from './MyModal';
import './css/DatosCSS.css';
import './css/bootstrap.css';

var listaObs= new Array(0);
function crearJSON(id_rec,obs,flag){
    this.id_rec=id_rec;
    this.obs=flag+"-"+obs;
}
function Obj(id_rec,obs){
    this.id_rec=id_rec;
    this.obs=obs;
}
function  verificar(){
    const checks = document.querySelectorAll(".DatosCSS-input-checkbox");
    let tam= checks.length;
    let arreglo = new Array(0);
    let result;
    for (let i = 0; i < tam; i++) {
        if ( checks[i].checked ) {
           result = new  crearJSON(checks[i].id,listaObs[i].obs,true);
        }else{
            result = new  crearJSON(checks[i].id,listaObs[i].obs,false);
        }
        arreglo.push(result);
    }
    return arreglo;
   }

class ListarComponentes extends Component {
    constructor(){
        super();
       this.handleEnviarData=this.handleEnviarData.bind(this);
       this.openModal=this.openModal.bind(this);
       this.handleChange=this.handleChange.bind(this);
       this.state={
           texto:""
       }
    }

    handleChange(text,id_rec){
        let tam=listaObs.length;
        for (let i=0;i<tam;i++){
            if(listaObs[i].id_rec===id_rec){
                listaObs[i].obs=text;
            }
        }
        console.log(listaObs);
    }
    openModal(e){
        //https://github.com/xue2han/react-dynamic-modal
         let text=e.target.id;
         let id_re=e.target.name;
        ModalManager.open(<MyModal text={text} id_rec={id_re} change={this.handleChange}/>);
    }


    handleEnviarData() {
        let arreglo=verificar();
        console.log(JSON.stringify(arreglo));
        const url= 'https://api-modulocontrol.herokuapp.com/recaudaciones/id';
        fetch(url,{

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(arreglo)
                    })
            .then(res => res.json())
            .then(res => {
                if (res.status) { // exito
                    alert('Datos cargados exitosamente');
                }
            })
    .catch(error => error);
    }
    render() {
    	const {listado} = this.props;
        if (listado===null){
            return (
                <div></div>
            );
        }else if(listado===""){
            return (
                <div className="alert alert-info">Casilleros vacíos</div>
            );
        }else if (listado.length===0){

            return (
                <div className="alert alert-info">Datos no encontrados</div>
            );
        } else {
            return (
                <div className="table-scroll">
                            <table className="tabla">
                                <thead>
                                <tr className="tabla-cabecera">
                                    <th>Nro</th>
                                    <th>Nombre Apellido</th>
                                    <th>Concepto</th>
                                    <th>Codigo</th>
                                    <th>Recibo</th>
                                    <th>Verificar</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>{listado.map((dynamicData,i) =>
                                    <tr key={i} >
                                        <td>{i}</td>
                                        <td>{dynamicData.nombre}</td>
                                        <td>{dynamicData.concepto}</td>
                                        <td>{dynamicData.codigo}</td>
                                        <td>{dynamicData.numero}</td>

                                        <td>
                                            {
                                                dynamicData.validado ? (
                                                    <input id={dynamicData.id_rec} type="checkbox" className="DatosCSS-input-checkbox"  defaultChecked disabled />
                                                ):(
                                                    <input id={dynamicData.id_rec} type="checkbox" className="DatosCSS-input-checkbox"  />
                                                )
                                            }

                                        </td>
                                        <td id={listaObs.push(new Obj(dynamicData.id_rec,dynamicData.observacion))}>

                                            <button type="button" onClick={this.openModal} id={dynamicData.observacion} name={dynamicData.id_rec} className="btn btn-primary">Observaciones</button>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                            <button id="Enviar" onClick={this.handleEnviarData} className="btn btn-danger">Registrar</button>
                    </div>
            );
        }

    }
}

export default ListarComponentes;
