/**
 * Created by hyj on 2017/8/7.
 */
var mqtt  = require('mqtt');
//var client  = mqtt.connect('mqtt://test.mosca.io');
//var client  = mqtt.connect('mqtt://192.168.103.237');
//var client  = mqtt.connect('mqtt://m2m.vicbang.com',{
//    username:'13800000000',
//    password:'123456',
//    clientId:'app_13800000000'
//});

var start = false;

var client  = mqtt.connect('mqtt://127.0.0.1',{
    username:'username',
    password:'password',
    clientId:'MQTT_XH_Double_Line_Balance_HCU'
});

client.on('connect', function () {
    console.log('connected.....');
    client.subscribe('MQTT_XH_Double_Line_Balance_HCU');

    setInterval(function(){
        if(!start) return;
        client.publish('MQTT_XH_Double_Line_Balance_UI', buildchamberinfo());
    },600);

    setInterval(function(){
        if(!start) return;
        client.publish('MQTT_XH_Double_Line_Balance_UI', buildpackageinfo());
    },600);
    setInterval(function(){
        if(!start) return;
        client.publish('MQTT_XH_Double_Line_Balance_UI', buildstatisticsinfo());
    },6000);
    //client.publish('MQTT_TOPIC_UI_TO_HCU', 'Hello mqtt['+i+']');
});

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    var msg = JSON.parse(message.toString());
     /* var message = {
     action:"XH_Double_Line_Balance_config_start"
     };* */

     if(msg.action== "XH_Double_Line_Balance_config_start") {
         client.publish('MQTT_XH_Double_Line_Balance_UI', build_status_message());

         start = true;

     }else if(msg.action== "XH_Double_Line_Balance_config_stop"){
         start = false;
     }

});
function buildstatisticsinfo(){
    var biglabel= {
        title: "Test BIG Title",
        note: "Status Report",
        status: GetRandomNum(1,3000)+"g"
    };
    var colorlist=[
        "RED",
        "ORANGE",
        "BLUE",
        "GREEN",
        "GRAY",
        "PURPLE",
        "LBLUE",
        "LGRAY",
        "DBLUE"];
    var smalllabellist=[];
    for(var i=0;i<8;i++){
        var templabel={
            title:"test title",
            note:"note",
            color:colorlist[GetRandomNum(0,8)],
            value:GetRandomNum(0,300)+"kg"
        }
        smalllabellist.push(templabel);
    }
    var ret={
        action:"XH_Double_Line_Balance_statistics_status",
        data:{
            biglabel:biglabel,
            labellist:smalllabellist
        }
    }
    return JSON.stringify(ret);
}

function buildchamberinfo(){
    var number = GetRandomNum(1,30);
    var status = true;
    var error = false;
    var package = false;
    var fillin = true;
    var volume = GetRandomNum(0,100);;

    var temp = GetRandomNum(1,10);
    if(temp>9){
        status = false;
    }
    temp = GetRandomNum(1,10);
    if(temp>8){
        error = true;
    }
    temp = GetRandomNum(1,10);
    if(temp>8){
        package = true;
        fillin=false;
    }
    temp = GetRandomNum(1,10);
    if(temp>9){
        volume = 100;
    }

    var chamber = {
        action:"XH_Double_Line_Balance_chamber_status",
        data:{
            process:GetRandomNum(1,2),
            id:number,
            error:error,
            status:status,
            package:package,
            fillin:fillin,
            volume:volume,
            reject:GetRandomNum(0,100)
        }
    }
    return JSON.stringify(chamber);
}
function buildpackageinfo(){
    var ret = {
        action:"XH_Double_Line_Balance_package_status",
        data:{
            process:GetRandomNum(1,2),
            weight:GetRandomNum(1,1500),
            target:GetRandomNum(1,30)
        }
    }
    return JSON.stringify(ret);
}
function build_status_message(){
    var list1 = [];
    var list2 = [];
    for(var i=0;i<31;i++){
        var temp = {
            process:1,
            id:i,
            status:true,
            error:false,
            package:false,
            fillin:false,
            volume:0,
            reject:0
        }
        list1.push(temp);
    }
    for(var i=0;i<31;i++){
        var temp = {

            process:2,
            id:i,
            status:true,
            error:false,
            package:false,
            fillin:false,
            volume:0,
            reject:0
        }
        list2.push(temp);
    }
    var message = {
        action:"XH_Double_Line_Balance_config_status",
        data:{
            array1:list1,
            array2:list2
        }
    };
    return JSON.stringify(message);
}
function GetRandomNum(Min,Max)
{
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}