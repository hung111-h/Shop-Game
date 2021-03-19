//Modal
let modal = document.getElementById("myModal");
let btn = document.getElementById("cart");
let close = document.getElementsByClassName("close")[0];
let close_footer = document.getElementsByClassName("close-footer")[0];
let order = document.getElementsByClassName("order")[0];
btn.onclick = function ()  {
    modal.style.display = "block";
}
close.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}
close_footer.onclick = function () {
    modal.style.display = "none";
}
order.onclick = function () {
    alert("Cảm Ơn Quý Khách");
}

// update cart 
function updatecart(){
    let cart_item = document.getElementsByClassName("cart-items")[0];
    let cart_rows = cart_item.getElementsByClassName("cart-row");
    let total = 0;
    let total_1 = 0;
    for(let i = 0; i < cart_rows.length; i++){
        let cart_row = cart_rows[i];
        let price_item = cart_row.getElementsByClassName("cart-price")[0];
        let quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0];
        let price = parseFloat(price_item.innerHTML);
        let quantity = quantity_item.value;
        total = total + (price * quantity);
        total_1 = total_1 + Number(quantity);
    }
    document.getElementsByClassName("cart-total-price")[0].innerText = total + "VNĐ";
    document.getElementById("sumCart").innerText = total_1;   
}

// Them so luong sp
let quantity_input = document.getElementsByClassName("cart-quantity-input");
for(let i = 0; i < quantity_input.length; i++){
    let input = quantity_input[i];
    input.addEventListener("change", function(event){
        let input = event.target;
        if(isNaN(input.value) || input.value <= 0 ) {
            input.value = 1;
        }
        updatecart();
    })
}

const img = ["anh nen/gow3.jpg", "anh nen/gow4.jpg", "anh nen/titan.jpg", "anh nen/callofduty3.jpg", "anh nen/callofdutyww3.jpg", "anh nen/star.jpg", "anh nen/jump.jpg", "anh nen/mvav.jpg"]
const price = ["1250000", "590000", "490000", "1100000", "590000", "490000", "1100000", "1100000"]
const title = ["God of War 3", "God of War 4", "Attach on Titan", "Call of Duty 3", "Call of Duty WWII", "Star Wars", "Jump Force", "Avengers"]
let product = [];

function createDom(){
    let html = "";
    for(let i = 0; i < price.length; i++){
      product.push({imagine: img[i], price: price[i], title: title[i]})
    }
        for(y = 0; y < img.length; y++){
    html += `
    <li class="main-product">
    <div class="img-product">
      <img class="img-prd" src="${product[y].imagine = img[y]}" alt="Avenger">
    </div>
    <div class="content-product">
      <h3 class="content-product-h3">${product[y].title = title[y]}</h3>
      <div class="content-product-deltals">
        <div class="price">
          <span class="money">${product[y].price = price[y]}đ</span>
        </div>
        <button type="button" class="btn btn-cart">Mua Ngay</button>
      </div>
    </div>
  </li>
  `
        } 
  document.getElementById("new-product").innerHTML = html;
}

createDom();
  
//them so luong vao gio
let add_cart = document.getElementsByClassName("btn-cart");
for(let i = 0; i < add_cart.length; i++){
    let add = add_cart[i];
    add.addEventListener("click", function(event) {
        let button = event.target;
        let product = button.parentElement.parentElement;
        let img = product.parentElement.getElementsByClassName("img-prd")[0].src;
        let title = product.getElementsByClassName("content-product-h3")[0].innerText;
        let price = product.getElementsByClassName("price")[0].innerText;
        addItemToCart(title, price, img);
        modal.style.display = "block";        
        updatecart();
    })
}

function addItemToCart(title, price, img) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cart_title = cartItems.getElementsByClassName('cart-item-title')
  //   Nếu title của sản phẩm bằng với title mà bạn thêm vao giỏ hàng thì sẽ thông cho user.
    for (let i = 0; i < cart_title.length; i++) {
      if (cart_title[i].innerText == title) {
        alert('Sản Phẩm Đã Có Trong Giỏ Hàng')
        return
      }
    }
  
    let cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${img}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">Xóa</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function () {
      let button_remove = event.target
      button_remove.parentElement.parentElement.remove()
      updatecart()
    })

    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
      let input = event.target
      if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
      }
      updatecart()
    })
  }

let usersInput = [];
  function searchProduct(){
    usersInput = [];
    let inputUser = document.getElementById("name").value;
    let inputUser1 = document.getElementById("name-1").value;
    if(inputUser == "" && inputUser1 ==""){
      createDom();
      alert("Nhap San Pham Ban Can Tim");     
      return;
    } 

    for(let i = 0; i < product.length; i++){
      if(inputUser.toLowerCase() === product[i].title.toString().toLowerCase() || inputUser1.toLowerCase() === product[i].title.toString().toLowerCase()){
        usersInput.push(product[i]);
      }
    }
    itemSearching();
  }

  document.getElementById("name").addEventListener('keydown',function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchProduct();
    }   
})

document.getElementById("name-1").addEventListener('keydown',function (event) {
  if (event.keyCode === 13) {
      event.preventDefault();
      searchProduct();
  }   
})

  function itemSearching(){
    let html = "";
    for(let i = 0; i < usersInput.length; i++){
      html = `
      <div class="main-product-search">
      <div class="img-product-search">
        <img class="img-prd-search" src="${usersInput[i].imagine}" alt="Avenger">
      </div>
      <div class="content-product-search">
        <h3 class="content-product-h3-search">${usersInput[i].title}</h3>
        <div class="content-product-deltals-search">
          <div class="price price-new">
            <span class="money-search">${usersInput[i].price}đ</span>
          </div>
          <button type="button" class="btn search" id="new-btn">Thêm vào giỏ hàng</button>
        </div>
      </div>
    </div>
      `
    }
    document.getElementById("item-search").innerHTML= html;
    document.getElementById("new-btn").addEventListener("click", function(event){
      let button = event.target;
      let product = button.parentElement.parentElement;
      let img = product.parentElement.getElementsByClassName("img-prd-search")[0].src;
      let title = product.getElementsByClassName("content-product-h3-search")[0].innerText;
      let price = document.getElementsByClassName("price")[0].innerText;
      addItemToCart(title,price,img)
      modal.style.display = "block";
      updatecart();
    })  
  }

  let btn_menu = document.getElementById("btnmenu");
  btn_menu.addEventListener("click", function () {
    let item_menu = document.getElementById("menutop");
    if (item_menu.style.display === "block") {
      item_menu.style.display = "none";
    } else {
      item_menu.style.display = "block";
    }
  })


