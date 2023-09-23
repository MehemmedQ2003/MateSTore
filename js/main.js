const productList = document.querySelector(".product-list");
const navBar = document.querySelector(".navbar")
const footerContent = document.querySelector(".footer")
const categories = document.querySelector(".filters")
const product = document.querySelector(".product-list")
const btn = document.querySelectorAll(".btn")

function btnClick(){
    document.querySelector(".zero").textContent 
}


function bodyGet(){
    navBar.innerHTML = headerGet()
    footerContent.innerHTML = footerGet()
}
bodyGet()


function headerGet() {
  return `
        <div class="container"> 
            <a class="navbar-brand fw-bolder fs-4" href="#">MateStore</a>
            <div class="navbar-collapse collapse">
                <ul class="navbar-nav ms-auto me-4">
                    <li class="nav-item d-flex justify-content-between align-items-center">
                        <a class="text-decoration-none text-secondary zero" id="count">0</a><a class="nav-link" href="#"><i class="fa-solid fa-cart-shopping"></i></a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="submenuDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#"></a>
                        <div class="dropdown-menu" aria-labelledby="submenuDropdown">
                            <a class="dropdown-item" href="#">Element</a>
                            <a class="dropdown-item" href="#">Element</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        `;
}
headerGet()


function footerGet(){
    return `
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-4 col-sm-6 my-3">
                    <div class="text-center d-flex align-items-center justify-content-center">
                        <i class="fa-solid text-secondary fa-car fs-3 mx-3"></i>
                        <div class="title">
                            <h5>Money Back Guaranted</h5>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6 my-3">
                    <div class="text-center d-flex align-items-center justify-content-center">
                        <i class="fa-solid text-secondary fa-screwdriver-wrench fs-3 mx-3"></i>
                        <div class="title">
                            <h5>Money Back Guaranted</h5>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-6 my-3">
                    <div class="text-center d-flex align-items-center justify-content-center">
                        <i class="fa-solid text-secondary fa-hand-holding-dollar fs-3 mx-3"></i>
                        <div class="title">
                            <h5>Money Back Guaranted</h5>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <p>Copyright &copy; MateStore 2019 All rights Reserved</p>
                </div>
                <div class="col-md-6">
                    <ul class="list-inline float-md-end">
                        <li class="list-inline-item"><i class="fa-brands fa-cc-visa text-primary fs-3"></i></li>
                        <li class="list-inline-item"><i class="fa-brands fa-cc-mastercard text-secondary fs-3"></i></li>
                        <li class="list-inline-item"><i class="fa-brands fa-cc-amex text-primary fs-3"></i></li>
                    </ul>
                </div>
            </div>
        </div>
    `
}
footerGet()


function categoryView(category){
    return `
        <button type="button" class="filter-option" onclick="categoryFilter(${category.cart_id})">${category.cart_name}</button>
    `
}


function categoryFilter(id){
    fetch("data/product.json")
    .then(response => response.json())
    .then((data) => {
        const buttons = document.querySelectorAll(".filter-option")
        buttons.forEach(button => {
            button.style.color = "black"
        })
        buttons[id-1].style.color = "red"

        const productList = document.querySelector(".product-list")
        productList.innerHTML = "";
        for(let category of data){
            if(category.cart_id == id){
                category.products.forEach((element) => {
                    productList.innerHTML += productView(element)
                })
            }
        }
    })
    .catch((error) => {
        console.log("Error", error)
    })
}


function productView(product){
    return `
    
        <div class="col-lg-3 col-md-6 col-12 product-item">
            <div class="product-img-box">
                <img src="${product.image}" alt="..." class="product-img w-100"/>
                <div class="overlay d-flex flex-column p-2">
                    <a class="overlay-link" href="product.html">
                        <img src="./img/curved arrow.png" height="50px" alt="arrow" class="arrow-img"/>
                    </a>
                    <div class="overlay-info">
                        <p>${product.text}</p>
                        <h4>${product.name}</h4>
                    </div>
                </div>
            </div>
            <hr>
            <div class="product-content d-flex align-items-center justify-content-between px-3">
                <p class="product-price text-danger fw-bold fs-5">${product.price}</p>
                <button type="button" onclick="btnClick()" class="btn btn-add-cart fw-bold border-black">+Cart</button>
            </div>
        </div>
    `
}



function loadJson() {
    fetch("data/product.json")
    .then(response => response.json())
    .then((data) => {
        let item = "";
        data.forEach(element => {
            if(element.cart_name == "All categories")
            {
                element.products.forEach((element) => {
                    item += productView(element)
                })
            }
            categories.innerHTML += categoryView(element)
        });
        product.innerHTML = item
    })
    .catch((error) => {
        console.log("Error", error)
        
    })
}
loadJson();