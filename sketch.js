//Variables
let capture;

let numberAlbum = 1;

let myImage1;
let myImage2;
let myImage3;
let myStickers;
let bg;

let mySong1;
let mySong2;
let mySong3;
let mySong4;

let songName = " ";
let artistName = " ";

let fft;
let analyzer;
let slider;

function preload(){
    //Load images
    myImage1 = loadImage("./assets/images/House-of-Balloons.png");
    myImage2 = loadImage("./assets/images/Blond.png");
    myImage3 = loadImage("./assets/images/Starboy.png");
    myStickers = loadImage("./assets/images/Stickers.svg");
    bg =  loadImage("./assets/images/Bg.svg");
    
    //Load songs
    mySong1 = loadSound("./assets/sounds/TheMorning.mp3");
    mySong2 = loadSound("./assets/sounds/Nikes.mp3");
    mySong3 = loadSound("./assets/sounds/Starboy.mp3");
}

function setup() {
    createCanvas(windowWidth,windowHeight);

    rectMode(CENTER);
    imageMode(CENTER);

    //Capture video
    capture = createCapture(VIDEO);
    capture.hide();

    //Waveform
    fft = new p5.FFT();

    //Create slider and set the values (use addClass to change the style of the default slider)
    slider = createSlider(0, 4, 1, 0);
    slider.position(width / 2 - 195, height / 2 + 223.5);
    slider.style("width", "420px");
    slider.addClass("mySliders")

    //Analyse the sound files
    analyzer = new p5.Amplitude();
    analyzer.setInput(mySong1);
    analyzer.setInput(mySong2);
    analyzer.setInput(mySong3);
}

function draw() {
    //Background image
    image(bg, width / 2, height / 2, windowWidth, windowHeight);

    //Black frame behind the album cover
    push();
    stroke(255);
    fill(0);
    strokeWeight(2);
    rect(windowWidth/2, windowHeight/2, 520, 780);
    pop();

    //Stickers
    image(myStickers, width / 2, height / 2, 0.8 * myStickers.width, 0.8 * myStickers.height);

    //Camera settings
    push();
    translate(width, 0);
    scale(-1, 1);
    image(capture, width / 2, 319, 467, 429);
    pop();

    //Create an instance of the class myAlbums
    let screen = new myAlbums();
    screen.show();

    //Button Play
    push();
    btnPlay = createImg("assets/images/Play_btn.svg");
    btnPlay.style("width", "55px");
    btnPlay.position(width / 2 - 75, height / 2 + 290);
    btnPlay.mousePressed(playClicked);
    pop();

    //Button Pause
    push();
    btnPause = createImg("assets/images/Pause_btn.svg");
    btnPause.style("width", "55px");
    btnPause.position(width / 2 + 20, height / 2 + 290);
    btnPause.mousePressed(pauseClicked);
    pop();

    //Button Next
    push();
    btnNext = createImg("assets/images/Next_btn.svg");
    btnNext.style("width", "32px");
    btnNext.position(width / 2 + 125, height / 2 + 300);
    btnNext.mousePressed(nextClicked);
    pop();

    //Button Back
    push();
    btnBack = createImg("assets/images/Back_btn.svg");
    btnBack.style("width", "32px");
    btnBack.position(width / 2 - 157, height / 2 + 300);
    btnBack.mousePressed(backClicked);
    pop();

    //Button Save
    push();
    btnBack = createImg("assets/images/Save_btn.svg");
    btnBack.style("width", "200px");
    btnBack.position(width / 2 + 140, -10);
    btnBack.mousePressed(saveFrame);
    pop();  

    //Volume Icon
    push();
    btnBack = createImg("assets/images/Volume.svg");
    btnBack.style("width", "28px");
    btnBack.position(width / 2 - 230, height / 2 + 215);
    pop();  
    
    //Slider value
    let value = slider.value();
    mySong1.amp(value);
    mySong2.amp(value);
    mySong3.amp(value);
}

//Create the class myAlbum and set position and size of the Images
class myAlbums {
    constructor(temp_x, temp_y, temp_w, temp_h) {
        this.x = width / 2;
        this.y = 300;
        this.w = myImage1.width / 9;
        this.h = myImage1.width / 9;
    }

