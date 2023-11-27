const loadingIcon = document.getElementById("loading");
const fato = document.getElementById("fato");
const dica = document.querySelector('.dica')
document.getElementById('atualizar').addEventListener('click', updateFact)

async function updateFact() {
  loadingIcon.style.display = "inline-block";
  dica.style.display = "none"

  try {
    const response = await fetch('http://localhost:3000/fato');
    const data = await response.json();
    fato.style.opacity = 0; // Define a opacidade como 0 antes de atualizar o texto
    fato.innerText = data;
    fato.style.opacity = 1; // Define a opacidade como 1 para mostrar suavemente o novo parágrafo
  }
  catch (error) {
    console.error('Deu esse erro aqui: ', error);
    alert('Falha ao buscar fato, tente novamente.');
  }
  finally {
    loadingIcon.style.display = "none";
  }
}
