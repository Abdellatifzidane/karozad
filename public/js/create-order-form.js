document.addEventListener("DOMContentLoaded", function() {
  // Variables for elements
  var addButton = document.getElementById("button-addon2");
  var productList = document.querySelector(".create-order-products-list");
  var paymentRadio = document.getElementById("payment-radio");
  var versementRadio = document.getElementById("versement-radio");
  var notPayedRadio = document.getElementById("not-payed-radio");
  var versedAmountContainer = document.getElementById("versed-amount-container");
  var shapeSelector = document.getElementById('create-order-shape-selector');
  var productSelector = document.getElementById('create-order-product-selector');
  var lengthInput = document.getElementById('create-order-length-input');
  var widthInput = document.getElementById('create-order-width-input');
  var angleInput = document.getElementById('create-order-angle-input');
  var quantityInput = document.getElementById('create-order-quantity-input');
  var productPriceInput = document.getElementById('create-order-product-price-input');
  var unitPricePerProduct = document.getElementById('unit-price-per-product');
  var totalPricePerProduct = document.getElementById('total-price-per-product');
  var areaUnitMesurment = document.getElementById('Area-unit-mesurment');
  var orderTotalPrice = document.getElementById('order-total-price');
  var versedAmountInput = document.querySelector('#versed-amount-container input');
  var createOrderFormOverview = document.getElementById('create-order-form-overview');
  var QuantityAlert = document.getElementById('quantity-alert');
  var unitPricePerProductHiddenInput =  document.getElementById('unit-price-Per-Product-hidden-input');
  var totalPricePerProductHiddenInput =  document.getElementById('total-price-Per-Product-hidden-input');
  var orderTotalPriceHiddenInput =  document.getElementById('order-total-price-hidden-input');
  var stayedToPay = document.getElementById('stayed-to-pay');
  const submitButton = document.getElementById('submitBtn');


  // JavaScript code to handle the selection and extraction of customer ID
  document.getElementById('create-order-costumer-selector').addEventListener('input', function() {
  const input = this.value.trim().split(' ');
  const selectedOption = document.querySelector(`#datalistOptions option[value="${input[0]} ${input[1]}"]`);
  
  if (selectedOption) {
      const customerId = selectedOption.dataset.id;
      document.getElementById('customer-id').value = customerId;
  }
});


  // Function to set input measurements display
  function setInputsMesurmentDisplay(shapeSelector,lengthInput, widthInput, angleInput,areaUnitMesurment,productPriceInput,quantityInput,totalPricePerProduct,unitPricePerProduct) {
    const selectedValue = shapeSelector.value;
    switch (selectedValue) {
      case 'square':
        lengthInput.placeholder = "longeur";
        lengthInput.disabled = false;
        widthInput.disabled = true;
        angleInput.disabled = true;
        widthInput.value ="";
        angleInput.value = "";
        areaUnitMesurment.textContent = "cm";
        break;
      case 'rectangle':
        lengthInput.placeholder = "longeur";
        lengthInput.disabled = false;
        widthInput.disabled = false;
        angleInput.disabled = true;
        angleInput.value = "";
        areaUnitMesurment.textContent = "cm";
        break;
      case 'triangle':
        lengthInput.placeholder = "longeur";
        lengthInput.disabled = false;
        widthInput.disabled = false;
        angleInput.disabled = false;
        areaUnitMesurment.textContent = "cm";
        break;
      case 'other':
        lengthInput.placeholder = "Surface";
        lengthInput.disabled = false;
        widthInput.disabled = true;
        angleInput.disabled = true;
        lengthInput.value = "";
        widthInput.value ="";
        angleInput.value = "";
        areaUnitMesurment.textContent = "m²";
        break;
      default:
        break;
    }
    lengthInput.value = "";
    widthInput.value ="";
    angleInput.value = "";
    productPriceInput.value = "";
    quantityInput.value = "";
    totalPricePerProduct.textContent = 0 ;
    unitPricePerProduct.textContent = 0 ;
    orderTotalPrice.textContent = formateNumberToBeShown(calculateOrderTotal());
    orderTotalPriceHiddenInput.value = formateNumberToBePosted(calculateOrderTotal());

  }

  // Function to handle shape selector change
  function handleShapeSelectorChange() {
    setInputsMesurmentDisplay(shapeSelector,lengthInput, widthInput, angleInput,areaUnitMesurment,productPriceInput,quantityInput,totalPricePerProduct,unitPricePerProduct);
  }
  // Initial setup for input fields based on shape selector
  setInputsMesurmentDisplay(shapeSelector,lengthInput, widthInput, angleInput,areaUnitMesurment,productPriceInput,quantityInput,totalPricePerProduct,unitPricePerProduct);

  // Event listener for shape selector change
  shapeSelector.addEventListener('change', handleShapeSelectorChange);

  function getProductTotalQuantity(productSelector){
      // Get the selected option
      const selectedOption = productSelector.options[productSelector.selectedIndex];   
      // Get the value of the custom attribute
      const productTotalQuantity = selectedOption.getAttribute('data-product-total-quantity'); 
      console.log(productTotalQuantity)
      // Log the value
      return productTotalQuantity;
  }
  getProductTotalQuantity(productSelector)



  // Event listener for adding new product
  addButton.addEventListener("click", function() {
    var newProductItem = productList.firstElementChild.cloneNode(true);
    var deleteIcon = document.createElement('span');
    deleteIcon.classList.add('delete-icon');
    deleteIcon.innerHTML = '&times;';
    newProductItem.insertBefore(deleteIcon, newProductItem.firstChild);
    // Clear input fields or reset to default values if needed
    var inputs = newProductItem.querySelectorAll('input, select');
    inputs.forEach(function(input) {
      if (input.tagName === 'INPUT') {
        input.value = ''; // Clear input field
      } else if (input.tagName === 'SELECT') {
        input.selectedIndex = 0; // Reset select field to default option
      }
    });
    // Append the cloned item to the list
    productList.appendChild(newProductItem);

    var newShapeSelector = newProductItem.querySelector('#create-order-shape-selector');
    var newProductSelector = newProductItem.querySelector('#create-order-product-selector');
    var newLengthInput = newProductItem.querySelector('#create-order-length-input');
    var newWidthInput = newProductItem.querySelector('#create-order-width-input');
    var newAngleInput = newProductItem.querySelector('#create-order-angle-input');
    var newQuantityInput = newProductItem.querySelector('#create-order-quantity-input');
    var newProductPriceInput = newProductItem.querySelector('#create-order-product-price-input');
    var newUnitPricePerProduct = newProductItem.querySelector('#unit-price-per-product');
    var newTotalPricePerProduct = newProductItem.querySelector('#total-price-per-product');
    var newAreaUnitMesurment = newProductItem.querySelector('#Area-unit-mesurment');
    var newQuantityAlert = newProductItem.querySelector('#quantity-alert');
    var newUnitPricePerProductHiddenInput =  newProductItem.querySelector('#unit-price-Per-Product-hidden-input');
    var newTotalPricePerProductHiddenInput =  newProductItem.querySelector('#total-price-Per-Product-hidden-input');

  


    newUnitPricePerProduct.textContent = 0 ;
    newTotalPricePerProduct.textContent = 0 ;

    setInputsMesurmentDisplay(newShapeSelector, newLengthInput, newWidthInput, newAngleInput, newAreaUnitMesurment, newProductPriceInput, newQuantityInput, newTotalPricePerProduct, newUnitPricePerProduct);

    newShapeSelector.addEventListener('change', function() {
      setInputsMesurmentDisplay(newShapeSelector, newLengthInput, newWidthInput, newAngleInput, newAreaUnitMesurment, newProductPriceInput, newQuantityInput, newTotalPricePerProduct, newUnitPricePerProduct);
    });
    const newInputs = newProductItem.querySelectorAll('input');
    
    newInputs.forEach(newInput => {
      newInput.addEventListener('keydown', function(event) {
        const key = event.key;
        // Allow Backspace and Delete keys
        if (key === 'Backspace' || key === 'Delete') {
            return;
        }
        // Allow digits (0-9) and the decimal point (.)
        if (!/^[\d.]$/.test(key)) {
            event.preventDefault();
        }
    });  
      newInput.addEventListener('input', function(event) {
       oneProductCalculate(newShapeSelector, newLengthInput, newWidthInput, newAngleInput, newProductPriceInput, newQuantityInput, newTotalPricePerProduct, newUnitPricePerProduct,newQuantityAlert,newProductSelector,newUnitPricePerProductHiddenInput,newTotalPricePerProductHiddenInput)
       orderTotalPrice.textContent = formateNumberToBeShown(calculateOrderTotal());
       orderTotalPriceHiddenInput.value = formateNumberToBePosted(calculateOrderTotal());

      });
    });  
  });

  // Event listener for delete icons
  productList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-icon')) {
      event.target.parentElement.remove(); // Remove the parent <li> element
      orderTotalPrice.textContent = formateNumberToBeShown(calculateOrderTotal());
      orderTotalPriceHiddenInput.value = formateNumberToBePosted(calculateOrderTotal());
      versedAmountInput.value = "";
    }
  });

  // Event listener for payment radio change
