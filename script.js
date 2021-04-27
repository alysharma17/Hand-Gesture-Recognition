prediction="";



Webcam.set({
    width:340,
    height:280,
    image_format:'png',
    png_quality:8000
    
    });
    cam=document.getElementById("camera");
Webcam.attach("#camera");

function take_photo() {
    Webcam.snap(function(data_uri){
   image="<img id='img_photo' src='"+data_uri+"'>" ;
   document.getElementById("photo").innerHTML=image;
    });
}    

console.log("ml5 version ", ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/5s1NY_por/model.json", model_loaded);

function model_loaded() {
    console.log("model_loaded");
}

function speak() {
    synth=window.speechSynthesis;
    var speak_data= "Hand Gesture Is" + prediction;
    var utter_this=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);
};


function identify_gesture() {
    img= document.getElementById("img_photo");
    classifier.classify(img, gotResult);
         
    }

    function gotResult(error, results) {
        if (error) {
            console.error(error);
        }
        else {
            console.log(results);
            document.getElementById("gesture").innerHTML=results[0].label;
            prediction=results[0].label;
       
           speak();
      
           if (results[0].label=="Thumbs-Up") {
            document.getElementById("gesture").innerHTML="&#128077;";
        }
        if (results[0].label=="Thumbs-Down") {
            document.getElementById("gesture").innerHTML=  " &#128078;"
        }
            if (results[0].label=="Perfect") {
            document.getElementById("gesture").innerHTML="&#128076;";
        }
    }
        }
   