document.getElementById("searchButton").addEventListener("click", function () {
  const input = document.getElementById("productInput").value;
  const products = input.split(",").map(p => p.trim()).filter(Boolean);

  fetch("https://script.google.com/macros/s/AKfycbzaC5MuASkvc46Od3Ev2V1DiFGkcVDnvckbfm-w_r0fqPqbW3MV9axCYgC1pW36wEm-/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ products })
  })
  .then(response => response.json())
  .then(data => {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    if (data && data.results && data.results.length > 0) {
      data.results.forEach(item => {
        const div = document.createElement("div");
        div.textContent = `${item.name} - ${item.price} (${item.retailer})`;
        resultsDiv.appendChild(div);
      });
    } else {
      resultsDiv.textContent = "No matching products found. We'll check overnight!";
    }
  })
  .catch(error => {
    document.getElementById("results").textContent = "Error fetching data.";
    console.error("Error:", error);
  });
});
