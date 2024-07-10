let sliderCount = 0;
let sliderWidth;

const sliderImg = document.querySelectorAll(".slider-image");
const sliderLine = document.querySelector(".slider__line");
const sliderDots = document.querySelectorAll(".dot");


setInterval(() => {
    nextSlider()
}, 5000);

function showSlide() {
    sliderWidth = document.querySelector(".slider").offsetWidth;
    sliderLine.style.width = sliderWidth * sliderImg.length + "px";
    sliderImg.forEach(item => item.style.width = sliderWidth + "px");
    rollSlider();
}
showSlide();

function nextSlider() {
    sliderCount++;
    if (sliderCount >= sliderImg.length) sliderCount = 0;
    rollSlider();
    thisSlide(sliderCount);
}

function rollSlider() {
    sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
}

function thisSlide(index) {
    sliderDots.forEach(item => item.classList.remove("active"));
    sliderDots[index].classList.add("active");
}

sliderDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        sliderCount = index;
        rollSlider();
        thisSlide(sliderCount);
    })
})

function fetchBooks() {
    const apiKey = "AIzaSyAWp0XyrtpVfw0HUbCQdr-Jzl-2yyqpHiI";
    //const query = "subject:Business";
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q="subject:Business"&key=${apiKey}&printType=books&startIndex=0&maxResults=6&langRestrict=en`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка связи');
            }
            return response.json();
        })
        .then(data => {
            const booksContainer = document.querySelector('.books');
            booksContainer.innerHTML = '';
            data.items.forEach(book => {
                const bookElement = document.createElement('div');
                bookElement.classList.add('book');

                const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '';
                const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : '';
                const title = book.volumeInfo.title;
                const ratingsCount = book.volumeInfo.ratingsCount ? book.volumeInfo.ratingsCount.thumbnail : '';
                const description = book.volumeInfo.description ? book.volumeInfo.description : '';
                const retailPrice = book.volumeInfo.retailPrice;
                                
                bookElement.innerHTML = `
                    <img src="${thumbnail}" alt="Thumbnail">
                    <div class="book-info">
                    <p>${authors}</p>
                    <h2>${title}</h2>
                    <h3>${ratingsCount}</h3>
                    <p>${description}</p>
                    <p>${retailPrice}</p>
                    </div>
                `;
          
                booksContainer.appendChild(bookElement);
            });
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}



document.querySelectorAll('.category').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.category').forEach(item => {
            item.classList.remove('sidebar-active');
            item.classList.add('sidebar-txt');
            fetchBooks(); 
        });
        this.classList.remove('sidebar-txt');
        this.classList.add('sidebar-active');
    });
});


