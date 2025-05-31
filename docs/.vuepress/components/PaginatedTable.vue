<template>
  <div class="paginated-table">
    <!-- 搜索框 -->
    <div class="search-container">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="搜索项目..." 
        class="search-input"
        @input="handleSearch"
      />
    </div>

    <!-- 表格 -->
    <table>
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index" @click="sortBy(header)">
            {{ header }}
            <span v-if="sortKey === header" class="sort-icon">
              {{ sortOrder === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in paginatedData" :key="index">
          <td v-for="(header, headerIndex) in headers" :key="headerIndex">
            {{ row[header] }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分页控件 -->
    <div class="pagination">
      <button 
        @click="currentPage--" 
        :disabled="currentPage === 1"
        class="pagination-btn"
      >
        上一页
      </button>
      
      <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
      
      <button 
        @click="currentPage++" 
        :disabled="currentPage >= totalPages"
        class="pagination-btn"
      >
        下一页
      </button>
      
      <select v-model="pageSize" class="page-size-select">
        <option :value="10">10条/页</option>
        <option :value="20">20条/页</option>
        <option :value="50">50条/页</option>
        <option :value="100">100条/页</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaginatedTable',
  props: {
    // 表格数据
    tableData: {
      type: Array,
      required: true
    },
    // 表头
    headers: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      sortKey: '',
      sortOrder: 'asc',
      searchQuery: '',
      filteredData: []
    }
  },
  created() {
    this.filteredData = [...this.tableData];
  },
  computed: {
    // 计算总页数
    totalPages() {
      return Math.ceil(this.filteredData.length / this.pageSize);
    },
    // 当前页的数据
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredData.slice(start, end);
    }
  },
  watch: {
    // 监听页面大小变化，重置当前页
    pageSize() {
      this.currentPage = 1;
    },
    // 监听表格数据变化
    tableData: {
      handler(newVal) {
        this.filteredData = [...newVal];
        this.handleSearch();
      },
      deep: true
    }
  },
  methods: {
    // 排序方法
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
      
      this.filteredData.sort((a, b) => {
        const valA = a[key];
        const valB = b[key];
        
        if (typeof valA === 'number' && typeof valB === 'number') {
          return this.sortOrder === 'asc' ? valA - valB : valB - valA;
        } else {
          const strA = String(valA).toLowerCase();
          const strB = String(valB).toLowerCase();
          
          if (this.sortOrder === 'asc') {
            return strA.localeCompare(strB);
          } else {
            return strB.localeCompare(strA);
          }
        }
      });
    },
    // 搜索方法
    handleSearch() {
      if (!this.searchQuery.trim()) {
        this.filteredData = [...this.tableData];
      } else {
        const query = this.searchQuery.toLowerCase();
        this.filteredData = this.tableData.filter(row => {
          return Object.values(row).some(value => 
            String(value).toLowerCase().includes(query)
          );
        });
      }
      this.currentPage = 1;
    }
  }
}
</script>

<style scoped>
.paginated-table {
  margin: 20px 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  table-layout: fixed;
}

th {
  background-color: #f2f2f2;
  cursor: pointer;
  user-select: none;
  position: relative;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

th:nth-child(1), 
td:nth-child(1) {
  width: 10%;
  text-align: center;
}

th:nth-child(2), 
td:nth-child(2) {
  width: 15%;
}

th:nth-child(3), 
td:nth-child(3) {
  width: 55%;
}

th:nth-child(4), 
td:nth-child(4) {
  width: 20%;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

.sort-icon {
  margin-left: 5px;
}

.search-container {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination-btn {
  padding: 8px 16px;
  margin: 0 5px;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.page-info {
  margin: 0 10px;
  font-size: 14px;
}

.page-size-select {
  margin-left: 15px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

@media print {
  table {
    page-break-inside: auto;
  }
  
  tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }
  
  th, td {
    page-break-inside: avoid;
  }
}
</style> 