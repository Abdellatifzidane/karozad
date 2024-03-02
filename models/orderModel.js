import connection from "../db.js";

class OrdersModel {
    static getCostumers(callback) {
        const query = `SELECT * FROM customers `;
        connection.query(query, (err, results) => {
            if (err) throw err;
            callback(results); // Pass results to the callback function
        });
    }
    static getProducts(callback) {
        const query = `SELECT * FROM products `;
        connection.query(query, (err, results) => {
            if (err) throw err;
            callback(results); 
        });
    }
    static getLastOrderId(callback) {
        const query = `SELECT MAX(id) AS last_order_id FROM orders;`;
        connection.query(query, (err, results) => {
            if (err) throw err;
            const lastOrderId = results[0].last_order_id;
            callback(lastOrderId); // Pass the last order ID to the callback function
        });
    }
    static createOrder(orderData, callback) {
        const query = `INSERT INTO orders (id_customer, order_date, total_price, status, payment_status, paid, stayed) VALUES (?, ?, ?,?, ?, ?, ?)`;
        const {id_customer, order_date, total_price,status, payment_status, paid, stayed } = orderData;
        connection.query(query, [id_customer, order_date, total_price,status, payment_status, paid, stayed], (err, results) => {
            if (err) throw err;
            callback(results.insertId); 
        });
    }  
    static createSquareProducts(squares, callback) {
        const query = `INSERT INTO order_product_square (order_id, product_id, side_length, quantity, unit_price, total_price) VALUES ?`;
                const values = squares.map(square => [
            square.order_id,
            square.product_id,
            square.side_length,
            square.quantity,
            square.unit_price,
            square.total_price
        ]);
        connection.query(query, [values], (err, results) => {
            if (err) throw err;
            callback(results.insertId);
        });
    }

    static createTriangleProducts(triangles, callback) {
        const query = `INSERT INTO order_product_triangle (order_id, product_id, side_1, side_2, angle, quantity, unit_price, total_price) VALUES ?`;
        
        // Map each triangle object to an array of values
        const values = triangles.map(triangle => [
            triangle.order_id,
            triangle.product_id,
            triangle.side_1,
            triangle.side_2,
            triangle.angle,
            triangle.quantity,
            triangle.unit_price,
            triangle.total_price
        ]);
        
        connection.query(query, [values], (err, results) => {
            if (err) throw err;
            callback(results.insertId);
        });
    }

    static createRectangleProducts(rectangles, callback) {
        const query = `INSERT INTO order_product_rectangle (order_id, product_id, length, width, quantity, unit_price, total_price) VALUES ?`;
        
        // Map each rectangle object to an array of values
        const values = rectangles.map(rectangle => [
            rectangle.order_id,
            rectangle.product_id,
            rectangle.length,
            rectangle.width,
            rectangle.quantity,
            rectangle.unit_price,
            rectangle.total_price
        ]);
        
        connection.query(query, [values], (err, results) => {
            if (err) throw err;
            callback(results.insertId);
        });
    }

    static createOtherProducts(others, callback) {
        const query = `INSERT INTO order_product_undifined (order_id, product_id, unit_area, quantity, unit_price, total_price) VALUES ?`;
        
        // Map each other object to an array of values
        const values = others.map(other => [
            other.order_id,
            other.product_id,
            other.unit_area,
            other.quantity,
            other.unit_price,
            other.total_price
        ]);
        
        connection.query(query, [values], (err, results) => {
            if (err) throw err;
            callback(results.insertId);
        });
    }

    static getOrderById(orderId, callback) {
        const query = `
            SELECT orders.*, customers.name AS customer_name, customers.surname AS customer_surname
            FROM orders
            INNER JOIN customers ON orders.id_customer = customers.id
            WHERE orders.id = ?
        `;
        connection.query(query, [orderId], (err, results) => {
            if (err) throw err;
            callback(results[0]); // Pass the first result (assuming ID is unique) to the callback function
        });
    }
    

    static getOrderSquaresByOrderId(orderId, callback) {
        const query = `SELECT order_product_square.*, products.name AS marble_name FROM order_product_square, products  WHERE order_id = ? AND product_id = products.id` ;
        connection.query(query, [orderId], (err, results) => {
            if (err) throw err;
            callback(results); // Pass the results to the callback function
        });
    }

    static getOrderRectanglesByOrderId(orderId, callback) {
        const query = `SELECT order_product_rectangle.*, products.name AS marble_name FROM order_product_rectangle, products  WHERE order_id = ? AND product_id = products.id` ;
        connection.query(query, [orderId], (err, results) => {
            if (err) throw err;
            callback(results); // Pass the results to the callback function
        });
    }

