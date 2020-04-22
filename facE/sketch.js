var ctracker;
var video;
var positions = [];
var canvas;
var emotions;
var predictedEmotions;
var emotionData;

function setup() {
//    loadCamera();
//    loadCanvas(640,480);
    canvas = createCanvas(640, 480);
    canvas.position(0,0);
   colorMode(HSB)
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.position(0, 0);
    video.id("v");
    var mv = document.getElementById("v");
    mv.muted = true;
    
    ctracker = new clm.tracker();
    ctracker.init(pModel);
    ctracker.start(video.elt);
   
    emotions = new emotionClassifier();
    emotions.init(emotionModel);
    emotionData = emotions.getBlank();
}



function draw() {
//    getPositions();
//    getEmotions();

    clear();
    image(video,0,0);
    noStroke();
    fill(60,150);
    rect(0,0,width,height);
   
    positions = ctracker.getCurrentPosition();
    var cp = ctracker.getCurrentParameters();
    predictedEmotions = emotions.meanPredict(cp);
    
    fill(155);
    for (var i=0; i<positions.length -3; i++) {
        ellipse(positions[i][0], positions[i][1], 2, 2);
    }

    if (emotions) {
        // andry=0, sad=1, surprised=2, happy=3
        for (var i = 0;i < predictedEmotions.length;i++) {
            rect(i * 110+20, height-80, 30, -predictedEmotions[i].value * 30);
        }
    }

    text("ANGRY", 20, height-40);
    text("SAD", 130, height-40);
    text("SURPRISED", 220, height-40);
    text("HAPPY", 340, height-40);

}

//
//function drawPoints() {
//
//}
