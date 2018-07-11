import React, { Component } from 'react';
import {ModalManager} from 'react-dynamic-modal';
import MyModal from './MyModal';
import Combo from './ComboNewC';
import Combodos from './CombodosNewC';
import URL from './API/API';
import Check from './CheckNewC';
import './css/DatosCSS.css';
import './css/bootstrap.css';
import './css/ListarComprobanteNewC.css';
import Modal2 from './MyModalNewC';
import ReactDOM from "react-dom";
//import Datos from './Datos/Items';
//import Datos2 from './Datos/Tipo';

class ListarComponentes extends Component {
    constructor(...props){
        super(...props);
        this.handleEnviarData=this.handleEnviarData.bind(this);
        this.openModal=this.openModal.bind(this);
        this.handleChangeObs=this.handleChangeObs.bind(this);
        this.handleChangeUbic=this.handleChangeUbic.bind(this);
        this.handleChangeType=this.handleChangeType.bind(this);
        this.Obj=this.Obj.bind(this);
        this.handleChangeEstado=this.handleChangeEstado.bind(this);
        this.crearJSON=this.crearJSON.bind(this);
        this.verificar=this.verificar.bind(this);
        this.state={
            data:null,
            JSON:[],
            ubicDato:[],
            tipoDato:[],
            isLoading:false,
            isNew:false
        }
    }

    componentWillMount(){
        let arreglo = [];
        const lista = this.props.listado;
        if (lista !== null) {
            lista.map((item,key) => {
                arreglo=arreglo.concat(new this.Obj(item.id_rec,item.observacion,item.id_ubicacion && item.id_ubicacion,item.id_tipo,item.validado,item.nombre,
                    item.concepto,item.codigo,item.numero,item.importe,item.fecha,item.id_alum));
                return null;
            });
            //console.log(arreglo);
            this.setState({
                data: arreglo
            }/*, function () {
                console.log("call"+this.state.data)
            }*/)

        }
        //console.log(arreglo);
        //const url= 'https://api-modulocontrol.herokuapp.com/ubicaciones';
        const url = URL.url.concat('ubicaciones');
        fetch(url,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
                    })
            .then(res => res.json())
            .then(res => {
                if (res.status) { // exito
                    let dataTipo=res["data"];
                    this.setState({
                       ubicDato:dataTipo
                    });

                   // console.log(dataTipo);
                }else{
                  alert("Fallo al cargar datos, Intentelo mas tarde")
                }
            });
            const url2= URL.url.concat('tipos');
          //  const url2= 'https://api-modulocontrol.herokuapp.com/tipos';
            fetch(url2,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  }
                        })
                .then(res => res.json())
                .then(res => {
                    if (res.status) { // exito
                        let dataTipo=res["data"];
                        this.setState({
                           tipoDato:dataTipo
                        });
                       // console.log(res["data"]);

                      //  console.log(this.state.dataTipo);
                    }else{
                      alert("Fallo al cargar datos, Intentelo mas tarde")
                    }
                });

    }

    // crear un objeto para enviar al server
    crearJSON(codigo,concepto,ubic,id_rec,numero,importe,obs,flag,fecha,validado,tipo){
        if(obs==null)obs="";
        if(ubic==null)ubic=0;
        if(flag==null)flag=false;
        if(tipo==null) tipo= 0;
        this.id_rec=id_rec;
        this.concepto=concepto;
        this.ubic=ubic;
        this.codigo=codigo;
        this.numero=numero;
        this.importe=importe;
        this.obs=flag+"-"+obs;
        this.fecha=fecha;
        this.tipo = tipo;
        this.validado=validado;

    }

// funcion verifica los checks y las observaciones nuevas
    verificar(){
        const arreglo=this.state.data;
        let arreglo2=[];
        arreglo.map(item=>{
            arreglo2=arreglo2.concat(new this.crearJSON(item.codigo,item.concepto,item.ubic,item.id_rec,item.numero,item.importe,
                item.obs,item.flag,item.fecha,item.validado,item.tipo))
            return null;
        });
      //  console.log(arreglo2);
        this.setState({
            JSON:arreglo2
        });
        //console.log(arreglo2);
        return arreglo2;
    }

