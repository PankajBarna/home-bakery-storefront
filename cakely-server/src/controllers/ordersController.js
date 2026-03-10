import { readJsonFile, writeJsonFile } from '../utils/fileDb.js'
import { createId } from '../utils/id.js'

const FILE_NAME = 'orders.json'

export async function getOrders(req, res, next) {
  try {
    const orders = await readJsonFile(FILE_NAME, [])
    res.json(orders)
  } catch (error) {
    next(error)
  }
}

export async function createOrder(req, res, next) {
  try {
    const {
      name,
      phone,
      fulfillmentType,
      date,
      address,
      cakeMessage,
      specialNote,
      total,
      items
    } = req.body

    if (!name || !phone || !fulfillmentType || !date || !total || !Array.isArray(items) || !items.length) {
      return res.status(400).json({ message: 'Missing required order fields' })
    }

    const orders = await readJsonFile(FILE_NAME, [])

    const newOrder = {
      id: createId('order'),
      createdAt: new Date().toISOString(),
      name,
      phone,
      fulfillmentType,
      date,
      address: address || '',
      cakeMessage: cakeMessage || '',
      specialNote: specialNote || '',
      total,
      status: 'pending',
      items
    }

    const updatedOrders = [newOrder, ...orders]
    await writeJsonFile(FILE_NAME, updatedOrders)

    res.status(201).json(newOrder)
  } catch (error) {
    next(error)
  }
}

export async function updateOrderStatus(req, res, next) {
  try {
    const { id } = req.params
    const { status } = req.body

    const allowedStatuses = [
      'pending',
      'confirmed',
      'preparing',
      'out_for_delivery',
      'completed',
      'cancelled'
    ]

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' })
    }

    const orders = await readJsonFile(FILE_NAME, [])
    const index = orders.findIndex((order) => order.id === id)

    if (index === -1) {
      return res.status(404).json({ message: 'Order not found' })
    }

    orders[index] = {
      ...orders[index],
      status
    }

    await writeJsonFile(FILE_NAME, orders)

    res.json(orders[index])
  } catch (error) {
    next(error)
  }
}