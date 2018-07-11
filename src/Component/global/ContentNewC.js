import React, {Component} from 'react';
import { Link } from "react-router-dom";
import Listardatos from './ListarComprobantesNewC';
import URL from './API/API';
import './css/Content.css';
import './css/bootstrap.css';
//import $ from "jquery";

class Content extends Component{


    constructor(){
        super();

        this.state = {
            lista:null,
            nombre_apellido:"",
            concepto:"",
            dni:"",
            recibo:"",
            dates:"",
            dates2:"",
            mensaje:"",
            estado: false,
            operacion:'',
            isLoading:false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSearchClick=this.handleSearchClick.bind(this);
        this.handleInputName=this.handleInputName.bind(this);
        this.handleInputConcepto=this.handleInputConcepto.bind(this);
        this.handleInputRecibo=this.handleInputRecibo.bind(this);
        this.handleInputDni=this.handleInputDni.bind(this);
        this.handleSearchKey=this.handleSearchKey.bind((this));
        this.handleKeyPress = this.handleKeyPress.bind((this));
        this.mostrarData=this.mostrarData.bind(this);
    }
    // leer del input Concepto
    handleInputConcepto(data){
        this.setState({
            concepto:data.target.value,
            mensaje:""
        });
    }
    mostrarData(){
        let contenedor="";
        if(this.state.estado){
            // console.log(this.state.lista);
            switch (this.state.operacion){
                case "V": contenedor=(<div className="alert alert-info">{this.state.mensaje}</div>);break;
                case true: contenedor=(<div><Listardatos listado={this.state.lista}/></div>);break;
                case false: contenedor=(<div className="alert alert-info">{this.state.mensaje}</div>);break;
                default: contenedor=(<div></div>);
            }
        }
        return contenedor;
    }

    //leer del input recibo
    handleInputRecibo(data){
        this.setState({
            recibo: data.target.value,
            mensaje:"",
            operacion:"c"
        });
    }
    //leer del input DNI
    handleInputDni(data){
        this.setState({
            dni: data.target.value,
            mensaje:"",
            operacion:"c"
        });
    }
    // funcion del calendario en date se almacena la fecha seleccionada
    handleChange(date) {
        this.setState({
            dates: date.target.value,
            mensaje:"",
            operacion:"c"
        });
        console.log(date.target.value);
        console.log(this.state.dates);
    }
    handleChange2(date) {
        this.setState({
            dates2: date.target.value,
            mensaje:"",
            operacion:"c"
        });
        //  console.log(this.state.dates2);
    }

    // ingresar texto
    handleInputName(e){
        if(e.target.id==="busca"){
            this.setState({
                nombre_apellido: e.target.value,
                mensaje:"",
                operacion:"c"
            });
        }
    }
    handleSearchKey(e){
        if(e.key==="enter"){
            this.handleSearchClick();
        }
    }
    //buscar
    handleSearchClick(e) {
       // let url = 'https://api-modulocontrol.herokuapp.com/recaudaciones/';
      //  url = url.concat('detallada/');
        let url = URL.url.concat('recaudaciones/detallada/');
        if(this.state.nombre_apellido === "" && this.state.concepto === ""&& this.state.recibo === "" &&
            this.state.dates2 === "" && this.state.dates === "" && this.state.dni === ""){
            this.setState({
                mensaje:"Casilleros vacios",
                estado:true,
                operacion:'V',
                lista:[],
                isLoading:false
            });
        }else{
            let arra = {
                "nombre": this.state.nombre_apellido,
                "periodoI": this.state.dates,
                "id_concepto": this.state.concepto,
                "periodoF": this.state.dates2,
                "voucher":this.state.recibo,
                "dni":this.state.dni
            };
            this.setState({
                isLoading:true,
                mensaje:"",
                operacion:"c"
            });
            fetch(url, {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(arra, null, 2)

            })
                .then((response) => {
                    return response.json()
                })
                .then(responseJson => {
                    this.setState({
                        lista: responseJson.data,
                        estado:true,
                        operacion: (responseJson.data!==null && responseJson.data.length!==0),
                        mensaje:(responseJson.data!==null && responseJson.data.length!==0)?(""):("Datos no encontrados"),
                        isLoading:false
                    });
                    //console.log( responseJson.data.length);
                });
        }
    }
    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.handleSearchClick();
        }
    };
    render(){
        return(
            <div className="content">
                <div className="container">
                    <div className="buscar">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Nombre o Apellido</span>
                            </div>
                            <input id="busca" type="text" className="form-control" value={this.state.nombre_apellido} onChange={this.handleInputName} placeholder="nombre o apellido" aria-label="Username" aria-describedby="basic-addon1"
                                   onKeyPress={this.handleKeyPress} />

                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">DNI o Codigo</span>
                            </div>
                            <input id="dni" type="text" className="form-control" value={this.state.dni} onChange={this.handleInputDni} placeholder="codigo" aria-label="Username" aria-describedby="basic-addon1"
                                   onKeyPress={this.handleKeyPress} />
                        </div>

                    </div>
                    <div className="Botones">
                        <div className="Buton-contenedor">
                            <button id="Buscar" onClick={this.handleSearchClick} className="btn btn-outline-success">Buscar</button>
                            <Link to="/" className="btn btn-outline-success">Regresar </Link>
                        </div>
                    </div>
                </div>

                <div className={(this.state.isLoading)?("isLoading"):("listar")}>
                    {this.mostrarData()}
                </div>

            </div>

        );
    }
}

export default Content;