    show() {
        //Associate each numberAlbum to a different image
        //For each image, store a different text in the variables songName and artistName
        //For each image, call the functions createText and waveform
        push();
        if (numberAlbum == 1) {
            image(myImage1, this.x, this.y, this.w, this.h);
            songName = "The Morning";
            artistName = "The Weeknd";
            createText();
            waveform();
        } else if (numberAlbum == 2) {
            image(myImage2, this.x, this.y, this.w, this.h);
            songName = "Nikes";
            artistName = "Frank Ocean";
            createText();
            waveform();
        } else if (numberAlbum == 3) {
            image(myImage3, this.x, this.y, this.w, this.h);
            songName = "Starboy";
            artistName = "The Weeknd";
            createText();
            waveform();
        }
        pop();
    }
}

//Create the text using the variables songName and artistName as content
function createText() {

    //Song name
    push();
    textFont("Space Grotesk");
    textAlign(LEFT);
    textSize(24);
    fill(255);
    noStroke();
    text(songName, width / 2 - 235, height / 2 + 140);
    pop();

    //Artist name
    push();
    textSize(20);
    fill(150);
    noStroke();
    text(artistName, width / 2 - 235, height / 2 + 170);
    pop();
}

//Create the waveform
function waveform() {
    push();
    let waveform = fft.waveform();
    noStroke()
    fill(255);

    //create two different lines of ellipses for each side of the screen
    beginShape();
    for (let i = 0; i < waveform.length; i ++) {
        let x = map(i, 0, waveform.length, -(width/3), width/3 - 10);
        let y = map(waveform[i], -3, 3, height, 0);
    ellipse(x, y, 4)
    }
    endShape();

    beginShape();
    for (let i = 0; i < waveform.length; i ++) {
        let x = map(i, 0, waveform.length, 2 * width/3 + 10, width + (width/3));
        let y = map(waveform[i], -3, 3, height, 0);
    ellipse(x, y, 4)
    }
    endShape();

    pop();
}

//For each numberAlbum start the corresponding song when Play is clicked (if the song isn't already playing)
function playClicked() {
    console.log("play clicked");

    if (numberAlbum == 1 && mySong1.isPlaying() == false) {
        mySong1.loop();
    } else if (numberAlbum == 2 && mySong2.isPlaying() == false) {
        mySong2.loop();
    } else if (numberAlbum == 3 && mySong3.isPlaying() == false) {
        mySong3.loop();
    }
}

//Stop the song when Pause is clicked
function pauseClicked() {
    console.log("pause clicked");
    mySong1.pause();
    mySong2.pause();
    mySong3.pause();
}

//When Next is clicked, increase the value of the variable numberAlbum and if that value is > 3 (max n. of albums), set it at 1.
function nextClicked() {
    numberAlbum++;
    if (numberAlbum == 4) {
        numberAlbum = 1;
        console.log(numberAlbum);
    }
   
    //When Next is clicked, play the following song, if the previous one is playing
    if (numberAlbum == 2 && mySong1.isPlaying() == true) {
        mySong1.stop();
        mySong2.loop();
    } else if (numberAlbum == 3 && mySong2.isPlaying() == true) {
        mySong2.stop();
        mySong3.loop();
    }  else if (numberAlbum == 1 && mySong3.isPlaying() == true) {
        mySong3.stop();
        mySong1.loop();
    }
}

//When Back is clicked, decrease the value of the variable numberAlbum and if that value is < 1, set it at 3.
function backClicked() {
    numberAlbum--;
    if (numberAlbum == 0) {
        numberAlbum = 3;
        console.log(numberAlbum);
    }

    //When Back is clicked, play the previous song, if the following one is playing
    if (numberAlbum == 2 && mySong3.isPlaying() == true) {
        mySong3.stop();
        mySong2.loop();
    } else if (numberAlbum == 1 && mySong2.isPlaying() == true) {
        mySong2.stop();
        mySong1.loop();
    } else if (numberAlbum == 3 && mySong1.isPlaying() == true) {
        mySong1.stop();
        mySong3.loop();
    }
}

function saveFrame() {
    save("myAlbum.png");
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}