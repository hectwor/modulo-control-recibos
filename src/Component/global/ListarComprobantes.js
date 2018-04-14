import React, { Component } from 'react';
import './css/DatosCSS.css';
import './css/bootstrap.css';

function Obj(id_rec,obs,flag){
    this.id_rec=id_rec;
    this.obs=flag+"-"+obs;
}
function  verificar(){
    const checks = document.querySelectorAll(".DatosCSS-input-checkbox");
    const obs=document.querySelectorAll(".observaciones");
    let tam= checks.length;
    let arreglo = new Array(0);
    let result;
    for (let i = 0; i < tam; i++) {
        if ( checks[i].checked ) {
           result = new Obj(checks[i].id,obs[i].value,true);
        }else{
            result = new Obj(checks[i].id,obs[i].value,false);
        }
        arreglo.push(result);
    }
    return arreglo;
   }
class ListarComponentes extends Component {
    constructor(){
        super();
        this.anterior="";
       this.handleEnviarData=this.handleEnviarData.bind(this);
       this.handleDesplegar=this.handleDesplegar.bind(this);
    }

    handleDesplegar(e) {
        if(this.anterior!==""){
            this.anterior.style.display = "none";
        }
        let area = document.getElementById(e.target.name+"textA");

        //console.log("area"+area);

        area.style.display=( area.style.display==="block")? "none":"block";
        this.anterior=area;
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
                                <th>Observaciones</th>
                                <th></th>
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
                                        <td><button onClick={this.handleDesplegar} name={dynamicData.id_rec}>+</button></td>
                                        <td><textarea id={dynamicData.id_rec+'textA'} className="observaciones"></textarea></td>
                                    </tr>
                                )}
                                </tbody>
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
