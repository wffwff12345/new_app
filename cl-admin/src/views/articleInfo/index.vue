<template>
  <div class="qa-container"
  >
    <el-button class="rt" @click="onback" type="success" round>返回
    </el-button>
    <div class="a1"><h1>{{this.title}}</h1></div>
    <div
      v-for="(i,index) in this.items"
      :key="index"
    >
      <articlecontent-lists :item="i"/>
    </div>
  </div>

</template>

<script>
import ArticlecontentLists from './components/articlecontent-lists'
import { getArticleById} from '@/api/news'
export default {
  name: 'articleinfo',
  components: {
    ArticlecontentLists
  },
  props:{
    id:{
     type: [String, Number, Object],
     required: true
    }
  },
  data () {
    return {
      title:'',
      itemes: {},
      items: {},
    }
  },
  computed:{},
  watch:{},
  created () {
    this.getArticleById()
  },
  mounted() {
  },
  methods:{
    onback(){
      this.$router.back()
    },
    async getArticleById(){
      const temp = await getArticleById(this.id)
      console.log(temp)
      this.title=temp.data.title
      console.log(temp.data.content)
      const itemes = JSON.parse(temp.data.content)
      this.items = itemes
      console.log(itemes)
    },
  }
}
</script>

<style lang="scss" scoped>
.qa-container{
  padding-top: 20px;
  background-color: honeydew;
  border-radius: 20px;
  .a1{
    text-align: center;
  }
  .rt{
    background-color: honeydew;
    color: black;
  }
}
</style>
