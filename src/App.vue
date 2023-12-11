<template>
  <div>
    <div id="slogan" class="text-center">
      <h1>NameGator</h1>
      <br />
      <h6 class="text-secondary">
        Gerador de nomes utilizando Vue.js, GraphQL e Node
      </h6>
    </div>

    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md">
            <app-item-list-vue v-bind:items="prefixes"></app-item-list-vue>
          </div>
          <div class="col-md">
            <app-item-list-vue v-bind:items="sufixes"></app-item-list-vue>

            <h5>
              Sufixos <span class="badge badge-info">{{ sufixes.length }}</span>
            </h5>
            <div class="card">
              <div class="card-body">
                <ul class="list-group">
                  <li
                    class="list-group-item"
                    v-for="sufix in sufixes"
                    v-bind:key="sufix"
                  >
                    <div class="row">
                      <div class="col-md">
                        {{ sufix }}
                      </div>
                      <div class="col-md text-right">
                        <button
                          class="btn btn-info"
                          v-on:click="deleteSufix(sufix)"
                        >
                          <span class="fa fa-trash"></span>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
                <br />
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    v-model="sufix"
                    v-on:keyup.enter="addSufix(sufix)"
                    placeholder="Digite o sufixo"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-info" v-on:click="addSufix(sufix)">
                      <span class="fa fa-plus"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />

        <h5>
          Domínios <span class="badge badge-info"> {{ domains.length }} </span>
        </h5>
        <div class="card">
          <div class="card-body">
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="domain in domains"
                v-bind:key="domain.name"
              >
                <div class="row">
                  <div class="col-md">
                    {{ domain.name }}
                  </div>
                  <div class="col-md text-right">
                    <a
                      class="btn btn-info"
                      v-bind:href="domain.checkout"
                      target="_blank"
                    >
                      <span class="fa fa-shopping-cart"></span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import AppItemListVue from "./components/AppItemList.vue";

export default {
  name: "App",
  components: {
    AppItemListVue,
  },
  data: function () {
    return {
      prefix: "",
      sufix: "",
      prefixes: ["Air", "Jat", "Flight"],
      sufixes: ["Hub", "Station", "Mart"],
    };
  },
  methods: {
    addPrefix(prefix) {
      this.prefixes.push(prefix);
      this.prefix = "";
    },
    deletePrefix(prefix) {
      this.prefixes.splice(this.prefixes.indexOf(prefix), 1);
    },
    addSufix(sufix) {
      this.sufixes.push(sufix);
      this.sufix = "";
    },
    deleteSufix(sufix) {
      this.sufixes.splice(this.prefixes.indexOf(sufix), 1);
    },
  },
  computed: {
    domains() {
      const domains = [];
      for (const prefix of this.prefixes) {
        for (const sufix of this.sufixes) {
          const name = prefix + sufix;
          const url = name.toLowerCase();
          const checkout = `http://www.hostgator.com.br/${url}`;
          domains.push({ name, checkout });
        }
      }
      return domains;
    },
  },
};
</script>

<style>
#slogan {
  margin-top: 30px;
  margin-bottom: 30px;
}

#main {
  background-color: #f1f1f1;
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>
