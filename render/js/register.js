/*
 * Show / Hide Cart
 */
class CartItems {
   constructor(product, quantity) {
      // Make product and quantity private
      this.product = product;
      this.quantity = quantity;
   }

   incrementQuantity() {
      this.quantity++;
   }

   decrementQuantity() {
      if (this.quantity <= 0) {
         return;
      }
      this.quantity--;
   }
}

class CategoryState { // Stores the state of the current category
   constructor() {
      this.current = "all"; // DO NOT MODIFY THE STATE DIRECTLY, CALL setState() instead!!!!
   }

   // Returns the current state
   get() {
      return this.current;
   }

   // Takes a string Parameter
   set(category) {
      let previousState = this.current;
      this.current = category;
      // Set the current category button
      // Remove "currentBtn" class from previous state
      document.getElementById(previousState + "-btn").classList.remove("currentBtn");
      document.getElementById(category + "-btn").classList.add("currentBtn");
   }
}



const ImagePath = "./imgs/products/";
let ProductMap = new Map(); // <sku: String, product: Object>
let CategoryMap = new Map(); // <category: String, products: Array>
let Cart = new Map(); // <sku: String, quantity: Number>
let ActiveCategory = new CategoryState();
// Clear all event listeners first


const ShowHideCartBtn = document.getElementById("cartBtn");
ShowHideCartBtn.onclick = function () {
   document.getElementById("cart").classList.toggle("showCart");
};

function addItemToCart(event) {
   // add item to cart
   let productSku = event.target.value;
   // Check if item is already in cart
   let product = ProductMap.get(productSku);
   console.log("Product ===========");
   console.log(product);
   if (Cart.has(product.sku)) {
      // Increment quantity
      Cart.get(product.sku).incrementQuantity();
   } else {
      // Add new item into the cart
      Cart.set(product.sku, new CartItems(product, 1));
   }

   // insert backend function here
   // only increment the item quantity by one each time
   // pass "item_id" in as variable
   // item_id = the product_id (in string format) associated with the item to add cart

   // refresh the register page
   updateCart();
}

function removeItemFromCart(ev) {
   // remove item from cart
   let productSku = ev.target.value;
   //console.log(item_id);
   // Check if item is already in cart
   if (!Cart.has(productSku)) {
      return; // Do nothing if item is not in cart 
   } else {
      if (Cart.get(productSku).quantity == 1) { // Remove item from cart if quantity is 1
         Cart.delete(productSku);
      } else {
         Cart.get(productSku).decrementQuantity();
      }
   }

   // Decrement quantity
   // insert backend function here
   // only increment the item quantity by one each time
   // pass "item_id" in as variable
   // item_id = the product_id (in string format) associated with the item to add cart

   // refresh the register page
   updateCart();
}

