// Below this is purchace 
const handleStringValidation = (identifier, prefix) => {
    const element = document.querySelector(`#${identifier}`).value.trim();
    if (!element) {
        document.querySelector(`#${identifier}Error`).innerText = `*${prefix} is required.`;
        isValid = false;
    }
}

let isValid = true;

const purchaseForm = document.getElementById('purchaseForm');
document.addEventListener('DOMContentLoaded', () => {

    if (purchaseForm) {

        purchaseForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const name = document.querySelector('#name');
            const cardNumber = document.querySelector('#cardnumber');
            const cardName = document.querySelector('#cardname').value;
            const expMonth = document.querySelector('#expmonth').value;
            const expYear = document.querySelector('#expyear').value;
            const quantity = parseInt(document.getElementById('quantity').value);

            // Clear previous error messages
            document.querySelectorAll('.error').forEach(el => el.innerHTML = '');

            isValid = true;

            // Validate name
            handleStringValidation('name', 'Name');

            // Validate email
            handleStringValidation('email', 'Email');

            // Validate product selection
            handleStringValidation('filemproduct', 'Product');

            // Validate Quantity
            console.log('quantity', quantity)
            if(!quantity){
                document.getElementById('quantityError').innerText = "*Must purchase at least one ticket";
                isValid = false;
            }

            // Validate quantity
            handleStringValidation('cardname', 'Cardholder name')

            // Validate card number (must be 6 digits)
            if (cardNumber.value.length !== 6 || !/^\d{6}$/.test(cardNumber.value.trim())) {
                document.getElementById('cardnumberError').innerText = "*Card number must be exactly 6 digits.";
                isValid = false;
            }

            // Validate expiration month
            handleStringValidation('expmonth', 'Expiration month');

            // Validate expiration year
            handleStringValidation('expyear', 'Expiration year')

            // Validate CVV
            handleStringValidation('cvv', 'CVV');

            // Proceed with form submission if all fields are valid
            if (isValid) {
                // Get selected product price and calculate total price
                const selectedOption = document.getElementById('filemproduct').options[document.getElementById('filemproduct').selectedIndex];
                const pricePerUnit = parseFloat(selectedOption.getAttribute('data-price')) || 0;
    
                const totalPrice = pricePerUnit * quantity+(pricePerUnit * quantity)*0.13;
        

                // Collect data from the form, including the calculated total price
                const formData = {
                    name: name.value,
                    email: email.value,
                    product: selectedOption.text,
                    quantity: quantity,
                    totalPrice: totalPrice.toFixed(2),  // Store the calculated total price
                    cardname: cardName,
                    cardname: cardName,
                    cardnumber: cardNumber.value,
                    expmonth: expMonth,
                    expyear: expYear,
                    cvv: cvv.value
                };

                // Store the data in localStorage
                localStorage.setItem('purchaseData', JSON.stringify(formData));

                // Redirect to the purchasing detail page
                window.location.href = 'purchase-detail.html';
            }

        });



        // Update shopping cart dynamically as the user changes product or quantity
        const productElement = document.getElementById('filemproduct');
        const quantityElement = document.getElementById('quantity')

        function updateCart() {
            const quantity = parseInt(document.getElementById('quantity').value) || 0;
            const selectedOption = productElement.options[productElement.selectedIndex];
            const pricePerUnit = parseFloat(selectedOption.getAttribute('data-price')) || 0;
            const subtotal = pricePerUnit * quantity
            const tax = subtotal * 0.13
            const totalPrice = (pricePerUnit * quantity) + tax;
            console.log(totalPrice)



            // Update the cart display
            document.getElementById('cart-product').textContent = selectedOption.text;
            document.getElementById('cart-quantity').textContent = quantity;
            document.getElementById('total-price').textContent = totalPrice.toFixed(2);
            document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`
            document.getElementById('cart-tax').textContent = `$${tax.toFixed(2)}`
            
            
        }

        // Trigger update when product or quantity changes
        productElement.addEventListener('change', updateCart);
        quantityElement.addEventListener('input', updateCart);

        // Initial cart update
        updateCart();
    }
});
//--------------------------------------------------------------//
// Below this is purchace details 
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve data for the purchase-detail page
    const purchaseData = JSON.parse(localStorage.getItem('purchaseData'));

    if (purchaseData) {
            document.getElementById('name').innerText = purchaseData.name;
            document.getElementById('name2').innerText = purchaseData.name;
            document.getElementById('email').innerText = purchaseData.email;
            document.getElementById('product').innerText = purchaseData.product;
            document.getElementById('quantity').innerText = purchaseData.quantity;
            document.getElementById('totalprice').innerText = purchaseData.totalPrice;  // Correct total price display

            document.getElementById('cardname').innerText = purchaseData.cardname;
            document.getElementById('cardnumber').innerText = purchaseData.cardnumber;
            document.getElementById('expmonth').innerText = purchaseData.expmonth;
            document.getElementById('expyear').innerText = purchaseData.expyear;
            document.getElementById('cvv').innerText = purchaseData.cvv;
    }
});
