<template>
  <div class="project-table-container">
    <PaginatedTable 
      :tableData="tableData" 
      :headers="headers" 
    />
  </div>
</template>

<script>
import PaginatedTable from './PaginatedTable.vue';
import { parseMarkdownTable } from './TableParser.js';

export default {
  name: 'ProjectTable',
  components: {
    PaginatedTable
  },
  props: {
    // Markdown表格内容
    content: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      headers: [],
      tableData: []
    }
  },
  mounted() {
    this.parseTable();
  },
  methods: {
    parseTable() {
      const { headers, data } = parseMarkdownTable(this.content);
      this.headers = headers;
      this.tableData = data;
    }
  }
}
</script>

<style scoped>
.project-table-container {
  margin: 20px 0;
  width: 100%;
}
</style> 