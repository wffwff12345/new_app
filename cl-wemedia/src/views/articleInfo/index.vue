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
        <articlecontent-list :item="i"/>
    </div>
  </div>

</template>

<script>
import ArticlecontentList from './components/articlecontent-list'
import { getArticleById} from '@/api/content'
export default {
  name: 'articleinfo',
  components: {
    ArticlecontentList
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
      items: [],
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
      this.items=JSON.parse(temp.data.content)

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
