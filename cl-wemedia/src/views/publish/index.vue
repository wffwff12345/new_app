<template>
  <div class="con">
    <el-button class="rt" @click="onback" type="success" round>返回
    </el-button>
  <div class="tinymce-container">
    <el-form ref="form">
      <el-form-item label="标题：" prop="title">
        <el-input
          v-model="FormData.title"
          placeholder="请输入文章的标题"
          maxlength="35"
          show-word-limit
          style="width: 500px;"
        />
      </el-form-item>
      <el-form-item>
        <el-col >
          <el-form-item label="标签：" prop="labels" >
            <el-input v-model="FormData.labels"
                      placeholder="请输入标签"
                      style="width: 179px;"/>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="频道：" prop="channelId" >
            <el-select v-model="FormData.channelId"style="width: 179px;" placeholder="请选择频道">
              <el-option
                v-for="item in channel_list"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="发布时间：" prop="publishTime" >
            <el-date-picker
              v-model="FormData.publishTime"
              type="datetime"
              placeholder="请选择日期时间"
              default-time="12:00:00"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <clnews ref="clnews" @addImg="selectTextImg" />
      </el-form-item>
      <el-form-item label="设置封面：" >
        <el-radio-group v-model="FormData.type">
          <el-radio label="0">无图</el-radio>
          <el-radio label="1">单图</el-radio>
          <el-radio label="3">三图</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="FormData.type === '1' || FormData.type === '3'">
        <div v-if="FormData.type === '1'" class="single_pic" @click="selectSinglePic">
          <span v-if="!onePic">选择图片</span>
          <img v-if="onePic" :src="parseImage(onePic)" />
        </div>
        <div v-if="FormData.type === '3'" class="three_pic">
          <div
            class="three_pic_item"
            v-for="(item,index) in threePicList"
            :key="index"
            @click="selectThreePic(index)"
          >
            <span v-if="!item">选择图片</span>
            <img v-if="item" :src="parseImage(item)" />
          </div>
        </div>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="success" class="filter-item" @click="publish">
          发布文章
        </el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      width="1500px"
      title="图片素材库"
      :visible.sync="showPicDialog"
      :close-on-click-modal="false"
      :show-close="true"
      :center="true"
    >
      <div class="filter-container">
        <el-radio-group v-model="status" @change="loadData">
          <el-radio v-for="(item, index) in statusList" :key="index" :label="item.label">
            {{ item.value }}
          </el-radio>
        </el-radio-group>
          <div class="img_list_con">
            <div
              class="img_list"
              v-for="item in imgData"
              :key="item.id"
              @click="selectPic(item.id,item.url)"
            >
              <img :src="item.url" />
            </div>
          </div>
        </div>
        <div class="pagination">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :total="imgPage.total"
            :page-count="imgPage.pageCount"
            :page-size="imgPage.pageSize"
            :current-page="imgPage.currentPage"
            @current-change="pageChange"
            @size-change="sizeChange"
          ></el-pagination>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="cancleImg">取 消</el-button>
        <el-button type="success" @click="btnImg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  </div>
</template>

<script>
import clnews from '@/components/editor/clnews.vue'
import { getArticleById } from '@/api/content'
import {getAllImgData, getChannels, publishArticles, modifyArticles} from '@/api/publish'

