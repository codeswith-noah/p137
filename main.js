status = "";
inputValue = "";
objects = [];
synth = "";

function preload(){

}

function setup(){
    canvas = createCanvas(480, 350);
    canvas.center;
    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    inputValue = document.getElementById("input").value;
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}

function draw(){
    image(video, 0, 0, 480, 350);

    if(status != null){
        for(i=0; i<objects.length; i++){            
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            if(objects[i].label == inputValue)
            {
               video.stop();
               document.getElementById("status").innerHTML = inputValue + " Found"; 
               objectDetector.detect(gotResult);
               synth = window.speechSynthesis;
               utterThis = new SpeechSynthesisUtterance(inputValue + "Found");
               synth.speak(utterThis);
            }
            else
            {
                document.getElementById("status").innerHTML = inputValue + " Not Found";
            }
        }
    }
}

function gotResult(){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}