<template>
  <div>
  <section class="result">
    <div class="content-card">
      <div v-for="(item, index) in articleList" :key="index" class="item-card">
        <div class="center" >
          <span v-if="item.images===''"
                @click="onInfo(item.id)"
                class="cc">
            {{item.title}}
          </span>
          <span v-if="item.images!==''">
            {{item.title}}
          </span>
        </div>
        <img v-if="item.images!==''"
             @click="onInfo(item.id)"
             class="image"
             :src="getImage(item)"/>
        <div class="center">
          <span class="cc">
            {{item.status===5 ? `发布时间:${dateFormat(item.publishTime)}`:`创作时间:${dateFormat(item.createdTime)}`}}
          </span>
        </div>
          <el-button class="a1" v-if="item.status !== 5"  type="success" round @click="operateBtn(item.id, 'modify')">
            修改
          </el-button>
          <el-button class="a3" v-if="item.status === 1" type="success" round  >
          待审核
          </el-button>
          <el-button class="a4" v-if="item.status === 2"  type="success" round >
          审核失败
          </el-button>
          <el-button class="a5" v-if="item.status === 3"  type="success" round >
          人工审核
          </el-button>
          <el-button class="a6" v-if="item.status === 4"  type="success" round >
            审核通过
          </el-button>
          <el-button class="a7" v-if="item.status === 5"  type="success" round >
          已发布
         </el-button>
        <el-button class="a2" v-if="item.status !== 5"  type="success" round @click="operateBtn(item.id, 'delete')">
          删除
        </el-button>
<!--        <div class="content">-->
<!--          <div class="bottom">-->
<!--            <div class="time" >{{dateFormat(item.created_time)}}</div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="pageChange"
      @size-change="sizeChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
    ></el-pagination>
  </section>
  </div>
</template>

<script>
  import DateUtil from '@/utils/date'
  export default {
    props: ['articleList', 'pageSize', 'total', 'changePage','changeSize','currentPage', 'deleteArticles'],
    data() {
      return {
        listPage: {
          currentPage: 1
        }
      }
    },
    methods: {
      onInfo:function (id){
        this.$router.push({name: 'articleInfo', params: {id: id}})
      },

      getImage: function (item) {
        if (item.images) {
          const temp = item.images.split(',')
          if (temp.length > 0) {
            return temp[0]
          }
        }
      },
      pageChange (newPage) {
        this.changePage && this.changePage({ page: newPage })
      },
      sizeChange (newSize) {
        this.changeSize && this.changeSize({ size: newSize })
      },

      dateFormat(time) {
        return DateUtil.format13(time)
      },
      operateBtn(Id, type) {
        switch (type) {
          case 'modify':
            this.$router.push({path: '/article/publish', query: {articleId: Id}})
            break
          case 'delete':
            this.$confirm('删除该文章?', '删除文章提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.deleteArticles && this.deleteArticles(Id)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消删除'
              })
            })
            break
          default:
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/scss/element-variables.scss';

  .content-card {
    display: flex;
    padding-left: 6px;
    padding-bottom: 30px;
    flex-wrap: wrap;

    .item-card {
      position: relative;
      width: 320px;
      height: 300px;
      margin-top: 30px;
      margin-left: 30px;
      border-radius: 8px;
      border: 1px solid $--background-color-base;

      .image {
        display: block;
        width: 100%;
        height: 175px;
        object-fit: cover;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      .center{
        padding-top: 10px;

      }
      .top1{
        padding-top: 100px;
        //bottom:5px;
      }
      /deep/.cc{
        text-align: center;

      }

      .a1{
        margin-top: 20px;
      }
      .a2{
        margin-top: 20px;

      }


      .content {
        padding: 22px 16px 0 17px;


        .bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 13px;

          .time {
            font-size: 14px;
            color: $--color-text-secondary;
            line-height: 19px;
          }

          .draft {
            padding: 3px 7px;
            background: #F0F3F9;
            border-radius: 4px;
            color: $--color-text-secondary;
          }

          .audit {
            padding: 3px 7px;
            background: #EEF4FF;
            border-radius: 4px;
            color: $--color-primary;
          }

          .publish {
            padding: 3px 7px;
            background: #EBF7F2;
            border-radius: 4px;
            color: $--color-success;
          }

          .unaudit {
            padding: 3px 7px;
            background: #FFEFEF;
            border-radius: 4px;
            color: $--color-danger;
          }
        }
      }
    }

    .item-card:hover .top {
      display: flex;
    }
  }

  .el-pagination {
    border-top: 2px solid #ebeef5;
  }
</style>
