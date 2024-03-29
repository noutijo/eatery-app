class Restaurant {

    constructor(name, urlImage, address, position, ratings, index) {
        this.name = name;
        this.urlImage = urlImage;
        this.address = address;
        this.position = position;
        this.ratings = ratings;
        this.avgRating = this.calcAverage();
        this.index = index;
    }

    displayResaurant() {
        $('#restaurantsList').append(`
        
        <div class="col-12 make-shbr mt-3 animate__animated animate__fadeInRight animate__delay-0.5s">
                <p class="mt-3 mb-3"><img width="50" height="50" src="${this.urlImage}" alt="Restaurant image"
                class="img-fluid" /></p>
                <p class="mt-3 mb-3"><strong>${this.name}</strong></p>
                <p class="my-3">${this.address}</p>
                <p class="my-3" id="ratings_${this.index}">${this.getRatingStarsBlock().join('')}</p>
                <p>
                <div class="accordion" id="accordionExample${this.index}" >
                    <div class="card">
                        <div class="card-header" id="heading${this.index}" >
                            <h2 class="mb-0">
                                <div >
                                    <i class="fa fa-arrow-down cursor-pointer"
                                    data-toggle="collapse" data-target="#collapse${this.index}"
                                    aria-expanded="true" aria-controls="collapse${this.index}">  Comments</i>

                                    <span id="addComment_${this.index}" style="float:right; font-size: 13px;" class="fa fa-comment btnAddComment cursor-pointer" data-toggle="modal" data-target="#staticBackdrop" onclick="addComment(this.id)"> Add</span>
                                </div>
                                
                            </h2>
                        </div>
                        <div id="collapse${this.index}"
                        class="collapse"
                        aria-labelledby="heading${this.index}"
                            data-parent="#accordionExample${this.index}">
                            <div class="card-body">
                                <ul id="comments_${this.index}">${this.fillComments().join('')}</ul>
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
            comments.push(`<li><span class="badge badge-secondary">${item.stars}</span> ${item.comment}</li>`);
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

        return averageRating;
    }

    getRatingStarsBlock() {
        let ratingStars = [];

        for (let n = 0; n < Math.round(this.avgRating); n++) {
            ratingStars.push(`<span class="fa fa-star checked"></span>`);
        }
        for (let w = 0; w < (5 - Math.round(this.avgRating)); w++) {
            ratingStars.push(`<span class="fa fa-star"></span>`);
        }
        return ratingStars;
    }

    updateComment(rating) {
        this.ratings.push(rating);
        $('#comments_' + this.index).append(`<li><span class="badge badge-secondary">${rating.stars}</span> ${rating.comment}</li>`);

        this.avgRating = this.calcAverage();
        this.updateRatings();

        $('#staticBackdrop').modal('hide');
        $('#toast-sucessRestau').toast('show');
    }

    updateRatings() {
        document.getElementById('ratings_' + this.index).innerHTML = ''
        document.getElementById('ratings_' + this.index).innerHTML = `${this.getRatingStarsBlock().join('')}`;
    }
}