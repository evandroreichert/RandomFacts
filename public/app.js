document.getElementById('update').addEventListener('click', updateFact);

async function updateFact() {
  const response = await fetch('http://localhost:3000/fato');
  const data = await response.json();
  document.getElementById('fact').innerText = data.fact;
}
