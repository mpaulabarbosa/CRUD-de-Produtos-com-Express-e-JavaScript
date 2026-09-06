var produtos = []
var lista = document.getElementById("lista")
function listar() {
    fetch('/produtos')
        .then (res => res.json())
        .then (data => {
            produtos = data
            produtos.forEach(element => { 
                const produto = document.createElement('div')
                const novoparagrafo = document.createElement('p')
                const btnDelete = document.createElement('button')
                const btnUpdate = document.createElement('button')
                btnDelete.classList.add(`btnDelete`);
                btnUpdate.classList.add(`btnUpdate`);
                btnDelete.id = `${element.id}`;
                btnUpdate.id = `${element.id}`;
                btnDelete.innerText = 'Deletar';
                btnUpdate.innerText = 'Editar'
                btnUpdate.addEventListener('click', () => {
                    editar(element.id)
                });
                btnDelete.addEventListener('click', () => {
                    deletar(element.id)
                });
                novoparagrafo.innerHTML = `${element.id} - ${element.descricao} - ${element.preco} - ${element.categoria} - ${element.estoque}`
                produto.appendChild(novoparagrafo)
                produto.appendChild(btnDelete)
                produto.appendChild(btnUpdate)
                lista.appendChild(produto)
        })
        });
}

function criar() {
    const descricaoNova = document.getElementById('novoProdutoDescricao')
    const categoriaNova = document.getElementById('novoProdutoCategoria')
    const precoNovo = document.getElementById('novoProdutoPreco')
    const estoqueNovo = document.getElementById('novoProdutoEstoque')
    fetch('/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({descricao: descricaoNova.value, categoria: categoriaNova.value, preco : precoNovo.value, estoque : estoqueNovo.value})
    }) 
    lista.innerHTML = ""
    listar()
}

const btnCriar = document.getElementById('oi')
btnCriar.addEventListener('click', () => {
  criar()
});

function editar(id) {
    const novaD = prompt("Descrição: ")
    const novaC = prompt("Categoria: ")
    const novoP = prompt("Preço: ")
    const novoE = prompt("Estoque: ")
    fetch(`/produtos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({descricao: novaD, categoria: novaC, preco : parseFloat(novoP), estoque : parseInt(novoE)})
    })
    lista.innerHTML = ""
    listar()
}

async function deletar(id) {
    await fetch(`/produtos/${id}`, {
        method: 'DELETE'
    });
    lista.innerHTML = ""
    listar()
}

listar()