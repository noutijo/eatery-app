class List {
    constructor() {
        this.allRestaurant = [];
        this.filteredRestaurant = [];
    }
    addRestaurant(restaurant) {
        this.allRestaurant.push(restaurant);
        restaurant.displayResaurant();
    }
}