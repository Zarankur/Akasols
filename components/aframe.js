// let mainScene = document.querySelector(".mainScene");

// let voxelprops = JSON.parse(sessionStorage.getItem('voxels'));
// console.log(voxelprops);

// // Generate voxels
// if (voxelprops != [] || voxelprops != ""){
//     voxelprops.forEach(voxel =>{
//         const spawnEl = document.createElement('a-entity');
//         AFRAME.utils.entity.setComponentProperty(spawnEl, 'mixin', 'oldvoxel');
//         AFRAME.utils.entity.setComponentProperty(spawnEl, 'position', voxel.position);
//         AFRAME.utils.entity.setComponentProperty(spawnEl, 'color', voxel.color);
//         mainScene.appendChild(voxel);
//         console.log(voxel);
//     });
// } else{voxellist = []}