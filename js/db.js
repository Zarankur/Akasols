// enable offline data
db.enablePersistence()
  .catch(function(err) {
    if (err.code == 'failed-precondition') {
      // probably multible tabs open at once
      console.log('persistance failed');
    } else if (err.code == 'unimplemented') {
      // lack of browser support for the feature
      console.log('persistance not available');
    }
  });

// real-time listener
db.collection('characters').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added'){
      // render character data in the carousel
      renderCarousel(change.doc.data(), change.doc.id);
    }
    if(change.type === 'removed'){
      // remove the character data from the carousel
      removeCarousel(change.doc.id)
    }
  });
});

// add new character
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
  evt.preventDefault();
  
  const character = {
    name: form.title.value,
    ingredients: form.ingredients.value
  };

  db.collection('characters').add(character)
    .catch(err => console.log(err));

  form.title.value = '';
  form.ingredients.value = '';
});

// delete a carousel
const carousel_divcont = document.querySelector('.carousel');
carousel_divcont.addEventListener('click', evt => {
  //console.log(evt);

  if(evt.target.tagName === 'I'){
    const id = evt.target.getAttribute('data-id');
    db.collection('characters').doc(id).delete();
  };

});