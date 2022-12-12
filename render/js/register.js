/*
 * Hide Item Modal
 */

const closeEventModal = document
   .getElementById("modalCloseBtn")
   .addEventListener("click", closeModal);

function closeModal() {
   document.getElementById("modal").classList.add("hide");
}

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

class CategoryState {
   // Stores the state of the current category
   constructor() {
      this.current = "All"; // DO NOT MODIFY THE STATE DIRECTLY, CALL setState() instead!!!!
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
      document
         .getElementById(previousState + "-btn")
         .classList.remove("currentBtn");
      document.getElementById(category + "-btn").classList.add("currentBtn");
   }
}

const ImagePath = "./imgs/products/";
let ProductMap = new Map(); // <sku: String, product: Object>
let CategoryMap = new Map(); // <category: String, products: Array>
let Cart = new Map(); // <sku: String, quantity: Number>
let ActiveCategory = new CategoryState();
let salespersonID = null;
let salespersonName = null;
let DiscountsMap = new Map(); // <discount_name: String, discount: Object>
let AppliedDiscounts = [];
const emp_id = document.getElementById("userID");
function cartMapToArray() {
   let arr = [];
   Cart.forEach((cartItem, sku) => {
      for (let i = 0; i < cartItem.quantity; i++) {
         arr.push(cartItem.product);
      }
   });
   return arr;
}

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
      if (Cart.get(productSku).quantity == 1) {
         // Remove item from cart if quantity is 1
         Cart.delete(productSku);
      } else {
         Cart.get(productSku).decrementQuantity();
      }
   }

   updateCart();
}
function checkImgPath(imgPath) {
   if (
      imgPath == "null" ||
      isEmpty(imgPath) ||
      imgPath == "undefined" ||
      imgPath == null
   ) {
      return "./imgs/products/default.jpg";
   } else {
      return imgPath;
   }
}

// Updates the UI
async function updateCartItems() {
   // let data;
   let cart = document.getElementById("cartItemList");
   appendData(Cart);

   async function appendData(data) {
      cart.innerHTML = "";
      data.forEach((cartItem, sku) => {
         let elem = document.createElement("div");
         elem.classList.add("cartItemWrapper");
         let myPath = checkImgPath(String(cartItem.product.image_path));
         console.log("update cart items path " + myPath);

         elem.innerHTML =
            `
            <div class="imgInfo flex">
               <img class = "cartItemImage" 
                  src="${myPath}" 
                  alt="` +
            cartItem.product.summary +
            `"
               />
               <div class="cartItemInfo">
                  <h3 class="cartItemTitle">` +
            cartItem.product.title +
            `</h3>
                <h4 class="cartItemPrice">` +
            cartItem.product.price.toLocaleString("en-US", {
               style: "currency",
               currency: "USD",
            }) +
            `</h4>
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
         `;
         cart.appendChild(elem);
      });

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
   let category = ActiveCategory.get();
   if (!CategoryMap.has(category)) {
      Backend.showDialog(
         "Error. Could not get products for provided category."
      );
      return;
   }
   appendData(CategoryMap.get(category));
   function appendData(data) {
      gallery.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
         let elem = document.createElement("div");
         elem.classList.add("itemWrapper");
         let myPath = checkImgPath(String(data[i].image_path));
         elem.innerHTML =
            `
            <h3 class="itemTitle">` +
            data[i].title +
            `</h3>
            <h4 class="itemPrice">` +
            data[i].price.toLocaleString("en-US", {
               style: "currency",
               currency: "USD",
            }) +
            `</h4>
            <img class="itemImage" src="${myPath}" data-item-sku="` +
            data[i].sku +
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

      const itemImage = document.querySelectorAll(
         "#gallery .itemWrapper .itemImage"
      );

      itemImage.forEach((img) => {
         img.addEventListener("click", showItemModal);
      });
   }
}

function showItemModal(ev) {
   // get same data as in updateGallery
   fetch("./js/products.json")
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
      let dataSKU,
         imgSKU = ev.target.getAttribute("data-item-sku");
      for (let i = 0; i < data.length; i++) {
         dataSKU = data[i].sku;
         if (imgSKU == dataSKU) {
            const title = document.getElementById("modalTitle");
            title.innerHTML = data[i].title;

            const sku = document.getElementById("itemModalSku");
            sku.innerHTML = data[i].sku;

            const brand = document.getElementById("itemModalBrand");
            brand.innerHTML = data[i].brand;

            const supplier = document.getElementById("itemModalSupplier");
            supplier.innerHTML = data[i].supplier;

            const price = document.getElementById("itemModalPrice");
            price.innerHTML = data[i].price;

            const category = document.getElementById("itemModalCategory");
            category.innerHTML = data[i].category;

            const quantity = document.getElementById("itemModalQty");
            quantity.innerHTML = data[i].quantity;

            const summary = document.getElementById("itemModalSummary");
            summary.innerHTML = data[i].summary;

            const modalImg = document.getElementById("itemModalImage");
            modalImg.src = data[i].image_path;

            const modal = document.getElementById("modal");
            modal.classList.remove("hide");
         }
      }
   }
}

