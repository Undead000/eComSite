const PRODUCT1_NAME = "SuperRunner Patike";
const PRODUCT1_PRICE = 10999;
let PRODUCT1_QTY = 0;

const PRODUCT2_NAME = "ProRunner Patike";
const PRODUCT2_PRICE = 9499;
let PRODUCT2_QTY = 0;

const PRODUCT3_NAME = "GymFit Patike";
const PRODUCT3_PRICE = 7999;
let PRODUCT3_QTY = 0;

const VAT_RATE = 0.2;
const CURRENCY = "USD";
const USD_PER_EUR = 1.16;


const VALID_COUPONS = ["SAVE10", "SAVE15", "FREESHIP"];

console.log("Validni kuponi:", VALID_COUPONS);


console.log("PRODUCT1_NAME tip:", typeof PRODUCT1_NAME);
console.log("PRODUCT1_PRICE tip:", typeof PRODUCT1_PRICE);
console.log("VAT_RATE tip:", typeof VAT_RATE);

let iznos = 0;


function normalizeCoupon(code) {
  let trimmedCode = code.trim();
  let upperCode = trimmedCode.toUpperCase();
  return upperCode;
}


function isValidCoupon(code) {
  return VALID_COUPONS.includes(code);
}


console.log("=== Testiranje isValidCoupon funkcije ===");
console.log("isValidCoupon('SAVE10'):", isValidCoupon('SAVE10'));
console.log("isValidCoupon('SAVE15'):", isValidCoupon('SAVE15'));
console.log("isValidCoupon('FREESHIP'):", isValidCoupon('FREESHIP'));
console.log("isValidCoupon('INVALID'):", isValidCoupon('INVALID'));


function validateAndNotify() {
  let inputCode = document.getElementById('promo-input').value;
  let normalizedCode = normalizeCoupon(inputCode);
  
  if (!isValidCoupon(normalizedCode)) {
    alert("Uneti kod nije validan.");
  } else if (normalizedCode === "SAVE10") {
    alert("Vaš kupon donosi 10% popusta.");
  } else if (normalizedCode === "SAVE15") {
    alert("Vaš kupon donosi 15% popusta.");
  } else if (normalizedCode === "FREESHIP") {
    alert("Vaš kupon donosi besplatnu dostavu.");
  }
}

const allProducts = [
  { name: "SuperRunner Patike", price: 10999, qty: 15 },
  { name: "ProRunner Patike", price: 9499, qty: 8 },
  { name: "GymFit Patike", price: 7999, qty: 12 },
  { name: "Nike Air Max", price: 12999, qty: 5 },
  { name: "Adidas Ultraboost", price: 14999, qty: 20 },
  { name: "Puma RS-X", price: 8999, qty: 7 },
  { name: "Reebok Classic", price: 6999, qty: 3 },
  { name: "New Balance 574", price: 9999, qty: 18 },
  { name: "Converse All Star", price: 5999, qty: 25 },
  { name: "Vans Old Skool", price: 7499, qty: 9 }
];

console.log("Svi proizvodi:", allProducts);


function calculateTotalInventoryValue() {
  let totalValue = 0;
  
  for (let i = 0; i < allProducts.length; i++) {
    totalValue += allProducts[i].price * allProducts[i].qty;
  }
  
  let totalValueUSD = (totalValue / 120).toFixed(2);
  console.log("Ukupna vrednost lagera: " + totalValueUSD + " USD");
  console.log("Ukupna vrednost lagera: " + totalValue + " RSD");
  
  return totalValue;
}

calculateTotalInventoryValue();

let lowStock = [];

for (let i = 0; i < allProducts.length; i++) {
  if (allProducts[i].qty < 10) {
    lowStock.push(allProducts[i]);
  }
}

console.log("Proizvodi sa niskim stanjem (qty < 10):", lowStock);

function findProductByName(list, searchName) {
  let normalizedSearch = searchName.toLowerCase().trim();
  
  for (let i = 0; i < list.length; i++) {
    let normalizedProductName = list[i].name.toLowerCase().trim();
    
    if (normalizedProductName === normalizedSearch) {
      return list[i];
    }
  }
  
  return null;
}

console.log("=== Testiranje findProductByName funkcije ===");
console.log("Pretraga 'superrunner patike':", findProductByName(allProducts, "superrunner patike"));
console.log("Pretraga 'NIKE AIR MAX':", findProductByName(allProducts, "NIKE AIR MAX"));
console.log("Pretraga 'Nepostojeći proizvod':", findProductByName(allProducts, "Nepostojeći proizvod"));

function login(email, password) {
  let trimmedEmail = email.trim();
  let trimmedPassword = password.trim();
  
  if (trimmedEmail === "admin" && trimmedPassword === "admin") {
    return true;
  } else {
    return false;
  }
}

function testLogin() {
  let emailInput = document.getElementById('emailInput').value;
  let passwordInput = document.getElementById('passwordInput').value;
  
  let result = login(emailInput, passwordInput);
  
  if (result) {
    alert("Uspešna prijava!");
    window.location.href = "index.html";
  } else {
    alert("Pogrešan email ili lozinka. Pokušajte sa admin/admin");
  }
}

function dodajNaIznos(cena) {
  iznos += cena;
  console.log("Dodato " + cena + " RSD. Ukupan iznos: " + iznos + " RSD");
  updateCartIcon();
}

console.log("=== Test dodajNaIznos funkcije ===");
console.log("Početni iznos:", iznos);
dodajNaIznos(10999);
dodajNaIznos(9499);
dodajNaIznos(7999);
console.log("Finalni ukupan iznos:", iznos);

iznos = 0;

function updateCartIcon() {
  let cartIcon = document.querySelector('.cart');
  if (cartIcon) {
    let badge = cartIcon.querySelector('.cart-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'cart-badge';
      cartIcon.style.position = 'relative';
      cartIcon.appendChild(badge);
    }
    let itemCount = PRODUCT1_QTY + PRODUCT2_QTY + PRODUCT3_QTY;
    badge.textContent = itemCount > 0 ? itemCount : '';
  }
}

function openCart() {
  if (iznos > 0) {
    let iznosUDolarima = (iznos / 120).toFixed(2);
    alert("Ukupan iznos porudžbine:\n" + iznos + " RSD\n≈ $" + iznosUDolarima);
  } else {
    alert("Vaša korpa je prazna.");
  }
}

function updateQuantity(productIndex, change) {
  let qtyElement = document.querySelectorAll('.kontrole-kolicine span')[productIndex];
  let currentQty = parseInt(qtyElement.textContent);
  let newQty = currentQty + change;
  
  if (newQty < 0) newQty = 0;
  
  qtyElement.textContent = newQty;
  updateCheckoutTotal();
}

function updateCheckoutTotal() {
  let total = 0;
  let quantities = document.querySelectorAll('.kontrole-kolicine span');
  let prices = [10999, 9499, 7999];
  
  quantities.forEach((qtyElement, index) => {
    let qty = parseInt(qtyElement.textContent);
    total += qty * prices[index];
  });
  
  let totalElement = document.querySelector('.ukupno h5:last-child');
  if (totalElement) {
    totalElement.textContent = total.toLocaleString('sr-RS') + ' RSD';
  }
}