    static getOrderTrianglesByOrderId(orderId, callback) {
        const query = `SELECT order_product_triangle.*, products.name AS marble_name FROM order_product_triangle, products  WHERE order_id = ? AND product_id = products.id` ;
        connection.query(query, [orderId], (err, results) => {
            if (err) throw err;
            callback(results); // Pass the results to the callback function
        });
    }

    static getOrderUndifinedsByOrderId(orderId, callback) {
        const query = `SELECT order_product_undifined.*, products.name AS marble_name FROM order_product_undifined, products  WHERE order_id = ? AND product_id = products.id` ;        
        connection.query(query, [orderId], (err, results) => {
            if (err) throw err;
            callback(results); // Pass the results to the callback function
        });
    }

    static getOrdersByStatus(status, callback) {
        const query = `SELECT orders.*, customers.name, customers.surname FROM orders, customers WHERE orders.status = ? AND orders.id_customer = customers.id` ;
        connection.query(query,status, (err, results) => {
            if (err) throw err;
            callback(results); // Pass the results to the callback function
        });
    }

    static getOrders(callback) {
        const query = `SELECT orders.*, customers.name, customers.surname FROM orders, customers WHERE 
        orders.id_customer = customers.id` ;
        connection.query(query, (err, results) => {
            if (err) throw err;
            callback(results); // Pass the results to the callback function
        });
    }

    static getOrderDetailsById(orderId, callback) {
        const orderDetails = {};  

        this.getOrderSquaresByOrderId(orderId, (squares) => {
            orderDetails.squares = squares;
            this.getOrderRectanglesByOrderId(orderId, (rectangles) => {
                orderDetails.rectangles = rectangles;
                this.getOrderTrianglesByOrderId(orderId, (triangles) => {
                    orderDetails.triangles = triangles;
                    this.getOrderUndifinedsByOrderId(orderId, (undifineds) => {
                        orderDetails.undifineds = undifineds;
                        this.getOrderById(orderId,(orderOverview)=>{
                            orderDetails.overview = orderOverview;
                            callback(orderDetails);
                        })
                    });
                });
            });
        });
    }

    static deleteOrderById(orderId, callback) {
        // Delete squares
        this.deleteOrderSquaresByOrderId(orderId, (err, results) => {
            if (err) {
                return callback(err);
            }
            // Delete rectangles
            this.deleteOrderRectanglesByOrderId(orderId, (err, results) => {
                if (err) {
                    return callback(err);
                }
                // Delete triangles
                this.deleteOrderTrianglesByOrderId(orderId, (err, results) => {
                    if (err) {
                        return callback(err);
                    }
                    // Delete undefineds
                    this.deleteOrderUndifinedsByOrderId(orderId, (err, results) =>{
                        this.deleteOrderOverview(orderId,(deletingOrder)=>{
                            console.log("order deleted")
                        })
                    });
                });
            });
        });
    }

    static deleteOrderOverview(orderId, callback) {
        const query = `DELETE FROM orders WHERE id = ?`;
        connection.query(query, [orderId], (err, results) => {
            if (err) {
                console.error("Error deleting order squares:", err);
                return callback(err);
            }
            console.log("Order squares deleted successfully");
            callback(null, results);
        });
    }
    
    static deleteOrderSquaresByOrderId(orderId, callback) {
        const query = `DELETE FROM order_product_square WHERE order_id = ?`;
        connection.query(query, [orderId], (err, results) => {
            if (err) {
                console.error("Error deleting order squares:", err);
                return callback(err);
            }
            console.log("Order squares deleted successfully");
            callback(null, results);
        });
    }
    
    static deleteOrderRectanglesByOrderId(orderId, callback) {
        const query = `DELETE FROM order_product_rectangle WHERE order_id = ?`;
        connection.query(query, [orderId], (err, results) => {
            if (err) {
                console.error("Error deleting order rectangles:", err);
                return callback(err);
            }
            console.log("Order rectangles deleted successfully");
            callback(null, results);
        });
    }
    
    static deleteOrderTrianglesByOrderId(orderId, callback) {
        const query = `DELETE FROM order_product_triangle WHERE order_id = ?`;
        connection.query(query, [orderId], (err, results) => {
            if (err) {
                console.error("Error deleting order triangles:", err);
                return callback(err);
            }
            console.log("Order triangles deleted successfully");
            callback(null, results);
        });
    }
    
    static deleteOrderUndifinedsByOrderId(orderId, callback) {
        const query = `DELETE FROM order_product_undifined WHERE order_id = ?`;
        connection.query(query, [orderId], (err, results) => {
            if (err) {
                console.error("Error deleting order undefineds:", err);
                return callback(err);
            }
            console.log("Order undefineds deleted successfully");
            callback(null, results);
        });
    }
    
    
    
}

export default OrdersModel;
