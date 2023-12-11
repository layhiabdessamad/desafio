import express from 'express';
import cors from 'cors';
import { getData, filterData } from './utils/helpers.js';
const app = express();
app.use(cors());
app.use(express.json());
app.options('*', cors());
// Constants to store file names
const salesFile = 'sales_orders.json';
const purchasesFile = 'purchase_orders.json';
const productsFile = 'materials.json';
const equipmentsFile = 'equipments.json';
const workforceFile = 'workforce.json';
// Read the json files out of the route so as not to block
const sales = getData(salesFile).data;
const purchases = getData(purchasesFile).data;
const products = getData(productsFile).data;
const equipments = getData(equipmentsFile).data;
const workforce = getData(workforceFile).data;
// Define an endpoint to get data according to a search term
app.post('/api/v1/search', (req, res) => {
    const searchTerm = req.body.searchTerm;
    // If there is no search term send an error
    if (!searchTerm) {
        return res.status(400).json({ error: 'No search term was provided' });
    }
    // Else filter data according to searchTerm
    const filteredSales = filterData(sales, searchTerm);
    const filteredPurchases = filterData(purchases, searchTerm);
    const filteredProducts = filterData(products, searchTerm);
    const filteredEquipments = filterData(equipments, searchTerm);
    const filteredWorkforce = filterData(workforce, searchTerm);
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
    };
    // Send the object back
    res.send(searchResult);
});
// These following endpoints are bonus
app.get('/api/v1/sales', (req, res) => {
    res.send(sales);
});
app.get('/api/v1/purchases', (req, res) => {
    res.send(purchases);
});
app.get('/api/v1/products', (req, res) => {
    res.send(products);
});
app.get('/api/v1/equipments', (req, res) => {
    res.send(equipments);
});
app.get('/api/v1/workforce', (req, res) => {
    res.send(workforce);
});
app.get('/api/v1/tos', (req, res) => {
    res.send('Terms of service');
});
const PORT = process.env.PORT || 3000;
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
