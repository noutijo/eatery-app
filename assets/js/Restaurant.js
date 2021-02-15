class Restaurant {

    constructor(name, address, position, ratings, index) {
        this.name = name;
        this.address = address;
        this.position = position;
        this.ratings = ratings;
        this.avgRating = this.calcAverage();
        this.index = index;
    }

    displayResaurant() {
        $('#restaurantsList').append(`
        
                            <div class="col-12 make-shbr mt-3 animate__animated animate__fadeInRight animate__delay-0.5s">
                                    <p class="mt-3 mb-3"><strong>${this.name}</strong></p>
                                    <p class="my-3">${this.address}</p>
                                    <p class="my-3">${this.getRatingStarsBlock().join('')}</p>
                                    <p>
                                    <div class="accordion" id="accordionExample${this.index}" >
                                        <div class="card">
                                            <div class="card-header" id="heading${this.index}" >
                                                <h2 class="mb-0">
                                                    <div >
                                                        <i class = "fa fa-arrow-down cursor-pointer"
                                                        data-toggle="collapse" data-target="#collapse${this.index}"
                                                        aria-expanded="true" aria-controls="collapse${this.index}">  Comments</i>

                                                        <span id="Addcomment_${this.index}" style="float:right; font-size: 13px;" class="fa fa-comment btn-comment cursor-pointer"> Add</span>
                                                    </div>
                                                    
                                                </h2>
                                            </div>
                                            <div id="collapse${this.index}"
                                            class="collapse"
                                            aria-labelledby="heading${this.index}"
                                                data-parent="#accordionExample${this.index}">
                                                <div class="card-body">
                                                    <ul class="comments_${this.index}">${this.fillComments().join('')}</ul>
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