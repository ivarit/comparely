const BACKEND_URL = "https://comparely-backend.onrender.com";

async function searchProducts() {
  const input = document.getElementById('productInput').value;
  const responseBox = document.getElementById('results');
  responseBox.innerHTML = "Searching...";

  try {
    const response = await fetch(`${BACKEND_URL}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query: input })
    });

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      responseBox.innerHTML = data.results.map(item => `
        <div class="p-4 border border-gray-300 rounded">
          <strong>${item.product}</strong><br/>
          Price: ${item.price} <br/>
          Retailer: ${item.retailer}
        </div>
      `).join("");
    } else {
      responseBox.innerHTML = "<p>No results found. Please check back later.</p>";
    }
  } catch (error) {
    responseBox.innerHTML = "<p class='text-red-600'>Error fetching results.</p>";
  }
}



async function addProductsToScrape() {
  const input = document.getElementById('productAddInput').value;
  const products = input.split(',').map(product => product.trim());

  if (products.length === 0) {
    alert('Please enter some products.');
    return;
  }

  try {
    const response = await fetch(`${BACKEND_URL}/addProductsToQueue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ products })
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    alert('Failed to add products to queue.');
  }
}

async function triggerScraper() {
  try {
    const response = await fetch(`${BACKEND_URL}/triggerScraper`, {
      method: "POST"
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    alert('Failed to trigger scraper.');
  }
}
