let cardObject;
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
        .then((position) => {

            gMap = new google.maps.Map(document.getElementById("map"), {
                center: position,
                zoom: 10
            });

            cardObject = new Card(gMap, position);
            list = new List(cardObject);

            fetch("./restaurant.json").then(resp => {
                    return resp.json();
                }).then(restaurants => {

                    restaurants.forEach((item, index) => {
                        let restaurant = new Restaurant(item.restaurantName, item.address, {
                            lat: item.lat,
                            lng: item.long
                        }, item.ratings, index)

                        list.addRestaurant(restaurant);
                        cardObject.addMarkerRestau(restaurant.position);
                    });

                }).catch(error => {
                    $('#restaurantsList').append(error);
                });

            cardObject.getRestaurantAround()
                .then((res) => {
                    console.log(JSON.parse(JSON.stringify(res)));
                })

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

        let restaurant = new Restaurant($('#restaurantName').val(), $('#restaurantAddreess').val(), {
            lat: clickPosition.lat,
            lng: clickPosition.lng
        }, [], list.allRestaurant.length)

        list.addRestaurant(restaurant);
        cardObject.addMarkerRestau(restaurant.position);

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