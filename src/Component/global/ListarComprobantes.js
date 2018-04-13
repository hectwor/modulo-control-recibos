import React, { Component } from 'react';
import './css/DatosCSS.css';
import './css/bootstrap.css';


function  verificar(){
    const checks = document.querySelectorAll(".DatosCSS-input-checkbox");
    let tam= checks.length;
    let cadena="";
    for (let i = 0; i < tam; i++) {
        if (checks[i].checked) {
            cadena = cadena.concat(checks[i].id+",");
        }
    }
    cadena = cadena.substring(0,cadena.length-1);
    return cadena
}
class ListarComponentes extends Component {


    constructor(){
        super();

       this.handleEnviarData=this.handleEnviarData.bind(this);
    }

    handleEnviarData() {
        const url= 'https://api-modulocontrol.herokuapp.com/recaudaciones/id';
        let cadena = verificar();
        fetch(url,{

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"id_rec":cadena})
                    })
            .then(res => res.json())
            .then(res => {
                if (res.status) { // exito
                    alert('Cargó los datos ');
                }
            })
            .catch(error => error);
    }
    render() {
    	const {listado} = this.props;

    	if(listado===null){
    	    return (
                <div></div>
            );
        }else if (listado.length===0){
            return (
                <div className="alert alert-info"> Datos no encontrados</div>
            );
        } else {
            return (
                <div className="boton">
                    <div className="DatosCSS">
                        <table className="tabla">
                            <thead>
                            <tr className="tabla-cabecera">
                                <th>Nro</th>
                                <th>Nombre Apellido</th>
                                <th>Concepto</th>
                                <th>Codigo</th>
                                <th>Recibo</th>
                                <th>Verificar</th>
                            </tr>
                            </thead>
                        </table>
                        <div className="table-scroll">
                            <table className="tabla">
                                <tbody>{listado.map((dynamicData,i) =>
                                    <tr key={i} >
                                        <td>{i}</td>
                                        <td>{dynamicData.nombre}</td>
                                        <td>{dynamicData.concepto}</td>
                                        <td>{dynamicData.codigo}</td>
                                        <td>{dynamicData.numero_voucher}</td>

                                        <td>
                                            {

                                                dynamicData.flag_pago ? (
                                                    <input id={dynamicData.id_rec} type="checkbox" className="DatosCSS-input-checkbox" defaultChecked disabled />
                                                ):(
                                                    <input id={dynamicData.id_rec} type="checkbox" className="DatosCSS-input-checkbox"/>
                                                )
                                            }

                                        </td>
                                    </tr>
                                )
                                }</tbody>
                            </table>
                        </div>
                    </div>
                    <button id="Enviar" onClick={this.handleEnviarData} className="btn btn-danger">Enviar</button>
                </div>
            );
        }

    }
}

export default ListarComponentes;
