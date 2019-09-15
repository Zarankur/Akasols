//spawn voxels from a previous session

AFRAME.registerComponent('keep-camera-pos', {
  // schema: {
  //   position: '',
  //   color: AFRAME.utils.styleParser.parse
  // },
  
  init: function () {
    // const data = this.data;
    const el = this.el;
  
    const cameraPos = JSON.parse(sessionStorage.getItem('cameraPos'));
    if (cameraPos != null){
      AFRAME.utils.entity.setComponentProperty(el, 'position', cameraPos.position);
    } 
    // else{el.object3D.position.z += 1.6}
    // AFRAME.utils.entity.setComponentProperty(el, 'rotation', cameraPos.rotation);
    
      //voxellist.push(JSON.stringify(spawnEly));
      //console.log(voxellist);
  }
});