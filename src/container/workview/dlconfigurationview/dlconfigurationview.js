/**
 * Created by hyj on 2017/3/10.
 */

import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
import '../../../../resource/css/font-awesome.min.css';
import './dlconfigurationview.css';
import Smalliconbutton from '../configurationview/smalliconbutton/smalliconbutton';



export default class configurationview extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            configuration:null,
            hide:"block",
            key1:"tabkey",
            key2:"contentkey",
            key3:"iconkey",
            bricksize:75,
            iconlist:[],
            defaulticon:"sugar1.svg",
            head:"none",
            switchlist:[],
            line1active:null,
            line2active:null,
            lines:{
                Line1:[],
                Line2:[]
            },
            language:{
                "configurename":"CONFIG NAME",
                "icon":"icon:",
                "preemption":"Preemption:",
                "detailparameter":"Detail Parameter:",
                "line":"Line - ",
                "group":",Group -",
                "free":" free",
                "freehopper":"Free Hopper",
                "localhopper":"Local Hopper",
                "selecticon":"Please select an icon:",
                "cancel":"cancel",
                "confirm":"confirm",
                "delete":"delete"
            },
            drag:null
        }
        this._iconcallback = this.handle_icon_selection.bind(this);
        //this.keyboard_initialize();

    }
    updateline(lines){
        //console.log(lines);
        let localline = this.state.lines;
        for(let i=0;i<lines.Line1.length;i++){
            localline.Line1[lines.Line1[i]]=null;
        }
        for(let i=0;i<lines.Line2.length;i++){
            localline.Line2[lines.Line2[i]]=null;
        }
        this.setState({lines:localline,configuration:null});
    }

    update_language(language){
        this.setState({language:language});
    }
    update_size(width,height){
        this.setState({height:height,width:width});
        //console.log("configurationview width:"+width+",height:"+height);
    }
    update_iconlist(iconlist){
        this.setState({iconlist:iconlist});

    }
    update_sub_props(){
        for(let i=0;i<this.state.iconlist.length;i++){
            this.refs[this.state.key3+i].updateprop(this.state.iconlist[i],this.state.bricksize);
        }
    }
    update_drag(drag){
        this.setState({drag:drag});
    }
    hide(){
        this.setState({hide:"none"});
        //this.switchery_distory();
    }
    show(){
        this.setState({hide:"block"},this.handdrag);

    }
    handdrag(){

        this.state.drag("configurationview");
        this.state.drag("iconselectview");
    }
    module_show(){
        this.update_sub_props();
        $('#IconSelectionModel').modal('show');
    }
    module_hide(){
        $('#IconSelectionModel').modal('hide');
    }
    new_view(configuration){
        this.setState({head:"block"});
        let localconf = configuration;
        localconf.name = "";
        let lines = this.rebuildlineinfo(localconf);
        this.setState({configuration:localconf,defaulticon:"./svg/"+localconf.icon,lines:lines});
        this.show();
    }
    modify_view(configuration){
        this.setState({head:"none"});
        let lines = this.rebuildlineinfo(configuration);
        this.setState({configuration:configuration,defaulticon:"./svg/"+configuration.icon,lines:lines});
        this.show();
    }
    rebuildlineinfo(configuration){
        let lines = this.state.lines;
        for (let p in this.state.lines.Line1){
            this.state.lines.Line1[p] = null;
        }
        for (let p in this.state.lines.Line2){
            this.state.lines.Line2[p] = null;
        }
        for(let i=0;i<configuration.Line1.length;i++){
            for(let j=0;j<configuration.Line1[i].chamber.length;j++){
                lines.Line1[configuration.Line1[i].chamber[j]]=i;
            }
        }
        for(let i=0;i<configuration.Line2.length;i++){
            for(let j=0;j<configuration.Line2[i].chamber.length;j++){
                lines.Line2[configuration.Line2[i].chamber[j]]=i;
            }
        }
        return lines;
    }
    handle_icon_selection(icon){
        let tempconfigure = this.state.configuration;
        tempconfigure.name = $("#ConfigureName_Input").val();
        //console.log( $("#ConfigureName_Input").val());
        tempconfigure.icon=icon;

        //console.log("choice icon:"+icon);
        this.setState({defaulticon:icon,configuration:tempconfigure});
        this.module_hide();
    }
    save_configuration(){
        return this.state.configuration;
    }
    keyboard_initialize(){

        $.extend( $.keyboard.altKeys, {
            1   : '\u2460 \u2474 \u2488 \u2776 \u278a \u2780',
            '!' : '\u00a1 \u2762 \u2763', // adding two more exclamation points!
            2   : '\u2461 \u2475 \u2489 \u2777 \u278b \u2781',
            3   : '\u2462 \u2476 \u248a \u2778 \u278c \u2782',
            4   : '\u2463 \u2477 \u248b \u2779 \u278d \u2783',
            5   : '\u2464 \u2478 \u248c \u277a \u278e \u2784',
            6   : '\u2465 \u2479 \u248d \u277b \u278f \u2785',
            7   : '\u2466 \u247a \u248e \u277c \u2790 \u2786',
            8   : '\u2467 \u247b \u248f \u277d \u2791 \u2787',
            9   : '\u2468 \u247c \u2490 \u277e \u2792 \u2788',
            0   : '\u2469 \u247d \u2491 \u277f \u2793 \u2789',
            '[' : '\u25c0 \u25c1 \u25c2 \u25c3 \u25c4 \u25c5 \u261a \u261c', // left arrows
            ']' : '\u25b6 \u25b7 \u25b8 \u25b9 \u25ba \u25bb \u261b \u261e', // right arrows
            // action keys the "!!" makes the button get the "ui-state-active" (set by the css.buttonActive option)
            'enter' : '{!!clear} {!!a} {!!c}',
            // smileys, card suits, & other symbols
            '\u263a' : '\u2639 \u263b \u2660 \u2661 \u2662 \u2663 \u2664 \u2665 \u2666 \u2667 \u2766 \u2767 \u263c \u263d \u263e \u2605 \u2606',
            // symbols with 4+ arms
            '\u2719' : '\u271a \u271b \u271c \u271d \u271e \u271f \u2720 \u2721 \u2722 \u2723 \u2724 \u2725 \u2726 \u2727 \u2729 \u272a \u272b \u272c \u272d \u272e \u272f \u2730 \u2731 \u2732 \u2733 \u2734 \u2735 \u2736 \u2737 \u2738 \u2739 \u273a \u273b \u273c \u273d \u273e \u273f \u2740 \u2741 \u2742 \u2743 \u2744 \u2745 \u2746 \u2747 \u2748 \u2749 \u274a \u274b \u2756'
        });
        $(function(){

            $('#ConfigureName_Input').keyboard({
                display: {
                    'bksp'   :  "\u2190",
                    'accept' : 'accept',
                    'normal' : 'ABC',
                    'meta1'  : '.?123',
                    'meta2'  : '#+='
                },
                layout: 'custom',
                usePreview: false,
                css: {
                    // keyboard container
                    container: 'center-block well', // jumbotron
                    // default state
                    buttonDefault: 'btn btn-default',
                    // hovered button
                    buttonHover: 'btn-primary',
                    // Action keys (e.g. Accept, Cancel, Tab, etc);
                    // this replaces "actionClass" option
                    buttonAction: 'active',
                    // used when disabling the decimal button {dec}
                    // when a decimal exists in the input area
                    buttonDisabled: 'disabled'
                },
                customLayout: {
                    'normal': [
                        '1 2 3 4 5 6 7 8 9 0 {bksp}',
                        'q w e r t y u i o p ',
                        'a s d f g h j k l {enter}',
                        '{s} z x c v b n m , . {s}',
                        ' {space} {accept}'
                    ],
                    'shift': [
                        '1 2 3 4 5 6 7 8 9 0 {bksp}',
                        'Q W E R T Y U I O P ',
                        'A S D F G H J K L {enter}',
                        '{s} Z X C V B N M _ - {s}',
                        ' {space}  {accept}'
                    ]
                }
            });
            $.extend( $.keyboard.altKeys, {
                1   : '\u2460 \u2474 \u2488 \u2776 \u278a \u2780',
                '!' : '\u00a1 \u2762 \u2763', // adding two more exclamation points!
                2   : '\u2461 \u2475 \u2489 \u2777 \u278b \u2781',
                3   : '\u2462 \u2476 \u248a \u2778 \u278c \u2782',
                4   : '\u2463 \u2477 \u248b \u2779 \u278d \u2783',
                5   : '\u2464 \u2478 \u248c \u277a \u278e \u2784',
                6   : '\u2465 \u2479 \u248d \u277b \u278f \u2785',
                7   : '\u2466 \u247a \u248e \u277c \u2790 \u2786',
                8   : '\u2467 \u247b \u248f \u277d \u2791 \u2787',
                9   : '\u2468 \u247c \u2490 \u277e \u2792 \u2788',
                0   : '\u2469 \u247d \u2491 \u277f \u2793 \u2789',
                '[' : '\u25c0 \u25c1 \u25c2 \u25c3 \u25c4 \u25c5 \u261a \u261c', // left arrows
                ']' : '\u25b6 \u25b7 \u25b8 \u25b9 \u25ba \u25bb \u261b \u261e', // right arrows
                // action keys the "!!" makes the button get the "ui-state-active" (set by the css.buttonActive option)
                'enter' : '{!!clear} {!!a} {!!c}',
                // smileys, card suits, & other symbols
                '\u263a' : '\u2639 \u263b \u2660 \u2661 \u2662 \u2663 \u2664 \u2665 \u2666 \u2667 \u2766 \u2767 \u263c \u263d \u263e \u2605 \u2606',
                // symbols with 4+ arms
                '\u2719' : '\u271a \u271b \u271c \u271d \u271e \u271f \u2720 \u2721 \u2722 \u2723 \u2724 \u2725 \u2726 \u2727 \u2729 \u272a \u272b \u272c \u272d \u272e \u272f \u2730 \u2731 \u2732 \u2733 \u2734 \u2735 \u2736 \u2737 \u2738 \u2739 \u273a \u273b \u273c \u273d \u273e \u273f \u2740 \u2741 \u2742 \u2743 \u2744 \u2745 \u2746 \u2747 \u2748 \u2749 \u274a \u274b \u2756'
            }
            );
            $('.localconfigure_input').each(function(){
                $(this).keyboard({
                    display: {
                        'bksp': "\u2190",
                        'accept': 'accept',
                        'normal': 'ABC',
                        'meta1': '.?123',
                        'meta2': '#+='
                    },
                    layout: 'custom',
                    usePreview: false,
                    css: {
                        // keyboard container
                        container: 'center-block well', // jumbotron
                        // default state
                        buttonDefault: 'btn btn-default',
                        // hovered button
                        buttonHover: 'btn-primary',
                        // Action keys (e.g. Accept, Cancel, Tab, etc);
                        // this replaces "actionClass" option
                        buttonAction: 'active',
                        // used when disabling the decimal button {dec}
                        // when a decimal exists in the input area
                        buttonDisabled: 'disabled'
                    },
                    customLayout: {
                        'normal': [
                            '1 2 3 {b}',
                            '4 5 6 -',
                            '7 8 9 .',
                            '0 {a} {c}'
                        ]
                    },
                    visible: function(e, keyboard, el) {
                        keyboard.$preview[0].select();
                    },
                    validate: function(e, key, el) {

                        let max = e.$el.attr("data-max");
                        let min = e.$el.attr("data-min");
                        if(parseFloat(key)>parseFloat(max)){
                            e.$el.val(parseFloat(max));
                            return false;
                        }else if(parseFloat(key)<parseFloat(min)){
                            e.$el.val(parseFloat(min));
                            return false;
                        }else{
                            e.$el.val(parseFloat(key));
                            return true;
                        }

                    }
                });
            });

        });

    }
    switchery_initialize(){
        /*
         for(let i=0;i<16;i++){
         var switchery = new Switchery($("#Configure_Balance_"+i), {
         color: '#26B99A'
         });
         this.state.switchlist.push(switchery);
         }
         console.log("switchery list lenght:"+this.state.switchlist.length);*/
        let switchery_list = $("#preemption_tab").find("span").each(function(html){
            $(this).remove();
        });

        /*
        if ($(".switchery-default")[0]) {
            var elems = Array.prototype.slice.call(document.querySelectorAll('.switchery-default'));
            //console.log("switchery list lenght:"+elems.length);
            elems.forEach(function (html) {
                html.remove();
            });
        }*/
        /*
        if(this.state.configuration!==null){

            for(let i=0;i<16;i++){
                $("#Configure_Balance_"+i).prop("checked",this.state.configuration.parameter.preemption[i]);
            }
        }*/

        if ($(".configure-js-switch")[0]) {
            var elems = Array.prototype.slice.call(document.querySelectorAll('.configure-js-switch'));
            //console.log("switchery list lenght:"+elems.length);
            elems.forEach(function (html) {
                var switchery = new Switchery(html, {
                    color: '#26B99A'
                });
            });
        }
    }
    componentDidMount(){
        //this.keyboard_initialize();

    }
    componentDidUpdate(){
        this.switchery_initialize();
        this.keyboard_initialize();
    }
    getUpdatedValue(){
        let output = this.state.configuration;
        let name = $("#ConfigureName_Input").val();
        if(name === "" && output.name ===""){
            $("#ConfigureName_Input").focus();
            return "";
        }else if(name !== ""){

            output.name=name;
        }
        return output;
    }
    handleChange(e){
    }
    handleChangecheck(e){
        /*
        for(let i=0;i<16;i++){
            //console.log($("#Configure_Balance_"+i));
            console.log("Configure_Balance_"+i+":"+$("#Configure_Balance_"+i).is(":checked"));
            //this.state.configuration.parameter.preemption[i]=$("#Configure_Balance_"+i).is(":checked");
        }
        $("#Configure_Balance_1").prop("checked",true);

        for(let i=0;i<16;i++){
            //console.log($("#Configure_Balance_"+i));
            console.log("Configure_Balance_"+i+":"+$("#Configure_Balance_"+i).is(":checked"));
            //this.state.configuration.parameter.preemption[i]=$("#Configure_Balance_"+i).is(":checked");
        }*/
        /*
        let handleid = e.currentTarget.getAttribute("id");
        console.log(handleid);
        $("#"+handleid).checked=!($("#"+handleid).checked);*/
    }
    handleBlur(e){/*
        let handleid = e.currentTarget.getAttribute("id");
        console.log(handleid);
        let handle = $("#"+handleid);
        console.log("key="+handle.val()+";min="+handle.attr("data-min")+";max="+handle.attr("data-max"));
        let max = parseFloat(handle.attr("data-max"));
        let min = parseFloat(handle.attr("data-min"));
        let value = parseFloat(handle.val());
        console.log("key="+value+";min="+min+";max="+max);
        if(value<min){
            handle.val(min);
        }
        else if(value>max){
            handle.val(max);
        }else  {
            handle.val(value);
        }*/
    }
    handle_plus1(){
        let freeitem = null;
        for(let p in this.state.lines.Line1){
            if(this.state.lines.Line1[p] === null){
                freeitem = p;
                break;
            }
        }
        if(freeitem === null) return;
        let localconf = JSON.parse(JSON.stringify(this.state.configuration));
        let newgroup = JSON.parse(JSON.stringify(this.state.configuration.Unit));
        newgroup.chamber.push(freeitem);
        localconf.Line1.push(newgroup);
        let lines = this.rebuildlineinfo(localconf);
        this.setState({configuration:localconf,defaulticon:"./svg/"+localconf.icon,lines:lines});
        //console.log("Plus 1");
    }
    handle_plus2(){
        let freeitem = null;
        for(let p in this.state.lines.Line2){
            if(this.state.lines.Line2[p] === null){
                freeitem = p;
                break;
            }
        }
        if(freeitem === null) return;
        let localconf = JSON.parse(JSON.stringify(this.state.configuration));
        let newgroup = JSON.parse(JSON.stringify(this.state.configuration.Unit));
        newgroup.chamber.push(freeitem);
        localconf.Line2.push(newgroup);
        let lines = this.rebuildlineinfo(localconf);
        this.setState({configuration:localconf,defaulticon:"./svg/"+localconf.icon,lines:lines});
    }
    handle_showdetail(event){
        let group = event.target.getAttribute("data-group");
        let line = event.target.getAttribute("data-line");
        console.log("handle_showdetail line;["+line+"]group;["+group+"]");
        if(line === "1"){
            this.setState({line1active:group});
        }else{
            this.setState({line2active:group});
        }
    }
    handle_shift(event){
        let line = event.target.getAttribute("data-line");
        let type = event.target.getAttribute("data-type");
        let chamber = event.target.getAttribute("data-chamber");
        let linekey = "Line"+line;
        let localactive = this.state["line"+line+"active"];
        //console.log("line:"+line);
        //console.log("type:"+type);
        //console.log("chamber:"+chamber);
        //console.log("linekey:"+linekey);
        //console.log("localactive:"+localactive);
        let localconf = this.state.configuration;
        if(type === "free"){
            //let locallines = this.state.lines;
            //locallines[linekey][chamber] = localactive;
            localconf[linekey][localactive].chamber.push(chamber);
            //console.log(localconf);
            let lines = this.rebuildlineinfo(localconf);
            this.setState({configuration:localconf,lines:lines});
        }else{
            //locallines[linekey][chamber] = localactive;
            if(localconf[linekey][localactive].chamber.length ===1){
                return;
            }else{
                let i=0;
                for (i=0;i<localconf[linekey][localactive].chamber.length;i++){
                    if(localconf[linekey][localactive].chamber[i].toString() === chamber.toString()) break;
                }
                localconf[linekey][localactive].chamber.splice(i,1);
            }
            //console.log(localconf);
            let lines = this.rebuildlineinfo(localconf);
            this.setState({configuration:localconf,lines:lines});
        }


    }
    handle_save_group(event){
        let line = event.target.getAttribute("data-line");
        let active = "";
        let linekey = "Line"+ line;
        let localconf = this.state.configuration;
        if(line === "1"){
            active = this.state.line1active;
        }else{
            active = this.state.line2active;
        }
        if(active === null){ return;}
        for(let i=0;i< this.state.configuration[linekey][active].list.length;i++){
            if(this.state.configuration[linekey][active].list[i].max === ""){
                localconf[linekey][active].list[i].value = $("#"+linekey+"conf_detail_P"+i+"_Choice").val();
                //console.log("modify ["+i+"] parameter to ["+$("#conf_detail_P"+i+"_Choice").val()+"]");
            }else{
                localconf[linekey][active].list[i].value = $("#"+linekey+"conf_detail_P"+i+"_Input").val();
                //console.log("modify ["+i+"] parameter to ["+$("#conf_detail_P"+i+"_Input").val()+"]");
            }
        }
        console.log(localconf);
        let lines = this.rebuildlineinfo(localconf);
        if(line === "1"){
            this.setState({line1active:null,configuration:localconf,lines:lines});
        }else{
            this.setState({line2active:null,configuration:localconf,lines:lines});
        }
    }
    handle_delete_group(event){
        let line = event.target.getAttribute("data-line");
        let active = "";
        let linekey = "Line"+ line;
        let localconf = this.state.configuration;
        if(line === "1"){
            active = this.state.line1active;
        }else{
            active = this.state.line2active;
        }
        if(active === null){ return;}
        localconf[linekey].splice(active,1);

        let lines = this.rebuildlineinfo(localconf);
        if(line === "1"){
            this.setState({line1active:null,configuration:localconf,lines:lines});
        }else{
            this.setState({line2active:null,configuration:localconf,lines:lines});
        }
    }
    render() {
        if(this.state.configuration === null){
            return (
                <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflowY:'hidden',overflowX:'hidden'}}>

                </div>
            );
        }
        let freekey1 = 0;
        let freekey2 = 0;
        for (let p in this.state.lines.Line1) {
            if (this.state.lines.Line1[p] === null) freekey1++;
        }
        for (let p in this.state.lines.Line2){
            if(this.state.lines.Line2[p] === null) freekey2++;
        }
        let conficons = [];
        for(let i=0;i<this.state.iconlist.length;i++){
            let tempkey = "iconbutton"+i;
            let icon = "./svg/"+this.state.iconlist[i];
            conficons.push(
                <div key={this.state.key+"basebutton"+i} style={{marginTop:this.state.bricksize/5,marginLeft:this.state.bricksize/5,marginRight:this.state.bricksize/5,marginBottom:this.state.bricksize/5,width:this.state.bricksize,height:this.state.bricksize,float: "left",position:"relative"}}>
                    <Smalliconbutton ref={this.state.key3+i} iconcallback={this._iconcallback}/>
                </div>);
        }
        let line1 = [];
        for(let i=0;i<this.state.configuration.Line1.length;i++){
            line1.push(
                <div  style={{position:"relative",float:"left",width:1.4*this.state.bricksize}} key={"line1block"+i} >
                    <button type="button" className="btn" style={{margin:this.state.bricksize/5,height:this.state.bricksize,width:this.state.bricksize,verticalAlign:"middle",boxShadow:"5px 5px 5px #DDDDDD",background:"#DDDDDD"}}
                            data-group = {i}
                            data-line = "1"
                            onClick={this.handle_showdetail.bind(this)} >
                        <i style={{fontSize:this.state.bricksize/3}} data-group = {i}
                           data-line = "1"> {i+1}</i>
                    </button>
                </div>
            );
        }
        let line2=[];
        for(let i=0;i<this.state.configuration.Line2.length;i++){
            line2.push(
                <div  style={{position:"relative",float:"left",width:1.4*this.state.bricksize}} key={"line2block"+i} >
                    <button type="button" className="btn" style={{margin:this.state.bricksize/5,height:this.state.bricksize,width:this.state.bricksize,verticalAlign:"middle",boxShadow:"5px 5px 5px #DDDDDD",background:"#DDDDDD"}}
                            data-group = {i}
                            data-line = "2"
                            onClick={this.handle_showdetail.bind(this)} >
                        <i style={{fontSize:this.state.bricksize/3}} data-group = {i}
                           data-line = "2"> {i+1}</i>
                    </button>
                </div>
            );
        }
        let preemption =[];

        let block1 = "";
        if(this.state.line1active  === null){
            block1 = <div className="tile-stats" style={{marginTop:"15px"}}>
                <div key="statuspanel" className="count" style={{fontSize:24}}>{this.state.language.line+"1:"+freekey1+this.state.language.free}</div>

                <div  style={{position:"relative",float:"left",width:1.4*this.state.bricksize,boxShadow:"5px 5px 5px #FFFFFF",background:"#FFFFFF"}} >
                    <button type="button" className="btn" style={{margin:this.state.bricksize/5,height:this.state.bricksize,width:this.state.bricksize,verticalAlign:"middle",fontSize:this.state.bricksize/2,border:"5px dashed #73839c",background:"#FFFFFF"}}
                            onClick={this.handle_plus1.bind(this)}>
                        <i className="fa fa-plus" > </i>
                    </button>
                </div>

                {line1}
            </div>
        }else{
            let content=[];
            for(let j=0;j<this.state.configuration.Line1[this.state.line1active].list.length;j++){
                if(this.state.configuration.Line1[this.state.line1active].list[j].max!==""){
                    let contentline = "["+this.state.configuration.Line1[this.state.line1active].list[j].min+"->"+this.state.configuration.Line1[this.state.line1active].list[j].max+"]:"+this.state.configuration.Line1[this.state.line1active].list[j].note;
                    let className="form-control "+"localconfigure_input";
                    content.push(
                        <div className="count" style={{fontSize:20,marginTop:15,verticalAlign:'bottom'}} key={this.state.key2+"p"+j+"1"}>
                            <div className="input-group">
                                <span className="input-group-addon"  style={{minWidth: "100px",fontSize:"12px"}}>{this.state.configuration.Line1[this.state.line1active].list[j].paraname}</span>
                                <input type="text" className={className} placeholder="CONFIG Value" aria-describedby="basic-addon1"
                                       key={this.state.key2+"G"+"P"+j+"input"} id={"Line1conf_detail_P"+j+"_Input"} data-parameter={j}
                                       value={this.state.configuration.Line1[this.state.line1active].list[j].value}
                                       onChange={this.handleChange} onBlur={this.handleBlur}
                                       data-min={this.state.configuration.Line1[this.state.line1active].list[j].min}
                                       data-max={this.state.configuration.Line1[this.state.line1active].list[j].max}/>
                            </div>
                            <h3 style={{fontSize:15,marginRight:5,color:"#333"}} >{contentline}</h3>
                        </div>);


                }else{
                    let contentline = this.state.configuration.Line1[this.state.line1active].list[j].note;
                    let className="form-control "+"sys_conf_choice";
                    this.state.configuration.Line1[this.state.line1active].list[j].defaultvalue = this.state.configuration.Line1[this.state.line1active].list[j].items[parseInt(this.state.configuration.Line1[this.state.line1active].list[j].value)];
                    let choice_items = [];
                    for(let k=0;k<this.state.configuration.Line1[this.state.line1active].list[j].items.length;k++){
                        choice_items.push(<option value={this.state.configuration.Line1[this.state.line1active].list[j].items[k]} key={"choice_item_"+j+"_"+k}>{this.state.configuration.Line1[this.state.line1active].list[j].items[k]}</option>);
                    }
                    content.push(
                        <div className="count" style={{fontSize:20,marginTop:15,verticalAlign:'bottom'}} key={this.state.key2+"p"+j+"1"}>
                            <div className="input-group">
                                <span className="input-group-addon"  style={{minWidth: "100px",fontSize:"12px"}}>{this.state.configuration.Line1[this.state.line1active].list[j].paraname+":"}</span>
                                <select className={className} placeholder="CONFIG Value" aria-describedby="basic-addon1"
                                        key={this.state.key2+"P"+j+"Choice"} id={"Line1conf_detail_P"+j+"_Choice"} data-parameter={j} onChange={this.handleChange}
                                        defaultValue={this.state.configuration.Line1[this.state.line1active].list[j].value} >{choice_items}</select>
                            </div>
                            <h3 style={{fontSize:15,marginRight:5,color:"#333"}}  >{contentline}</h3>
                        </div>);

                }

            }
            let freebalance =[];
            for(let p in this.state.lines.Line1){
                if(this.state.lines.Line1[p] === null) freebalance.push(p);
            }
            let localbalance = this.state.configuration.Line1[this.state.line1active].chamber;

            let freebalancebutton = [];
            for(let i=0;  i < freebalance.length;i++){
                freebalancebutton.push(
                    <div  style={{position:"relative",float:"left",width:1.15*this.state.bricksize}} key={"line1block"+i} >
                        <button type="button" className="btn" style={{margin:15,height:40,width:60,verticalAlign:"middle",boxShadow:"5px 5px 5px #DDDDDD",background:"#DDDDDD",fontSize:20}}
                                data-chamber = {freebalance[i]} data-line = "1"  data-type="free"   onClick={this.handle_shift.bind(this)} >
                            <label style={{verticalAlign:"middle",fontSize:20}}   data-chamber = {freebalance[i]} data-line = "1"  data-type="free"  >{freebalance[i]}</label>
                        </button>
                    </div>
                )
            }
            let localbalancebutton = [];
            for(let i=0;  i < localbalance.length;i++){
                localbalancebutton.push(
                    <div  style={{position:"relative",float:"left",width:1.15*this.state.bricksize}} key={"line1block"+i} >
                        <button type="button" className="btn" style={{margin:15,height:40,width:60,verticalAlign:"middle",boxShadow:"5px 5px 5px #DDDDDD",background:"#DDDDDD",fontSize:20}}
                                data-chamber = {localbalance[i]}  data-line = "1"  data-type="local"  onClick={this.handle_shift.bind(this)} >
                            <label style={{verticalAlign:"middle",fontSize:20}}   data-chamber = {localbalance[i]}  data-line = "1"  data-type="local"  >{localbalance[i]}</label>
                        </button>
                    </div>
                )
            }
            block1 =
                <div className="tile-stats" style={{marginTop:"15px"}}>
                    <div key="statuspanel" className="count" style={{fontSize:24}}>{this.state.language.line+" 1"+this.state.language.group+(parseInt(this.state.line1active)+1)}</div>
                    <p></p>
                    <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12">
                        {content}
                        <div className="tile-stats" style={{marginTop:"15px",border: "2px dashed #73879C",border: "2px dashed #73879C",borderRadius: "0px"}}>
                            <div className="count" style={{fontSize:18}}>{this.state.language.freehopper}</div>
                            {freebalancebutton}
                        </div>
                        <div className="tile-stats" style={{marginTop:"15px",border: "2px dashed #73879C",border: "2px dashed #73879C",borderRadius: "0px"}}>
                            <div className="count" style={{fontSize:18}}>{this.state.language.localhopper}</div>
                            {localbalancebutton}
                        </div>
                        <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12"     style={{textAlign: "center",marginTop:"20px",marginBottom:"20px"}}>
                            <button type="button"  data-loading-text="Loading..." className="btn btn-primary" autoComplete="off" style={{marginRight:50,minWidth: "150px",color:"#ffffff",fontWeight:700,background:"#000000"}} data-line="1" onClick={this.handle_save_group.bind(this)} >
                                {this.state.language.confirm}
                            </button>
                            <button type="button"  data-loading-text="Loading..." className="btn btn-primary" autoComplete="off" style={{minWidth: "150px",color:"#ffffff",fontWeight:700,background:"#000000"}} data-line="1" onClick={this.handle_delete_group.bind(this)} >
                                {this.state.language.delete}
                            </button>
                        </div>
                        <div className="clearfix"/>
                    </div>
                </div>
        }
        let block2 = "";
        if(this.state.line2active  === null){
            block2 = <div className="tile-stats"  style={{marginTop:"15px"}}>
                <div key="statuspanel" className="count" style={{fontSize:24}}>{this.state.language.line+"2: "+freekey2+this.state.language.free}</div>

                <div  style={{position:"relative",float:"left",width:1.4*this.state.bricksize,boxShadow:"5px 5px 5px #FFFFFF",background:"#FFFFFF"}} >
                    <button type="button" className="btn" style={{margin:this.state.bricksize/5,height:this.state.bricksize,width:this.state.bricksize,verticalAlign:"middle",fontSize:this.state.bricksize/2,border:"5px dashed #73839c",background:"#FFFFFF"}}
                            onClick={this.handle_plus2.bind(this)}>
                        <i className="fa fa-plus" > </i>
                    </button>
                </div>

                {line2}

                <div className="clearfix"/>
            </div>
        }else{
            let content=[];
            //console.log(this.state.configuration);
            //console.log("line2active="+this.state.line2active);
            for(let j=0;j<this.state.configuration.Line2[this.state.line2active].list.length;j++){
                if(this.state.configuration.Line2[this.state.line2active].list[j].max!==""){
                    let contentline = "["+this.state.configuration.Line2[this.state.line2active].list[j].min+"->"+this.state.configuration.Line2[this.state.line2active].list[j].max+"]:"+this.state.configuration.Line2[this.state.line2active].list[j].note;
                    let className="form-control "+" localconfigure_input";
                    content.push(
                        <div className="count" style={{fontSize:20,marginTop:15,verticalAlign:'bottom'}} key={this.state.key2+"p"+j+"1"}>
                            <div className="input-group">
                                <span className="input-group-addon"  style={{minWidth: "100px",fontSize:"12px"}}>{this.state.configuration.Line2[this.state.line2active].list[j].paraname}</span>
                                <input type="text" className={className} placeholder="CONFIG Value" aria-describedby="basic-addon1"
                                       key={this.state.key2+"G"+"P"+j+"input"} id={"Line2conf_detail_P"+j+"_Input"} data-parameter={j}
                                       value={this.state.configuration.Line2[this.state.line2active].list[j].value}
                                       onChange={this.handleChange} onBlur={this.handleBlur}
                                       data-min={this.state.configuration.Line2[this.state.line2active].list[j].min}
                                       data-max={this.state.configuration.Line2[this.state.line2active].list[j].max}/>
                            </div>
                            <h3 style={{fontSize:15,marginRight:5,color:"#333"}} >{contentline}</h3>
                        </div>);


                }else{
                    let contentline = this.state.configuration.Line2[this.state.line2active].list[j].note;
                    let className="form-control "+" sys_conf_choice";
                    this.state.configuration.Line2[this.state.line2active].list[j].defaultvalue = this.state.configuration.Line2[this.state.line2active].list[j].items[parseInt(this.state.configuration.Line2[this.state.line2active].list[j].value)];
                    let choice_items = [];
                    for(let k=0;k<this.state.configuration.Line2[this.state.line2active].list[j].items.length;k++){
                        choice_items.push(<option value={this.state.configuration.Line2[this.state.line2active].list[j].items[k]} key={"choice_item_"+j+"_"+k}>{this.state.configuration.Line2[this.state.line2active].list[j].items[k]}</option>);
                    }
                    content.push(
                        <div className="count" style={{fontSize:20,marginTop:15,verticalAlign:'bottom'}} key={this.state.key2+"p"+j+"1"}>
                            <div className="input-group">
                                <span className="input-group-addon"  style={{minWidth: "100px",fontSize:"12px"}}>{this.state.configuration.Line2[this.state.line2active].list[j].paraname+":"}</span>
                                <select className={className} placeholder="CONFIG Value" aria-describedby="basic-addon1"
                                        key={this.state.key2+"P"+j+"Choice"} id={"Line2conf_detail_P"+j+"_Choice"} data-parameter={j} onChange={this.handleChange}
                                        defaultValue={this.state.configuration.Line2[this.state.line2active].list[j].value} >{choice_items}</select>
                            </div>
                            <h3 style={{fontSize:15,marginRight:5,color:"#333"}}  >{contentline}</h3>
                        </div>);

                }

            }
            let freebalance =[];
            for(let p in this.state.lines.Line2){
                if(this.state.lines.Line2[p] === null) freebalance.push(p);
            }
            let localbalance = this.state.configuration.Line2[this.state.line2active].chamber;

            let freebalancebutton = [];
            for(let i=0;  i < freebalance.length;i++){
                freebalancebutton.push(
                    <div  style={{position:"relative",float:"left",width:1.15*this.state.bricksize}} key={"line2block"+i} >
                        <button type="button" className="btn" style={{margin:15,height:40,width:60,verticalAlign:"middle",boxShadow:"5px 5px 5px #DDDDDD",background:"#DDDDDD",fontSize:20}}
                                data-chamber = {freebalance[i]} data-line = "2"  data-type="free"   onClick={this.handle_shift.bind(this)} >
                            <label style={{verticalAlign:"middle",fontSize:20}}   data-chamber = {freebalance[i]} data-line = "2"  data-type="free"  >{freebalance[i]}</label>
                        </button>
                    </div>
                )
            }
            let localbalancebutton = [];
            for(let i=0;  i < localbalance.length;i++){
                localbalancebutton.push(
                    <div  style={{position:"relative",float:"left",width:1.15*this.state.bricksize}} key={"line2block"+i} >
                        <button type="button" className="btn" style={{margin:15,height:40,width:60,verticalAlign:"middle",boxShadow:"5px 5px 5px #DDDDDD",background:"#DDDDDD",fontSize:20}}
                                data-chamber = {localbalance[i]}  data-line = "2"  data-type="local"  onClick={this.handle_shift.bind(this)} >
                            <label style={{verticalAlign:"middle",fontSize:20}}   data-chamber = {localbalance[i]}  data-line = "2"  data-type="local"  >{localbalance[i]}</label>
                        </button>
                    </div>
                )
            }
            block2 =
                <div className="tile-stats" style={{marginTop:"15px"}}>
                    <div key="statuspanel" className="count" style={{fontSize:24}}>{ this.state.language.line+" 2"+this.state.language.group+(parseInt(this.state.line2active)+1)}</div>

                    <p></p>
                    <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12" >
                        {content}
                        <div className="tile-stats" style={{marginTop:"15px",border: "2px dashed #73879C",border: "2px dashed #73879C",borderRadius: "0px"}}>
                            <div className="count" style={{fontSize:18}}>{this.state.language.freehopper}</div>
                            {freebalancebutton}
                        </div>
                        <div className="tile-stats" style={{marginTop:"15px",border: "2px dashed #73879C",border: "2px dashed #73879C",borderRadius: "0px"}}>
                            <div className="count" style={{fontSize:18}}>{this.state.language.localhopper}</div>
                            {localbalancebutton}
                        </div>
                        <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12"     style={{textAlign: "center",marginTop:"20px",marginBottom:"20px"}}>
                            <button type="button"  data-loading-text="Loading..." className="btn btn-primary" autoComplete="off" style={{marginRight:50,minWidth: "150px",color:"#ffffff",fontWeight:700,background:"#000000"}} data-line="2" onClick={this.handle_save_group.bind(this)} >
                                {this.state.language.confirm}
                            </button>
                            <button type="button"  data-loading-text="Loading..." className="btn btn-primary" autoComplete="off" style={{minWidth: "150px",color:"#ffffff",fontWeight:700,background:"#000000"}} data-line="2" onClick={this.handle_delete_group.bind(this)} >
                                {this.state.language.delete}
                            </button>
                        </div>
                    </div>
                </div>
        }

        return (
            <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflowY:'hidden',overflowX:'hidden'}}>
                <div className="x_content" id = 'configurationview'  style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflowY:'auto',overflowX:'hidden'}}>
                    <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12" style={{display:this.state.head}}>
                        <h4>&nbsp;</h4>
                        <div className="col-xs-9 col-md-9 col-sm-9 col-lg-9" style={{display:this.state.head}}>
                            <div className="input-group">
                                <span className="input-group-addon" id="CONFIG_NAME" style={{minWidth: "150px"}}>{this.state.language.configurename}</span>
                                <input type="text" className="form-control" placeholder={this.state.language.configurename} aria-describedby="basic-addon1" id="ConfigureName_Input" value={this.state.configuration.name} onChange={this.handleChange.bind(this)}/>
                            </div>
                        </div>
                        <div className="col-xs-9 col-md-9 col-sm-9 col-lg-9" style={{display:this.state.head,margonTop:50}}>
                            <h4>{this.state.language.icon}</h4>
                            <div  style={{marginTop:this.state.bricksize/5,marginLeft:this.state.bricksize/5,marginRight:this.state.bricksize/5,marginBottom:this.state.bricksize/5,
                            width:this.state.bricksize,height:this.state.bricksize,float: "left",position:"relative"}}>
                                <button type="button" className="btn" style={{height:this.state.bricksize,width:this.state.bricksize,verticalAlign:"middle"}} onClick={this.module_show.bind(this)}><i>
                                    <img src={"./svg/"+this.state.configuration.icon}  style={{height:this.state.bricksize*0.5,width:this.state.bricksize*0.5,marginTop:0}} ></img><br/>
                                </i></button>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix"></div>

                    <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12 " >
                        <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12 " >
                            <h4>{this.state.language.detailparameter}</h4>
                        </div>
                        <div id='dlconfview'   style={{float: "left",position:"relative",width:this.state.width-50,overflowY:"hidden",overflowX:"hidden"}}>
                            <div className="container" >
                                <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6">
                                    {block1}<div className="clearfix"></div>
                                </div>
                                <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6">
                                    {block2}<div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="clearfix"></div>

                </div>
                <div className="modal fade" id="IconSelectionModel" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" style={{width:'100%'}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" >{this.state.language.selecticon}</h4>
                            </div>
                            <div id='iconselectview' className="modal-body" style={{height:this.state.height*0.75,maxHeight:this.state.height*0.75,overflow:"scroll",overflowX:"hidden"}}>

                                <div className="col-md-12">
                                    <div style={{position:"relative",background:"#FFFFFF",width:'100%'}}>
                                        {conficons}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">{this.state.language.cancel}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
