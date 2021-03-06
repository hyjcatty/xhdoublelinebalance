
var http = require('http');

var mosca = require('mosca');
var MqttServer = new mosca.Server({

    http:{
        port:3000,
        bundle:true,
        static:'./'
    },
    //port: 1883
});

var login = false;
MqttServer.on('clientConnected', function(client){
    console.log('client connected', client.id);
    if(client.id == "MQTT_XH_Double_Line_Balance_UI"){
        login = true;
        console.log('UI connected:', client.id);
    }
    if(client.id == "MQTT_XH_Double_Line_Balance_HCU"){
        login = true;
        console.log('HCU connected:', client.id);
    }
    if(client.id == "MQTT_XH_Double_Line_Balance_PHP"){
        login = true;
        console.log('PHP connected:', client.id);
    }
});

MqttServer.on('published', function(packet, client) {
    var topic = packet.topic;
    console.log('message-arrived--->','topic ='+topic+',message = '+ packet.payload.toString());


});

MqttServer.on('ready', function(){
    console.log('xh high speed balance mqtt is running...');
    //MqttServer.authenticate = authenticate;  
});






//mqttServ.attachHttpServer(httpServ);
//httpServ.listen(3000);