// if('serviceWorker' in navigator){
//   navigator.serviceWorker.register('/sw.js')
//     .then(reg => console.log('service worker registered'))
//     .catch(err => console.log('service worker not registered', err));
// }


const storeSession = (list=['voxels','cameraPos']) => {

  list.forEach(element => {
    switch(element){
      case 'voxels':
        let voxelprops = [];
        const voxels = document.querySelectorAll('a-entity.collidable');
        
        voxels.forEach(voxel => {
          voxelprops.push({position: voxel.getAttribute('position'), color: voxel.getAttribute("material").color});
        });
        sessionStorage.setItem(element, JSON.stringify(voxelprops));
        // alert("saving voxels")
        break;

      case 'cameraPos':
        const cameraPosition = document.querySelector("#camera").getAttribute('position');
        const cameraRotation = document.querySelector("#camera").getAttribute('rotation');
        sessionStorage.setItem(element, JSON.stringify({position: cameraPosition, rotation: cameraRotation}));
        break;

      default:
        console.log('selected Wrong case for storeSession')
    }
  });
  // const voxelcolor = document.querySelectorAll('a-entity.collidable').getAttribute("material").color;
  
}