function updateMenuOptions() {
   let data = Array.from(CategoryMap.keys()); // From the CategoryMap, return an array of strings containing the keys
   let menuOps = document.getElementById("menuOptionsBar");
   appendData(data);

   function appendData(data) {
      menuOps.innerHTML = "";
      // let queryString = window.location.search;
      // let urlParams = new URLSearchParams(queryString);
      for (let i = 0; i < data.length; i++) {
         let btn = document.createElement("a");
         btn.classList.add("menuBtn", "text-wrap");
         // Set the id to the category name
         btn.id = data[i] + "-btn";
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
   appendData(data); // Data is undefined here but the function will still run
   function appendData(data) {
      let products = cartMapToArray();
      const count = document.getElementById("cartCountBadge");
      count.innerHTML = products.length;
      let subTotal = 0.0;
      Backend.calculateTotal({ products: products }).then((t) => {
         subTotal = t;
         subtot.innerHTML = subTotal;
      });
      let total = 0.0;
      Backend.calculateTotalWithDiscount({
         products: products,
         discount: AppliedDiscounts,
      }).then((t) => {
         total = t;
         tot.innerHTML = t;
         savings.innerHTML = Math.round((subTotal - total) * 100) / 100;
      });

      const subtot = document.getElementById("subtotalAmount");
      // subtot.innerHTML = subTotal;

      const tax = document.getElementById("taxAmount");
      tax.innerHTML = 0.0;

      const savings = document.getElementById("savingsAmount");
      savings.innerHTML = Math.round((subTotal - total) * 100) / 100;

      const tot = document.getElementById("totalAmount");
      // tot.innerHTML = total;

      const emp = document.getElementById("userName");
      emp.innerHTML = "";

      updateCartItems();
   }
}

async function loadProductMap() {
   let productsQuery = await Backend.getAllProducts();
   if (productsQuery.error !== null) {
      await Backend.showDialog(
         "Error. Could not get products for provided category."
      );
      return;
   }
   let allProducts = productsQuery.data;
   // First, load the "all" category
   CategoryMap.set("All", allProducts);
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

async function loadDiscountsMap() {
   let discountsQuery = await Backend.getAllDiscounts();
   if (discountsQuery.error !== null) {
      await Backend.showDialog("Error. Could not get discounts");
      return;
   }

   // Iterate through the number
   for (let i = 0; i < discountsQuery.data.length; i++) {
      let discountName = discountsQuery.data[i].discount_type;
      // set discount name to all lowercase
      discountName = discountName.toLowerCase();
      DiscountsMap.set(discountName, discountsQuery.data[i]);
   }
}

async function reloadProductMap() {
   CategoryMap.clear();
   await loadProductMap();
}

const checkoutButtonRef = document.getElementById("checkoutBtn");
checkoutButtonRef.addEventListener("click", async () => {
   // Get the cart items
   if (Cart.size === 0) {
      await Backend.showDialog("Cart is empty!");
      return;
   }
   let products = cartMapToArray();
   let discounts = [];
   Cart.clear();
   AppliedDiscounts = [];
   let queryResult = await Backend.createCashTransaction({
      products: products,
      discounts: discounts,
      salespersonID: salespersonID,
   });
   if (queryResult.error !== null) {
      await Backend.showDialog(
         "Error. Could not get products for provided category."
      );
      return;
   }
   await Backend.showDialog("Purchase complete!");
   updateCart();
});

const applyButtonRef = document.getElementById("applyBtn");
applyButtonRef.addEventListener("click", (discountInput) => {
   // Do a map lookup
   const discountInputRef = document.getElementById("discountInput");
   discountInput = discountInputRef.value;
   if (discountInput === "null") {
      // If null, remove all discounts
      AppliedDiscounts = [];
      Backend.showDialog("Removed all discounts");
      updateCart();
      return;
   }
   let discount = DiscountsMap.get(discountInput);
   if (discount === undefined) {
      Backend.showDialog("Discount not found");
      return;
   }
   // Check if the discount has already been applied
   if (AppliedDiscounts.includes(discount)) {
      Backend.showDialog("Discount already applied");
      return;
   }
   Backend.showDialog("Discount applied!");

   AppliedDiscounts.push(discount);
   updateCart();
});

// Sets up the page
async function init() {
   console.log("Initializing page...");
   if (CategoryMap.size !== 0) {
      return;
   }
   loadProductMap().then(() => {
      updateGallery();
      updateMenuOptions();
      updateCart();
   });

   loadDiscountsMap().then(() => {
      console.log(DiscountsMap);
   });
   let myLogin = await Backend.getSavedLogin();
   console.log(myLogin);
   if (typeof myLogin !== "string") {
      salespersonID = 1;
      salespersonName = "";
   } else {
      let salesperson = myLogin.split(" ");
      salespersonID = 1;
      salespersonName = salesperson[0];
   }
   if (myLogin != null && myLogin != "null") {
      let myID = myLogin.split(" ")[0];
      emp_id.innerText = myID;
   } else {
      emp_id.innerText = "Guest";
   }
}

init();
