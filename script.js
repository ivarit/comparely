document.getElementById("searchButton").addEventListener("click", function () {
  const input = document.getElementById("productInput").value;
  const products = input.split(",").map(p => p.trim()).filter(Boolean);

  fetch("https://script.google.com/macros/s/AKfycbzaC5MuASkvc46Od3Ev2V1DiFGkcVDnvckbfm-w_r0fqPqbW3MV9axCYgC1pW36wEm-/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: 'search', // or 'admin'
      products: ['apples', 'milk']
    })
  })
  .then(response => response.json())
  .then(data => console.log('RESULT:', data))
  .catch(err => console.error('ERROR:', err));
});
