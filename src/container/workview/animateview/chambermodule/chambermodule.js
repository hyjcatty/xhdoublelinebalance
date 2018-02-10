/**
 * Created by Huang Yuanjie on 2017/10/7.
 */

import React, {
    Component,
    PropTypes
} from 'react';

import classNames from 'classnames';



export default class chambermodule extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:70,
            width:30,
            reverse:false,
            hide:"block",
            configuration:null,
            bricksize:100,
            marginsize:5,
            margintop:5,
            status:true,
            error:false,
            volume:0,
            reject:0,
            box:0,
            id:0,
            process:"0",

        }
    }
    update_reverse(reverse){
        this.setState({reverse:reverse});
    }
    update_id(id){
        this.setState({id:id});
    }
    update_status(chamberstatus){
        //console.log(chamberstatus);
        //buffer:0,//volume:0,
            //group:0,//reject:0,
            //basket:0,//box:0,
        if(chamberstatus.status !=this.state.status){
            //console.log("status change!");
            this.setState({status:chamberstatus.status,error:false,volume:0,reject:0,box:0,process:chamberstatus.chamberprocess});
            this.chamberremoveerror();
            return;
        }else if(this.state.status == false){
            return;
        }else{
           if (chamberstatus.error == true){
               //console.log("get error!");
               this.setState({error:true,volume:chamberstatus.buffer,reject:chamberstatus.group,process:chamberstatus.chamberprocess,box:chamberstatus.basket},this.chambererror);
               return;
           }else{
               this.setState({error:false,volume:chamberstatus.buffer,reject:chamberstatus.group,process:chamberstatus.chamberprocess,box:chamberstatus.basket});
               this.chamberremoveerror();
               if(chamberstatus.package == true){
                   this.chamberclean();
               }else if(chamberstatus.fillin == true){
                   this.chamberfill();
               }
           }
        }

    }
    chambererror(){
        $('#animationpackage'+this.state.id).attr("display","block");
        //$('#changetopackage').removeClass().addClass("fa fa-archive");
        $('#animationpackage'+this.state.id).removeClass().addClass('pulse animated infinite pull-right');
        $('#changetopackage'+this.state.id).removeClass().addClass("fa fa-inbox");
    }
    chamberremoveerror(){
        $('#animationpackage'+this.state.id).removeClass().addClass("pull-right");
        $('#changetopackage'+this.state.id).removeClass().addClass("fa fa-inbox");
    }
    chamberclean(){
        $('#animationpackage'+this.state.id).attr("display","block");
        $('#changetopackage'+this.state.id).removeClass().addClass("fa fa-archive");
        $('#animationpackage'+this.state.id).removeClass().addClass('fadeOutUp animated pull-right').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass().addClass("pull-right");
            $(this).attr("display","block");
            let name = $(this).attr("id").replace(/animationpackage/, "changetopackage");
            $('#'+name).removeClass().addClass("fa fa-inbox");
        });
    }
    chamberfill(){
        $('#animationSandbox'+this.state.id).attr("display","block");
        $('#animationSandbox'+this.state.id).removeClass().addClass('fadeOutDown animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
            $(this).attr("display","block");
        });
    }
    render() {
        let temp;
        if(this.state.volume == 100 || this.state.error ){
            temp=<span id={"animationpackage"+this.state.id} className="pull-right" >
                    <a >
                        <i className = "fa fa-inbox" id={"changetopackage"+this.state.id} style={{fontSize: "30px",marginTop: "-10px", color:"#CC0000"}}/>
                    </a>
                </span>;
        }else{
            if(this.state.status){

                temp=<span id={"animationpackage"+this.state.id}   className="pull-right">
                    <a >
                        <i className = "fa fa-inbox" id={"changetopackage"+this.state.id}  style={{fontSize:"30px",marginTop: "-10px"}}/>
                    </a>
                </span>;
            }else{
                temp=<span id={"animationpackage"+this.state.id}   className="pull-right">
                    <a >
                        <i className = "fa fa-inbox" id={"changetopackage"+this.state.id}  style={{fontSize:"30px",marginTop: "-10px", color:"#DDDDDD"}}/>
                    </a>
                </span>;
            }
        }
        let box=
            <div style={{position:"relative",width:"100%"}}>
        <span className="pull-right" style={{width:"100%",textAlign:"center"}}>
                <p style={{fontSize:"12px",color:"#000000",textAlign:"center",width:"100%",borderBottom:"1px solid #dddddd",marginBottom:0}}>
                    {this.state.box}
                </p>
		</span></div>;
        let volume=
        <div style={{position:"relative",width:"100%"}}>
        <span className="pull-right" style={{width:"100%",textAlign:"center"}}>
                <p style={{fontSize:"12px",color:"#000000",textAlign:"center",width:"100%",borderBottom:"1px solid #dddddd",marginBottom:0}}>
                    {this.state.volume}
                </p>
		</span></div>;
        let reject = <div style={{position:"relative",width:"100%"}}>
        <span  className="pull-right" style={{width:"100%",textAlign:"center"}}>
                <p style={{fontSize:"16px", color:"#000000",textAlign:"center",width:"100%",borderBottom:"1px solid #dddddd",marginBottom:0}}>
                    {this.state.reject}
                </p>
        </span></div>;
        let maininfo = <span id={"animationSandbox"+this.state.id} key={this.state.id} style={{display: "block",opacity: 0}} className="pull-right">
                    <a  style={{marginLeft:"17px"}}>
                        <i className = "fa fa-gift" style={{fontSize:"15px"}}/>
                    </a>
                </span>;

        if(this.state.reverse){
            return (
                <div style={{position:"relative",width:"auto"}}>
                    <div style={{position:"relative",width:"auto"}}>
                    {maininfo}
                    {temp}
                    </div>
                    <div className="clearfix"></div>
                    <div style={{position:"relative",marginBottom:"10px",marginLeft:"10px",width:"auto",backgroundImage:"url('./resource/image/process"+this.state.process+".png')",backgroundRepeat:"no-repeat",backgroundSize:"100% 100%"}}>
                        {reject}
                        <div className="clearfix"></div>
                        {volume}
                        <div className="clearfix"></div>
                        {box}
                        <div className="clearfix"></div>
                    </div>
                </div>
            );
        }else{
            return (
                <div style={{position:"relative",width:"auto"}}>
                    <div style={{position:"relative",marginTop:"10px",marginLeft:"10px",width:"auto",backgroundImage:"url('./resource/image/process"+this.state.process+".png')",backgroundRepeat:"no-repeat",backgroundSize:"100% 100%"}}>
                        {box}
                        <div className="clearfix"></div>
                        {volume}
                        <div className="clearfix"></div>
                        {reject}
                        <div className="clearfix"></div>
                    </div>
                    <div style={{position:"relative",width:"auto"}}>
                    {maininfo}
                    {temp}
                    </div>
                    <div className="clearfix"></div>
                </div>
            );
        }

    }
}