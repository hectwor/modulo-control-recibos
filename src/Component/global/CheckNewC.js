import React,{Component} from 'react';


class Check extends Component{



    render(){
        const {validado,id}=this.props;
        return (
            (validado) ? (<input id={id} type="checkbox" className="DatosCSS-input-checkbox" disabled={this.props.disabled}  onClick={(e)=>{this.props.change(e,id)}}/>)
                       : ( <input id={id} type="checkbox" className="DatosCSS-input-checkbox" disabled={this.props.disabled} onClick={(e)=>{this.props.change(e,id)}}/> )

        );
}


}
export default Check;
