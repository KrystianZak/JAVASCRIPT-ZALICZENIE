document.addEventListener("DOMContentLoaded", (event) => {
    const sliderContainer = document.createElement("div")
    sliderContainer.classList.add("sliderContainer")

    const slides = document.createElement("div")
    slides.classList.add("slides")

    const header = document.createElement("h1")
    header.textContent = "SLIDER TEMPLATE"
    header.classList.add("text")

    const subtitle = document.createElement("h2")
    subtitle.textContent = "Cryptocurrency tickers version."
    subtitle.classList.add("text")

    const previousButton = document.createElement("button")
    previousButton.textContent = "PREV"
    previousButton.addEventListener("click", prev)
    previousButton.classList.add("buttons")

    const nextButton = document.createElement("button")
    nextButton.textContent = "NEXT"
    nextButton.addEventListener("click", next)
    nextButton.classList.add("buttons")

    const flexContainer = document.createElement("div")
    flexContainer.classList.add("flex-container")

    const container = document.createElement("div")
    container.classList.add("numbers")

    const first = document.createElement("div")
    first.textContent = "1"
    first.classList.add("numbs")
    first.setAttribute("id", "a0")
    first.addEventListener("click", click)
    container.appendChild(first)

    const second = document.createElement("div")
    second.textContent = "2"
    second.classList.add("numbs")
    second.setAttribute("id", "a1")
    second.addEventListener("click", click)
    container.appendChild(second)

    const third = document.createElement("div")
    third.textContent = "3"
    third.classList.add("numbs")
    third.setAttribute("id", "a2")
    third.addEventListener("click", click)
    container.appendChild(third)

    const fourth = document.createElement("div")
    fourth.textContent = "4"
    fourth.classList.add("numbs")
    fourth.setAttribute("id", "a3")
    fourth.addEventListener("click", click)
    container.appendChild(fourth)

    const images = ["gfx/bnb.png", "gfx/eth.png", "gfx/shib.png", "gfx/usdt.png"]
    const tickers = ["bnb", "eth", "shib", "usdt"]
    const slidesArray = []

    for (let i=0; i<tickers.length; i++) {
        const image = document.createElement("img")
        image.classList.add("image")
        image.src = images[i]
        image.style.display = "none"
        image.setAttribute("id", `${tickers[i]}`)
        slidesArray.push(image)
        slides.appendChild(image)

        
    }

    sliderContainer.appendChild(header)
    sliderContainer.appendChild(subtitle)
    sliderContainer.appendChild(slides)

    slides.appendChild(flexContainer)
    flexContainer.appendChild(previousButton)
    flexContainer.appendChild(container)
    flexContainer.appendChild(nextButton)
    document.body.appendChild(sliderContainer)

    let currentImage
    let currentNumber

    function slideShow() {
        let randomNumber = Math.floor(Math.random() * 4)
        let slide = document.getElementById(`${tickers[randomNumber]}`)
        currentNumber = document.getElementById(`a${randomNumber}`)
        currentImage = randomNumber
        currentNumber.style.color = "red"
        slide.style.display = "flex"
    }

    function click(event) {
        let id = event.target.id.slice(-1);
        console.log(id);
        let previousImage = document.getElementById(tickers[currentImage]);
        let previousNumber = document.getElementById(`a${currentImage}`);
        
        if (previousImage) {
            previousImage.style.display = "none";
        }
        if (previousNumber) {
            previousNumber.style.color = "white";
        }
        
        currentImage = id;
        let currentSlide = document.getElementById(tickers[currentImage]);
        currentSlide.style.display = "flex";
        currentNumber = document.getElementById(`a${currentImage}`);
        currentNumber.style.color = "red";
    }

    function prev() {
        // Zmniejszamy currentImage o 1 (zapobiegając cyklowi wstecznemu)
        
    
        // Ukrywamy aktualny slajd i aktualizujemy jego numer
        let previousSlide = document.getElementById(tickers[currentImage]);
        if (previousSlide) {
            previousSlide.style.display = "none";
            console.log('none?')
            console.log(previousSlide)
        }
    
        currentImage = (currentImage - 1 + 4) % 4;

        // Aktualizujemy numer na ekranie
        if (currentNumber) {
            currentNumber.style.color = "white";
        }
    
        // Pokazujemy poprzedni slajd i aktualizujemy jego numer
        let currentSlide = document.getElementById(tickers[currentImage]);
        if (currentSlide) {
            currentSlide.style.display = "flex";
            currentNumber = document.getElementById(`a${currentImage}`);
            if (currentNumber) {
                currentNumber.style.color = "red";
            }
        }
    }

    function next() {
        // Ukrywamy aktualny slajd i aktualizujemy jego numer
        let previousSlide = document.getElementById(tickers[currentImage]);
        if (previousSlide) {
            previousSlide.style.display = "none";
        }
    
        // Zwiększamy currentImage o 1 (zapewniając cykl w przód)
        currentImage = (currentImage + 1) % 4;
    
        // Aktualizujemy numer na ekranie
        if (currentNumber) {
            currentNumber.style.color = "white";
        }
    
        // Pokazujemy następny slajd i aktualizujemy jego numer
        let currentSlide = document.getElementById(tickers[currentImage]);
        if (currentSlide) {
            currentSlide.style.display = "flex";
            currentNumber = document.getElementById(`a${currentImage}`);
            if (currentNumber) {
                currentNumber.style.color = "red";
            }
        }
    }

    slideShow()
    
   


})