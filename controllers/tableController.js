const createHttpError = require("http-errors")
const Table = require("../models/tableModel")
const mongoose = require("mongoose")


const tables = async (req, res, next) => {

  try {
    const tables = await Table.find()
    if (tables.length == 0) {
      const error = createHttpError(404, "No tables found")
      return next(error)
    }

    res.status(201).json({
      success: true,
      mesage: `Found ${tables.length} tables`,
      data: tables
    })
  } catch (error) {
    next(error)
  }
}

const addTable = async (req, res, next) => {
  try {
    const { tableNo } = req.body
    if (!tableNo) {
      const error = createHttpError(400, "Table Number is required")
      return next(error)
    }
    const checkTable = await Table.findOne({ tableNo: req.body.tableNo })
    if (checkTable) {
      const error = createHttpError(400, "Table Number already exists")
      return next(error)
    }

    const newTable = new Table({ tableNo })
    await newTable.save()

    res.status(201).json({
      success: true,
      message: "Table added successfully",
      data: newTable
    })

  } catch (error) {
    next(error)
  }
}


const getTable = async (req, res, next) => {
  try {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = createHttpError(400, "Invalid Id");
      return next(error)
    }

    const table = await Table.findById(id)
    if (!table) {
      const error = createHttpError(404, "Table data not found")
      return next(error)
    }

    res.status(201).json({
      success: true,
      message: "Table found!",
      data: table
    })

  } catch (error) {
    next(error)
  }
}

const tableByStatus = async (req, res, next) => {

}

const updateTable = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = createHttpError(400, "Invalid Id");
      return next(error)
    }

    let table = await Table.findById(id)
    if (!table) {
      const error = createHttpError(404, "Table data not found")
      return next(error)
    }

    const { status, orderId } = req.body

    table = await Table.findByIdAndUpdate(
      id,
      { status, currentOrder: orderId },
      { new: true }
    )

    res.status(201).json({
      success: true,
      message: "Table updated successfully!",
      data: table
    })

  } catch (error) {
    next(error)
  }
}

const deleteTable = async (req, res, next) => {

}

module.exports = { tables, addTable, getTable, updateTable, deleteTable, tableByStatus }