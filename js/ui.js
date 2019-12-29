const carousel = document.querySelector('.carousel');


document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  //console.log('DOM event listener')
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});

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
      <img src="./img/dish.png">
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