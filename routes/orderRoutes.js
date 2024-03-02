import express from 'express';
import OrdersController from '../controllers/orderController.js';

const router = express.Router();

router.get('/allOrders',OrdersController.getAllOrdersList);

router.get('/delivredOrders',OrdersController.getDelivredOrdersList);

router.get('/finishedOrders',OrdersController.getFinishedOrdersList);

router.get('/cancelledOrders',OrdersController.getCancelledOrdersList);

router.get('/notConfirmedOrders',OrdersController.getNotConfirmedOrdersList);

router.get('/pendingOrders',OrdersController.getPendingOrdersList);

router.get('/createOrder',OrdersController.getCreateOrderForm);

router.post('/createOrder',OrdersController.postOrder);

router.get('/orderDetails', OrdersController.getOrderDetails);

router.delete('/deleteOrder', OrdersController.deleteOrder);
  


export default router;