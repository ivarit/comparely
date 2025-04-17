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
