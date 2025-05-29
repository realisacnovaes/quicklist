
// Função para carregar a lista
function loadItem() {
    const lista = JSON.parse(localStorage.getItem('itenslist')) || []
    lista.forEach(item => makeItem(item))
}

// Função para salvar no localstorage
function saveItem(){
    const itens = Array.from(document.querySelectorAll('.items')).map(label => label.textContent.trim());
    localStorage.setItem('itenslist', JSON.stringify(itens))

}

// Função para criar visualmente o item
function makeItem(itemName) {
    const itemView = document.getElementById("itemlist")
    
    const itemHtml = `
        <div class="items">
          <input type="checkbox" name="${itemName}" id="${itemName}">
          <label for="${itemName}">${itemName}</label>
          <img src="assets/img/icons/remove.svg" alt="Deletar" onclick="removeItem(this, '${itemName}')">
        </div>
      `

      itemView.insertAdjacentHTML("beforeend", itemHtml)
}

// Função para Adicionar o novo item
function addItem() {
    const inputItem = document.getElementById("descriptionItem")
    const itemName = inputItem.value
    
    if(itemName === "") 
    return

    makeItem(itemName)
    saveItem()

    // Limpar o input
    inputItem.value = ""
    inputItem.focus();

}

// Função para remover o item
function removeItem(elemento, itemName) {
    // Atualiza o array de itens no localStorage
    let itens = JSON.parse(localStorage.getItem('itenslist')) || [];
    itens = itens.filter(item => item !== itemName); // remove o item com o nome correspondente
    localStorage.setItem('itenslist', JSON.stringify(itens));

    // Remove o elemento da tela
    elemento.parentElement.remove()

    // Mostra a mensagem de removido

    const alert = document.getElementById("alert");
    const alertMessage = document.getElementById("alertMessage");

    if (alert && alertMessage) {
        alertMessage.textContent = `O item "${itemName}" foi removido da lista.`;
        alert.classList.remove("hidden");

        // Oculta automaticamente após 3 segundos
        setTimeout(() => {
            alert.classList.add("hidden");
        }, 3000);
    }

}

// Carregar itens ao iniciar
window.onload = loadItem;