paymentRadio.addEventListener("change", function() {
  if (paymentRadio.checked) {
          versedAmountInput.disabled = true;
          versedAmountInput.value = "";
  }
});

// Event listener for versement radio change
versementRadio.addEventListener("change", function() {
  if (versementRadio.checked) {
        versedAmountInput.disabled = false;
  }
});



notPayedRadio.addEventListener("change", function() {
  if (notPayedRadio.checked) {
          versedAmountInput.disabled = true;
          versedAmountInput.value = "";
  }
});


  function formateNumberToBeShown(number) {
    // Convert the number to a string with two decimal places
    return parseFloat(number).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formateNumberToBePosted(number) {
  // Convert the number to a string with two decimal places
  return parseFloat(number).toFixed(2);
}


function triangleArea(a_cm, b_cm, angleInDegrees) {
  // Convert lengths from centimeters to meters
  var a_m = a_cm / 100;
  var b_m = b_cm / 100;
  
  // Convert angle from degrees to radians
  var angleInRadians = angleInDegrees * (Math.PI / 180);
  
  // Calculate the area using the formula
  var area_sqm = 0.5 * a_m * b_m * Math.sin(angleInRadians);
  
  return area_sqm;
}
  

  function oneProductCalculate(shapeSelector,lengthInput, widthInput, angleInput,productPriceInput,quantityInput,totalPricePerProduct,unitPricePerProduct,QuantityAlert,productSelector,unitPricePerProductHiddenInput,totalPricePerProductHiddenInput){
    var unitPricePerProductFormated = 0;
    var totalPricePerProductFormated = 0;

    if(shapeSelector.value == 'square' &&
      !lengthInput.value == "" &&
      !quantityInput.value == "" && 
      !productPriceInput.value == "" ){
        unitPricePerProductFormated = ((lengthInput.value * lengthInput.value) / 10000) * productPriceInput.value ;
        unitPricePerProductHiddenInput.value = formateNumberToBePosted(unitPricePerProductFormated);
        unitPricePerProduct.textContent = formateNumberToBeShown(unitPricePerProductFormated);
        totalPricePerProductFormated = unitPricePerProductFormated  * quantityInput.value; 
        totalPricePerProductHiddenInput.value = formateNumberToBePosted(totalPricePerProductFormated);
        totalPricePerProduct.textContent = formateNumberToBeShown(totalPricePerProductFormated); 

        if((((lengthInput.value * lengthInput.value) / 10000) * quantityInput.value) > getProductTotalQuantity(productSelector)){
          QuantityAlert.style.display = "block";
          }else{
          QuantityAlert.style.display = "none";
        }
    }
    else{
      totalPricePerProduct.textContent = 0 ;
      unitPricePerProduct.textContent = 0 ;
    }

    if(shapeSelector.value == 'rectangle'&& 
    !lengthInput.value == "" &&
    !widthInput.value == "" &&
    !quantityInput.value == "" && 
    !productPriceInput.value == "" ){

      unitPricePerProductFormated = ((lengthInput.value * widthInput.value) / 10000) * productPriceInput.value ;
      unitPricePerProductHiddenInput.value = formateNumberToBePosted(unitPricePerProductFormated);
      unitPricePerProduct.textContent = formateNumberToBeShown(unitPricePerProductFormated);
      totalPricePerProductFormated = unitPricePerProductFormated  * quantityInput.value; 
      totalPricePerProductHiddenInput.value = formateNumberToBePosted(totalPricePerProductFormated);
      totalPricePerProduct.textContent = formateNumberToBeShown(totalPricePerProductFormated); 

      if((((lengthInput.value * widthInput.value) / 10000) * quantityInput.value) > getProductTotalQuantity(productSelector)){
        QuantityAlert.style.display = "block";
      }else{
        QuantityAlert.style.display = "none";
      }   
      
    }
    if(shapeSelector.value == 'triangle'&& 
    !lengthInput.value == "" &&
    !widthInput.value == "" &&
    !quantityInput.value == "" && 
    !productPriceInput.value == "" &&
    !angleInput.value == ""){

      unitPricePerProductFormated = triangleArea(lengthInput.value,widthInput.value,angleInput.value) * productPriceInput.value ;
      unitPricePerProduct.textContent = formateNumberToBeShown(unitPricePerProductFormated);
      unitPricePerProductHiddenInput.value = formateNumberToBePosted(unitPricePerProductFormated);
      totalPricePerProductFormated = unitPricePerProductFormated  * quantityInput.value; 
      totalPricePerProductHiddenInput.value = formateNumberToBePosted(totalPricePerProductFormated);
      totalPricePerProduct.textContent = formateNumberToBeShown(totalPricePerProductFormated);
      if((triangleArea(lengthInput.value,widthInput.value,angleInput.value) * quantityInput.value) > getProductTotalQuantity(productSelector)){
        QuantityAlert.style.display = "block";
      }else{
        QuantityAlert.style.display = "none";
      }    
      
    }
    if(shapeSelector.value == 'other'&& 
    !lengthInput.value == "" &&
    !quantityInput.value == "" && 
    !productPriceInput.value == "" ){

      unitPricePerProductFormated =  lengthInput.value * productPriceInput.value ;
      unitPricePerProductHiddenInput.value = formateNumberToBePosted(unitPricePerProductFormated);
      unitPricePerProduct.textContent = formateNumberToBeShown(unitPricePerProductFormated);
      totalPricePerProductFormated = unitPricePerProductFormated  * quantityInput.value; 
      totalPricePerProductHiddenInput.value = formateNumberToBePosted(totalPricePerProductFormated);
      totalPricePerProduct.textContent = formateNumberToBeShown(totalPricePerProductFormated); 

      if((lengthInput.value * quantityInput.value) > getProductTotalQuantity(productSelector)){
        QuantityAlert.style.display = "block";
      }else{
        QuantityAlert.style.display = "none";
      }  
    } 
    
  }

  function calculateOrderTotal() {
    var productPrices = document.querySelectorAll('#total-price-per-product');
    var totalPrice = 0;
    productPrices.forEach(function(productPrice) {
      totalPrice += parseFloat(productPrice.textContent.replace(/,/g, '')); // Remove commas and convert to number
    });
    return totalPrice;
  }

const inputs = document.querySelectorAll('#li input')

inputs.forEach(input => {
  input.addEventListener('keydown', function(event) {
    const key = event.key;
    // Allow Backspace and Delete keys
    if (key === 'Backspace' || key === 'Delete') {
        return;
    }
    // Allow digits (0-9) and the decimal point (.)
    if (!/^[\d.]$/.test(key)) {
        event.preventDefault();
    }
});

  input.addEventListener('input', function(event) {
   oneProductCalculate(shapeSelector,lengthInput, widthInput, angleInput,productPriceInput,quantityInput,totalPricePerProduct,unitPricePerProduct,QuantityAlert,productSelector,unitPricePerProductHiddenInput,totalPricePerProductHiddenInput)
   orderTotalPrice.textContent = formateNumberToBeShown(calculateOrderTotal());
   orderTotalPriceHiddenInput.value = formateNumberToBePosted(calculateOrderTotal());
  });
});

angleInput.addEventListener('input', function(event) {
    var angleValue = parseFloat(angleInput.value);
    // Check if angle is less than 1 or greater than 180
    if (angleValue < 1 || angleValue > 180) {
        angleInput.value = angleInput.dataset.prevValue || ''; 
    } else {
        angleInput.dataset.prevValue = angleInput.value;
    }
});


versedAmountInput.addEventListener('input', function(event) {
  var angleValue = parseFloat(versedAmountInput.value);
  // Check if angle is less than 1 or greater than 180
  if (angleValue < 0 || angleValue > calculateOrderTotal() ) {
      versedAmountInput.value = versedAmountInput.dataset.prevValue || ''; 
  } else {
      versedAmountInput.dataset.prevValue = versedAmountInput.value;
  }
});

versedAmountInput.addEventListener('keydown', function(event) {
  const key = event.key;
  // Allow Backspace and Delete keys
  if (key === 'Backspace' || key === 'Delete') {
      return;
  }
  // Allow digits (0-9) and the decimal point (.)
  if (!/^[\d.]$/.test(key)) {
      event.preventDefault();
  }
}); 

submitButton.addEventListener('click',function(){
    // Enable disabled inputs temporarily
    const disabledInputs = document.querySelectorAll('input:disabled');
    disabledInputs.forEach(input => {
      input.disabled = false;
      input.value = 0 ;

      if (paymentRadio.checked) {
        versedAmountInput.value = formateNumberToBePosted(calculateOrderTotal()) ;
      }
    });

  if(paymentRadio.checked){
    stayedToPay.value = 0 ;
  }
  if(notPayedRadio.checked){
    stayedToPay.value = formateNumberToBePosted(calculateOrderTotal());
  }
  else{
    stayedToPay.value = formateNumberToBePosted(calculateOrderTotal() - versedAmountInput.value);
    if(stayedToPay.value == 0 ){
      paymentRadio.checked = true;
    }
  }
})


  
});



