/**
 * Spawn entity at the intersection point on click, given the properties passed.
 *
 * `<a-entity intersection-spawn="mixin: box; material.color: red">` will spawn
 * `<a-entity mixin="box" material="color: red">` at intersection point.
 */

 //let voxellist = [];

AFRAME.registerComponent('intersection-spawn', {
  schema: {
    default: '',
    parse: AFRAME.utils.styleParser.parse
  },

  init: function () {
    const data = this.data;
    const el = this.el;

    el.addEventListener(data.event, evt => {
      // Create element.
      const spawnEl = document.createElement('a-entity');

      // Snap intersection point to grid and offset from center.
      spawnEl.setAttribute('position', evt.detail.intersection.point);

      // let html = `<a-entity class ="collidable" mixin="voxel" position="${} ${} ${}"></a-entity>`
      // console.log(spawnEl);
      console.log(evt.detail.intersection.point);
      
      // Set components and properties.
      Object.keys(data).forEach(name => {
        if (name === 'event') { return; }
        AFRAME.utils.entity.setComponentProperty(spawnEl, name, data[name]);
      });

      // Append to temp database
      // console.log(voxellist);
      // Append to scene.
      el.sceneEl.appendChild(spawnEl);
      //voxellist.push(JSON.stringify(spawnEly));
      //console.log(voxellist);
    });
  }
});


// AFRAME.registerComponent('collider-check', {
//   dependencies: ['raycaster'],

//   init: function () {
//     this.el.addEventListener('raycaster-intersection', function () {
//       console.log('Player hit something!');
//     });
//   }
// });