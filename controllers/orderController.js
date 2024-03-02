import OrdersModel from "../models/orderModel.js";

class OrdersController {
    static getCreateOrderForm(req, res) {
        OrdersModel.getCostumers((customers) => {
            OrdersModel.getProducts((products) => {
                OrdersModel.getLastOrderId((lastOrderId) => {
                    var orderId = parseInt(lastOrderId) + 1 ;
                    res.render('orders/create-order.ejs', { orderId : orderId, products : products, customers: customers });  
                })
            })
        });
    }
    static postOrder(req,res){
        var orderData = req.body;
        var currentDate = new Date().toISOString().slice(0, 10);
        var squares = [];
        var rectangles = [];
        var triangles = [];
        var others = [];
        let i = 0 ;   
        const orderOverview = {
          id_customer: orderData['customer-id'],
          order_date : currentDate,
          payment_status: orderData['payment-status'],
          status: orderData['order-status'],
          paid: parseFloat(orderData['partial-payment-amount']),    
          total_price: parseFloat(orderData['order-total-price-hidden-input']),
          stayed: parseFloat(orderData['stayed-to-pay'])
        };

        console.log(currentDate)
          
        if( typeof orderData['product-shape'] === 'string'  ){
            if(orderData['product-shape'] == 'square'){
                squares.push({
                    order_id : orderData['order-id'],
                    product_id : orderData['product-id'],
                    side_length : orderData['product-length'],
                    quantity : orderData['product-quantity'],
                    unit_price : orderData['unit-price-Per-Product-hidden-input'],
                    total_price : orderData['total-price-Per-Product-hidden-input'] 
                });
            }
            if(orderData['product-shape'] == 'rectangle'){
                rectangles.push({
                    order_id : orderData['order-id'],
                    product_id : orderData['product-id'],
                    length : orderData['product-length'],
                    width : orderData['product-width'],
                    quantity : orderData['product-quantity'],
                    unit_price : orderData['unit-price-Per-Product-hidden-input'],
                    total_price : orderData['total-price-Per-Product-hidden-input'] 
                });
            }  
            if(orderData['product-shape'] == 'triangle'){
                triangles.push({
                    order_id : orderData['order-id'],
                    product_id : orderData['product-id'],
                    side_1 : orderData['product-length'],
                    side_2 : orderData['product-width'],
                    angle : orderData['product-angle'],
                    quantity : orderData['product-quantity'],
                    unit_price : orderData['unit-price-Per-Product-hidden-input'],
                    total_price : orderData['total-price-Per-Product-hidden-input'] 
                });
            }             
            if(orderData['product-shape'] == 'other'){
                others.push({
                    order_id : orderData['order-id'],
                    product_id : orderData['product-id'],
                    unit_area : orderData['product-length'],
                    quantity : orderData['product-quantity'],
                    unit_price : orderData['unit-price-Per-Product-hidden-input'],
                    total_price : orderData['total-price-Per-Product-hidden-input'] 
                });
            }  
        }else{
            for(i = 0; i < orderData['product-shape'].length ; i++){
                if(orderData['product-shape'][i] == 'square'){
                    squares.push({
                        order_id : orderData['order-id'],
                        product_id : orderData['product-id'][i],
                        side_length : orderData['product-length'][i],
                        quantity : orderData['product-quantity'][i],
                        unit_price : orderData['unit-price-Per-Product-hidden-input'][i],
                        total_price : orderData['total-price-Per-Product-hidden-input'][i] 
                    });
                }
                if(orderData['product-shape'][i] == 'rectangle'){
                    rectangles.push({
                        order_id : orderData['order-id'],
                        product_id : orderData['product-id'][i],
                        length : orderData['product-length'][i],
                        width : orderData['product-width'][i],
                        quantity : orderData['product-quantity'][i],
                        unit_price : orderData['unit-price-Per-Product-hidden-input'][i],
                        total_price : orderData['total-price-Per-Product-hidden-input'][i] 
                    });
                }  
                if(orderData['product-shape'][i] == 'triangle'){
                    triangles.push({
                        order_id : orderData['order-id'],
                        product_id : orderData['product-id'][i],
                        side_1 : orderData['product-length'][i],
                        side_2 : orderData['product-width'][i],
                        angle : orderData['product-angle'][i],
                        quantity : orderData['product-quantity'][i],
                        unit_price : orderData['unit-price-Per-Product-hidden-input'][i],
                        total_price : orderData['total-price-Per-Product-hidden-input'][i] 
                    });
                }             
                if(orderData['product-shape'][i] == 'other'){
                    others.push({
                        order_id : orderData['order-id'],
                        product_id : orderData['product-id'][i],
                        unit_area : orderData['product-length'][i],
                        quantity : orderData['product-quantity'][i],
                        unit_price : orderData['unit-price-Per-Product-hidden-input'][i],
                        total_price : orderData['total-price-Per-Product-hidden-input'][i] 
                    });
                }
            }
        }

        console.log(squares)

        OrdersModel.createOrder(orderOverview,function(result){
            console.log('Inserted square :', result);
        });

        if(squares.length != 0 ){
            OrdersModel.createSquareProducts(squares, function(result) {
                console.log('Inserted square products:', result);
                // Handle the result as needed
            });
        }
        if(triangles.length != 0){
            OrdersModel.createTriangleProducts(triangles, function(result) {
                console.log('Inserted triangle products:', result);
                // Handle the result as needed
            });       
        }
        if(rectangles.length != 0 ){
            OrdersModel.createRectangleProducts(rectangles, function(result) {
                console.log('Inserted rectangle products:', result);
                // Handle the result as needed
            });
        }

       if(others.length != 0){
        OrdersModel.createOtherProducts(others, function(result) {
            console.log('Inserted other products:', result);
            // Handle the result as needed
        });
       }  
       res.redirect('/createOrder')   ;  
    }

    static getAllOrdersList(req,res){
        OrdersModel.getOrders((orders)=>{
            res.render('orders/orders.ejs',{orders : orders});
        })
    }

    static getDelivredOrdersList(req,res){
        OrdersModel.getOrdersByStatus("delivred",(orders)=>{
            res.render('orders/orders.ejs',{orders : orders});
        })
    }

    static getFinishedOrdersList(req,res){
        OrdersModel.getOrdersByStatus("finished",(orders)=>{
            res.render('orders/orders.ejs',{orders : orders});
        })
    }
    static getPendingOrdersList(req,res){
        OrdersModel.getOrdersByStatus("pending",(orders)=>{
            res.render('orders/orders.ejs',{orders : orders});
        })
    }
    static getCancelledOrdersList(req,res){
        OrdersModel.getOrdersByStatus("cancelled",(orders)=>{
            res.render('orders/orders.ejs',{orders : orders});
        })
    }
    static getNotConfirmedOrdersList(req,res){
        OrdersModel.getOrdersByStatus("not-confirmed",(orders)=>{
            res.render('orders/orders.ejs',{orders : orders});
        })
    }

    static getOrderDetails(req,res){
        const orderId = req.query.OrderId;  
        OrdersModel.getOrderDetailsById(orderId,(orderDetails)=>{
            res.json(orderDetails);
        })
    }
    
    static deleteOrder(req,res){
        const orderId = parseInt(req.query.OrderId);
        OrdersModel.deleteOrderById(orderId,(deletingOrder)=>{
        })  
      }
}

        // console.log(orderOverview);
        // console.log(squares);
        // console.log(rectangles);
        // console.log(triangles);
 export default OrdersController;