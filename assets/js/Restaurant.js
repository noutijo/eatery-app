class Restaurant {
    constructor(name, address, position, ratings, index) {
        this.name = name;
        this.address = address;
        this.position = position;
        this.ratings = ratings;
        this.avgRating = this.calcAverage();
        this.comments = this.fillComments();
        this.ratingStarsBlock = this.getRatingStarsBlock();
        this.index = index;
    }

    displayResaurant() {
        $('#restaurantsList').append(`
        
                            <div class="col-12 make-shbr mt-3 animate__animated animate__fadeInRight animate__delay-0.5s">
                                    <p class="mt-3 mb-3"><strong>${this.name}</strong></p>
                                    <p class="my-3">${this.address}</p>
                                    <p class="my-3">${this.ratingStarsBlock.join('')}<span style="padding-left:5px">${this.avgRating}</span></p>
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

    calcAverage() {
        let totalRatings = 0;
        let averageRating = 0;


        if (this.ratings.length === 0) {
            return 0;
        }
        this.ratings.forEach(item => {
            totalRatings += item.stars;
        })

        averageRating = totalRatings / this.ratings.length;
        averageRating = Math.round(averageRating * 10) / 10;

        console.log(averageRating)

        return averageRating;
    }
    getRatingStarsBlock(){
        let ratingStart=[];

        for (let n = 0; n < Math.round(this.avgRating); n++) {
            ratingStart.push(`<span class="fa fa-star checked"></span>`);   
        }
        for (let w = 0; w < (5-Math.round(this.avgRating)); w++) {
            ratingStart.push(`<span class="fa fa-star"></span>`);   
        }

        return ratingStart;
    }
}