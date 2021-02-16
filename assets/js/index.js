let carte;
let list;
let index;

function init() {

    let map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 4.0510564,
            lng: 9.6678687
        },
        zoom: 10
    });


    carte = new Carte(map);
    list = new List(carte);

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
                    }, item.ratings, index)

                    list.addRestaurant(restaurant);
                    carte.addMarkerRestau(restaurant.position);
                });

                $('.toast').toast('show');
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


    if (isMinRateLessThanMaxRate(minRate, maxRate)) {
        list.filter(minRate, maxRate);
    } else {
        alert('Check your rating interval.');
    }
}

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
        document.getElementById('userComment').value = ''
    }
})

/*close display error*/
$('#userComment').keyup(() => {
    $('#addCommentError').hide();
})


/*maanger navbar position when windiw is scrolling*/
$(window).scroll(function () {
    if ($(this).scrollTop() > 40) {
        $('#navbar_top').addClass("fixed-top");
    } else {
        $('#navbar_top').removeClass("fixed-top");
    }
});


/*
carte.displayLocalRestaurant();
carte.displayRestaurantAround()
    .then((res) => {
        console.log(res);
    })
*/