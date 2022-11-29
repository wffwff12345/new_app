<template>
  <div class="search-container">
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch(searchText)"
      @cancel="$router.back()"
      @focus="isResultshow=false"
      clearable
    />
    <SearchResult v-if="isResultshow"
     :search-text="searchText"
    />
  </div>
</template>

<script>
import {Toast} from "vant";
import SearchResult from './components/search-result'
export default {
  name: 'search',
  components: {
    SearchResult
  },
  props:{},
  data () {
    return {
      searchText:'',
      isResultshow:false,

    }
  },
  computed:{},
  watch:{},
  created () {
  },
  mounted() {
  },
  methods:{
    onSearch(searchText){
      if (searchText.toString()===''){
        this.isResultshow=false
        Toast.fail('搜索内容不能为空!')
      }
      else {
        console.log(searchText)
        this.searchText=searchText
        this.isResultshow=true
      }
      }
    }

  }

</script>

<style lang="scss" scoped>
</style>
