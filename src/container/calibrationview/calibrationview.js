/**
 * Created by hyj on 2017/5/15.
 */
import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
import '../../../resource/css/font-awesome.min.css';
import './calibrationview.css';
import CaliUnit from './calibrationunit/calibrationunit.js';
import DynamicUnit from './dynamiccalibrationunit/dynamiccalibrationunit.js';


export default class calibrationview extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            footheight:100,
            hide:"block",
            key:"calibrationbutton",
            key2:"calibrationlight",
            disabled:"",
            running:false,
            language:{
                buttontitlestart:"Zero Calibration",
                buttontitlestop:"Full Calibration",
                titlestatic:"Static Calibration",
                titledynamic:"Dynamic Calibration"
            }
        }
        //this.keyboard_initialize();
    }
    update_language(language){
        this.setState({language:language});
        for(let i=0;i<2;i++){
            this.refs['Light'+(i+1)].updatelanguage(language.calibrationunit);
        }
        for(let i=0;i<2;i++){
            this.refs['dynamic'+(i+1)].updatelanguage(language.dynamiccalibrationunit);
        }
    }
    update_size(width,height,footheight){
        this.setState({height:height,width:width,footheight:footheight});
        this.refs['Light1'].initialize("left",width,footheight);
        this.refs['Light2'].initialize("left",width,footheight);
        /*
        for(let i=1;i<9;i++){
            this.refs['Light'+(2*i-1)].initialize("left",width,footheight);
            this.refs['Light'+(2*i)].initialize("right",width,footheight);
        }*/

    }
    update_callback(callbackzero,callbackcountweight){
        for(let i=0;i<2;i++){
            this.refs['Light'+(i+1)].updatecallback(callbackzero,callbackcountweight);
        }
    }
    update_balance_status(balanceNo,status,weight){
        this.refs['Light'+(parseInt(balanceNo))].setstatus(status,weight);
    }
    update_dynamic_status(status){
            this.refs['dynamic'+(parseInt(status.balance))].update_status(status);
    }
    hide(){
        this.setState({hide:"none"});
    }
    show(){
        this.setState({hide:"block"});
        for(let i=0;i<2;i++){
            this.refs['Light'+(i+1)].updatebalance(i+1);
        }
    }
    dynamic_action(){
        if(this.state.running){
            this.props.calistopcase();
            this.setState({running:false});
            this.lockall(false);
            this.props.workcontrolhead(true);
            this.props.workcontrolfoot(false,true,false);
        }else{

            this.props.calistartcase();
            this.setState({running:true});
            this.lockall(true);
            this.props.workcontrolhead(false);
            this.props.workcontrolfoot(false,false,false);
        }
    }
    lockall(bool){
        for(let i=0;i<1;i++){
            this.refs['Light'+(i+1)].lockall(bool);
        }
    }
    lockbutton(){
        this.setState({disabled:"disabled"});
    }
    releasebutton(){
        this.setState({disabled:""})
    }
    render() {

        let unitlist = [];
        for (let i = 1; i < 3; i++) {
            let key = "Light" + i;
            unitlist.push(<div key={key}>
                <CaliUnit ref={key}/>
            </div>);
        }
        let dynamiclist = [];
        for (let j = 1; j < 3; j++) {
            let key = "dynamic" + j;
            dynamiclist.push(
            <div key={key} className="col-xs-6 col-md-6 col-sm-6 col-lg-6">
                <DynamicUnit ref={key}/>
            </div>);
        }

        let title_info = this.state.language.buttontitlestart;
        if(this.state.running) title_info= this.state.language.buttontitlestop;
        return (
            <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflow:'scroll',overflowX:'hidden'}}>
                <div className="container">
                    <div className="col-xs-4 col-md-4 col-sm-4 col-lg-4">
                        <div className="tile-stats"  style={{marginTop:"15px"}}>
                            <div key="statuspanel" className="count" style={{fontSize:24}}>{this.state.language.titlestatic}</div>
                            <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12" >
                                <div key="rightpanel"
                                     style={{width:"90%",height:550,float: "left",position:"relative",marginLeft:"5%"}}>

                                    <div key="Lightboard"
                                         style={{width:"100%",float: "left",position:"relative"}}>
                                        {unitlist}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-8 col-md-8 col-sm-8 col-lg-8">
                        <div className="tile-stats"  style={{marginTop:"15px",minHeight:"596.5px"}}>
                            <div key="statuspanel" className="count" style={{fontSize:24}}>{this.state.language.titledynamic}</div>
                            <div style={{width:"100%",height:550,float: "left",position:"relative"}}>
                                <div key="rightpanel" className="col-xs-12 col-md-12 col-sm-12 col-lg-12">
                                    <button type="button" id="calibration_start" data-loading-text="Loading..." className="btn btn-primary" autoComplete="off" style={{minWidth: "150px",color:"#ffffff",fontWeight:700,background:"#000000",marginLeft:20}} disabled={this.state.disabled} onClick={this.dynamic_action.bind(this)} >
                                        {title_info}
                                    </button>
                                </div>
                                {dynamiclist}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}