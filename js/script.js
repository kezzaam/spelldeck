// Spelldeck JS

fetch("https://wizard-world-api.herokuapp.com/Spells")
    .then((response) => response.json())
    .then((data) => {

        // create a set from the data array with the spell types for filtering
        const types = new Set(
            data.map((spell) => {
                // format PascalCase text to have spaces between words using regex
                let type = spell.type.replace(/([a-z])([A-Z])/g, "$1 $2")
                // change the None type so it's removed from filters
                if (type === "None") {
                    type = "Charm"
                }
                return type
            })
        )

        // add All to the types array to allow an All button to be made
        types.add("All")

        // sort types array alphabetically and make the set into a new array ready for filtering
        const typesArray = Array.from(types).sort()

        // Filters area
        const buttonContainer = document.querySelector("#filter-button-template").parentNode
        // create filter buttons for each array item
        typesArray.forEach((type) => {

            // html elements - select filter button template, clone button and create elements
            const buttonTemplate = document.querySelector("#filter-button-template")
            const button = buttonTemplate.content.cloneNode(true).querySelector("button")
            const span = document.createElement("span") // create span element to wrap icon and text in
            const icon = document.createElement("i") // icon element
            const textSpan = document.createElement("span") // text container
            const textNode = document.createTextNode(type) // text

            // add class names for css styling
            span.className = "button-content"
            icon.className = getIcon(type.toLowerCase()) // function to get icons
            textSpan.className = "button-text"

            // assign the value of the new button's data-filter attribute to spell type
            button.dataset.filter = type.toLowerCase();

            // add elements to DOM
            span.appendChild(icon)
            textSpan.appendChild(textNode)
            span.appendChild(textSpan)
            button.appendChild(span)
            buttonContainer.appendChild(button)
        })


        // Search
        const searchContainer = document.createElement("span") // wrapper for search
        const searchInput = document.createElement("input") // input field
        const searchButton = document.createElement("button") // button
        const searchIcon = document.createElement("i") // button icon
        // id, class etc for styling
        searchContainer.id = "search-container"
        searchInput.className = "search-input"
        searchInput.type = "text"
        searchInput.placeholder = "Search"
        searchButton.className = "search-button"
        // get icon class from switch statement 
        searchIcon.className = getIcon("search")

        // event listeners
        // a listener on input allows for search as the user types
        searchInput.addEventListener("input", () => {
            const keyword = searchInput.value.trim().toLowerCase()
            filterCards("search", keyword) // call filter function
        })
        searchButton.addEventListener("click", () => {
            const keyword = searchInput.value.trim().toLowerCase()
            filterCards("search", keyword) // call filter function
        })

        // add elements to DOM
        searchButton.appendChild(searchIcon)
        searchContainer.appendChild(searchInput)
        searchContainer.appendChild(searchButton)
        // Insert the search input and button into the button container:
        buttonContainer.appendChild(searchContainer)
        // assign search to the buttons data-filter attribute
        searchButton.dataset.filter = "search"


        // create cards
        // select elements where cards will be made
        const cardContainer = document.querySelector("#card-container")
        const cardTemplate = document.querySelector("#card-template")
        data.forEach((spell) => {
            // select template elements and create new 
            const card = cardTemplate.content.cloneNode(true).querySelector(".card")
            const cardHeader = card.querySelector(".card-header")
            const cardTitle = card.querySelector(".card-title")
            // header area icon
            const icon = document.createElement("i")
            icon.className = getIcon(spell.type.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase())
            cardHeader.appendChild(icon)
            // set card title text content
            cardTitle.textContent = spell.name;
            // set card text
            const incantation = spell.incantation ? spell.incantation : "Incantation Unknown"
            card.querySelector(".card-text").innerHTML =
                "<hr><span class='incantation'>" + incantation + "</span><hr>" + spell.effect
            // set card footer
            card.querySelector(".card-footer").textContent = spell.type.replace(/([a-z])([A-Z])/g, "$1 $2")

            // add event listener to card for showing spell light colour        
            card.addEventListener("click", () => {
                const originalBgColor = card.style.backgroundColor
                lightColor = spell.light.toLowerCase()
                card.style.backgroundColor = getColor(lightColor) // call color function
                // don't display header, title or footer
                cardHeader.style.display = "none"
                cardTitle.style.display = "none"
                card.querySelector(".card-footer").style.display = "none"
                // ternary to handle null (unknown incantation) and display spell name instead             
                const cardBack = spell.incantation === null ? spell.name : spell.incantation
                // set card back text 
                card.querySelector(".card-text").innerHTML = cardBack
                // add glow effect to card
                card.style.boxShadow = "0 0 20px 10px white"

                // return card to default after 1 second
                setTimeout(() => {
                    card.style.backgroundColor = originalBgColor
                    cardHeader.style.display = ""
                    cardTitle.style.display = ""
                    card.querySelector(".card-footer").style.display = ""
                    card.querySelector(".card-text").innerHTML =
                        "<hr><span class='incantation'>" + incantation + "</span><hr>" + spell.effect
                    card.style.boxShadow = ""
                }, 1000)
            })

            cardContainer.appendChild(card)
        })

        // filter cards by button click and toggle active class 
        const filterButtons = document.querySelectorAll(".filter-button")
        filterButtons.forEach((button) => {
            // default is not active
            button.classList.remove("active")

            button.addEventListener("click", () => {
                const filter = button.dataset.filter // button data-filter attribute
                filterCards(filter) // call filterCards function
                // make sure only clicked button is active
                filterButtons.forEach((btn) => btn.classList.remove("active"))
                button.classList.add("active")
            })
        })

        // set "All" button as active by default
        const allButton = document.querySelector(".filter-button[data-filter='all']")
        allButton.classList.add("active")

    })

    .catch(error => console.log('error', error))


