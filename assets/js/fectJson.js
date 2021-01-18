

fetch("./restaurant.json").then(resp => {
    return resp.json();
}).then(restaurants => {
    displayRestaurants(restaurants);
}).catch(error => {
    console.log(error);
});

let displayRestaurants = restaurants => {

    restaurants.forEach((restaurant,index)=> {
        
        $('#restaurantsList').append(`
        
                                    <div class="col-12 make-shbr mt-3">
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
                                                        coments
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

