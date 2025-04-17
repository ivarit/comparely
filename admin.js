document.getElementById("addButton").addEventListener("click", function () {
  const input = document.getElementById("adminProductInput").value;
  const products = input.split(/,|\n/).map(p => p.trim()).filter(Boolean);

  fetch("https://script.google.com/macros/s/AKfycbzaC5MuASkvc46Od3Ev2V1DiFGkcVDnvckbfm-w_r0fqPqbW3MV9axCYgC1pW36wEm-/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ admin: true, products })
  })
  .then(response => response.json())
  .then(data => {
    const resultsDiv = document.getElementById("adminResults");
    if (data.success) {
      resultsDiv.innerText = "Products successfully added to the scrape queue.";
    } else {
      resultsDiv.innerText = "Error: " + (data.message || "Something went wrong.");
    }
  })
  .catch(error => {
    document.getElementById("adminResults").innerText = "Error submitting products.";
    console.error("Error:", error);
  });
});
