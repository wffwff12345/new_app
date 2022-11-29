<template>
  <div>
    <section class="result">
      <el-table
        :data="list"
        :header-cell-style="{textAlign: 'center', fontWeight: '600'}"
        :cell-style="{textAlign: 'center'}"
        highlight-current-row
      >
        <el-table-column label="频道ID">
          <template slot-scope="scope">
            <span>{{ scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column label="频道名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="描述">
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否有效">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status===1">是</el-tag>
            <el-tag type="info" v-else >否</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="el-button--success-text"
              @click="editData(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              v-if="scope.row.status ===true"
              @click="updatestatues(scope.row,false )">无效</el-button>
            <el-button
              size="mini"
              v-else
              @click="updatestatues(scope.row,true)">有效</el-button>
            <el-button
              type="text"
              class="el-button--danger-text"
              @click="delChannel(scope.row.id)"
            >删除</el-button>
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
import { updateData,delData } from '@/api/channel'

export default {
  props: ['list', 'pageSize', 'total', 'changePage','changeSize','currentPage', 'submitSuccess', 'editData'],
  data () {
    return {
      listPage: {
        currentPage: 1
      },
      setForStatus: {
        status: ''
    }}
  },


  methods: {
     async updatestatues(item,statues){
      const param={
        id:item.id,
        name:item.name,
        description:item.description,
        status:statues,

      }
      const res = await updateData(param)
       if (res.code === 0) {
         this.submitSuccess()
         this.$message({ type: 'success', message: '操作成功！' })
       } else {
         this.$message({ type: 'error', message: res.errorMessage })
       }
     },
    pageChange (newPage) {
      this.changePage && this.changePage({ page: newPage })
    },
    sizeChange (newSize) {
      this.changeSize && this.changeSize({ size: newSize })
    },
    dateFormat (time) {
      return DateUtil.format13(time)
    },
    /*operateForEditor (item) {
      this.editData(item)
    },*/
    /*async updateChannel (id, name, status) {
      const param = {
        id: id,
        name: name,
        status: status
      }
      const res = await updateData(param)

      if (res.code === 0) {
        this.dialogFormVisible = false
        this.submitSuccess()
        this.$message({ type: 'success', message: '操作成功！' })
      } else {
        this.$message({ type: 'error', message: res.errorMessage })
      }
    },*/
    async delChannel (id) {
      const res = await delData(id)

      if (res.code === 0) {
        this.submitSuccess()
        this.$message({ type: 'success', message: '删除成功！' })
      } else {
        this.$message({ type: 'error', message: res.errorMessage })
      }
    }
  }
}
</script>
