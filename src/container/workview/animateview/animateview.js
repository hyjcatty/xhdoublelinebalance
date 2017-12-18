/**
 * Created by hyj on 2017/3/10.
 */

import React, {
    Component,
    PropTypes
} from 'react';

import classNames from 'classnames';
import '../../../../resource/css/font-awesome.min.css';
import Label1 from "../billboardview/billlabel/label1.js"
import Labelbig from "../billboardview/billlabel/labelbig.js"
import Chamber from "./chambermodule/chambermodule.js"
import Process from "./processmodule/processmodule.js"



export default class animateview extends Component {
    constructor(props) {
        super(props);

        this.colorlist={
            RED:"#880000",
            ORANGE:"#bb5500",
            BLUE:"#000088",
            GREEN:"#227700",
            GRAY:"#878787",
            PURPLE:"#4b0082",
            LBLUE:"#003377",
            LGREEN:"#008800",
            LGRAY:"#696969",
            DBLUE:"#191970"
        };

        this.state={
            height:700,
            width:600,
            configuration:null,
            hide:"block",
            language:{}
        };


    }
    update_configuration(configuration){
        this.setState({configuration:configuration});
    }
    update_language(language){
        //console.log(language);
        this.setState({language:language});
    }
    update_size(width,height){
        this.setState({height:height,width:width});
        for(let i=1;i<33;i++){
            this.refs["Chamber2x"+i].update_reverse(true);
        }
        this.refs.Process1.update_size(width*0.98,70);
        this.refs.Process2.update_size(width*0.98,70);
        this.refs.Process1.initialize("1");
        this.refs.Process2.initialize("2");
        for(let i=1;i<33;i++){
            this.refs["Chamber1x"+i].update_id("1x"+i);
            this.refs["Chamber2x"+i].update_id("2x"+i);
        }
    }
    update_statistics(data){
        this.refs.Labelbigboard1.updateprop(data.biglabel1.status);
        this.refs.Labelbigboard1.initialize(data.biglabel1.title,data.biglabel1.note);
        this.refs.Labelbigboard2.updateprop(data.biglabel2.status);
        this.refs.Labelbigboard2.initialize(data.biglabel2.title,data.biglabel2.note);
        for(let i=1;i<13;i++){
            this.refs['Label'+i].updateprop(this.colorlist[data.labellist[i-1].color],data.labellist[i-1].value);
            this.refs['Label'+i].initialize(data.labellist[i-1].title,data.labellist[i-1].note);
        }
    }
    clearbillboard(){
    }
    initialize_chamber(data){
        for(let i=0;i<data.array1.length;i++){
            if(data.array1[i].id >0 && data.array1[i].id<33){
                //console.log(data.array1[i]);
                this.update_chamber(data.array1[i]);
            }
        }

        for(let i=0;i<data.array2.length;i++){
            if(data.array2[i].id >0 && data.array2[i].id<33){
                //console.log(data.array1[i]);
                this.update_chamber(data.array2[i]);
            }
        }
    }
    update_chamber(data){
        this.refs["Chamber"+data.process+"x"+data.id].update_status(data);
    }
    update_package(data){
        this.refs["Process"+data.process].throwbox(data.target);
    }

    hide(){
        this.setState({hide:"none"});
    }
    show(){
        this.setState({hide:"block"});
    }
    render() {
        let chamberlist1=[];
        for(let i=1;i<33;i++){
            chamberlist1.push(
                <div style={{width:this.state.width*0.03,float: "left",position:"relative"}} key={"Chamber1x"+i}>
                    <Chamber ref={"Chamber1x"+i} />
                </div>
            );
        }
        let chamberlist2=[];
        for(let i=1;i<33;i++){
            chamberlist2.push(
                <div style={{width:this.state.width*0.03,float: "left",position:"relative"}}  key={"Chamber2x"+i}>
                <Chamber ref={"Chamber2x"+i} /></div>);
        }
        let labellist=[];
        for(let i=1;i<13;i++){
            labellist.push(
                <div key = {"Label"+i}  style={{width:"24%",float: "left",position:"relative",marginLeft:this.state.width*0.005}}>
                    <Label1 ref={"Label"+i}/>
                </div>);
        }
        let temp=[];
        for(let i=0;i<32;i++){
            if(i==0){

                temp.push(
                    <p className="pull-right" key={"showtag"+i} style={{width:36.05,fontSize:24,fontColor:"#555555",fontWeight:700,textAlign:"center",marginRight:"-5px",marginBottom:"0px",marginTop:"-18px"}}>{32-i}</p>
                )
            }else{

                temp.push(
                    <p className="pull-right" key={"showtag"+i} style={{width:36.05,fontSize:24,fontColor:"#555555",fontWeight:700,textAlign:"center",marginBottom:"0px",marginTop:"-18px"}}>{32-i}</p>
                )
            }
        }
        return (
            <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflowY:'hidden',overflowX:'hidden'}}>
                <div style={{position:"absolute",  left:"15px",top:"7px"}}>

                    <img src="./resource/image/box.svg"  style={{height:16,width:16}}></img><br/>
                    <img src="./resource/image/grab.svg"  style={{height:16,width:16}}></img><br/>
                    <img src="./resource/image/orga.svg"  style={{height:16,width:16}}></img><br/>
                </div>
                <div style={{position:"absolute",  left:"15px",top:"291px"}}>
                    <img src="./resource/image/orga.svg"  style={{height:16,width:16}}></img><br/>
                    <img src="./resource/image/grab.svg"  style={{height:16,width:16}}></img><br/>
                    <img src="./resource/image/box.svg"  style={{height:16,width:16}}></img><br/>
                </div>
                <div key = "leftpanel" style={{width:this.state.width*0.98,height:this.state.height,float: "left",position:"relative",marginLeft:this.state.width*0.01}}>
                    <div style={{marginLeft:this.state.width*0.02,width:this.state.width*0.98,float: "left",position:"relative"}}>
                        {chamberlist1}
                    </div>
                    <div style={{width:this.state.width*0.98,float: "left",position:"relative",zIndex:0}}>
                        <Process ref={"Process1"}/>
                    </div>
                    <div  style={{marginTop:0,marginBottom:0,display: "block",width:"100%",height:70,zIndex:99}}>

                        {temp}
                    </div>
                    <div style={{width:this.state.width*0.98,float: "left",position:"relative",marginTop:"-16px",zIndex:0}}>
                        <Process ref={"Process2"}/>
                    </div>
                    <div style={{marginLeft:this.state.width*0.02,width:this.state.width*0.98,float: "left",position:"relative"}}>
                        {chamberlist2}
                    </div>
                    <div style={{width:this.state.width*0.22,float: "left",position:"relative",paddingTop: "5px"}}>
                        <Labelbig ref="Labelbigboard1"/>
                    </div>
                    <div style={{width:this.state.width*0.22,float: "left",position:"relative",paddingTop: "5px",marginLeft:this.state.width*0.005}}>
                        <Labelbig ref="Labelbigboard2"/>
                    </div>
                    <div style={{width:this.state.width*0.53,float: "left",position:"relative"}}>
                        {labellist}
                    </div>
                </div>
            </div>
        );

    }
}