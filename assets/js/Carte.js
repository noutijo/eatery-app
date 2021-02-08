class Carte {

    constructor(map) {
        this.map = map;
        this.currentUserPosition = null;
        this.service = new google.maps.places.PlacesService(map);
        this.restaurants = [];
    }

    addMarkerUser(position) {
        new google.maps.Marker({
            position: position,
            map: this.map
        });
    }
    addMarkerRestau(position) {

        var icon = {
            url: "./assets/icons/marker.png", // url
            scaledSize: new google.maps.Size(30, 30), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };
        new google.maps.Marker({
            position: position,
            map: this.map,
            icon: icon
        });
    }

    getUserPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                }, () => {
                    reject('We need to know your location to display restaurants around you.');
                }
            );
        });
    }


    displayRestaurantAround() {

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