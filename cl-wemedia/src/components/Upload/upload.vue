<template>
  <div>
    <el-upload
      class="uploader"
      drag
      action
      :show-file-list="true"
      :auto-upload="false"
      :on-change="handleOnChange">
      <span v-if="!img_url">将文件拖到此处,或点击上传</span>
      <img v-if="img_url" :src="img_url" class="avatar">
    </el-upload>
    <el-button type="success" @click="Uploadpic" style="margin-top: 30px;">
      上传
    </el-button>
  </div>
</template>

<script>
import { uploadImg } from '@/api/publish'

export default {
  name: 'upload',
  props: [],
  data () {
    return {
      img_url: '',
      file: [],
      dialogVisible: false
    }
  },
  methods: {
    handleOnChange (file) {
      this.file = file
    },
    async Uploadpic () {
      const file = this.file.raw
      /*console.log('this.file')
      console.log(this.file)
      console.log('file')
      console.log(file)*/
      const fd = new FormData()
      /*console.log(fd)*/
      fd.append('file', file, file.name)
      /*console.log('fd')
      console.log(fd)*/
      const result = await uploadImg(fd)
      if (result.code === 0) {
        this.img_url = result.data.url
        this.$message({ message: '上传成功', type: 'success' })
      } else {
        this.$message({ message: result.errorMessage, type: 'error' })
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/scss/element-variables.scss';

.el-dialog--center .el-dialog__body {
  padding: 40px 49px 19px 49px;
}

.uploader {
  text-align: left;
  .el-upload-dragger {
    left: 260px;
    //background-color: #fff;
    border: 1px solid #d9d9d9;
    /* border-radius: 30px; */
    /*-webkit-box-sizing: border-box;
    box-sizing: border-box;*/
    width: 300px;
    /*height: 300px;
    text-align: center;
    position: relative;
    overflow: hidden;*/
  }
  .el-upload {
    position: relative;
    width: 225px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $--color-text-primary;

    .icon {
      width: 40px;
      height: 40px;
    }

    .avatar {
      width: 225px;
      height: 150px;
      object-fit: cover;
    }
  }

  .el-upload:hover {
    color: $--color-primary;
  }

  .el-upload-list__item {
    height: 40px;
    line-height: 40px;
  }

  .el-upload-list__item:hover {
    background-color: #F0F0F0;
  }
  .uploader .el-upload-list__item-name {
    margin-left: 215px;
  }

  .el-upload-list__item:first-child {
    margin-top: 20px;
  }

  .el-upload-list__item .el-icon-close {
    top: 13px;
    right: 13px;
  }
}
</style>
