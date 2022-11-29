<template>
  <div>
    <section class="result">
      <el-table
        :data="list"
        :header-cell-style="{textAlign: 'center', fontWeight: '600'}"
        :cell-style="{textAlign: 'center'}"
        highlight-current-row
      >
         <el-table-column label="App用户ID">
          <template slot-scope="scope">
            <span>{{ scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="电话">
          <template slot-scope="scope">
            <span>{{ scope.row.phone}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex}}</span>
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
        <el-table-column label="操作"  width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="el-button--danger-text"
              @click="delAppuser(scope.row.id)"
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
import { delData ,ValidData,InvalidData} from '@/api/appuser'

export default {
  props: ['list', 'pageSize', 'total','currentPage', 'changePage','changeSize', 'submitSuccess', 'editData'],
  data () {
    return {
      listPage: {
        currentPage: 1
      }
    }
  },
  methods: {
    pageChange (newPage) {
      this.changePage && this.changePage({ page: newPage })
    },
    sizeChange (newSize) {
      this.changeSize && this.changeSize({ size: newSize })
    },
    dateFormat (time) {
      return DateUtil.format13(time)
    },
    operateForEditor (item) {
      this.editData(item)
    },
    async delAppuser (id) {
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
