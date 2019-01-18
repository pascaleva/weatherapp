//Mit echten Werten gefüllt werden diese in der Funktion gotWeather
let weatherdays=[]; //in dieses Array füllen wir die Wettervorschau der kommenden Tage
let key='40b22b313dbc476080e92034191101'; // signup https://www.apixu.com/signup.aspx

let input, button;
let d = 600;


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
    drawavgTemp();
    drawDate();
    drawRain();

    stroke(255,30);
    ellipse(width/2, height/2, 500,500);
    ellipse(width/2, height/2, 350,350);



    let from = color(0, 0, 192);
    let to = color(214, 0, 0);
    colorMode(RGB); // Try changing to HSB.
    let interA = lerpColor(from, to, 0.17);
    let interB = lerpColor(from, to, 0.33);
    let interC = lerpColor(from, to, 0.5);
    let interD = lerpColor(from, to, 0.67);
    let interE = lerpColor(from, to, 0.83);

    fill(from);
    rect(700, 20, 20, 60);
    fill(interA);
    rect(720, 20, 20, 60);
    fill(interB);
    rect(740, 20, 20, 60);
    fill(interC);
    rect(760, 20, 20, 60);
    fill(interD);
    rect(780, 20, 20, 60);
    fill(interE);
    rect(800, 20, 20, 60);
    fill(to);
    rect(820, 20, 20, 60);


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


// eigene Funktion average Temperatur gradient
function drawavgTemp() {
  let days=weatherdays.length;//Hier fragen wir ab,  wieviele Tage im Array weatherdays gespeichert sind
  let angle=360/days;// Hier rechnen wir den Drehwinkel, damit das mit der Anzahl Tage schön aufgeht

  push();//wir speichern das Koordinatensystem ab

  translate(width/2, height/2);//wir verschieben das Koordinatensystem in die Mitte
  rotate(-90); //wir drehen die Canvas um bei 12:00 mit zeichnen zu beginnen


  for(let s=0;s<days;s++){
      let avgtemp = weatherdays[s].day.avgtemp_c;
      fill(200,0,50,200);
      noStroke();
      ellipse(230,0, avgtemp*30,avgtemp*30);
      rotate(angle);//hier brauchen wir unseren ausgerechneten Winkel und drehen nach jedem Zeichnen eins weiter
  }
  pop();//wir setzen das Koordinatensystem zurück
}


// eigene Funktion Date
function drawDate() {
  let days=weatherdays.length;//Hier fragen wir ab,  wieviele Tage im Array weatherdays gespeichert sind
  let angle=360/days;// Hier rechnen wir den Drehwinkel, damit das mit der Anzahl Tage schön aufgeht
  push();//wir speichern das Koordinatensystem ab

  translate(width/2, height/2);//wir verschieben das Koordinatensystem in die Mitte
  rotate(-90); //wir drehen die Canvas um bei 12:00 mit zeichnen zu beginnen
  noStroke();
  fill(255,180);

  for(let s=0;s<days;s++){
      text(weatherdays[s].date, 300,0);//Datumausgabe
      rotate(angle);//hier brauchen wir unseren ausgerechneten Winkel und drehen nach jedem Zeichnen eins weiter
  }
  pop();//wir setzen das Koordinatensystem zurück
}

//Funktion rain
function drawRain() {
let days=weatherdays.length;
let angle=360/days;
push();//wir speichern das Koordinatensystem ab
translate(width/2, height/2);
rotate(-90);
fill(67,29,255);

for(let s=0;s<days;s++){
    let rain = weatherdays[s].day.totalprecip_mm;//Regen
    noStroke();
    ellipse(70,0, rain*10,rain*2);
    rotate(angle);//hier brauchen wir unseren ausgerechneten Winkel und drehen nach jedem Zeichnen eins weiter
}
pop();
}
