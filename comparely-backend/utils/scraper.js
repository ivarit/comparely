
const axios = require('axios');

async function scrapePrices(query) {
    // Placeholder logic for demo purposes
    return [
        { product: query, price: "$9.99", retailer: "Mock Store A" },
        { product: query, price: "$10.49", retailer: "Mock Store B" }
    ];
}

module.exports = { scrapePrices };
