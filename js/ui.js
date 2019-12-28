const carousel = document.querySelector('.carousel');
const aframe_gui = document.querySelector('.aframe_gui');
// const htmlelement = document.querySelector("#htmlElement");
// const htmlelement2 = document.querySelector("#htmlElement2");
// let device = new Device("cloud.arest.io/akasol");

// htmlelement.addEventListener('click', function(){
//   console.log("element_clicked");
//   let background = htmlelement.style.background
//   if (background == "green"){
//     device.digitalWrite(4, 1);
//     htmlelement.style.background = "red";
//   } else {
//     device.digitalWrite(4, 0);
//     htmlelement.style.background = "green";
//   }

// });

// htmlelement2.addEventListener('click', function(){
//   console.log("element_clicked");
  
//   device.digitalWrite(4, 1);

// });
const url = 'https://esp8266.local/' //'//192.168.1.14/'; //'//192.168.0.174:1880/hello';     // '//192.168.1.14/';

function press_button(name){
  const xhttp = new XMLHttpRequest();
  const urlname = url + name
  const pin = name.split("_")[0];
  const state = name.split("_")[1];
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // const element = document.getElementById(name);
      if (state == "on"){
        document.getElementById(pin + "_on").className = "button on";
        document.getElementById(pin + "_off").className = "button2 on";
      } else if (state == "off"){
        document.getElementById(pin + "_on").className = "button off";
        document.getElementById(pin + "_off").className = "button2 off";
      }
    }
  };
  xhttp.open("GET", urlname, true);
  xhttp.send();
  updateGui();
}
function updateGui( ) {
  // const url = 'http://192.168.1.14/';
  const xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open('GET', url, true);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          let text = xhr.responseText;
          // console.log(text);
          let text1 = text.split("<body>")[1];
          const html = text1.split("</body>")[0];
          // console.log(html);
          aframe_gui.innerHTML = html;
  
        } else {
          console.error(xhr.statusText);
          
        }
      }
    };
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
      const html = `
        <h1> Device is offline </h1>
         `;
      aframe_gui.innerHTML = html;
    };
    xhr.send(null); 

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open('GET', url);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // console.log(xhr.responseText);
          let text = xhr.responseText;
          let text1 = text.split("<body>")[1];
          const html = text1.split("</body>")[0];
          // console.log(html);
          aframe_gui.innerHTML = html;
  
        } else {
          console.error(xhr.statusText);
          
        }
      }
    };
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
      const html = `
        <h1> Device is offline </h1>
         `;
      aframe_gui.innerHTML = html;
    };
    xhr.send(null);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;

}
updateGui();
setInterval(updateGui, 10000 ) ;

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  //console.log('DOM event listener')
  // const menus = document.querySelectorAll('.side-menu');
  // M.Sidenav.init(menus, {edge: 'right'});
  // // add recipe form
  // const forms = document.querySelectorAll('.side-form');
  // M.Sidenav.init(forms, {edge: 'left'});
  // const xhr = new XMLHttpRequest();
  // const url = 'http://192.168.1.14/';
  // xhr.open('GET', url, true);
  // xhr.onload = function (e) {
  //   if (xhr.readyState === 4) {
  //     if (xhr.status === 200) {
  //       // console.log(xhr.responseText);
  //       let text = xhr.responseText;
  //       let text1 = text.split("<body>")[1];
  //       const html = text1.split("</body>")[0];
  //       // console.log(html);
  //       aframe_gui.innerHTML += html;

  //     } else {
  //       console.error(xhr.statusText);
  //     }
  //   }
  // };
  // xhr.onerror = function (e) {
  //   console.error(xhr.statusText);
  // };
  // xhr.send(null); 
  // xhr.send();
  // console.log(xhr);
  // console.log(xhr.response);
  // let text = xhr.responseText;
  // console.log(text);
  // let text1 = text.split("<body>")[1];
  // console.log(text1);
  // const html = text1.split("</body>")[0];
  // aframe_gui.innerHTML += html;

  var images = document.querySelectorAll('.carousel');
  var instances = M.Carousel.init(images,  {
    // fullWidth: true,
    // indicators: true
  });
});

// render carousel data
const renderCarousel = (data, id) => {

  //perhaps I can put a userID in front of the data-id?
  const html = `
    <a class="carousel-item" href="#${id}" data-id="a${id}">
      <img src="/img/dish.png">
      <div class="recipe-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </a>
  `;
  carousel.innerHTML += html;
  var images = document.querySelectorAll('.carousel');
  M.Carousel.init(images,  {});

};

// remove character from carousel
const removeCarousel = (id) => {

  //querySelector id has to start with a letter!!
  const character = document.querySelector(`.carousel-item[data-id=a${id}]`);
  character.remove();
  //var images = document.querySelectorAll('.carousel');
  //var instance = M.Carousel.getInstance(carousel);
  //instance.destroy();
  var images = document.querySelectorAll('.carousel');
  M.Carousel.init(images,  {});
  console.log('character removed');
  
};