class List {
    constructor(carte) {
        this.carte = carte;
        this.allRestaurant = [];
        this.filteredRestaurant = [];
    }

    addRestaurant(restaurant) {
        this.allRestaurant.push(restaurant);
        restaurant.displayResaurant();
    }

    filter(min = 4.5, max = 5) {
        this.filteredRestaurant = this.allRestaurant.filter(item => {
            return item.avgRating >= min & item.avgRating <= max;
        })

        this.carte.removeAllMarkerResto();

        document.getElementById('restaurantsList').innerHTML = ''

        if (this.filteredRestaurant.length === 0) {
            $('#restaurantsList').append("No result found.");
            $('#restaurantsList').css({
                'padding-top': '50px',
                'color': 'red'
            });
        } else {
            this.filteredRestaurant.forEach(item => {
                this.carte.addMarkerRestau(item.position);
                item.displayResaurant();
            });
        }

    }

}