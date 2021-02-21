class List {
    constructor(cardObject) {
        this.cardObject = cardObject;
        this.allRestaurant = [];
        this.filteredRestaurant = [];
    }

    addRestaurant(restaurant) {
        this.allRestaurant.push(restaurant);
        restaurant.displayResaurant();
    }

    filter(min, max) {
        this.filteredRestaurant = this.allRestaurant.filter(item => {
            return item.avgRating >= min & item.avgRating <= max;
        })

        this.cardObject.removeAllMarkerResto();

        document.getElementById('restaurantsList').innerHTML = ''

        if (this.filteredRestaurant.length === 0) {
            $('#restaurantsList').append("No result found.");
            $('#restaurantsList').css({
                'padding-top': '50px',
                'color': 'red'
            });
        } else {
            this.filteredRestaurant.forEach(item => {
                this.cardObject.addMarkerRestau(item.name,item.position);
                item.displayResaurant();
            });
        }
    }
}