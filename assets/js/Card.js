class Card {

    constructor(map, currentUserPosition) {
        this.map = map;
        this.currentUserPosition = currentUserPosition;
        this.service = new google.maps.places.PlacesService(map);
        this.restaurants = [];
        this.markers = [];
        this.addMarkerUser();
    }

    addMarkerUser() {
        new google.maps.Marker({
            position: this.currentUserPosition,
            map: this.map
        });
    }

    addMarkerRestau(position) {
        let icon = {
            url: "./assets/icons/marker.png", 
            scaledSize: new google.maps.Size(30, 30),
            origin: new google.maps.Point(0, 0), 
            anchor: new google.maps.Point(0, 0)
        };

        let maker = new google.maps.Marker({
            position: position,
            map: this.map,
            icon: icon,
        });

        this.markers.push(maker);
    }

    removeAllMarkerResto() {
        for (let index = 0; index < this.markers.length; index++) {
            this.markers[index].setMap(null);
        }
        this.markers = [];
    }

    getRestaurantAround() {
        return new Promise((resolve, reject) => {
            this.service.nearbySearch({
                location: this.currentUserPosition,
                radius: 5000,
                types: ['restaurant']
            }, (res) => {
                resolve(res);
            });
        })
    }
}