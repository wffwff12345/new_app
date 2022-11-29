<template>
  <div >
    <section class="result">
      <div class="result-container">
      <el-table
        :data="list"
        :row-class-name="tableRowClassName"
        :header-cell-style="{textAlign: 'center', fontWeight: '600'}"
        :cell-style="{textAlign: 'center'}"
        highlight-current-row
      >
        <el-table-column label="自媒体用户id">
          <template slot-scope="scope">
            <span>{{ scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="昵称">
          <template slot-scope="scope">
            <span>{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="电话">
          <template slot-scope="scope">
            <span>{{ scope.row.phone}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="邮箱">
          <template slot-scope="scope">
            <span>{{ scope.row.email}}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后登录时间">
          <template slot-scope="scope"><span>{{ dateFormat(scope.row.loginTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="注册时间">
          <template slot-scope="scope"><span>{{ dateFormat(scope.row.createdTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否授权">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status===1">是</el-tag>
            <el-tag type="info" v-else >否</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="el-button--danger-text"
              @click="deluser(scope.row.id)"
            >删除</el-button>
            <el-button
              size="mini"
              type="danger"
              v-if="scope.row.status ===1"
              @click="updatestatues(scope.row.id,0 )">无效</el-button>
            <el-button
              size="mini"
              v-else
              @click="updatestatues(scope.row.id,1)">有效</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </section>
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="pageChange"
      @size-change="sizeChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import DateUtil from '@/utils/date'
import { delData,ValidData,InvalidData} from '@/api/wemediauser'

export default {
  props: ['list','pageSize', 'total', 'changePage','currentPage','changeSize', 'submitSuccess', 'editData'],
  data () {
    return {
      listPage: {
        currentPage: 1
      }
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    pageChange (newPage) {
      this.changePage && this.changePage({ page: newPage })
    },
    sizeChange (newSize) {
      this.changeSize&& this.changeSize({ size: newSize })
    },
    dateFormat (time) {
      return DateUtil.format13(time)
    },
    operateForEditor (item) {
      this.editData(item)
    },

    async updateChannel (id, name, status) {
      const param = {
        id: id,
        name: name,
        status: status
      }
      const res = await updateData(param)

      if (res.code === 0) {
        this.submitSuccess()
        this.$message({ type: 'success', message: '操作成功！' })
      } else {
        this.$message({ type: 'error', message: res.errorMessage })
      }
    },
    async deluser (id) {
      const res = await delData(id)

      if (res.code === 0) {
        this.submitSuccess()
        this.$message({ type: 'success', message: '删除成功！' })
      } else {
        this.$message({ type: 'error', message: res.errorMessage })
      }
    },
    async updatestatues(id,statues){
      if (statues===0)
      {
        const res=await InvalidData(id)
        console.log(id)
        if (res.code === 0) {
          this.submitSuccess()
          this.$message({ type: 'success', message: '操作成功！' })
        } else {
          this.$message({ type: 'error', message: res.errorMessage })
        }
      }
      else if (statues===1){
        const res=await ValidData(id)
        if (res.code === 0) {
          this.submitSuccess()
          this.$message({ type: 'success', message: '操作成功！' })
        } else {
          this.$message({ type: 'error', message: res.errorMessage })
        }
      }
   }
 }
}
</script>
<<style lang="scss" scoped>
@import '@/scss/element-variables.scss';

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>



