AFRAME.registerComponent('registerevents', {
    init: function () {
        let marker = this.el;

        marker.addEventListener('markerFound', function(e, data) {
            let markerId = marker.id;
            console.log('markerFound', markerId);
            console.log('event', e);
            console.log('data', data);
            // TODO: Add your own code here to react to the marker being found.
        });

        marker.addEventListener('markerLost', function(e, data) {
            var markerId = marker.id;
            console.log('markerLost', markerId);
            console.log('event', e);
            console.log('data', data);
            // TODO: Add your own code here to react to the marker being lost.
        });
    }
});