async function search() {
  const query = document.getElementById('search').value;
  const res = await fetch('https://us-central1-your-project-id.cloudfunctions.net/handleSearch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  const data = await res.json();
  document.getElementById('results').innerText = JSON.stringify(data, null, 2);
}