// Updates the UI
function updateCartItems() {
   // let data;
   let cart = document.getElementById("cartItemList");
   appendData(Cart);
   // get data from backend
   // fetch("./js/temp/cart.json")
   //    .then(function (response) {
   //       return response.json();
   //    })
   //    .then(function (data) {
   //       appendData(data);
   //    })
   //    .catch(function (err) {
   //       console.log(err);
   //    });

   // Takes in an array of CartItems
   function appendData(data) {
      cart.innerHTML = "";
      data.forEach((cartItem, sku) => {
         let elem = document.createElement("div");
         elem.classList.add("cartItemWrapper");

         elem.innerHTML =
            `
            <div class="imgInfo flex">
               <img
                  class="cartItemImage"
                  src="` +
               ImagePath + cartItem.product.sku + ".jpg" +
               `"
                  alt="` +
               cartItem.product.summary +
               `"
               />
               <div class="cartItemInfo">
                  <h3 class="cartItemTitle">` +
               cartItem.product.title +
               `</h3>
                  <div class="cartItemBtns flex">
                     <button class="cartItemMinusSign" value="` +
               cartItem.product.sku +
               `">
                        &minus;
                     </button>

                     <p class="cartItemCount">` +
               cartItem.quantity +
               `</p>

                     <button class="cartItemPlusSign" value="` +
               cartItem.product.sku +
               `">
                        &plus;
                     </button>
                  </div>
               </div>
            </div>
         `;
         cart.appendChild(elem);
      });
      // {
      //    let elem = document.createElement("div");
      //    elem.classList.add("cartItemWrapper");

      //    elem.innerHTML =
      //       `
      //    <div class="imgInfo flex">
      //       <img
      //          class="cartItemImage"
      //          src="` +
      //       ImagePath + data[i].product.sku + ".jpg" +
      //       `"
      //          alt="` +
      //       data[i].product.summary +
      //       `"
      //       />
      //       <div class="cartItemInfo">
      //          <h3 class="cartItemTitle">` +
      //       data[i].product.title +
      //       `</h3>
      //          <div class="cartItemBtns flex">
      //             <button class="cartItemMinusSign" value="` +
      //       data[i].sku +
      //       `">
      //                &minus;
      //             </button>

      //             <p class="cartItemCount">` +
      //       data[i].quantity +
      //       `</p>

      //             <button class="cartItemPlusSign" value="` +
      //       data[i].product.sku +
      //       `">
      //                &plus;
      //             </button>
      //          </div>
      //       </div>
      //    </div>
      // `;

      //    cart.appendChild(elem);
      // }

      const cartPlusSign = document.querySelectorAll(
         "main #cart #cartItemList .cartItemWrapper .cartItemBtns .cartItemPlusSign"
      );

      cartPlusSign.forEach((sign) => {
         sign.addEventListener("click", addItemToCart);
      });

      const cartMinusSign = document.querySelectorAll(
         "#cart #cartItemList .cartItemWrapper .cartItemBtns .cartItemMinusSign"
      );

      cartMinusSign.forEach((sign) => {
         sign.addEventListener("click", removeItemFromCart);
      });
   }
}

function updateGallery() {
   // let data; // Possibly unused
   let gallery = document.getElementById("gallery");
   // determine what data to get from backend
   // let queryString = window.location.search;
   // let urlParams = new URLSearchParams(queryString);
   // if (urlParams.has("category")) { // 
   //    let category = urlParams.get("category");
   //    // set selected menu option as current
   //    // fetch data from backend
   //    // submit query using selected category
   //    // assign results to json variable

   //    // fetch("./js/temp/products.json")
   //    //    .then(function (response) {
   //    //       return response.json();
   //    //    })
   //    //    .then(function (data) {
   //    //       appendData(data);
   //    //    })
   //    //    .catch(function (err) {
   //    //       console.log(err);
   //    //    });
   // } else { // Option 'all' is selected 
   //    // set menu option 'all' as current
   //    // fetch data from backend
   //    // submit query for all products
   //    // assign results to json variable
   //    appendData(CategoryMap.get("all"));
   // }
   let category = ActiveCategory.get();
   if (!CategoryMap.has(category)) {
      alert("Error loading products of this category.")
      return;
   }
   appendData(CategoryMap.get(category));
   function appendData(data) {
      gallery.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
         let elem = document.createElement("div");
         elem.classList.add("itemWrapper");

         elem.innerHTML =
            `
            <h3 class="itemTitle">` +
            data[i].title +
            `</h3>
            <img class="itemImage" src="` +
            ImagePath + data[i].sku + ".jpg" +
            `" alt="` +
            data[i].summary +
            `" />
            <div class="itemBtns flex">
               <button class="itemMinusSign" value="` +
            data[i].sku +
            `">&minus;</button>
               <button class="itemPlusSign" value="` +
            data[i].sku +
            `">&plus;</button>
            </div>
         `;

         gallery.appendChild(elem);
      }

      const plusSign = document.querySelectorAll(
         "#gallery .itemWrapper .itemPlusSign"
      );

      plusSign.forEach((sign) => {
         sign.addEventListener("click", addItemToCart);
      });

      const minusSign = document.querySelectorAll(
         "#gallery .itemWrapper .itemMinusSign"
      );

      minusSign.forEach((sign) => {
         sign.addEventListener("click", removeItemFromCart);
      });
   }
}

