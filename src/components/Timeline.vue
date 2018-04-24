<template>
    <div class="main">
      <header class="clearfix nav-categoria">
        <nav>
          <div class="search">
            <input class="form-control" type="text" v-model="search" placeholder="Busque pelo N° ou Razão Social.."/>
          </div>
          <router-link to="/" tag="a" exact>
            <span>Diário</span>
          </router-link>
          <router-link to="/semanal" tag="a" exact>
            <span>Semanal</span>
          </router-link>
          <router-link to="/mensal" tag="a" exact>
            <span>Mensal</span>
          </router-link>
        </nav>
      </header>
      <ul class="paggcerto_tmtimeline" v-if="filteredList && filteredList.length">
        <li v-for="boleto of filteredList">
          <time class="paggcerto_tmtime" v-bind:datetime="boleto.date + boleto.time">
            <span>{{ boleto.date }}  {{ boleto.time }}</span> <span>N° {{ boleto.id }}</span>
          </time>
          <div v-bind:class="'paggcerto_tmicon paggcerto_tmicon-phone ' + boleto.status">
            <i class="fa fa-credit-card"></i>
          </div>
          <div class="paggcerto_tmlabel">
            <h2>{{ boleto.razao_social }}  - [{{ boleto.status }}]</h2>
            <p v-html="boleto.content"></p>
            <img :src="'/static/img/boleto.png'" width="50px" class="boleto" alt="">
          </div>
        </li>
      </ul>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        search: '',
        boletos: [],
        errors: [],
        tipo: 'D'
      }
    },
    methods: {
      fetchData () {
        switch (this.$route.path) {
          case '/semanal':
            this.tipo = 'S'
            break
          case '/mensal':
            this.tipo = 'M'
            break
          default:
            this.tipo = 'D'
            break
        }
        axios.get('http://localhost:3000/boletos?&type=' + this.tipo)
        .then(response => {
          this.boletos = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
      }
    },
    created () {
      this.fetchData()
    },
    computed: {
      filteredList () {
        return this.boletos.filter(boleto => {
          return boleto.razao_social.toLowerCase().includes(this.search.toLowerCase()) ||
            boleto.id.toString().includes(this.search.toLowerCase())
        })
      }
    },
    watch: {
      '$route': 'fetchData'
    }
  }
</script>

<style scoped>
  .main,
  .main > header {
    width: 100%;
    max-width: 69em;
    margin: 0 auto;
    padding: 0 1.875em 3.125em 1.875em;
  }

  .main > header {
    padding: 2.875em 1.875em 1.875em;
  }

  .main > header h1 {
    font-size: 2.125em;
    line-height: 1.3;
    margin: 0 0 0.6em 0;
    float: left;
    font-weight: 400;
  }

  .nav-categoria nav {
    margin: 0 auto;
    text-align: right;
  }

  .nav-categoria a {
    padding: 10px;
    border: 1px solid #f68b33;
    width: 170px;
  }

  .nav-categoria a:hover,
  .nav-categoria a.active {
    text-decoration: none;
    background-color: #6cbfee;
    border: 1px solid #46a4da;
    color: #fff;
  }

  .paggcerto_tmtimeline {
    margin: 30px 0 0 0;
    padding: 0;
    list-style: none;
    position: relative;
  }

  /* Linha Vertical */
  .paggcerto_tmtimeline:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 10px;
    background: #afdcf8;
    left: 20%;
    margin-left: -10px;
  }

  /* Data/Hora */
  .paggcerto_tmtimeline > li {
    position: relative;
  }

  .paggcerto_tmtimeline > li .paggcerto_tmtime {
    display: block;
    width: 25%;
    padding-right: 100px;
    position: absolute;
  }

  .paggcerto_tmtimeline > li .paggcerto_tmtime span {
    display: block;
    text-align: right;
  }

  .paggcerto_tmtimeline > li .paggcerto_tmtime span:first-child {
    font-size: 0.9em;
    color: #bdd0db;
  }

  .paggcerto_tmtimeline > li .paggcerto_tmtime span:last-child {
    font-size: 2.9em;
    color: #3594cb;
  }

  .paggcerto_tmtimeline > li:nth-child(odd) .paggcerto_tmtime span:last-child {
    color: #6cbfee;
  }

  /* Conteudo do Boleto */
  .paggcerto_tmtimeline > li .paggcerto_tmlabel {
    margin: 0 0 15px 25%;
    background: #3594cb;
    color: #fff;
    padding: 2em;
    font-size: 1.2em;
    font-weight: 300;
    line-height: 1.4;
    position: relative;
    border-radius: 5px;
  }

  .paggcerto_tmtimeline > li:nth-child(odd) .paggcerto_tmlabel {
    background: #6cbfee;
  }

  .paggcerto_tmtimeline > li .paggcerto_tmlabel h2 {
    margin-top: 0px;
    padding: 0 0 10px 0;
    border-bottom: 1px solid rgba(255,255,255,0.4);
  }

  .paggcerto_tmtimeline > li .paggcerto_tmlabel:after {
    right: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-right-color: #3594cb;
    border-width: 10px;
    top: 10px;
  }

  .paggcerto_tmtimeline > li:nth-child(odd) .paggcerto_tmlabel:after {
    border-right-color: #6cbfee;
  }

  /* Icones */
  .paggcerto_tmtimeline > li .paggcerto_tmicon {
    width: 40px;
    height: 40px;
    font-family: 'ecoico';
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    font-size: 1.4em;
    line-height: 40px;
    -webkit-font-smoothing: antialiased;
    position: absolute;
    color: #fff;
    background: #46a4da;
    border-radius: 50%;
    box-shadow: 0 0 0 8px #afdcf8;
    text-align: center;
    left: 20%;
    top: 0;
    margin: 0 0 0 -25px;
  }
  img.boleto {
    right: 35px;
    position: absolute;
    top: 32%;
    width: 17%;
  }
  .paggcerto_tmicon.paggcerto_tmicon-phone.pago {
    background-color: #3FB618;
  }
  .paggcerto_tmicon.paggcerto_tmicon-phone.pendente {
    background-color: #f68b33;
  }
  .paggcerto_tmicon.paggcerto_tmicon-phone.atrasado {
    background-color: #ec1b24;
  }
  .search {
    width: 285px;
    float: left;
    margin-top: -10px;
  }

  @media screen and (max-width: 65.375em) {

    .paggcerto_tmtimeline > li .paggcerto_tmtime span:last-child {
      font-size: 1.5em;
    }
  }

  @media screen and (max-width: 47.2em) {
    .paggcerto_tmtimeline:before {
      display: none;
    }

    .paggcerto_tmtimeline > li .paggcerto_tmtime {
      width: 100%;
      position: relative;
      padding: 0 0 20px 0;
    }

    .paggcerto_tmtimeline > li .paggcerto_tmtime span {
      text-align: left;
    }

    .paggcerto_tmtimeline > li .paggcerto_tmlabel {
      margin: 0 0 30px 0;
      padding: 1em;
      font-weight: 400;
      font-size: 95%;
    }

    .paggcerto_tmtimeline > li .paggcerto_tmlabel:after {
      right: auto;
      left: 20px;
      border-right-color: transparent;
      border-bottom-color: #3594cb;
      top: -20px;
    }

    .paggcerto_tmtimeline > li:nth-child(odd) .paggcerto_tmlabel:after {
      border-right-color: transparent;
      border-bottom-color: #6cbfee;
    }

    .paggcerto_tmtimeline > li .paggcerto_tmicon {
      position: relative;
      float: right;
      left: auto;
      margin: -55px 5px 0 0px;
    }
  }
</style>
