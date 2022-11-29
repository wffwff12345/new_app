<template>
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
        <img v-if="item.images!==''"
             @click="onInfo(item.id)"
             class="image"
             :src="getImage(item)"/>
        <div class="center">
             <span class="cc1">作者:{{item.authorName}}</span>
             <span class="cc2">发布:{{dateFormat(item.publishTime)}}</span>
        </div>
        </div>
        <div class="top1" >
          <el-button class="a2"  round style="text-align: center"  type="success"  @click="operateBtn(item.id, 'delete')">
            <span class="a3">删除</span>
          </el-button>
        </div>
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
</template>

<script>
import DateUtil from '@/utils/date'
  export default {
    props: ['articleList','currentPage', 'pageSize', 'total', 'changePage', 'deleteArticle'],
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
      pageChange(page) {
        this.changePage && this.changePage({page: page})
      },
      sizeChange(size) {
        this.changePage && this.changePage({size: size})
      },

      dateFormat(time) {
        return DateUtil.format13(time)
      },

      operateBtn(Id, type) {
        switch (type) {
          case 'delete':
            this.$confirm('删除该文章?', '删除文章提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.deleteArticle && this.deleteArticle(Id)
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
      width: 233px;
      height: 300px;
      margin-top: 30px;
      margin-left: 30px;
      border-radius: 8px;
      border: 1px solid $--background-color-base;

      .image {
        display: block;
        width: 100%;
        height: 155px;
        object-fit: cover;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      .center{
        padding-top: 10px;
        padding-bottom: 15px;
        text-align: center;
      }

      /deep/.cc{
        text-align: center;

      }
      .top1 {
        text-align: center;
      .a2{
        text-align: center;
        width: 80px;
        padding:0px;
      .a3{
        text-align: center
      }
      }
        .el-button.is-round {
          border-radius: 20px;
        }
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
