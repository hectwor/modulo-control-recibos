import React,{Component} from 'react';
import {Modal,ModalManager,Effect} from 'react-dynamic-modal';
import './css/DatosCSS.css';
import  URL from './API/API';
import './css/bootstrap.css';
import './css/NewC.css';
import './css/ListarComprobanteNewC.css';
class MyModal extends Component{
    constructor(){
        super();
        this.handlerGuardar=this.handlerGuardar.bind(this);
        // this.texto=React.createRef();
    }
      componentWillMount(){
        let data;
        const url = URL.url.concat('conceptos');
       // const url= 'https://api-modulocontrol.herokuapp.com/conceptos';
        fetch(url,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
            //body: JSON.stringify(data)
                    })
            .then(res => res.json())
            .then(res => {
                if (res.status) { // exito
                  //  console.log(res);
                    data=res;
                    //console.log(data);
                    // Llenar select de conceptos
                    var x = document.getElementById("concepto");
                    for (var i = 0; i < data["data"].length; i++) {
                      var miOption=document.createElement("option");
                      miOption.text = data["data"][i]["concepto"];
                      miOption.setAttribute("value",data["data"][i]["id_concepto"]);
                      x.add(miOption);
                    }
                }else{
                alert("Fallo al cargar datos, Intentelo mas tarde")
              }
          });
    }
    handlerGuardar(){
        if(document.getElementById("verificar").value === "true"){
          var verif=true;
        }else{
           verif=false
        }
        var data = {};
        data.id_alum=this.props.id;
        data.id_concepto =document.getElementById("concepto").value;
        data.id_ubicacion =document.getElementById("ubicacion").value;
        data.codigo =document.getElementById("codigo").value;
        data.numero =document.getElementById("recibo").value;
        data.importe =document.getElementById("importe").value;
        data.observacion =document.getElementById("obs").value;
        data.fecha =document.getElementById("fecha").value;
        data.validado =verif;
        data.tipo =document.getElementById("tipo").value;
        ModalManager.close();
        console.log(JSON.stringify(data));
        const url = URL.url.concat('recaudaciones/new');
        //const url= 'https://api-modulocontrol.herokuapp.com/recaudaciones/new';
        fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
                    })
            .then(res => res.json())
            .then(res => {
                if (res.status) { // exito
                    alert('Datos creados exitosamente');
                    ModalManager.close();
                    alert("actualizar aqui");
                }else{
                  alert("FALLÓ OPERACIÓN, ESPERE UN MOMENTO Y VUELVA A INTENTARLO ")
                }
            });
    }


    render(){
        let nombre = this.props.nombre;
        let codigo = this.props.codigo;
        return (
            <Modal
                effect={Effect.SlideFromBottom}>
        <div className="container" id="advanced-search-form">

         <form>
             <div className="form-group">
                 <label >Nombres y Apellidos</label>
                 <input type="text" className="form-control" placeholder="Nombres" id="nombre" value={nombre} disabled required/>
             </div>
             <div className="form-group">
                 <label >Concepto de Pago</label>
                 <select required id ="concepto" className="form-control"/>
             </div>
             <div className="form-group">
                 <label >Código</label>
                 <input type="number" className="form-control" placeholder="Código" id="codigo" value={codigo} disabled required/>
             </div>
             <div className="form-group">
                 <label>Recibo</label>
                 <input type="number" min="0" className="form-control" placeholder="Recibo" id="recibo" required/>
             </div>
             <div className="form-group">
                 <label>Importe</label>
                 <input type="number" min="0" className="form-control" placeholder="Importe" id="importe" required/>
             </div>
             <div className="form-group">
                 <label >Fecha</label>
                 <input type="date" id="fecha" className="form-control" required/>
             </div>
             <div className="form-group">
                 <label >Ubicación</label>
                 <select required id ="ubicacion" className="form-control" >
                   <option value="" >Seleccione Ubicación</option>
                   <option value="1" >Físico</option>
                   <option value="2" >Copia</option>
                   <option value="3" >No Disponible</option>
                 </select>
             </div>
             <div className="form-group">
                 <label >Tipo</label>
                 <select required id ="tipo" className="form-control" >
                   <option value="" >Seleccione Tipo</option>
                   <option value="1" >Banco</option>
                   <option value="2" >Manual</option>
                 </select>
             </div>
             <div className="form-group">
                 <label >Verificar</label>
                 <select required id ="verificar" className="form-control" >
                   <option value="true" >Validado</option>
                   <option value="false" >No Validado</option>
                 </select>
             </div>
             <div className="form-group">
                 <label >Observaciones</label>
                 <textarea rows="2" cols="30" id="obs">
                 </textarea>
             </div>
             <button type = "button" className = "btn btn-secondary" data-dismiss = "modal" onClick = {ModalManager.close}>Cerrar</button>
             <button type = "button" className = "btn btn-primary" onClick = {this.handlerGuardar}>ENVIAR</button>
         </form>
        </div>
        <script>
          window.onload=llenarConceptos;
        </script>
            </Modal>
        );
    }

}
export default MyModal;
