class Card {

    constructor(gMap, currentUserPosition) {
        this.gMap = gMap;
        this.currentUserPosition = currentUserPosition;
        this.service = new google.maps.places.PlacesService(gMap);
        // this.service = new google.maps.places.PlacesService(gMap);
        this.restaurants = [];
        this.markers = [];
        this.addMarkerUser();
    }

    addMarkerUser() {
        new google.maps.Marker({
            position: this.currentUserPosition,
            map: this.gMap
        });
    }

    addMarkerRestau(name, position) {
        let icon = {
            url: "./assets/icons/marker.png",
            scaledSize: new google.maps.Size(30, 30),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0)
        };

        let maker = new google.maps.Marker({
            position: position,
            map: this.gMap,
            icon: icon,
            title: name
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

    getPlaceDetails(place_id, callback) {

        let placesInfo = [];
        let ratings = [];

        let fields = ['name', 'formatted_address', 'formatted_phone_number', 'rating', 'user_ratings_total', 'reviews', 'photo', 'place_id', 'geometry'];

        // Get Places Details=
        this.service.getDetails({
            placeId: place_id,
            fields
        }, (placeInfo, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {

                placesInfo.push(placeInfo);
                
                placesInfo[0].reviews.forEach(item => {
                    ratings.push({
                        "stars": item.rating,
                        "comment": item.text
                    });
                });
                
                callback(ratings);
            }
        })
    }
}