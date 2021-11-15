// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
let leftFist;
let rightFist;
let sfx;

//Glove Stock image: https://stock.adobe.com/images/red-leather-boxing-glove-isolated/109251274?prev_url=detail
function preload() {
  rightFist = loadImage('images/gloveL.png');
  leftFist = loadImage('images/gloveR.png'); 
  sfx = loadSound('sound/Blow1.ogg');  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, {outputStride:8, quantBytes:4}, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function mousePressed(){
  console.log(JSON.stringify(poses))
}

function draw(){
  image(video, 0, 0, width, height);
  strokeWeight(2);
 
  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    const pose = poses[0].pose;
      console.log(pose);

        image(leftFist, pose.leftWrist.x,pose.leftWrist.y , 150, 150);
        image(rightFist, pose.rightWrist.x,pose.rightWrist.y , 150, 150);
        if (pose.rightWrist.y < 300){
          if (sfx.isPlaying() == false){
            sfx.play();
        }}
        if (pose.leftWrist.y < 300){
          if (sfx.isPlaying() == false) {
          sfx.play();}
        }
  }

}