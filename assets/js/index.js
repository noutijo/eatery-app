$(window).scroll(function () {
    if ($(this).scrollTop() > 40) {
        $('#navbar_top').addClass("fixed-top");
    } else {
        $('#navbar_top').removeClass("fixed-top");
    }
});


function initMap() {

    let uluru = {
        zoom: 4,
        center: {
            lat: -25.344,
            lng: 131.036
        }
    }

    let map = new google.maps.Map(document.getElementById('root'), uluru);

    let marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}