//crea un objeto para pasar al hijo
    Obj(id_rec,obs,ubic,tipo,validado,nombre,concepto,codigo,numero,importe,fecha,id_alum){
        this.id_rec=id_rec;
        this.obs=obs;
        this.ubic=ubic;
        this.tipo=tipo;
        this.validado=validado;
        this.nombre=nombre;
        this.concepto=concepto;
        this.codigo=codigo;
        this.numero=numero;
        this.importe=importe;
        this.fecha= fecha && fecha.substr(8,2)+"-"+fecha.substr(5,2)+"-"+fecha.substr(0,4);
        this.id=id_alum;
    }
//recibe las ubicaciones de los archivos
    handleChangeUbic(ubic,id_rec){
        this.state.data.map(items=>{
            if(items.id_rec===id_rec){
                items.ubic=ubic;
            }
            return null;
        });
    }

//recibe el tipo de los archivos
    handleChangeType(tipo,id_rec){
        this.state.data.map(items=>{
            if(items.id_rec===id_rec){
                items.tipo=tipo;
            }
            return null;
        });
    }

//recibe el estado de los checks cada vez que se pulsa sobre ellos
    handleChangeEstado(estado,id){
        const validado=estado.target.checked;
        this.state.data.map(items=>{
            if(items.id_rec===id){
                items.validado = validado;
            }
            return null;
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
                    return null;
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
        let component = <MyModal text={text} id_rec={id_re} change={this.handleChangeObs} estado={true}/>;
        let  node = document.createElement('div');
        ReactDOM.render(component,node);
    }

// envia un JSON al server
    handleEnviarData() {
        //console.log(this.state.JSON);
        const arreglo=this.verificar();
        //console.log(this.state.JSON);
        //console.log(JSON.stringify(arreglo));
        // console.log(JSON.stringify(arreglo));
        const url =  URL.url.concat('recaudaciones/new');
       // const url= 'https://api-modulocontrol.herokuapp.com/recaudaciones/new';
        this.setState({
            isLoading:true
        });
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
                    this.setState({
                        isLoading:false
                    });
                    alert('Datos cargados exitosamente');
                }
            })
       // console.log(arreglo);
        //https://github.com/calambrenet/react-table/blob/master/src/react-table.jsx
    }


        eventoNombre(e,f,c)
        {
          let id=e;
          let nom=f;
          let cod = c;
          ModalManager.open(<Modal2 id={id} nombre={nom} codigo={cod} />);
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
                    <div className="botones">
                        {/* <div className="container">
                            <button id="btnNuevaR"  onClick={this.handleNuevo} className="btn btn-outline-success">Nueva</button>
                        </div> */}
                        <div className={(this.state.isNew)?("block"):("none")}>
                            <button id="Registrar" onClick={this.handleEnviarData} className="btn btn-outline-success">Registrar</button>
                        </div>
                        <p> </p>
                    </div>
                    <table className="tabla" id="table">
                        <thead>
                        <tr className="tabla-cabecera">
                            <th>Nro</th>
                            <th>Nombre Apellido</th>
                            <th>Concepto</th>
                            <th>Codigo</th>
                            <th>Recibo</th>
                            <th>Importe</th>
                            <th>Fecha</th>
                            <th>Ubicación</th>
                            <th>Tipo</th>
                            <th>Verificar</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody id="table">{listado.map((dynamicData, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td onClick={(e)=>this.eventoNombre(dynamicData.id, dynamicData.nombre, dynamicData.codigo)} title="click para añadir un nuevo registro" className="detalles" nam={dynamicData.nombre}>{dynamicData.nombre}</td>
                                <td>{dynamicData.concepto}</td>
                                <td>{dynamicData.codigo}</td>
                                <td>{dynamicData.numero}</td>
                                <td>{dynamicData.importe}</td>
                                <td>{dynamicData.fecha}</td>
                                <td><Combo items={this.state.ubicDato} val={this.handleChangeUbic} ubic={dynamicData.ubic}
                                           id_rec={dynamicData.id_rec}/></td>

                                <td><Combodos items={this.state.tipoDato} val={this.handleChangeType} tipo={dynamicData.tipo}
                                              id_rec={dynamicData.id_rec}/></td>
                                <td>
                                    <Check validado={dynamicData.validado} id={dynamicData.id_rec}
                                           change={this.handleChangeEstado} disabled={true} />
                                </td>
                                <td>
                                    <button type="button" onClick={this.openModal} id={dynamicData.obs}
                                            name={dynamicData.id_rec} className='btn btn-primary'>Observaciones
                                    </button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default ListarComponentes;
