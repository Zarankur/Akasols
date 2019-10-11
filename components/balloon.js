/**
 * Spawn entity at the intersection point on click, given the properties passed.
 *
 * `<a-entity balloon="event: click; mixin: balloon; text.value: Write what you want your Akasol to do; material.color: red">` will spawn
 * `<a-entity mixin="balloon" text="value: Write what you want your Akasol to do" material="color: red">` at intersection point.
 * Put things you want to design the balloon with in your mixin definition
 */

 //let voxellist = [];

AFRAME.registerComponent('balloon', {
  schema: {
    default: '',
    parse: AFRAME.utils.styleParser.parse
  },

  init: function () {
    const data = this.data;
    const el = this.el;

    let screenVector = new THREE.Vector3 ();
    let raycaster = new THREE.Raycaster ();

    screenVector.set( 0, 0, 0 ); this.localToWorld( screenVector );
    raycaster.ray.direction.copy( screenVector );

    raycaster.ray.origin.set( 0, 0, 0 ); camera.localToWorld( raycaster.ray.origin );
    raycaster.ray.direction.sub( raycaster.ray.origin );
    
    let distance = raycaster.ray.direction.length();
    raycaster.ray.direction.normalize();
    
    let intersections = raycaster.intersectObject( scene, true );
    if( intersections.length && ( intersections[0].distance < distance )) {
        
        // overlay anchor is obscured
        this.popup.style.display = 'none';
        
    } else {
        
        // overlay anchor is visible
        screenVector.project( camera );
        
        this.popup.style.display = '';
        this.popup.style.left = Math.round((screenVector.x + 1) * container.offsetWidth / 2 - 50) + 'px';
        this.popup.style.top = Math.round((1 - screenVector.y) * container.offsetHeight / 2 - 50) + 'px';
    }

    el.addEventListener(data.event, evt => {

      // PUT HERE CODE FOR THE click command to the AWS

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