function init() {

    let map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 4.0510564,
            lng: 9.6678687
        },
        zoom: 10
    });


    let list = new List();
    let carte = new Carte(map);

    carte.getUserPosition()
        .then((position) => {
            carte.currentUserPosition = position;
            carte.map.setCenter(position);
            carte.addMarkerUser(position);

            fetch("./restaurant.json").then(resp => {
                return resp.json();
            }).then(restaurants => {

                restaurants.forEach((item, index) => {
                    let restaurant = new Restaurant(item.restaurantName, item.address, {
                        lat: item.lat,
                        lng: item.long
                    }, item.ratings,index)

                    list.addRestaurant(restaurant);
                    carte.addMarkerRestau(restaurant.position);
                });
            }).catch(error => {
                $('#restaurantsList').append(error);
            });


        }).catch(error => {
            $('#restaurantsList').append(error);
            $('#restaurantsList').css({
                'padding-top': '50px',
                'color': 'red'
            });
        })
}


let sortRestaurent = () => {
    let minRate = $('#minRate').val();
    let maxRate = $('#maxRate').val();

    alert(isMinRateLessThanMaxRate(minRate, maxRate));

}

let isMinRateLessThanMaxRate = (minRate, maxRate) => {
    return (minRate < maxRate);
}

$(window).scroll(function () {
    if ($(this).scrollTop() > 40) {
        $('#navbar_top').addClass("fixed-top");
    } else {
        $('#navbar_top').removeClass("fixed-top");
    }
});


/*async function displayLocalRestaurant() {
    let resp = await fetch("./restaurant.json");
    let restaurants = await resp.json();

    displayRestaurants(restaurants);
}*/

/*
carte.displayLocalRestaurant();
carte.displayRestaurantAround()
    .then((res) => {
        console.log(res);
    })
*/