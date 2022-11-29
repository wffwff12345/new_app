<template>
  <div class="content">
  <span class="b1" v-if="item.type==='text'">
  {{item.value}}
  </span>
  <el-image
    v-if="item.type==='image'"
    fit="cover"
    style="width: 250px; height: 150px"
    :src="item.value"
    />
  </div>
</template>
<script>
export default {
  name: 'articlecontent-list',
  components: {

  },
  props:{
    item:{}
  },
  data () {
    return {

    }
  },
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
  text-align: center;
  margin-bottom: 5px;
.b1{
  font-size: 19px;
  }}
</style>
