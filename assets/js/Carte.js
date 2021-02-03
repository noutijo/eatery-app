class Carte {

    constructor(map) {
        this.map = map;
        this.currentUserPosition = null;
        this.service = new google.maps.places.PlacesService(map);
        this.restaurants=[];
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
            if (!navigator.geolocation) {
                reject("We can't display the map")
            }

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        });
                    }
                );
            }
        })
    }


    displayLocalRestaurant() {
        fetch("./restaurant.json").then(resp => {
            return resp.json();
        }).then(restaurants => {
            this.restaurants=restaurants;
            this.displayRestaurants(this.restaurants);
        }).catch(error => {
            console.log(error);
        });
    }

    displayRestaurants = restaurants => {
        restaurants.forEach((restaurant, index) => {

            $('#restaurantsList').append(`
        
                            <div class="col-12 make-shbr mt-3 animate__animated animate__fadeInRight animate__delay-0.5s">
                                    <p class="mt-3 mb-3"><strong>${restaurant.restaurantName}</strong></p>
                                    <p class="my-3">${restaurant.address}</p>
                                    <p class="my-3">Raiting</p>
                                    <p>
                                    <div class="accordion" id="accordionExample">
                                        <div class="card">
                                            <div class="card-header" id="headingOne">
                                                <h2 class="mb-0">
                                                    <div class="btn btn-link btn-block text-left"
                                                        data-toggle="collapse" data-target="#collapse${index}"
                                                        aria-expanded="true" aria-controls="collapse${index}">
                                                        <i class="fa fa-arrow-down"></i>
                                                    </div>
                                                </h2>
                                            </div>
                                            <div id="collapse${index}"
                                            class="collapse"
                                            aria-labelledby="headingOne"
                                                data-parent="#accordionExample">
                                                <div class="card-body">
                                                    ${restaurant.ratings.forEach(item => {
                                                       `${item.comment}`
                                                   })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </p>
                             </div>                             
        
        `);

            this.addMarkerRestau({
                lat: restaurant.lat,
                lng: restaurant.long
            });
        })
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