// fontawesome icons for spell types
function getIcon(type) {

    switch (type.toLowerCase()) {
        case 'charm':
            return "fa-solid fa-wand-sparkles";
        case 'spell':
            return "fa-solid fa-explosion"
        case 'conjuration':
            return "fa-solid fa-hand-sparkles";
        case 'transfiguration':
            return "fa-solid fa-cat";
        case 'dark charm':
            return "fa-solid fa-skull";
        case 'healing spell':
            return "fa-solid fa-staff-snake";
        case 'jinx':
            return "fa-solid fa-crow";
        case 'curse':
            return "fa-solid fa-ghost";
        case 'magical transportation':
            return "fa-solid fa-broom";
        case 'hex':
            return "fa-solid fa-spider";
        case 'counter spell':
            return "fa-solid fa-dragon";
        case 'dark arts':
            return "fa-solid fa-book-skull";
        case 'counter jinx':
            return "fa-solid fa-dove";
        case 'counter charm':
            return "fa-solid fa-hand-fist";
        case 'untransfiguration':
            return "fa-solid fa-bug-slash";
        case 'binding magical contract':
            return "fa-solid fa-pen-fancy";
        case 'vanishment':
            return "fa-solid fa-eye-low-vision";
        case 'search':
            return "fa-brands fa-searchengin";
        default:
            return "fa-solid fa-bolt-lightning";
    }
}

// filter cards - arguments are button's data-filter attribute and keyword from search input
function filterCards(filter, keyword) {
    const cards = document.querySelectorAll(".card")
    cards.forEach((card) => {
        // elements for search
        const cardTitle = card.querySelector(".card-title").textContent.toLowerCase()
        const cardText = card.querySelector(".card-text").textContent.toLowerCase()
        const cardType = card.querySelector(".card-footer").textContent.toLowerCase()
        
        if (filter === "all") {
            card.style.display = "" // show everything for All button
        } else if (
            (filter === "search") &&
            (cardTitle.includes(keyword) || cardText.includes(keyword)) 
        ) {
            card.style.display = "" // show keyword matches
        } else if (filter === cardType) {
            card.style.display = "" // show by spell type
        } else {
            card.style.display = "none"
        }
    });
}

// get colour from spell.light and switch to nicer colours
function getColor(lightColor) {

    switch (lightColor) {
        case "transparent":
            return "#FFFAFB";
        case "blue":
            return "#425BD6";
        case "icyblue":
            return "#DFF7FA";
        case "red":
            return "#D22D2D";
        case "gold":
            return "#DD9404";
        case "purple":
            return "#9368D9";
        case "white":
            return "#DFF7FA";
        case "green":
            return "#08C28D";
        case "orange":
            return "#ED883B";
        case "yellow":
            return "#FADD43";
        case "brightblue":
            return "#4084DD";
        case "pink":
            return "#FFA3BB";
        case "violet":
            return "#6E25A5";
        case "blueishwhite":
            return "#D1E5F4";
        case "scarlet":
            return "#C62F2F";
        case "silver":
            return "#EDEDED";
        case "fieryscarlet":
            return "#FF3D3D";
        case "grey":
            return "#BDBDBB";
        case "darkred":
            return "#8B0001";
        case "turquoise":
            return "#22B1B3";
        case "fire":
            return "#D35A1E";
        case "brightyellow":
            return "#FFDF00";
        case "psychedelictransparentwave":
            return "#ff4b50";
        default:
            return "#ffffff";
    }
}

