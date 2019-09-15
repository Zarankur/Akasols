//spawn voxels from a previous session

AFRAME.registerComponent('old-voxels', {
  // schema: {
  //   position: '',
  //   color: AFRAME.utils.styleParser.parse
  // },
  
  init: function () {
    // const data = this.data;
    const el = this.el;
  
    const voxelprops = JSON.parse(sessionStorage.getItem('voxels'));
    // console.log(voxelprops);
  
    // Generate voxels
    if (voxelprops != [] && voxelprops != "" && voxelprops != null){
        voxelprops.forEach(voxel =>{
            const spawnEl = document.createElement('a-entity');
            AFRAME.utils.entity.setComponentProperty(spawnEl, 'mixin', 'oldvoxel');
            AFRAME.utils.entity.setComponentProperty(spawnEl, 'class', 'collidable');
            AFRAME.utils.entity.setComponentProperty(spawnEl, 'position', voxel.position);
            AFRAME.utils.entity.setComponentProperty(spawnEl, 'material.color', voxel.color);
            // console.log(voxel.color);
            el.sceneEl.appendChild(spawnEl);
        });
    }
    
      //voxellist.push(JSON.stringify(spawnEly));
      //console.log(voxellist);
  }
});