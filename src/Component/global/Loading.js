import React,{Component} from 'react';
import './css/bootstrap.css';
import './css/Loading.css';

const Loading = () => (
        <div className="modal" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false" role="dialog">
            <div className="modal-header">
                <h1>Processing...</h1>
            </div>
            <div className="modal-body">
                <div className="progress">
                    <div className="progress-bar progress-bar-success progress-bar-striped active" role="progressbar"
                    aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width:100, height: 40}}>
                </div>
            </div>
                <div className="progress progress-striped active">
                    <div className="bar"></div>
                </div>
            </div>
        </div>
);
export default Loading;