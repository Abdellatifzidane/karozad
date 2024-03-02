var orders = document.querySelectorAll('.list-group-item');
const orderDeleteButton = document.getElementById('delete-order-button');
const orderUpdateButton = document.getElementById('updateOrderButton')
const deletingSuccessAlert = document.getElementById('deleting-success-alert');
const orderUpdateForm = document.getElementById('update-order-form');
var updateButtonClicked = true;
var paymentRadio = document.getElementById("payment-radio");
var versementRadio = document.getElementById("versement-radio");
var notPayedRadio = document.getElementById("not-payed-radio");
var versedAmountInput = document.querySelector('#versed-amount-container input');



var OrderId = 0 ;
orders.forEach(function(order) {
  order.addEventListener('click', function(event) {
    orders.forEach(function(order) {
      order.classList.remove("highlighted");
  });
    this.classList.add("highlighted");
    var orderId = order.getAttribute('data-order-id');
    OrderId = orderId;
    getOrderDetailsById(orderId);
  });
});

orderDeleteButton.addEventListener('click',function(){
  deletingSuccessAlert.style.display = "block";
  deleteOrder(OrderId)
})

function getOrderDetailsById(orderId) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/orderDetails?OrderId=' + orderId, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var responseData = JSON.parse(xhr.responseText);
        console.log(responseData)
        updateOrderDetails(responseData);
      } else {
        console.error('Error fetching filtered orders:', xhr.status);
      }
    }
  };
  xhr.send();
}

function deleteOrder(orderId) {
  var xhr = new XMLHttpRequest();
  xhr.open('DELETE', '/deleteOrder?OrderId=' + orderId, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
      } else {
        
      }
    }
  };
  xhr.send();
}


function formateNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function updateOrderDetails(data) {
  document.querySelector('#order-details-container').style.display = "block";

  if(data.squares.length == 0 && data.rectangles.length == 0 ) {
    document.getElementById("squares-rectangles-head").style.display = 'none'
  }else{
    document.getElementById("squares-rectangles-head").style.display = 'table-header-group'
  }

  if(data.triangles.length == 0 ) {
    document.getElementById("triangles-head").style.display = 'none'
  }else{
    document.getElementById("triangles-head").style.display = 'table-header-group'
  }

  if(data.undifineds.length == 0) {
    document.getElementById("others-head").style.display = 'none'
  }else{
    document.getElementById("others-head").style.display = 'table-header-group'
  }

   var orderDate = new Date(data.overview.order_date); 
   var day = ('0' + orderDate.getDate()).slice(-2); 
   var month = ('0' + (orderDate.getMonth() + 1)).slice(-2); 
   var year = orderDate.getFullYear(); 
   var formattedDate = day + '/' + month + '/' + year; 
  

  // Update order information
  document.querySelector('#order-details-container .card-body').innerHTML = `
    <div class="row mb-3">
      <div class="col-sm-3"><strong>Numéro:</strong></div>
      <div class="col-sm-9">${data.overview.id}</div>
    </div>
    <div class="row mb-3">
      <div class="col-sm-3"><strong>nom du client:</strong></div>
      <div class="col-sm-9">${data.overview.customer_name + " " +  data.overview.customer_surname}</div>
    </div>
    <div class="row mb-3">
      <div class="col-sm-3"><strong>Date:</strong></div>
      <div class="col-sm-9">${formattedDate}</div>
    </div>
    <div class="row mb-3">
      <div class="col-sm-3"><strong>Etat de la commande:</strong></div>
      <div class="col-sm-9">${data.overview.status}</div>
    </div>
    <div class="row mb-3">
      <div class="col-sm-3"><strong>Etat de paiement:</strong></div>
      <div class="col-sm-9">${data.overview.payment_status}</div>
    </div>
    <div class="row mb-3">
      <div class="col-sm-3"><strong>Versé:</strong></div>
      <div class="col-sm-9">${formateNumber(data.overview.paid)}  DA</div>
    </div>
    <div class="row mb-3">
      <div class="col-sm-3"> <strong>Reste à payer:</strong></div>
      <div class="col-sm-9">${formateNumber(data.overview.stayed)}  DA</div>
    </div>
    
  `;

  // Update squares and rectangles table
  var squaresRectanglesTable = document.getElementById('squares-rectangles-table');
  // Clear existing rows
  squaresRectanglesTable.querySelectorAll('tbody tr').forEach(row => row.remove());
    data.squares.forEach(function(square) {
      var newRow = squaresRectanglesTable.querySelector('tbody').insertRow();
      newRow.innerHTML = `
        <td>${square.marble_name}</td>
        <td>${square.side_length}</td>
        <td>${square.side_length}</td>
        <td>${square.quantity}</td>
        <td>${formateNumber(square.unit_price)}</td>
        <td>${formateNumber(square.total_price)}</td>
      `;
    });
    data.rectangles.forEach(function(rectangle) {
      var newRow = squaresRectanglesTable.querySelector('tbody').insertRow();
      newRow.innerHTML = `
        <td>${rectangle.marble_name}</td>
        <td>${rectangle.length}</td>
        <td>${rectangle.width}</td>
        <td>${rectangle.quantity}</td>
        <td>${formateNumber(rectangle.unit_price)}</td>
        <td>${formateNumber(rectangle.total_price)}</td>
      `;
    });


  // Update triangles table
  var trianglesTable = document.getElementById('triangles-table');
  // Clear existing rows
  trianglesTable.querySelectorAll('tbody tr').forEach(row => row.remove());
  data.triangles.forEach(function(triangle) {
    var newRow = trianglesTable.querySelector('tbody').insertRow();
    newRow.innerHTML = `
      <td>${triangle.marble_name}</td>
      <td>${triangle.side_1}</td>
      <td>${triangle.side_2}</td>
      <td>${triangle.angle}</td>
      <td>${triangle.quantity}</td>
      <td>${formateNumber(triangle.unit_price)}</td>
      <td>${formateNumber(triangle.total_price)}</td>
    `;
  });

  // Update others table
  var othersTable = document.getElementById('others-table');
  // Clear existing rows
  othersTable.querySelectorAll('tbody tr').forEach(row => row.remove());
  data.undifineds.forEach(function(undifined) {
    var newRow = othersTable.querySelector('tbody').insertRow();
    newRow.innerHTML = `
      <td>${undifined.marble_name}</td>
      <td>${undifined.unit_area}</td>
      <td>${undifined.quantity}</td>
      <td>${formateNumber(undifined.unit_price)}</td>
      <td>${formateNumber(undifined.total_price)}</td>
    `;
  });

  document.getElementById('order-details-total-price').textContent = formateNumber(data.overview.total_price) + " DA";
}

orderUpdateButton.addEventListener('click',function(){
  if(updateButtonClicked){
    orderUpdateForm.style.display = 'block';
    updateButtonClicked = false;
  }else{
    orderUpdateForm.style.display = 'none';
    updateButtonClicked =  true
  }
  scrollToBottom();
})

function scrollToBottom() {
  orderUpdateForm.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

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



