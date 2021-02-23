class List {
    constructor(map) {
        this.map = map;
        this.allRestaurant = [];
        this.filteredRestaurant = [];
    }

    addRestaurant(index, restaurant) {
        this.allRestaurant[index] = restaurant;
        restaurant.displayResaurant();
    }

    filter(min, max) {
        this.filteredRestaurant = this.allRestaurant.filter(item => {
            return item.avgRating >= min & item.avgRating <= max;
        })

        this.map.removeMarker();

        document.getElementById('restaurantsList').innerHTML = ''

        if (this.filteredRestaurant.length === 0) {
            $('#restaurantsList').append("No result found.");
            $('#restaurantsList').css({
                'padding-top': '50px',
                'color': 'red'
            });
        } else {
            this.filteredRestaurant.forEach(item => {
                this.map.addRestauMaker(item.name, item.position);
                item.displayResaurant();
            });
        }
    }
}