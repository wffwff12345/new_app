<template>
  <div class="postcomment-container">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="100"
        placeholder="有爱评论，说点好听的~"
        show-word-limit
      />
    <van-button
    size="small"
    @click="onPost"
    round
    color="orange"
    :disabled="!message"
    >发送</van-button>
  </div>
</template>

<script>
//import { loginByUsername } from '@/api/login'
import {PostArticlecomment} from '@/api/home'
import JSONbig from "json-bigint";
import { getUser } from '@/utils/store'
import emitter from '@/utils/event'
import {Toast} from "vant";

export default {
  name: 'PostComment',
  components: {
  },
  props:{
    articleId:{
      type:[Number,String, Object],
      required:true
    }
  },
  data () {
    return {
      message:'',
      collapse: false,
      user: {}
    }
  },
  computed:{
    userName () {
      return this.user.name ? this.user.name : '未登录'
    }
  },
  watch:{},
  created () {
    this.user = getUser()
  },
  mounted() {
  },
  methods:{
    async onPost(){
      this.$toast.loading({
        message:'正在发布...',
        forbidClick:true
      })
      const id=JSONbig.parse(this.articleId)
      const params={articleId: id,comments:this.message}
      const data= await PostArticlecomment(params)
      this.$emit('post-success')
      if (data.code === 0) {
        Toast.success('发送成功!')
      } else {
        Toast.fail(result.errorMessage)

      }
      this.message=''
    }
  }
}
</script>

<style lang="scss" scoped>
.postcomment-container{
  padding: 14px;
  display: flex;
  align-items: center;
  .van-button__text{
    width: 30px;
    text-align: center;
    display: flex;
    color: red;
  }
}
</style>
