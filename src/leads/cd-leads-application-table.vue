<template>
  <div class="cd-leads-application-table__template">
    <h2 class="cd-leads-application-table__header">{{ title }}</h2>
    <table class="cd-leads-application-table__table">
      <!-- <thead class="cd-leads-application-table__thead"> -->
        <!-- <th class="cd-leads-application-table__th">Champion</th> -->
<!--         <th class="cd-leads-application-table__th"
          v-for="{name: nameVal, title: titleVal} in columns"
          @click="sortBy(nameVal)"
          :class="{ active: sortKey == nameVal }">
          {{ titleVal }}
          <span class="cd-leads-application-table__arrow" :class="sortOrders[nameVal] > 0 ? 'asc' : 'dsc'"></span>
        </th> -->
      <!-- </thead> -->
      <tbody class="cd-leads-application-table__body">
        <tr class="cd-leads-application-table__tr">
          <th class="cd-leads-application-table__th">Key</th>
          <td class="cd-leads-application-table__td">Value</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'cd-leads-application-table',
    props: ['title', 'data', 'columns'],
    data() {
      return {
        searchQuery: '',
        sortKey: '',
        sortOrders: {},
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
      submitBooking(leadId) {
        this.$router.push({ name: 'LeadApplication', params: { leadId } });
      },
    },
    created() {
      const sortOrders = {};
      this.columns.forEach((key) => {
        sortOrders[key.name] = 1;
      });
      this.sortOrders = sortOrders;
    },
  };
</script>

<style scoped lang="less">
@import "~@coderdojo/cd-common/common/_colors";
@import "../common/styles/cd-primary-button.less";
@import "../common/variables";
.cd-leads-application-table {
  &__template {
    display: flex;
    flex-direction: column;
    max-width: 100%;
  }

  &__header {
    margin: 45px 0 @margin 0;
  }

  &__search {
    margin: 24px 0px 0px 0px;
    max-width: 25%;
  }

  &__label {
    margin-bottom: 5px;
    display: block;
    font-size: 14px;
    font-weight: 700;
  }

  &__searchbox {
    display: inline;
  }

  &__table {
/*    border-spacing: 0;
    border-style: solid;
    border-color: none;
    border-width: 1px 1px 3px 1px;*/
    padding: 0px 0px 16px;
    margin: 24px 0px 24px;
    max-width: 100%;
}

  &__th {
    background-color: #f4f5f6;
    padding: 10px 20px;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 700;
    max-width: 150px;
  }

  &__th.active {
    /*color: @cd-purple;*/
  }

  &__th.active .arrow {
    opacity: 1;
  }
  &__tr {
  }

  &__td {
    border-bottom: 1px #f4f5f6 solid;
    padding: 10px 20px;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
