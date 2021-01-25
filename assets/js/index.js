function initMap() {
    let carte = new Carte();
    carte.displayRestaurantAround();
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