function updateMenuOptions() {
   let data = Array.from(CategoryMap.keys())// From the CategoryMap, return an array of strings containing the keys
   let menuOps = document.getElementById("menuOptionsBar");
   appendData(data);
   // get data from backend
   // fetch("./js/temp/categories.json")
   //    .then(function (response) {
   //       return response.json();
   //    })
   //    .then(function (data) {
   //       appendData(data);
   //    })
   //    .catch(function (err) {
   //       console.log(err);
   //    });

   function appendData(data) {
      menuOps.innerHTML = "";
      // let queryString = window.location.search;
      // let urlParams = new URLSearchParams(queryString);
      for (let i = 0; i < data.length; i++) {
         let btn = document.createElement("a");
         btn.classList.add("menuBtn", "text-wrap");
         // Set the id to the category name
         btn.id = data[i] + "-btn";
         // check GET param for current tab
         // if (urlParams.has("category")) {
         //    let category = urlParams.get("category");
         //    //then add class it if matches
         //    if (category == data[i]) {
         //       btn.classList.add("currentBtn");
         //    }
         // } else { // If category is not provided, then 'all' is selected
         //    // if (data[i].categoryID == "0") {
         //    //    btn.classList.add("currentBtn");
         //    // }
         //    if (data[i] == "all") {
         //       btn.classList.add("currentBtn");
         //    }
         // }
         if (data[i] === ActiveCategory.get()) {
            btn.classList.add("currentBtn");
         }
         // Change the state
         btn.addEventListener("click", () => {
            ActiveCategory.set(data[i]);
            updateGallery(); 
         });
         // btn.href = "./register.html" + "?category=" + data[i];
            // (data[i].categoryID == "0"
            //    ? ""
            //    : "?category=" + data[i].categoryName) +
            // "";
         btn.innerHTML = data[i];

         menuOps.appendChild(btn);
      }
   }

   const categoryOptionsScrollRightBtn = document.getElementById("slideRight");

   categoryOptionsScrollRightBtn.onclick = function () {
      document.getElementById("menuOptionsBar").scrollLeft +=
         document.getElementById("menuOptionsBar").clientWidth * 0.8;
   };

   const categoryOptionsScrollLeftBtn = document.getElementById("slideLeft");

   categoryOptionsScrollLeftBtn.onclick = function () {
      document.getElementById("menuOptionsBar").scrollLeft -=
         document.getElementById("menuOptionsBar").clientWidth * 0.8;
   };
}

function updateCart() {
   let data;
   let cart = document.getElementById("cartItemList");
   // get data from backend

   fetch("./js/temp/checkout.json")
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         appendData(data);
      })
      .catch(function (err) {
         console.log(err);
      });

   function appendData(data) {
      const count = document.getElementById("cartCountBadge");
      count.innerHTML = data[0].itemCount;

      const subtot = document.getElementById("subtotalAmount");
      subtot.innerHTML = data[0].subtotal;

      const tax = document.getElementById("taxAmount");
      tax.innerHTML = data[0].tax;

      const savings = document.getElementById("savingsAmount");
      savings.innerHTML = data[0].savings;

      const tot = document.getElementById("totalAmount");
      // Convert CartMap into an array
      let products = [];
      Cart.forEach((value, key) => {
         let quantity = value.quantity;
         for (let i = 0; i < quantity; i++) {
            products.push(value.product);
         }
      });
      // tot.innerHTML = data[0].total;
      Backend.calculateTotal({
         products
      })
         .then((total) => {
            tot.innerHTML = total;
         });

      const emp = document.getElementById("userName");
      emp.innerHTML = data[0].employee;

      const emp_id = document.getElementById("userID");
      emp_id.innerHTML = data[0].employee_id;

      updateCartItems();
   }
}

async function loadProductMap() {
   let productsQuery = await Backend.getAllProducts();
   if (productsQuery.error !== null) {
      alert("Error loading products");
      return;
   }
   let allProducts = productsQuery.data;
   // First, load the "all" category
   CategoryMap.set("all", allProducts);
   // Then, load the rest of the categories and products
   for (let i = 0; i < allProducts.length; i++) {
      let product = allProducts[i];
      ProductMap.set(product.sku, product);
      let category = product.category;
      if (!CategoryMap.has(category)) {
         CategoryMap.set(category, []);
      }
      CategoryMap.get(category).push(product);
   }
}

async function reloadProductMap() {
   CategoryMap.clear();
   await loadProductMap();
}

// Sets up the page
function init() {
   console.log("Initializing page...");
   if (CategoryMap.size !== 0) {
      return;
   }
   loadProductMap()
      .then(() => {
         updateGallery();
         updateMenuOptions();
         updateCart();
      });
}

init();
// updateGallery();
// updateMenuOptions();
// updateCart();
