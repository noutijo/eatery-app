let map;

function getCurrentPosition() {

    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject('We can\'t display the map')
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

function initMap() {

    getCurrentPosition()
        .then(position => {
            console.log(position);
            map = new google.maps.Map(document.getElementById("map"), {
                center: position,
                zoom: 10,
            });

            let marker = new google.maps.Marker({
                position: position,
                map: map
            });
        }).then(displayLocalRestaurant())
        .catch(err => alert(err))

}


/*fetch("./restaurant.json").then(resp => {
    return resp.json();
}).then(data => {
    console.log(data);
}).catch(error => {
    console.log(error);
});*/

async function displayLocalRestaurant() {
    let resp = await fetch("./restaurant.json");
    let restaurants = await resp.json();

    displayRestaurants(restaurants);
}

let displayRestaurants = restaurants => {

    restaurants.forEach((restaurant, index) => {

        $('#restaurantsList').append(`
        
                                    <div div class = "col-12 make-shbr mt-3 animate__animated animate__fadeInRight animate__delay-0.5s" >
                                    <p class="mt-3 mb-3">${restaurant.restaurantName}</p>
                                    <p class="my-3">${restaurant.address}</p>
                                    <p class="my-3">Raiting</p>
                                    <p>
                                    <div class="accordion" id="accordionExample">
                                        <div class="card">
                                            <div class="card-header" id="headingOne">
                                                <h2 class="mb-0">
                                                    <button class="btn btn-link btn-block text-left" type="button"
                                                        data-toggle="collapse" data-target="#collapse${index}"
                                                        aria-expanded="true" aria-controls="collapse${index}">
                                                        comments
                                                    </button>
                                                </h2>
                                            </div>
    
                                            <div div id = "collapse${index}"
                                            class = "collapse"
                                            aria - labelledby = "headingOne"
                                                data-parent="#accordionExample">
                                                <div class="card-body">
                                                   ${restaurant.ratings.forEach(items => {
                                                       items.comment
                                                   })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </p>
                                </div>
        
                                    
        
        `);
    })
}

$(window).scroll(function () {
    if ($(this).scrollTop() > 40) {
        $('#navbar_top').addClass("fixed-top");
    } else {
        $('#navbar_top').removeClass("fixed-top");
    }
});