/*
 * Show / Hide Cart
 */

const ShowHideCartBtn = document.getElementById("cartBtn");
ShowHideCartBtn.onclick = function () {
   document.getElementById("cart").classList.toggle("showCart");
};

function addItemToCart(ev) {
   // add item to cart
   let item_id = ev.target.value;
   //console.log(item_id);

   // insert backend function here
   // only increment the item quantity by one each time
   // pass "item_id" in as variable
   // item_id = the product_id (in string format) associated with the item to add cart

   // refresh the register page
   updateCart();
}

function removeItemFromCart(ev) {
   // remove item from cart
   let item_id = ev.target.value;
   //console.log(item_id);

   // insert backend function here
   // only increment the item quantity by one each time
   // pass "item_id" in as variable
   // item_id = the product_id (in string format) associated with the item to add cart

   // refresh the register page
   updateCart();
}

function updateCartItems() {
   let data;
   let cart = document.getElementById("cartItemList");
   // get data from backend
   fetch("./js/temp/cart.json")
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
      cart.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
         let elem = document.createElement("div");
         elem.classList.add("cartItemWrapper");

         elem.innerHTML =
            `
         <div class="imgInfo flex">
            <img
               class="cartItemImage"
               src="` +
            data[i].image_path +
            `"
               alt="` +
            data[i].summary +
            `"
            />
            <div class="cartItemInfo">
               <h3 class="cartItemTitle">` +
            data[i].title +
            `</h3>
               <div class="cartItemBtns flex">
                  <button class="cartItemMinusSign" value="` +
            data[i].sku +
            `">
                     &minus;
                  </button>

                  <p class="cartItemCount">` +
            data[i].quantity +
            `</p>

                  <button class="cartItemPlusSign" value="` +
            data[i].sku +
            `">
                     &plus;
                  </button>
               </div>
            </div>
         </div>
      `;

         cart.appendChild(elem);
      }

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
   let data;
   let gallery = document.getElementById("gallery");
   // determine what data to get from backend
   let queryString = window.location.search;
   let urlParams = new URLSearchParams(queryString);
   if (urlParams.has("category")) {
      let category = urlParams.get("category");
      // set selected menu option as current
      // fetch data from backend
      // submit query using selected category
      // assign results to json variable
      fetch("./js/temp/products.json")
         .then(function (response) {
            return response.json();
         })
         .then(function (data) {
            appendData(data);
         })
         .catch(function (err) {
            console.log(err);
         });
   } else {
      // set menu option 'all' as current
      // fetch data from backend
      // submit query for all products
      // assign results to json variable
      fetch("./js/temp/products.json")
         .then(function (response) {
            return response.json();
         })
         .then(function (data) {
            appendData(data);
         })
         .catch(function (err) {
            console.log(err);
         });
   }
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
            data[i].image_path +
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
   let data;
   let menuOps = document.getElementById("menuOptionsBar");
   // get data from backend
   fetch("./js/temp/categories.json")
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
      menuOps.innerHTML = "";
      let queryString = window.location.search;
      let urlParams = new URLSearchParams(queryString);
      for (let i = 0; i < data.length; i++) {
         let btn = document.createElement("a");
         btn.classList.add("menuBtn", "text-wrap");
         // check GET param for current tab
         if (urlParams.has("category")) {
            let category = urlParams.get("category");
            //then add class it if matches
            if (category == data[i].categoryName) {
               btn.classList.add("currentBtn");
            }
         } else {
            if (data[i].categoryID == "0") {
               btn.classList.add("currentBtn");
            }
         }
         btn.href =
            "./register.html" +
            (data[i].categoryID == "0"
               ? ""
               : "?category=" + data[i].categoryName) +
            "";
         btn.innerHTML = data[i].categoryName;

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
      tot.innerHTML = data[0].total;

      const emp = document.getElementById("userName");
      emp.innerHTML = data[0].employee;

      const emp_id = document.getElementById("userID");
      emp_id.innerHTML = data[0].employee_id;

      updateCartItems();
   }
}

updateMenuOptions();
updateGallery();
updateCart();
