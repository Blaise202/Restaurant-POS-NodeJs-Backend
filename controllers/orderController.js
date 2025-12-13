const createHttpError = require("http-errors")
const Order = require("../models/orderModel")

const orders = async (req, res, next) => {
  try {

    const orders = await Order.find()
    if (orders.length == 0) {
      const error = createHttpError(404, "No Order found");
      return next(error)
    }

    res.status(201).json({
      success: true,
      count: orders.length,
      message: "Orders found",
      data: orders
    })


  } catch (error) {
    next(error)
  }
}

const getOrder = async (req, res, next) => {

  try {

    const order = await Order.findById(req.params.id)
    if (!order) {
      const error = createHttpError(404, "Order data not found");
      return next(error)
    }

    res.status(201).json({
      success: true,
      message: "Order found",
      data: order
    })

  } catch (error) {
    return next(error)
  }
}

const orderByStatus = async (req, res, next) => {
  try {
    const orders = await Order.find({ orderStatus: req.body.status });
    if (orders.count == 0) {
      const error = createHttpError(404, `No ${req.body.status} orders found.`);
      return next(error)
    }

    res.status(201).json({
      success: true,
      message: `${orders.length} ${req.body.status} orders found`,
      data: orders
    })

  } catch (error) {
    next(error)
  }
}

const addOrder = async (req, res, next) => {
  try {

    const order = new Order(req.body)
    await order.save();
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order
    })

  } catch (error) {
    next(error);
  }

}

const updateOrder = async (req, res, next) => {

  try {

    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    )

    if (!order) {
      const error = createHttpError(404, "Order data not found");
      return next(error)
    }

    res.status(201).json({
      success: true,
      message: "Order Updated Successfully!",
      data: order
    })

  } catch (error) {
    next(error)
  }

}

const deleteOrder = async (req, res, next) => {

  try {

    const order = await Order.findByIdAndDelete(
      req.params.id,
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
      { new: true }
    );

    if (!order) {
      const error = createHttpError(404, "Order data not found");
      return next(error)
    }

    res.status(201).json({
      success: true,
      message: "Order deleted Successfully!",
    })


  } catch (error) {
    next(error)
  }

}

module.exports = { orders, getOrder, addOrder, updateOrder, deleteOrder, orderByStatus }