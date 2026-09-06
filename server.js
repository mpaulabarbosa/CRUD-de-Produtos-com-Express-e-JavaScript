const express = require ('express')
const app = express ()

const produtos = [
  {
    "id": 1,
    "descricao": "Notebook Dell Inspiron 15",
    "categoria": "Informática",
    "preco": 3499.90,
    "estoque": 12
  },
  {
    "id": 2,
    "descricao": "Mouse Logitech MX Master",
    "categoria": "Periféricos",
    "preco": 549.90,
    "estoque": 25
  },
  {
    "id": 3,
    "descricao": "Teclado Mecânico Keychron K2",
    "categoria": "Periféricos",
    "preco": 629.90,
    "estoque": 18
  },
  {
    "id": 4,
    "descricao": "Monitor LG UltraWide 29",
    "categoria": "Monitores",
    "preco": 1499.90,
    "estoque": 8
  },
  {
    "id": 5,
    "descricao": "Webcam Logitech C920",
    "categoria": "Periféricos",
    "preco": 429.90,
    "estoque": 15
  },
  {
    "id": 6,
    "descricao": "SSD Kingston 1TB",
    "categoria": "Armazenamento",
    "preco": 459.90,
    "estoque": 30
  },
  {
    "id": 7,
    "descricao": "Headset HyperX Cloud II",
    "categoria": "Áudio",
    "preco": 599.90,
    "estoque": 14
  },
  {
    "id": 8,
    "descricao": "Hub USB-C 7 em 1",
    "categoria": "Acessórios",
    "preco": 289.90,
    "estoque": 40
  },
  {
    "id": 9,
    "descricao": "Roteador TP-Link Archer AX23",
    "categoria": "Redes",
    "preco": 399.90,
    "estoque": 20
  },
  {
    "id": 10,
    "descricao": "Caixa de Som JBL Flip 6",
    "categoria": "Áudio",
    "preco": 699.90,
    "estoque": 11
  },
  {
    "id": 11,
    "descricao": "Carregador USB-C 65W",
    "categoria": "Acessórios",
    "preco": 199.90,
    "estoque": 35
  },
  {
    "id": 12,
    "descricao": "HD Externo Seagate 2TB",
    "categoria": "Armazenamento",
    "preco": 529.90,
    "estoque": 17
  }
]

app.use(express.json())

app.use((req, res, next) => {
  console.log(new Date().toLocaleString(), req.method, req.paths)
  next()
})

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send (`Olá estranho.`)
})

app.get('/produtos', (req, res) => {
    res.json(produtos)
})

app.get('/produtos/:id', (req, res) => {
    const id = parseInt (req.params.id)

    const index = produtos.findIndex (prod => prod.id === id)
    if (index >= 0) {
        res.json(produtos[index])
    } else {
        res.status(404).send ('404 Not Found')
    }
})

app.post('/produtos', (req, res) => {

  const novoProduto = {
    id: produtos.length + 1,
    descricao: req.body.descricao,
    preco: req.body.preco,
    categoria: req.body.categoria,
    estoque: req.body.estoque
  }

  produtos.push(novoProduto)
  res.status(201).json(novoProduto)
  res.status(201).send ('201 Created')
})

app.put('/produtos/:id', (req, res) => {
    const id = parseInt (req.params.id)

    const index = produtos.findIndex (prod => prod.id === id)
    if (index === -1) {
      return res.status(404).send ('Not Found')
    }
      produtos[index] = {
        id: id,
        descricao: req.body.descricao,
        preco: req.body.preco,
        categoria: req.body.categoria,
        estoque: req.body.estoque
      }

        res.json(produtos[index])

})

app.delete('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id)

  const index = produtos.findIndex(prod => prod.id === id)

  produtos.splice(index, 1)
  res.status(204).send('204 No Content')

})

const port = 3000
app.listen (port, ()=>{
    console.log (`Server rodando no http://localhost:${port}`)
})

// link do site no render: https://trabalho-api-x13r.onrender.com