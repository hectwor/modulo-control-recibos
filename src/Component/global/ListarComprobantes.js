import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MyModal from './MyModal';
import Modal2 from './Modal2';
import Combo from './Combo';
import URL from './API/API';
import Check from './Check';
import './css/DatosCSS.css';
import './css/bootstrap.css';
//import Datos from './Datos/Items';


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
       this.groupBy = this.groupBy.bind(this);
      this.eventoNombre = this.eventoNombre.bind(this);
       this.state={
           data:null,
           dataOrdenada: null,
           ubicDato:[],
           JSON:[],
           isLoading:false
       }
    }
    componentWillMount(){


        let arreglo = [];
        const lista = this.props.listado;
        if (lista !== null) {
            lista.map((item,key) => {
                arreglo = arreglo.concat(new this.Obj(item.id_rec,item.observacion,item.id_ubicacion && item.id_ubicacion,item.validado,item.nombre,
                    item.concepto,item.codigo,item.numero,item.importe,item.fecha));
                return null;
            });
            const listadoOrdenado = arreglo.sort(function (a, b) {
                if (a.nombre > b.nombre) {
                    return 1;
                }
                if (a.nombre < b.nombre) {
                    return -1;
                }
                //iguales
                return 0;
            });
           // console.log(arreglo);
            this.setState({
                data: listadoOrdenado
            }/*, function () {
                console.log("call"+this.state.data)
            }*/);
            this.setState({
                data: arreglo
            });

          //console.log( listadoOrdenado );
          /*this.setState({
             dataOrdenada:listadoOrdenado
          });*/
        }
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
                  //  console.log(this.state.tipoDato);
                    //console.log(res["data"]);

                  //  console.log(this.state.dataTipo);
                }else{
                  alert("Fallo al cargar datos, Intentelo mas tarde")
                }
            });
    }

    // crear un objeto para enviar al server
    crearJSON(id_rec,obs,flag,ubic){
        if(obs==null)obs="";
        if(ubic==null)ubic=0;
        if(flag==null)flag=false;
        this.id_rec=id_rec;
        this.check=flag;
        this.obs=obs;
        this.ubic=ubic;
    }

// funcion verifica los checks y las observaciones nuevas
    verificar(){
        const arreglo=this.state.data;
        let arreglo2=[];
        arreglo.map(item=>{
            arreglo2=arreglo2.concat(new this.crearJSON(item.id_rec,item.obs,item.validado,item.ubic));
            return null;
        });
        this.setState({
           JSON:arreglo2
        });
      //  console.log(arreglo2);
        return arreglo2;
    }

    //crea un objeto para pasar al hijo
    Obj(id_rec,obs,ubic,validado,nombre,concepto,codigo,numero,importe,fecha){
        this.id_rec=id_rec;
        this.obs=obs;
        this.ubic=ubic;
        this.validado=validado;
        this.nombre=nombre;
        this.concepto=concepto;
        this.codigo=codigo;
        this.numero=numero;
        this.importe=importe;
        //console.log(convertDateFormat(fecha.substr(0,10)));
        if(fecha!==null){
            let fTemp=fecha.substr(0,10).split("-");
            let tam=fTemp.length,i=0,fFinal="";
            for(i=tam-1;i>=0;i--){
                fFinal=fFinal+"/"+fTemp[i];
            }
            this.fecha=fFinal.slice(1,11);
        }
        else this.fecha=fecha;
    }
    //recibe las ubicaciones de los archivos
    handleChangeUbic(ubic,id_rec){
        console.log(ubic);
        this.state.data.map(items=>{
            if(items.id_rec===id_rec){
                items.ubic=ubic;
            }
            return null;
        });
    }
    //recibe el estado de los checks cada vez que se pulsa sobre ellos
    handleChangeEstado(estado,id){
        const validado = estado.target.checked;
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
    groupBy(xs, key) {
      return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    }
    // abre el componente MyModal para ingresar observaciones
    openModal(e){
        //https://github.com/xue2han/react-dynamic-modal
         let text=e.target.id;
        // console.log(text);
         let id_re=e.target.name;
        let component = <MyModal text={text} id_rec={id_re} change={this.handleChangeObs} estado={true}/>;
        let  node = document.createElement('div');
        ReactDOM.render(component,node);
    }
    // envia un JSON al server
    handleEnviarData() {
        //console.log(this.state.JSON);
        const arreglo=this.verificar();
       // console.log(JSON.stringify(arreglo));
       // const url= 'https://api-modulocontrol.herokuapp.com/recaudaciones/id';
        const url = URL.url.concat('recaudaciones/id');
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
           // console.log(JSON.stringify(arreglo));
        //https://github.com/calambrenet/react-table/blob/master/src/react-table.jsx
    }
    eventoNombre(e)
    {

      let nom = e.target.innerHTML;
      let id= e.target.id;
      var groupList=[];
      var listadoOrdenado;
        //console.log(e.target.innerHTML);
        if(id===nom){
            listadoOrdenado = this.state.data.sort(function (a, b) {
                if (a.nombre > b.nombre) {
                    return 1;
                }
                if (a.nombre < b.nombre) {
                    return -1;
                }
                //iguales
                return 0;
            });
           // console.log(listadoOrdenado);
            groupList = this.groupBy(listadoOrdenado,"nombre");
        }else{
            listadoOrdenado = this.state.data.sort(function (a, b) {
                if (a.codigo > b.codigo) {
                    return 1;
                }
                if (a.codigo < b.codigo) {
                    return -1;
                }
                //iguales
                return 0;
            });
          //  console.log(listadoOrdenado);
            groupList = this.groupBy(listadoOrdenado,"codigo");
        }
        let component = <Modal2 text={groupList} nombre={nom} codigo={id} estado={true}/>;
        let  node = document.createElement('div');
        ReactDOM.render(component,node);
    }
    render() {

        const listado = this.state.data;
       // console.log(listado);

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
                            <th>Importe</th>
                            <th>Fecha</th>
                            <th>Ubicación</th>
                            <th>Verificar</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>{listado.map((dynamicData, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td onClick={(e)=>this.eventoNombre(e)} title="click para ver detalles" className="detalles" id={(dynamicData.codigo==="0")?(dynamicData.nombre):(dynamicData.codigo)}>{dynamicData.nombre}</td>
                                <td>{dynamicData.concepto}</td>
                                <td>{dynamicData.codigo}</td>
                                <td>{dynamicData.numero}</td>
                                <td>{dynamicData.importe}</td>
                                <td>{dynamicData.fecha}</td>
                                <td><Combo items={this.state.ubicDato} val={this.handleChangeUbic} ubic={dynamicData.ubic}
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

export default ListarComponentes;
