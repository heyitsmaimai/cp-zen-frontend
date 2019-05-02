<template>
<!-- <form id="search">
  Search <input name="query" v-model="searchQuery">
</form> -->
  <div class="grid__template">
    <table class="grid__table">
      <thead class="grid__thead">
        <th class="grid__th" 
          v-for="key in columns"
          @click="sortBy(key)"
          :class="{ active: sortKey == key }">
          {{ key | capitalize }}
          <span class="grid__arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"></span>
        </th>
      </thead>
      <tbody class="grid__body">
        <tr class="grid__tr" v-for="entry in filteredData">
          <td class="grid__td" v-for="key in columns"> {{entry[key]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'grid',
    props: ['data', 'columns'],
    data() {
      return {
        searchQuery: '',
        sortKey: '',
        sortOrders: {},
        thing: null,
      };
    },
    computed: {
      filteredData() {
        const sortKey = this.sortKey;
        const filterKey = this.searchQuery && this.searchQuery.toLowerCase();
        const order = this.sortOrders[sortKey] || 1;
        let data = this.data;

        if (filterKey) {
          data = data.filter(row =>
            Object.keys(row).some(key =>
              String(row[key]).toLowerCase().indexOf(filterKey) > -1));
        }
        if (sortKey) {
          data = data.slice().sort((a, b) => {
            const avar = a[sortKey];
            const bvar = b[sortKey];
            const isit = avar === bvar ? 0 : avar > bvar;
            return (isit ? 1 : -1) * order;
          });
        }
        return data;
      },
    },
    filters: {
      capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
    },
    methods: {
      sortBy(key) {
        this.sortKey = key;
        this.sortOrders[key] = this.sortOrders[key] * -1;
      },
    },
    created() {
      const sortOrders = {};
      this.columns.forEach((key) => {
        sortOrders[key] = 1;
      });
      this.sortOrders = sortOrders;
    },
  };
</script>

<style scoped lang="less">
@import "~@coderdojo/cd-common/common/_colors";
@import "../common/styles/cd-primary-button.less";
@import "../common/variables";
.grid {
  &__template {
    display: flex;
    flex-direction: column;
    max-width: 1150px;
  }

  &__table {
    border-spacing: 0;
    border-style: solid;
    border-color: @cd-orange;
    border-width: 1px 1px 3px 1px;
    padding: 0px 0px 16px;
    margin: 24px 0px 24px;
    max-width: 1150px;
}

  &__th {
    background-color: #f4f5f6;
    /*color: rgba(255,255,255,0.66);*/
    padding: 10px 20px;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 700;
  }

  &__th.active {
    color: @cd-purple;
  }

  &__th.active .arrow {
    opacity: 1;
  }

  &__td {
    border-bottom: 1px #f4f5f6 solid;
    min-width: 150px;
    padding: 10px 20px;
  }

  &__arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
  }

  &__arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid @cd-orange;
  }

  &__arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid @cd-orange;
  }
}
</style>
