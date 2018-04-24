# TimelineTest - Paggcerto

> Timeline em Vuejs

![alt text](https://raw.githubusercontent.com/EliseuSantos/timelineTest/master/static/img/timeline.png)

Esse repositório é um objeto de teste para prova da paggcerto de frontEnd

Funcionalidades:
  - Consumir FakeAPI
  - Listagem de Boletos
  - Filtro por nome e n° de boleto
  - Validação de Status(Pago, Pendente, Atrasado)

Tecnologias:
 - Vuejs
 - Webpack
 - Font-Awesome
 - Bootstrap
 - Axios
 - Npm


## Build Setup

``` bash
# Instalar Dependências
npm install

# Instalar FakeApi de forma global
npm install -g json-server

# Inicializar em modo DEV
npm run dev

# Inicializar Servidor do FakeApi
json-server --watch db.json

# Compilar para produção minificando os css e js
npm run build

# Compilar para produção minificando os css e js e visualizando analise de performance e erros
npm run build --report
```
