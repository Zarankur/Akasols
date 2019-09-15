//spawn voxels from a previous session

AFRAME.registerComponent('transpos', {
  dependencies: ['position'],
  
  schema: {
    translate: {type: 'vec3'},
    // snap: {type: 'vec3'}
  },
  
  init: function () {
    // const data = this.data;
    // const el = this.el;
  
  },

  update: function () {
    const data = this.data;
    let el = this.el;
    
    el.object3D.position.x += data.translate.x;
    el.object3D.position.y += data.translate.y;
    el.object3D.position.z += data.translate.z;

    // el.setAttribute('position', pos);
  }
});