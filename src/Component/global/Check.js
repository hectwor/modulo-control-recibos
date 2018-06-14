import React,{Component} from 'react';


class Check extends Component{



    render(){
        const {validado,id}=this.props;
      //  console.log(this.props.disabled);
        return (
            (validado) ? (<input id={id} type="checkbox" className="DatosCSS-input-checkbox"  defaultChecked disabled={validado} onClick={(e)=>{this.props.change(e,id)}}/>)
                       : ( <input id={id} type="checkbox" className="DatosCSS-input-checkbox"  disabled={validado} onClick={(e)=>{this.props.change(e,id)}}/> )
        );
}


}
export default Check;
