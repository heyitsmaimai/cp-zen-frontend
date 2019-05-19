<template>
  <div class="cd-leads-list-table__template">
    <div class="cd-leads-list-table__search">
      <label class="cd-leads-list-table__label">Search:</label>
      <div>
        <input class="cd-leads-list-table__searchbox form-control" v-model="searchQuery" type="text" name="query"/>
      </div>
    </div>
    <table class="cd-leads-list-table__table">
      <thead class="cd-leads-list-table__thead">
        <th class="cd-leads-list-table__th"
          v-for="{name: nameVal, title: titleVal} in columns"
          @click="sortBy(nameVal)"
          :class="{ active: sortKey == nameVal }">
          {{ titleVal }}
          <span class="cd-leads-list-table__arrow" :class="sortOrders[nameVal] > 0 ? 'asc' : 'dsc'"></span>
        </th>
        <th class="cd-leads-list-table__th">Application</th>
      </thead>
      <tbody class="cd-leads-list-table__body">
        <tr class="cd-leads-list-table__tr" v-for="entry in filteredData">
          <td class="cd-leads-list-table__td" v-for="{name: nameVal, title: titleVal} in columns"> {{ entry[nameVal] }}</td>
          <td class="cd-leads-list-table__td">
            <a class="cd-leads-list-table__link" @click="viewApplication(entry.id)">View <span><i class="fa fa-eye" aria-hidden="true"></i></span></a >
            <a  class="cd-leads-list-table__link" v-if="!entry.completed" :href="`dashboard/start-dojo?id=${entry.id}`">Edit <span><i class="fa fa-pencil" aria-hidden="true"></i></span></a >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'cd-leads-list-table',
    props: ['data', 'columns'],
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
    methods: {
      sortBy(key) {
        this.sortKey = key;
        this.sortOrders[key] = this.sortOrders[key] * -1;
      },
      viewApplication(leadId) {
        this.$router.push({ name: 'LeadApplication', params: { leadId } });
      },
      initializeSortOrders(columns) {
        const sortOrders = {};
        columns.forEach((key) => {
          sortOrders[key.name] = 1;
        });
        return sortOrders;
      },
    },
    created() {
      const sortOrders = this.initializeSortOrders(this.columns);
      this.sortOrders = sortOrders;
    },
  };
</script>

<style scoped lang="less">
@import "~@coderdojo/cd-common/common/_colors";
@import "../common/styles/cd-primary-button.less";
@import "../common/variables";
.cd-leads-list-table {
  &__template {
    display: flex;
    flex-direction: column;
    max-width: 100%;
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

  &__link {
    margin-right: 5px;
    color: @link-color;
    cursor: pointer;
    &:hover {
      color: @link-hover-color;
    }
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
    border-bottom: 4px solid @cd-purple;
  }

  &__arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid @cd-orange;
  }
}
</style>
