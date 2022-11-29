<template>
  <div>
    <div class="filter">
      <div class="filter-container">
        <el-radio-group v-model="status" @change="loadData">
          <el-radio v-for="(item, index) in statusList" :key="index" :label="item.label">{{ item.value }}</el-radio>
        </el-radio-group>
      </div>
      <div>
        <el-button type="success" @click="showPicDialog = true">
          上传图片
        </el-button>
      </div>
    </div>
    <div class="content-card">
      <el-card class="a1" v-for="img in imgData" :key="img.id" :body-style="{ padding: '0px' }" shadow="hover">
        <img class="image" :class="{'collection': false}" :src="img.url" />
        <div class="operate">
            <el-button class="a2"   :type="img.isCollection ? 'success':'info'" round @click="collectOrCancel(img)">
              {{ img.isCollection ? '已收藏' : '收藏' }}
            </el-button>
          <el-button class="a3" @click="delImg(img)" type="success" round>
            删除
          </el-button>
        </div>
      </el-card>
    </div>
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :total="imgPage.total"
      :page-count="imgPage.pageCount"
      :page-size="imgPage.pageSize"
      :current-page="imgPage.currentPage"
      @current-change="pageChange"
      @size-change="sizeChange"
    ></el-pagination>
    <el-dialog
      width="849px"
      center
      :visible.sync="showPicDialog"
      :show-close="true"
      :before-close="closeModal"
    >
      <upload/>
    </el-dialog>
  </div>
</template>
<script>
import { getAllImgData, delImg, collectOrCancel } from '@/api/publish'
import Upload from '@/components/Upload/upload.vue'
export default {
  name: 'material',
  data () {
    return {
      imgPage: {
        total: 0,
        pageCount: 0,
        currentPage: 1,
        pageSize: 20
      },
      status:null,
      imgChange: false,
      showPicDialog: false,
      activeValue: '0',
      imgData: [],
      statusList: [
        { label: null, value: '全部' },
        { label: 0, value: '未收藏' },
        { label: 1, value: '已收藏' },

      ],
    }
  },
  components: {
    Upload
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData: function () {
      this.getImgData({
        page: this.imgPage.currentPage,
        size: this.imgPage.pageSize,
        isCollection: this.status
      })
    },
    pageChange (newPage) {
      this.imgPage.currentPage = newPage
      this.loadData()
    },
    sizeChange(val){
      this.imgPage.pageSize=val
      this.loadData()
    },
    async getImgData (params) {
      const result = await getAllImgData(params)
      this.imgData = result.data
      this.imgPage.total = result.total
      this.imgPage.pageCount = Math.ceil(this.imgPage.total / this.imgPage.pageSize)
    },
    async collectOrCancel (img) {
      let isCollection = img.isCollection
      if (isCollection) {
        isCollection = 0
      }
      else {
        isCollection = 1
      }
      const result = await collectOrCancel(img.id, { collection: isCollection })
      if (result.code === 0) {
        img.isCollection = isCollection //
        this.$forceUpdate() //
        this.$message({ type: 'success', message: `${img.isCollection ? '':'取消'}收藏成功` })
      } else {
        this.$message({ type: 'error', message: result.errorMessage })
      }
    },
    async delete(img){
    const  result = await delImg(img.id)
      console.log(result)
      if (result.code === 0) {
        this.$message({ type: 'success', message: '删除成功' })
        this.loadData()
      } else {
        this.$message({ type: 'error', message: result.errorMessage })
      }
    },
    async delImg (img) {
      this.$confirm('确认删除该图片？','提示',{
        confirmButtonText: '确定',
        confirmButtonClass: 'el-button--danger',
        cancelButtonText: '取消',
        cancelButtonClass: 'el-button--warning'
    }).then(() => {
         this.delete(img)
         this.loadData()
      }).
       catch(() => {
  this.$message({ type: 'info', message: '已取消' })
   })
      },
    closeModal () {
      this.loadData()
      this.showPicDialog = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/scss/element-variables.scss';

  .filter {
    background-color: honeydew;
    //display: -webkit-box;
    //display: -ms-flexbox;
    display: flex;
    //height: 960px;
    //padding-left: 30px;
   // padding-right: 30px;
    //-webkit-box-pack: justify;
    //-ms-flex-pack: justify;
    /* justify-content: space-between; */
    //-webkit-box-align: center;
    border-radius: 30px;
  }


/deep/ .el-switch__label {
  position: absolute;
  color: $--color-text-secondary;
}

/deep/ .el-switch__label.is-active {
  //background-color: honeydew;
  color: $--color-text-primary;
  font-weight: 600;
}

/deep/ .el-switch__label--left {
  left: 0;
  margin-left: 22px;
  z-index: 9999;
}

/deep/ .el-switch__label--right {
  //background-color: white;
  right: 0;
  margin-right: 23px;
}

/deep/ .el-switch__core {
  background-color: #b1edd5;
  height: 40px;
  border-radius: 15px;
}

/deep/ .el-switch__core:after {
  background-color: #b1edd5;
  width: 63px;
  height: 32px;
  top: 3px;
  left: 3px;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
}

/deep/ .el-switch.is-checked .el-switch__core::after {
  margin-left: 65px;
  left: 3px;
}

.total {
  margin-right: 16px;
  color: $--color-text-secondary;
}

.content-card {
  display: flex;
  padding-left: 80px;
  padding-bottom: 30px;
  flex-wrap: wrap;

  .el-card {
    background-color: honeydew;
    position: relative;
    width: 186px;
    height: 183px;
    margin-top: 30px;
    margin-left: 24px;
    border-radius: 8px;
    //border: 1px solid $--background-color-base;

    .image {
      display: block;
      width: 100%;
      height: 124px;
      object-fit: cover;
    }

    .collection {
      height: 183px;
    }

    .operate {
      display: flex;
      height: 57px;
      justify-content: space-around;
      align-items: center;
    /*.a2
    {
      background-color: white;
      color: black;
    }*/
    .a3
      {
        background-color: white;
        color: black;
      }
      .item {
        display: flex;
        align-items: center;
        font-size: 12px;
        cursor: pointer;

        .icon {
          width: 30px;
          height: 30px;
        }
      }
    }
  }

  .el-card.is-always-shadow,
  .el-card.is-hover-shadow:focus,
  .el-card.is-hover-shadow:hover {
    -webkit-box-shadow: 0px 2px 8px 4px rgba(51, 53, 58, 0.07);
    box-shadow: 0px 2px 8px 4px rgba(51, 53, 58, 0.07);
  }
}

.el-pagination {
  border-top: 2px solid #EBEEF5;
}

/deep/ .el-dialog__footer {
  border-top: 2px solid #EBEEF5;
}
</style>