export default {
  name: 'PublishArticle',
  components: { clnews },
  data () {
    return {
      statusList: [
        { label: null, value: '全部' },
        { label: 0, value: '未收藏' },
        { label: 1, value: '已收藏' },

      ],
      status:null,
      FormData: {
        id: '',
        title: '',
        type: '0',
        labels: '',
        publishTime: '',
        channelId: null
      },
      host: '',
      onePic: null,
      threePicList: [null, null, null],
      pubForm: {},
      channel_list: [],
      showPicDialog: false,
      imgPage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageCount: 1
      },
      imgData: [],
      selectedImg: {},
      currentType: {
        key: 0,
        type: ''
      }
    }
  },
  created() {

  },
  beforeMount () {
    const { articleId } = this.$route.query
    if (articleId) {
      this.getArticle(articleId)
    }
    this.getChannels()
  },
  mounted () {
  },
  methods: {
    onback(){
      this.$router.replace({path:'/article/list'})
    },
    parseImage: function (item) {
      if (item.indexOf('http') > -1) {
        return item
      } else {
        return this.host + item
      }
    },
    async getChannels () {
      const result = await getChannels()
      this.channel_list = result.data
    },
    async getArticle (id) {
      const result = await getArticleById(id)
      this.FormData = {
        id: result.data.id,
        title: result.data.title,
        channelId: result.data.channelId,
        labels: result.data.labels,
        type: '' + result.data.type,
        publishTime: result.data.publishTime
      }
      let conts = []
      if (result.data.content) {
        try {
          conts = eval('(' + result.data.content + ')')
        } catch (e) {
          console.error(e)
        }
      }
      this.$refs.clnews.setContent(conts)
      this.transImages(this.FormData.type, result.data.images)
    },
    selectTextImg (data) {
      this.currentType.key = data.key
      this.currentType.type = data.type
      this.uploadPic()
    },

    selectSinglePic () {
      this.currentType.type = 'one'
      this.uploadPic()
    },
    selectThreePic (index) {
      this.currentType.type = 'three'
      this.currentType.index = index
      this.uploadPic()
    },
    uploadPic () {
      this.showPicDialog = true
      this.loadData()
    },
    pageChange (newPage) {
      this.imgPage.currentPage = newPage
      this.loadData()
    },
    sizeChange(val){
      this.imgPage.pageSize=val
      this.loadData()
    },
    loadData: function () {
      this.getImgData({
        page: this.imgPage.currentPage,
        size: this.imgPage.pageSize,
        isCollection: this.status
      })
    },
    async getImgData (params) {
      const result = await getAllImgData(params)
      this.imgData = result.data
      this.imgPage.total = result.total
      this.imgPage.pageCount = Math.ceil(this.imgPage.total / this.imgPage.pageSize)
    },
    selectPic (id, url) {
      this.selectedImg = { id, url }
    },
    cancleImg () {
      this.showPicDialog = false
    },
    btnImg () {
      if (this.selectedImg.url) {
        if (this.currentType.type === 'one') {
          this.onePic = this.selectedImg.url
        } else if (this.currentType.type === 'three') {
          this.threePicList[this.currentType.index] = this.selectedImg.url
          this.$forceUpdate()
        } else if (this.currentType.type === 'addpic'||this.currentType.type==='editpic') {
          this.$refs.clnews.saveImage(this.currentType, this.selectedImg.url)
        }
      }
      this.currentType = {}
      this.selectedImg = {}
      this.showPicDialog = false
    },
    transImages (type, images) {
      images = images.split(',')
      if (type === '1') {
        this.onePic = images[0]
      } else if (type === '3') {
        this.threePicList = [...images]
      }
    },
    getImages () {
      if (
        this.FormData.type === '1' || this.FormData.type === '3'
      ) {
        if (this.FormData.type === '1') {
          return this.onePic ? [this.onePic] : []
        } else {
          return this.threePicList.map(item => item)
        }
      }
      return []
    },
    async publish () {
      const { articleId } = this.$route.query
      const images = this.getImages()
      this.$refs.clnews.cancel()
      const data = {...this.FormData, images: images, content: this.$refs.clnews.getContent()
      }
      if (!data.title || data.title.length < 6 || data.title.length > 35) {
        this.$message({
          type: 'warning',
          message: '文章标题不能小于6个字符或大于35个字符'
        })
        return
      }
      if (!data.labels || data.labels.length > 30) {
        this.$message({ type: 'warning', message: '标签不能为空或超过30字符' })
        return
      }
      if (!data.content) {
        this.$message({ type: 'warning', message: '文章内容不能为空' })
        return
      }
      if (!data.channelId) {
        this.$message({ type: 'warning', message: '文章频道不能为空' })
        return
      }
      if (
        (data.type === '1' && data.images.length !== 1) || (data.type === '3' && data.images.length !== 3)
      ) {
        this.$message({ type: 'warning', message: '文章封面未设置' })
        return
      }
      for (let i = 0; i < data.images.length; i++) {
        if (data.images[i] == null || data.images[i] === 'null') {
          this.$message({ type: 'warning', message: '请选择文章封面' })
          return
        }
      }
      console.log(data)
      if (!articleId){
        await publishArticles(data)
      }else {
        await modifyArticles(articleId,data)
      }
      this.$message({
        type: 'success',
        message: articleId ? '编辑文章成功' : '新增文章成功'
      })
      this.$router.replace({ path: '/article/list' })
    }
    }

}
</script>

<style lang="scss" scoped>
@import '@/scss/element-variables.scss';
.con {
  .rt{
    background-color: honeydew;
    color: black;
    margin: 20px 20px;
  }
  .tinymce-container {
    padding: 30px;
    text-align: center;

    /deep/ .title {
      text-align: center;

    }

    /deep/ .el-input__inner {
      //background-color: #ff0000;
    }

    .editor-content {
      margin-top: 20px;
    }

    .img_list {
      width: 155px;
      height: 103px;
      float: left;
      margin: 0px auto;
      border: 1px solid #eee;
      overflow: hidden;
      border-radius: 4px;
      margin: 0px 18px 16px 0;
      position: relative;
    }

    .img_list_con {
      flex: 1;
      overflow: hidden;
      margin-left: 30px;
      max-height: 340px;
    }

    .selected {
      position: absolute;
      top: 6px;
      right: 6px;
      width: 32px !important;
      height: 33px !important;
    }

    .img_list img {
      width: 155px;
      height: 103px;
      display: block;
      cursor: pointer;
    }

    .pagination {
      text-align: center;
    }

    .upload_pic_show {
      display: block;
      width: 240px;
      height: 180px;
      margin: 15px auto 10px;
    }

    .single_pic {
      width: 278px;
      height: 180px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      //border: 2px dashed $--border-color-base;
      border-radius: 4px;
      cursor: pointer;
    }

    .three_pic {
      display: flex;
      flex-direction: row;
      width: 600px;
      height: 180px;
      cursor: pointer;

      .three_pic_item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        //border: 2px dashed $--border-color-base;
        border-right: none;
      }

      .three_pic_item:last-child {
        //border-right: 2px dashed $--border-color-base;
      }
    }

    .single_pic:hover, .three_pic_item:hover {
      color: $--color-primary;
    }

    .single_pic .icon, .three_pic .three_pic_item .icon {
      width: 40px;
      height: 40px;
    }

    .single_pic span, .three_pic .three_pic_item span {
      line-height: normal;
    }

    .single_pic img, .three_pic .three_pic_item img {
      width: 278px;
      height: 180px;
      object-fit: cover;
    }


    /deep/ .el-dialog__footer {
      border-top: 2px solid #EBEEF5;
    }
  }

  // background-color:honeydew ;
}

</style>
