/**
 * Created by hyj on 2017/3/10.
 */
import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
import '../../../resource/css/font-awesome.min.css';
import Buttonbar from "./buttonbar/buttonbar"
import Alarmbar from "./alarmbar/alarmbar"
//import Billboardview from "./billboardview/billboardview"
import Billboardview from "./animateview/animateview"
//import Configurationview from "./configurationview/configurationview"
import Configurationview from "./dlconfigurationview/dlconfigurationview"
import './workview.css';



export default class workview extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            leftwidth:150,
            configuration:null,
            rightwidth:450,
            hide:"block",
            iconlist:[],
            status:"run",
            brickviewcallback:null,
            alarmremovecallback:null,
            callbackTozero:null,
            callbackDelete:null
        }
        this._buttonclick=this.buttonclick.bind(this);
        this._buttonremoveclick=this.buttonremoveclick.bind(this);

    }
    update_language(language){
        this.refs.Buttonbar.update_language(language.buttonbar);
        this.refs.Alarmbar.update_language(language.alarmbar);
        this.refs.Configurationview.update_language(language.configurationview);
        this.refs.Billboardview.update_language(language.billboardview);
    }
    updateline(lines){
        this.refs.Configurationview.updateline(lines);
    }
    update_size(width,height){
        this.setState({height:height,width:width,leftwidth:width*0.12,rightwidth:(width-width*0.12)},this.update_subsize);
    }
    update_subsize(){
        this.refs.Buttonbar.update_size(this.state.leftwidth,this.state.height);
        this.refs.Alarmbar.update_size(this.state.leftwidth,this.state.height);
        this.refs.Billboardview.update_size(this.state.rightwidth,this.state.height);
        this.refs.Configurationview.update_size(this.state.rightwidth,this.state.height);
    }
    update_configuration(iconlist,drag){
        this.setState({iconlist:iconlist});
        this.refs.Configurationview.update_iconlist(iconlist);
        this.refs.Configurationview.update_drag(drag);
        //this.refs.Buttonbar.update_callbacklist([null,this.billboardview()],[null,this.configurationview()]);
    }
    update_callback(back2brickviewcallback,back2alarmremovecallback){
        this.setState({brickviewcallback:back2brickviewcallback,alarmremovecallback:back2alarmremovecallback});
    }
    /*
    update_billboard_status(status){
        this.refs.Billboardview.update_status(status);
    }
    update_billboard_light(light){
        this.refs.Billboardview.update_light(light);
    }*/

    update_animateview_chamber(data){
        this.refs.Billboardview.update_chamber(data);
    }
    update_animateview_package(data){
        this.refs.Billboardview.update_package(data);
    }
    update_animateview_statistics(data){
        this.refs.Billboardview.update_statistics(data);
    }
    flash_animateview_statistics(data){
        this.refs.Billboardview.clearbillboard(data);
    }
    initialize_animateview_chamber(data){
        this.refs.Billboardview.initialize_chamber(data);
    }


    hide(){
        this.setState({hide:"none"});
    }
    show(){
        this.setState({hide:"block"});
    }
    get_active_configuration(){
        return this.state.configuration;
    }
    modview(configuration){
        this.props.workcontrolhead(true);
        this.props.workcontrolfoot(false,true,false);
        this.setState({configuration:configuration,status:"mod"});
        this.refs.Configurationview.modify_view(configuration);
        this.refs.Billboardview.hide();
        this.refs.Buttonbar.modify_configure();
        this.refs.Buttonbar.show();
        this.refs.Alarmbar.hide();
        this.show();
    }
    runview(configuration){
        this.props.workcontrolhead(true);
        this.props.workcontrolfoot(false,true,false);
        if(configuration!==null){
            this.setState({configuration:configuration,status:"run"});
            this.refs.Billboardview.update_configuration(configuration);
            //this.refs.Billboardview.clearbillboard();
        }else{
            this.setState({status:"run"});
        }
        this.refs.Configurationview.hide();
        this.refs.Billboardview.show();
        this.refs.Buttonbar.run_configure();
        this.refs.Buttonbar.show();
        this.refs.Alarmbar.hide();
        this.show();
    }
    newview(configuration){
        this.props.workcontrolhead(true);
        this.props.workcontrolfoot(false,true,false);
        this.setState({configuration:configuration,status:"new"});
        let configuration_local = configuration;
        configuration_local.name="";
        this.refs.Configurationview.new_view(configuration_local);
        this.refs.Billboardview.hide();
        this.refs.Buttonbar.new_configure();
        this.refs.Buttonbar.show();
        this.refs.Alarmbar.hide();
        this.show();
    }
    runningview(configuration){
        this.props.workcontrolhead(false);
        this.props.workcontrolfoot(false,false,false);
        if(configuration!==null){
            this.setState({configuration:configuration,status:"running"});
            this.refs.Billboardview.update_configuration(configuration);
        }else{
            this.setState({status:"running"});
        }
        this.refs.Configurationview.hide();
        this.refs.Billboardview.show();
        this.refs.Buttonbar.running_configure();
        this.refs.Buttonbar.show();
        this.refs.Alarmbar.hide();
        this.show();
    }
    pauseview(configuration){
        this.props.workcontrolhead(false);
        this.props.workcontrolfoot(false,false,false);
        this.setState({status:"pause"});
        this.refs.Configurationview.hide();
        this.refs.Billboardview.show();
        this.refs.Buttonbar.pause_configure();
        this.refs.Buttonbar.show();
        this.refs.Alarmbar.hide();
        this.show();
    }
    showalarm(alarm){
        this.refs.Alarmbar.setError(alarm);
        this.refs.Buttonbar.hide();
        this.refs.Alarmbar.show();
    }
    hidealarm(){
        this.refs.Buttonbar.show();
        this.refs.Alarmbar.hide();
    }
    back2brickview(){
        this.state.brickviewcallback();
    }
    buttonclick(i){
        if(this.state.status == "run"){
            switch(i){
                case 0:
                    this.props.workstartcase(this.state.configuration);
                    return;
                case 1:
                    this.modview(this.state.configuration);
                    return;
                case 2:
                    this.state.callbackDelete();
                    return;
                case 3:
                    //this.state.callbackTozero();
                    return;
                default:

            }
        }else if(this.state.status == "running"){
           // this.props.workstopcase(this.state.configuration);
            switch(i){
                case 0:
                    this.props.workpausecase(this.state.configuration);
                    return;
                case 1:
                    this.props.workstopcase(this.state.configuration);
                    return;
                default:

            }
        }else if(this.state.status == "pause"){
            // this.props.workstopcase(this.state.configuration);
            switch(i){
                case 0:
                    this.props.workresumecase(this.state.configuration);
                    return;
                case 1:
                    this.props.workstopcase(this.state.configuration);
                    return;
                default:

            }
        }else if(this.state.status == "new"){
            switch(i){
                case 0:
                    this.props.worksavenewcase(this.refs.Configurationview.getUpdatedValue());
                    return;
                case 1:
                    this.back2brickview();
                    return;
                default:

            }
        }else{
            switch(i){
                case 0:
                    this.props.worksavemodcase(this.refs.Configurationview.getUpdatedValue());
                    return;
                case 1:
                    this.runview(this.state.configuration);
                    return;
                default:

            }
        }
    }
    update_callback_tozero(callback){
        this.setState({callbackTozero:callback})
    }
    update_callback_delete(callback){
        this.setState({callbackDelete:callback})
    }
    handle_click_to_zero(){
        //console.log("click");
        this.state.callbackTozero();
    }
    handle_click_delete(){
        this.state.callbackDelete();

    }
/*
    button2click(){
        if(this.state.status == "run"){
            this.modview(this.state.configuration);
        }else if(this.state.status == "running"){
            alert("click stop button!");
        }else if(this.state.status == "new"){
            this.back2brickview();
        }else{
            this.runview(this.state.configuration);
        }
    }*/
    buttonremoveclick(){
        this.state.alarmremovecallback();
    }
    render() {
        return (
            <div style={{position:"relative",background:"#DDDDDD",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflowY:'hidden',overflowX:'hidden'}}>
                <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:this.state.leftwidth,float: "left"}}>
                    <Alarmbar ref="Alarmbar" buttonclick={this._buttonremoveclick}/>
                    <Buttonbar ref="Buttonbar" buttonclick={this._buttonclick} />
                </div>
                <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:this.state.rightwidth,float: "left"}}>
                    <Billboardview ref="Billboardview"/>
                    <Configurationview ref="Configurationview"/>
                </div>
            </div>
        );
    }
}