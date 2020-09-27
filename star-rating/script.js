// initial ratings
const ratings = {
    react: 2.5,
    angular: 2.2,
    vue: 2.7
};

// total stars
const starsTotal = 5;

// run getRatings when DOM loads
document.addEventListener('DOMContentLoaded', getRatings);

// form elements
const frameworkSelect = document.getElementById('framework-select');
const ratingControl = document.getElementById('rating-control');

let framework;

// framework select
frameworkSelect.addEventListener('change', (e) =>{
    framework = e.target.value;
    
    // enable rating control
    ratingControl.disabled = false;
    ratingControl.value = ratings[framework];
});

// rating control change
ratingControl.addEventListener('blur', (e) =>{
    const rating = e.target.value;

    //make sure 5 or under
    if(rating > 5){
        alert("The max value is 5");
        return;
    }

    //change the rating
    ratings[framework] = rating;
    getRatings();

});

// get ratings
function getRatings() {
    for (let rating in ratings){
        //loop getting percentages
        const starPercentage = (ratings[rating]/starsTotal)*100;

        // rounded the number
        const starPercentageRounded = `${Math.round(starPercentage/10)*10}%`;
        
        // set width of stars-inner to percentage
        document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;

        // add number rating
        document.querySelector(`.${rating} .number-rating`).innerHTML = ratings[rating];        
    }
}


/* 

Math.round () is a method for rounding the number

document.querySelector selects all classes in html

document.addEventListener ('DOMContentLoaded', function) helps us to execute a function when the page is loaded

*/