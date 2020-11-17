const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movie = document.getElementById('movie');

let ticketPrice = movie.value;

populateUI();

//Save selected movie index and price in localStorage
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


//update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    //We are saving an array to localStorage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    

    const selectedSeatCount = selectedSeats.length;

    count.innerText = selectedSeatCount;
    total.innerText = selectedSeatCount * ticketPrice;
}

//Get data from localStorage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                    seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

if(selectedMovieIndex !== null) {
    movie.selectedIndex = selectedMovieIndex;
}
}

    //movie select event
  movie.addEventListener('change', function(e){
     ticketPrice = +e.target.value;
     setMovieData(e.target.selectedIndex, e.target.value);
     updateSelectedCount();
   });



//Event Listeners

container.addEventListener('click', function(e){
    e.preventDefault();

    if(e.target.classList.contains('seat') && 
    !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');


        updateSelectedCount();
    }

});

updateSelectedCount();