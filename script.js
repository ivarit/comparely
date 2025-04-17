document.getElementById("searchButton").addEventListener("click", function () {
  const input = document.getElementById("productInput");
  const products = input.value.split(',').map(p => p.trim());

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
    if (data.results && data.results.length) {
      data.results.forEach(item => {
        const div = document.createElement("div");
        if (item.price && item.retailer) {
          div.innerText = `${item.name}: £${item.price} @ ${item.retailer}`;
        } else {
          div.innerText = `${item.name}: ${item.message}`;
        }
        resultsDiv.appendChild(div);
      });
    } else {
      resultsDiv.innerText = "No results found.";
    }
  })
  .catch(error => {
    document.getElementById("results").innerText = "Error fetching results.";
    console.error("Error:", error);
  });
});
