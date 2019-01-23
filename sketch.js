//Mit echten Werten gefüllt werden diese in der Funktion gotWeather
let weatherdays=[]; //in dieses Array füllen wir die Wettervorschau der kommenden Tage
let key='40b22b313dbc476080e92034191101'; // signup https://www.apixu.com/signup.aspx

let input, button;
let d = 500;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);

  let url = 'https://api.apixu.com/v1/forecast.json?key=40b22b313dbc476080e92034191101&q=Zürich&days=7';

  //button und submit
  input = createInput();
  input.position(20, 65);

  button = createButton('submit');
  button.position(input.x + input.width, 65);
  button.mousePressed(reloadJson);

  loadJSON(url, gotWeather);//nachdem das json File geladen ist, rufen wir die Funktion gotWeather auf

}

function draw() {

  background(0);
  noFill();
  drawMaxWindKm();
  drawDate();
  drawRainCircles();
  drawDayGradient();
  drawMinMaxTemperature();

  stroke(255,30);
  //ellipse(width/2, height/2, 500,500);
  //ellipse(width/2, height/2, 350,350);
  noStroke();

}

function gotWeather(weather) {
    weatherdays=weather.forecast.forecastday;
}

//reloadJson Funktion
function reloadJson() {
let ort = input.value();
let url = 'https://api.apixu.com/v1/forecast.json?key='+key+'&q='+ort+'&days=7';
loadJSON(url, gotWeather);
}

//Funktion min max Temperatur
function drawMinMaxTemperature() {
  let days=weatherdays.length;
  let angle=360/days;
  push();//wir speichern das Koordinatensystem ab
  translate(width/2, height/2);
  rotate(-90);

  noFill();
  stroke(255);
  strokeWeight(1);
  //ellipse(0,0, d-200,d-200); //-40 Grad
  //ellipse(0,0, d,d); //+40 Grad

  noStroke();
  fill(255,50);
  for(let s=0;s<days;s++){
      let minTemp = weatherdays[s].day.mintemp_c;
      let maxTemp = weatherdays[s].day.maxtemp_c;
      let xPos = map(minTemp,-40,40,(d-200)/2,(d)/2);//xPos ist spannend, yPos ist immer gleich da wir es ja drehen
      ellipse(xPos,0,30,30,);//min temperatur

      xPos = map(maxTemp,-40,40,(d-200)/2,(d)/2);//xPos muss nicht mehr mit let definiert werden
      ellipse(xPos,0,30,30,);//max temperatur
      rotate(angle);
  }
  pop();

}



//rain circles
function drawRainCircles(){
    let days=weatherdays.length;
    let angle=360/days;

    push();

    translate(width/2, height/2);
    rotate(-90);

    //1. from to sind fixe farben
    let from = color(0,3,19);
    let to = color(0, 100, 213);



    for(let s=0;s<days;s++){
        let rainmm = weatherdays[s].day.totalprecip_mm;

        let step = map(rainmm,0,6,0,1);//leider sind die unterschiede nicht so gross zwischen den tagen.hier temperatur gemapt zwischen -2 und 2 grad für grösseren Effekt
        let daycolor=lerpColor(from, to, step);

        let nextday=s+1;
        if(nextday > days-1) nextday=0;

        rainmm = weatherdays[nextday].day.totalprecip_mm;
        step = map(rainmm,0,6,0,1);
        let nextdaycolor=lerpColor(from, to, step);

        let anzStufen=Math.floor(360/days); //ergibt stufen pro tag
        let inter;


        for(let n=0;n<anzStufen;n++){


            inter = lerpColor(daycolor, nextdaycolor, n * 1/anzStufen);//hier stufe rechnen
            noStroke();
            fill(inter);
            ellipse(80,0,100,100);
            rotate(1);

        }
    }pop();//wir setzen das Koordinatensystem zurück
}

//max temp gradient
function drawDayGradient(){
    let days=weatherdays.length;
    let angle=360/days;

    push();

    translate(width/2, height/2);
    rotate(-90);

    //from to sind fixe farben
    let from = color(0, 0, 192);
    let to = color(214, 0, 0);

    for(let s=0;s<days;s++){
        let maxtemp = weatherdays[s].day.maxtemp_c;
        /*2. mit map wird die tagesfarbe gerechnet
         angenommen -20 grad ist from und 40 grad to, dann wird um den Schnitt zwischen 0 und 1 gerechnet
         */

        let step = map(maxtemp,-10,25,0,1);//hier temperatur gemapt zwischen -10 und 20 grad für grösseren Effekt
        let daycolor=lerpColor(from, to, step);

        /*
        analog farbe für den nächsten Tag (Verlauf)
         */
        let nextday=s+1;
        if(nextday > days-1) nextday=0;

        maxtemp = weatherdays[nextday].day.maxtemp_c;
        step = map(maxtemp,-10,25,0,1);
        let nextdaycolor=lerpColor(from, to, step);

        /*
        4. schlaufe um feiner übergänge zu machen
         */

        let anzStufen=Math.floor(360/days); //ergibt stufen pro tag
        let inter;


        for(let n=0;n<anzStufen;n++){


            inter = lerpColor(daycolor, nextdaycolor, n * 1/anzStufen);//hier stufe rechnen
            noStroke();
            fill(inter);
            ellipse(200,0,100,100);
            rotate(1.5);

        }
    }  pop();//wir setzen das Koordinatensystem zurück

}

//Funktion maxwind
function drawMaxWindKm(){
    let days=weatherdays.length;
    let angle=360/days;

    push();

    translate(width/2, height/2);
    rotate(-90);

    //1. from to sind fixe farben
    let from = color(0);
    let to = color(50);



    for(let s=0;s<days;s++){
        let maxwind = weatherdays[s].day.maxwind_kph;

        let step = map(maxwind,0,30,0,1);//leider sind die unterschiede nicht so gross zwischen den tagen.hier temperatur gemapt zwischen -2 und 2 grad für grösseren Effekt
        let daycolor=lerpColor(from, to, step);

        let nextday=s+1;
        if(nextday > days-1) nextday=0;

        maxwind = weatherdays[nextday].day.maxwind_kph;
        step = map(maxwind,0,30,0,1);
        let nextdaycolor=lerpColor(from, to, step);

        let anzStufen=Math.floor(360/days); //ergibt stufen pro tag
        let inter;


        for(let n=0;n<anzStufen;n++){


            inter = lerpColor(daycolor, nextdaycolor, n * 1/anzStufen);//hier stufe rechnen
            noStroke();
            fill(inter);
            ellipse(270,0,20,20);
            rotate(1);

        }
    }pop();//wir setzen das Koordinatensystem zurück
}


// eigene Funktion Date
function drawDate() {
  let days=weatherdays.length;//Hier fragen wir ab,  wieviele Tage im Array weatherdays gespeichert sind
  let angle=360/days;// Hier rechnen wir den Drehwinkel, damit das mit der Anzahl Tage schön aufgeht
  push();//wir speichern das Koordinatensystem ab

  translate(width/2, height/2);//wir verschieben das Koordinatensystem in die Mitte
  rotate(-90); //wir drehen die Canvas um bei 12:00 mit zeichnen zu beginnen
  noStroke();
  textSize(10);
  fill(255,180);

  for(let s=0;s<days;s++){
      text(weatherdays[s].date, 300,0);//Datumausgabe
      rotate(angle);//hier brauchen wir unseren ausgerechneten Winkel und drehen nach jedem Zeichnen eins weiter
  }
  pop();//wir setzen das Koordinatensystem zurück
}
