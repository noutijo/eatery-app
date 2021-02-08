class Restaurant {
    constructor(name, address, position, ratings, index) {
        this.name = name;
        this.address = address;
        this.position = position;
        this.ratings = ratings;
        this.comments = this.fillComments();
        this.index = index;
    }

    displayResaurant() {
        $('#restaurantsList').append(`
        
                            <div class="col-12 make-shbr mt-3 animate__animated animate__fadeInRight animate__delay-0.5s">
                                    <p class="mt-3 mb-3"><strong>${this.name}</strong></p>
                                    <p class="my-3">${this.address}</p>
                                    <p class="my-3">Raiting</p>
                                    <p>
                                    <div class="accordion" id="accordionExample">
                                        <div class="card">
                                            <div class="card-header" id="headingOne">
                                                <h2 class="mb-0">
                                                    <div class="btn btn-link btn-block text-left"
                                                        data-toggle="collapse" data-target="#collapse${this.index}"
                                                        aria-expanded="true" aria-controls="collapse${this.index}">
                                                        <i class="fa fa-arrow-down"></i>
                                                    </div>
                                                </h2>
                                            </div>
                                            <div id="collapse${this.index}"
                                            class="collapse"
                                            aria-labelledby="headingOne"
                                                data-parent="#accordionExample">
                                                <div class="card-body">
                                                    <ul>${this.comments.join('')}</ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </p>
                             </div>                            
        `);
    }

    fillComments() {
        let comments = [];

        this.ratings.forEach((item, index) => {
            comments.push(`<li>${item.comment}</li>`);
        })

        return comments;
    }
}