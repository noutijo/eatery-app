let GMapObject;
let list;
let index;
let gMap;
let clickPosition;

/*Get current user position*/
function getUserPosition() {
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

/*init() function for the map*/
function init() {
    getUserPosition()
        .then((UserPosition) => {

            gMap = new google.maps.Map(document.getElementById("map"), {
                center: UserPosition,
                zoom: 13
            });

            GMapObject = new MapContent(gMap, UserPosition);
            list = new List(GMapObject);

            GMapObject.getRestaurantAround()
                .then((restaurants) => {

                    for (let index = 0; index < restaurants.length; index++) {

                        GMapObject.getPlaceDetails(restaurants[index].place_id, (res) => {

                            let restau = new Restaurant(restaurants[index].name, restaurants[index].icon, restaurants[index].vicinity, restaurants[index].geometry.location, res, list.allRestaurant.length)

                            list.addRestaurant(list.allRestaurant.length, restau);
                            GMapObject.addRestauMaker(restau.name, restau.position);

                        });
                    }

                    //load local restaurants
                    /*return fetch("./restaurant.json").then(resp => {
                        return resp.json();
                    })*/

               /* }).then(localRestaurants => {
                    localRestaurants.forEach((item) => {
                        let restaurant = new Restaurant(item.restaurantName, "./assets/imgs/icon.jpeg", item.address, {
                            lat: item.lat,
                            lng: item.long
                        }, item.ratings, list.allRestaurant.length)

                        list.addRestaurant(list.allRestaurant.length, restaurant);
                        GMapObject.addRestauMaker(restaurant.name, restaurant.position);
                    });*/
                }).catch(error => {
                    $('#restaurantsList').append(error);
                });

            //Display toast that inform user possibility to add new restaurant 
            $('#toast-info').toast('show');

            /*Get lat & lng when user make right click on the map*/
            google.maps.event.addListener(gMap, 'contextmenu', function (event) {

                $('#staticBackdropRestau').modal('show');

                clickPosition = JSON.stringify(event.latLng);
                clickPosition = JSON.parse(clickPosition);

            });

        }).catch(error => {
            $('#restaurantsList').append(error);
            $('#restaurantsList').css({
                'padding-top': '50px',
                'color': 'red'
            });
        })
}

/*When add new restaurant*/
$('#AddNewRestaurantButton').on('click', (event) => {

    if ($('#restaurantName').val() === '' || $('#restaurantAddreess').val() === '') {
        $('#addRestauError').show();
    } else {

        let restaurant = new Restaurant($('#restaurantName').val(), "./assets/imgs/icon.jpeg", $('#restaurantAddreess').val(), {
            lat: clickPosition.lat,
            lng: clickPosition.lng
        }, [], list.allRestaurant.length)

        list.addRestaurant(list.allRestaurant.length, restaurant);
        GMapObject.addRestauMaker($('#restaurantName').val(), restaurant.position);

        //clear field and close modal
        document.getElementById('restaurantName').value = '';
        document.getElementById('restaurantAddreess').value = '';
        $('#staticBackdropRestau').modal('hide');
        $('#toast-sucessRestau').toast('show');
    }
})

/*close display error when adding restaurant*/
$('#restaurantName').keyup(() => {
    $('#addRestauError').hide();
})
$('#restaurantAddreess').keyup(() => {
    $('#addRestauError').hide();
})

/*Sort restaurant*/
let sortRestaurent = () => {
    let minRate = $('#minRate').val();
    let maxRate = $('#maxRate').val();


    if (isMinRateLessThanMaxRate(minRate, maxRate)) {
        list.filter(minRate, maxRate);
    } else {
        alert('Check your rating interval.');
    }
}

/*Check if interval is right*/
let isMinRateLessThanMaxRate = (minRate, maxRate) => {
    return (minRate <= maxRate);
}

/*Get id*/
let addComment = (id) => {
    index = id.split('_')[1];
}

/*When add new comment*/
$('#AddNewCommentButton').on('click', (event) => {

    if ($('#userComment').val() === '') {
        $('#addCommentError').show();
    } else {
        let rating = $('#userRating').val();
        let comment = $('#userComment').val();

        list.allRestaurant[index].updateComment({
            stars: parseInt(rating),
            comment: comment
        });

        //clear textarea
        document.getElementById('userComment').value = '';
    }
})

/*close display error when adding new comment*/
$('#userComment').keyup(() => {
    $('#addCommentError').hide();
})
