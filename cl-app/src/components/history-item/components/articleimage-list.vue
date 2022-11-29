<template>
  <div class="content">
    <div class="image-wrap-item" v-for="(i,index) in itemes"
         :key="index">
      <van-image
        class="image-item"
        fit="cover"
        width="116"
        height="73"
        :src="i"
      />
    </div>
  </div>

</template>
<script>
export default {
  name: 'articleimage-list',
  components: {
  },
  props:{
    itemes:{
      type:Array,
      required:true
    }

  },
  data () {
    return {

  }},
  computed:{},
  watch:{},
  created () {
  },
  mounted() {
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
.content{
display: flex;
.image-wrap-item{
  flex:1;
  height: 73px;
  &:not(:last-child){
    padding-right: 4px;
  }
  .image-item{
    width: 100%;
    height: 73px;
  }
}
}
</style>
