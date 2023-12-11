import express, { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import cors from 'cors'
import { getData, filterData } from './utils/helpers.js'
import { Product } from './interfaces/Product.js'
import { Purchase } from './interfaces/Purchase.js'
import { Sale } from './interfaces/Sale.js'
import { Equipment } from './interfaces/Equipment.js'
import { Workforce } from './interfaces/Workforce.js'

const app = express()

app.use(cors())
app.use(express.json())
app.options('*', cors())

// Constants to store file names
const salesFile = 'sales_orders.json'
const purchasesFile = 'purchase_orders.json'
const productsFile = 'materials.json'
const equipmentsFile = 'equipments.json'
const workforceFile = 'workforce.json'

// Read the json files out of the route so as not to block
const sales: Sale[] = getData<Sale>(salesFile).data
const purchases: Purchase[] = getData<Purchase>(purchasesFile).data
const products: Product[] = getData<Product>(productsFile).data
const equipments: Equipment[] = getData<Equipment>(equipmentsFile).data
const workforce: Workforce[] = getData<Workforce>(workforceFile).data

// Define an endpoint to get data according to a search term
app.post('/api/v1/search', (req: Request, res: Response) => {
  const searchTerm: string = req.body.searchTerm as string
  // If there is no search term send an error
  if (!searchTerm) {
    return res.status(400).json({ error: 'No search term was provided' })
  }

  // Else filter data according to searchTerm
  const filteredSales: Sale[] = filterData(sales, searchTerm)
  const filteredPurchases: Purchase[] = filterData(purchases, searchTerm)
  const filteredProducts: Product[] = filterData(products, searchTerm)
  const filteredEquipments: Equipment[] = filterData(equipments, searchTerm)
  const filteredWorkforce: Workforce[] = filterData(workforce, searchTerm)

  // Build an object out of the filtered data
  let searchResult = {
    status: 200,
    salesCount: filteredSales.length,
    purchasesCount: filteredSales.length,
    productsCount: filteredProducts.length,
    equipmentsCount: filteredEquipments.length,
    workforceCount: filteredWorkforce.length,
    sales: filteredSales,
    purchases: filteredPurchases,
    products: filteredProducts,
    equipments: filteredEquipments,
    workforce: filteredWorkforce,
  }

  // Send the object back
  res.send(searchResult)
})

// These following endpoints are bonus
app.get('/api/v1/sales', (req: Request, res: Response) => {
  res.send(sales)
})

app.get('/api/v1/purchases', (req: Request, res: Response) => {
  res.send(purchases)
})

app.get('/api/v1/products', (req: Request, res: Response) => {
  res.send(products)
})

app.get('/api/v1/equipments', (req: Request, res: Response) => {
  res.send(equipments)
})

app.get('/api/v1/workforce', (req: Request, res: Response) => {
  res.send(workforce)
})

app.get('/api/v1/tos', (req: Request, res: Response) => {
  res.send('Terms of service')
})

const PORT = process.env.PORT || 3000
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
