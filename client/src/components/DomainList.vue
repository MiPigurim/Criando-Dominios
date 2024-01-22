<template>
  <div>
    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md">
            <AppItemListVue
              title="Prefixos"
              v-bind:items="prefixes"
              v-on:addItem="addPrefix"
              v-on:deleteItem="deletePrefix"
            ></AppItemListVue>
          </div>
          <div class="col-md">
            <app-item-list-vue
              title="Sufixo"
              v-bind:items="sufixes"
              v-on:addItem="addSufix"
              v-on:deleteItem="deleteSufix"
            ></app-item-list-vue>
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
import axios from "axios/dist/axios";

import AppItemListVue from "./AppItemList.vue";

export default {
  name: "App",
  components: {
    AppItemListVue,
  },
  data: function () {
    return {
      prefixes: [],
      sufixes: [],
    };
  },
  methods: {
    addPrefix(prefix) {
      this.prefixes.push(prefix);
    },
    deletePrefix(prefix) {
      this.prefixes.splice(this.prefixes.indexOf(prefix), 1);
    },
    addSufix(sufix) {
      this.sufixes.push(sufix);
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
  created() {
    axios({
      url: "http://localhost:4000",
      method: "post",
      data: {
        query: `
        {
         prefixes: items (type: "prefix") {
            id
            type
            description
          }
          sufixes: items (type: "sufix") {
            
            description
          }
        }`,
      },
    }).then((response) => {
      const query = response.data;
      this.prefixes = query.data.prefixes.map((prefix) => prefix.description);
      this.sufixes = query.data.sufixes.map((sufix) => sufix.description);
    });
  },
};
</script>

<style></style>
