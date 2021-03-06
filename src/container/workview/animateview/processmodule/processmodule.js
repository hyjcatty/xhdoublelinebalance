/**
 * Created by Huang Yuanjie on 2017/10/7.
 */

import React, {
    Component,
    PropTypes
} from 'react';

import classNames from 'classnames';



export default class processmodule extends Component {
    constructor(props) {
        super(props);
        this.state={
            id:"p0",
            height:70,
            width:1000,
            reverse:false,
            hide:"block",
            maxshow:32
        }
        this.processlist_free = [];
        this.processlist_run = [];
    }
    update_size(width,height,max){
        this.setState({height:height,width:width,maxshow:max});
    }
    initialize(id){
        this.setState({id:"p"+id});
        for(var i=1;i<11;i++){
            this.processlist_free.push(i);
        }
    }
    removefromlist(dom){
        let id = dom.attr('id');
        //console.log("prepare to move ["+id+"]");
        let number = id.split("animationprocess")[1];
        //console.log("prepare to move ["+number+"]");
        for(let i=0;i<this.processlist_run.length;i++){
            if(this.processlist_run[i] == parseInt(number)){
                this.processlist_run.splice(i,1);
                this.processlist_free.push(parseInt(number));
            }
        }
    }
    throwbox(target){
        //console.log(this.processlist_free.length);
        if(this.processlist_free.length <= 0) return;
        var temp = this.processlist_free.shift();
        //console.log("select number:"+temp);
        $('#'+this.state.id+'animationprocess'+temp).attr("display","block");

        this.processlist_run.push(temp);
        //console.log("processlist_run size:"+this.processlist_run.length);
        //console.log("RunRight"+target);
        if(target != 0){
            $('#'+this.state.id+'animationprocess'+temp).width((this.state.width)/this.state.maxshow*parseInt(target)-(29.95));
            $('#'+this.state.id+'animationprocess'+temp).removeClass().addClass('RunRight'+target+' linear').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', this,function(event){
                $(this).removeClass();
                $(this).attr("display","none");
                event.data.removefromlist($(this));
            });
        }else{
            $('#'+this.state.id+'animationprocess'+temp).width(this.state.width);
            $('#'+this.state.id+'animationprocess'+temp).removeClass().addClass('RunRight33 linear redpackage').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', this,function(event){
                $(this).removeClass();
                $(this).attr("display","none");
                event.data.removefromlist($(this));
            });
        }
    }
    render() {
        let temp=[];
        for(let i=0;i<32;i++){
            if(i==0){

                temp.push(
                    <p className="pull-right" key={"showtag"+i} style={{width:36.05,fontSize:24,fontColor:"#555555",fontWeight:700,textAlign:"center",marginRight:"-5px",marginBottom:"0px",marginTop:"10px"}}>{32-i}</p>
                )
            }else{

                temp.push(
                    <p className="pull-right" key={"showtag"+i} style={{width:36.05,fontSize:24,fontColor:"#555555",fontWeight:700,textAlign:"center",marginBottom:"0px",marginTop:"10px"}}>{32-i}</p>
                )
            }
        }
        return(
            <div>
                <div  style={{marginTop:10,marginBottom:10,display: "block",width:"100%",height:this.state.height-20,background: "#00FF00 url(./resource/image/timg.png) repeat fixed center",zIndex:0}}>


                </div>
                <div  style={{marginTop:(this.state.height-10)*(-1),marginBottom:10,display: "block",width:"100%",height:this.state.height-20,zIndex:10}}>
                    <span id={this.state.id+"animationprocess1"} style={{marginTop:"5px",position:'absolute',display: 'block',width:this.state.width,transitionTimingFunction: 'linear',WebkitTransitionTimingFunction: 'linear'}} >
                        <a><i className = "fa fa-gift" style={{fontSize:'40px'}}>
                        </i></a>
                    </span>
                    <span id={this.state.id+"animationprocess2"} style={{marginTop:"5px",position:'absolute',display: 'block',width:this.state.width,transitionTimingFunction: 'linear',WebkitTransitionTimingFunction: 'linear'}} >
                        <a ><i className = "fa fa-gift" style={{fontSize:'40px'}}>
                        </i></a>
                    </span>
                    <span id={this.state.id+"animationprocess3"} style={{marginTop:"5px",position:'absolute',display: 'block',width:this.state.width,transitionTimingFunction: 'linear',WebkitTransitionTimingFunction: 'linear'}} >
                        <a><i className = "fa fa-gift" style={{fontSize:'40px'}}>
                        </i></a>
                    </span>
                    <span id={this.state.id+"animationprocess4"} style={{marginTop:"5px",position:'absolute',display: 'block',width:this.state.width,transitionTimingFunction: 'linear',WebkitTransitionTimingFunction: 'linear'}} >
                        <a><i className = "fa fa-gift" style={{fontSize:'40px'}}>
                        </i></a>
                    </span>
                    <span id={this.state.id+"animationprocess5"} style={{marginTop:"5px",position:'absolute',display: 'block',width:this.state.width,transitionTimingFunction: 'linear',WebkitTransitionTimingFunction: 'linear'}} >
                        <a><i className = "fa fa-gift" style={{fontSize:'40px'}}>
                        </i></a>
                    </span>
                    <span id={this.state.id+"animationprocess6"} style={{marginTop:"5px",position:'absolute',display: 'block',width:this.state.width,transitionTimingFunction: 'linear',WebkitTransitionTimingFunction: 'linear'}} >
                        <a><i className = "fa fa-gift" style={{fontSize:'40px'}}>
                        </i></a>
                    </span>
                    <span id={this.state.id+"animationprocess7"} style={{marginTop:"5px",position:'absolute',display: 'block',width:this.state.width,transitionTimingFunction: 'linear',WebkitTransitionTimingFunction: 'linear'}} >
                        <a ><i className = "fa fa-gift" style={{fontSize:'40px'}}>
                        </i></a>
                    </span>
                    <span id={this.state.id+"animationprocess8"} style={{marginTop:"5px",position:'absolute',display: 'block',width:this.state.width,transitionTimingFunction: 'linear',WebkitTransitionTimingFunction: 'linear'}} >
                        <a><i className = "fa fa-gift" style={{fontSize:'40px'}}>
                        </i></a>
                    </span>
                    <span id={this.state.id+"animationprocess9"} style={{marginTop:"5px",position:'absolute',display: 'block',width:this.state.width,transitionTimingFunction: 'linear',WebkitTransitionTimingFunction: 'linear'}} >
                        <a><i className = "fa fa-gift" style={{fontSize:'40px'}}>
                        </i></a>
                    </span>
                    <span id={this.state.id+"animationprocess10"} style={{marginTop:"5px",position:'absolute',display: 'block',width:this.state.width,transitionTimingFunction: 'linear',WebkitTransitionTimingFunction: 'linear'}} >
                        <a><i className = "fa fa-gift" style={{fontSize:'40px'}}>
                        </i></a>
                    </span>
                </div>
            </div>


        );

    }
}