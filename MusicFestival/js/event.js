//Home page + Purchase page - ticket Details
document.addEventListener('DOMContentLoaded', function () {
    const ticketDetail = document.querySelector('.ticketDetail');
    const HomeTicketsContent = document.querySelector('.HomeTicketsContent');

    const tiffevent = [
        { eventname: 'Regular film', eventprice: 16, eventdetail: 'Standard ticket for a movie showing, typically in 2D. It’s the basic option', icon: "confirmation_number" },
        { eventname: '3D, 70mm, Special Presentation', eventprice: 19, eventdetail: 'Ticket is for movies shown in 3D and screenings of films shown in 70mm which are  high-resolution format that offers superior image quality and clarity compared to the standard 35mm film.', icon: "editor_choice"  },
        { eventname: 'Premium Screening', eventprice: 26, eventdetail: 'Tickets can cover a range of premium experiences. They might include IMAX, Dolby Cinema, or other enhanced formats that offer better sound, image quality, or seating', icon: "hotel_class" }
    ];

        // If .HomeTicketsContent exists on this page, handle it
        if (HomeTicketsContent) {
       
            tiffevent.forEach(event => {
                HomeTicketsContent.innerHTML += `
                <div class="homeTicket">
                  <span id="ticketIcon" class="material-symbols-outlined">${event.icon}</span>
                  <p class="homeTicketPrice">$${event.eventprice}</p>
                  <a class ="nostyle" href="purchase.html"> <p class="homeTicketDetails">Buy</p></a>
                  <h2 class="homeTicketName">${event.eventname}</h2>
                  <p style=padding-top:30px>${event.eventdetail}</p>
                  
                </div>
                `;
            });
        }

    // If Puchase Page exists, handle it
    if (ticketDetail) {

        tiffevent.forEach(event => {
            ticketDetail.innerHTML += `
                <div class="purchaseTicket">
                     <span id="ticketIcon" class="material-symbols-outlined">${event.icon}</span>
                     <p class="purchasePrice">$${event.eventprice}</p>
                    <h3>Event: ${event.eventname}</h3>
                    <p class="purchaseDetail">${event.eventdetail}</p>
                </div>
            `;
        });
    }


});

//Home page - movie Details
const movies = [
    {
        name: "Inception",
        poster: "../image/poster1.png",
        showtimes: ["10:00 AM", "2:00 PM", "6:00 PM"],
        genre: "Action, Sci-Fi",
        director: "Christopher Nolan"
    },
    {
        name: "La La Land",
        poster: "../image/poster2.png",
        showtimes: ["11:00 AM", "3:00 PM", "7:00 PM"],
        genre: "Romance, Musical",
        director: "Damien Chazelle"
    },
    {
        name: "Parasite",
        poster: "../image/poster3.png",
        showtimes: ["12:00 PM", "4:00 PM", "8:00 PM"],
        genre: "Thriller, Drama",
        director: "Bong Joon Ho"
    }  
];
const movieList = document.querySelector('.movieList');
movies.forEach(movie => {
    movieList.innerHTML += `
        <div class="movie">
            <h2 class="movieName">${movie.name}</h2>
            <img src="${movie.poster}" alt="${movie.name} Poster" class="moviePoster">
            <p id="movieDirector"><strong>Director :</strong> ${movie.director}</p> 
            <p class="movieGenre"><strong>Genre:</strong> ${movie.genre}</p>
            <p class="movieShowtimes"><strong>Showtimes:</strong> ${movie.showtimes.join(', ')}</p>
        </div>
    `;
});









