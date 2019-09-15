/**
 * Snap entity to the closest interval specified by `snap`.
 * Offset entity by `offset`.
 */
AFRAME.registerComponent('snap', {
    dependencies: ['position'],
  
    schema: {
      offset: {type: 'vec3'},
      snap: {type: 'vec3'}
    },
  
    init: function () {
      this.originalPos = this.el.getAttribute('position');
    //   this.cameraPosWhenCreated = this.el.getAttribute('cameraPosWhenCreated');
      console.log(this.originalPos);
    //   console.log(this.cameraPosWhenCreated);
      console.log(this.el);
    },
  
    update: function () {
      const data = this.data;
      const cameraPosition = document.querySelector("#camera").getAttribute('position');
      console.log(cameraPosition);
  
      const pos = AFRAME.utils.clone(this.originalPos);
      
    //   Checking if side of voxel is clicked
      
    //   Make the cubes appear on the negative side as well
      Object.keys(pos).forEach(key => {
        // console.log(pos[key]*10);
        if(Number.isInteger(pos[key]*10) && pos[key] > cameraPosition[key]){
            console.log(pos[key])
            pos[key] -= data.snap[key]
        }
      });
    
      pos.x = Math.floor(pos.x / data.snap.x) * data.snap.x + data.offset.x;
      pos.y = Math.floor(pos.y / data.snap.y) * data.snap.y + data.offset.y;
      pos.z = Math.floor(pos.z / data.snap.z) * data.snap.z + data.offset.z;
  
      this.el.setAttribute('position', pos);
    }
  });