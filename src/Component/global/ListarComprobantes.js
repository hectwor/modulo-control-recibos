import React, { Component } from 'react';
import {ModalManager} from 'react-dynamic-modal';
import MyModal from './MyModal';
import Combo from './Combo';
import Check from './Check';
import './css/DatosCSS.css';
import './css/bootstrap.css';
import Datos from './Datos/Items';


class ListarComponentes extends Component {
    constructor(...props){
        super(...props);
       this.handleEnviarData=this.handleEnviarData.bind(this);
       this.openModal=this.openModal.bind(this);
       this.handleChangeObs=this.handleChangeObs.bind(this);
       this.handleChangeUbic=this.handleChangeUbic.bind(this);
       this.Obj=this.Obj.bind(this);
       this.handleChangeEstado=this.handleChangeEstado.bind(this);
       this.crearJSON=this.crearJSON.bind(this);
       this.verificar=this.verificar.bind(this);
       this.state={
           data:null,
           JSON:[]
       }
    }
    componentWillReceiveProps(nextProps) {
        let arreglo = [];
        const lista = nextProps.listado;
      // console.log(nextProps.listado);
        if (lista !== null) {
            lista.map((item,key) => {
                arreglo=arreglo.concat(new this.Obj(item.id_rec, item.observacion, item.id_ubicacion,item.validado,item.nombre,
                    item.concepto,item.codigo,item.numero));
            });
           // console.log(arreglo);
            this.setState({
                data: arreglo
            }/*, function () {
                console.log("call"+this.state.data)
            }*/)
        }
    }

    // crear un objeto para enviar al server
    crearJSON(id_rec,obs,flag,ubic=0){
        this.id_rec=id_rec;
        this.obs=flag+"-"+obs;
        this.ubic=ubic;
    }

// funcion verifica los checks y las observaciones nuevas
    verificar(){
        const arreglo=this.state.data;
        let arreglo2=[];
        arreglo.map(item=>{
            arreglo2=arreglo2.concat(new this.crearJSON(item.id_rec,item.obs,item.validado,item.ubic))
        });
        this.setState({
           JSON:arreglo2
        });
       // console.log(arreglo2);
        return arreglo2;
    }

//crea un objeto para pasar al hijo
    Obj(id_rec,obs,ubic,validado,nombre,concepto,codigo,numero){
        this.id_rec=id_rec;
        this.obs=obs;
        this.ubic=ubic;
        this.validado=validado;
        this.nombre=nombre;
        this.concepto=concepto;
        this.codigo=codigo;
        this.numero=numero;
    }
//recibe las ubicaciones de los archivos
    handleChangeUbic(ubic,id_rec){
        this.state.data.map(items=>{
            if(items.id_rec===id_rec){
                items.ubic=ubic;
            }
        });
    }
//recibe el estado de los checks cada vez que se pulsa sobre ellos
    handleChangeEstado(estado,id){
        const validado=estado.target.checked;
        this.state.data.map(items=>{
           if(items.id_rec===id){
                items.validado = validado;
           }
        });
      //  console.log(this.state.data);
    }

    // recibe la observacion y el id de recaudaciones modificados
    // los almacena o actualiza en el array
    handleChangeObs(text, id_rec){
        this.setState(prevState=>(
            prevState.data.map(items => {
            if (items.id_rec === id_rec) {
                items.obs = text;
            }
        },
           {data:prevState.data
        })
     ));

       // console.log(this.state.data);
    }
    // abre el componente MyModal para ingresar observaciones
    openModal(e){
        //https://github.com/xue2han/react-dynamic-modal
         let text=e.target.id;
         let id_re=e.target.name;
        ModalManager.open(<MyModal text={text} id_rec={id_re} change={this.handleChangeObs}/>);
    }
// envia un JSON al server
    handleEnviarData() {
        //console.log(this.state.JSON);
        const arreglo=this.verificar();
       // console.log(arreglo);
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
        //https://github.com/calambrenet/react-table/blob/master/src/react-table.jsx
    }
    render() {
        const listado = this.state.data;
       // console.log(listado);
        if (listado == null) {
            return (
                <div></div>
            );
        } else if (listado === "") {
            return (
                <div className="alert alert-info">Casilleros vacíos</div>
            );
        } else if (listado.length === 0) {

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
                            <th>Ubicación</th>
                            <th>Verificar</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>{listado.map((dynamicData, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{dynamicData.nombre}</td>
                                <td>{dynamicData.concepto}</td>
                                <td>{dynamicData.codigo}</td>
                                <td>{dynamicData.numero}</td>
                                <td><Combo items={Datos} val={this.handleChangeUbic} ubic={dynamicData.ubic}
                                           id_rec={dynamicData.id_rec}/></td>

                                <td>
                                    <Check validado={dynamicData.validado} id={dynamicData.id_rec}
                                           change={this.handleChangeEstado}/>
                                </td>
                                <td>
                                    <button type="button" onClick={this.openModal} id={dynamicData.obs}
                                            name={dynamicData.id_rec} className="btn btn-primary">Observaciones
                                    </button>
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
