<template>
  <div class="content">
  <van-cell  v-if="item.type==='text'">
    {{item.value}}
  </van-cell>
  <van-image
    v-if="item.type==='image'"
    fit="cover"
    width="200"
    height="200"
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

</style>
