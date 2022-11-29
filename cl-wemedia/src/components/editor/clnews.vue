<template>
  <div class="item-wapper">
    <div class="item" v-for="(item, key) in content" :key="key">
      <div class="item-t-bar">
          <el-button @click="addText(key)" style="color: red;float: left">添加文字</el-button>
          <el-button  @click="addImg(key)" style="color: red;float: left">添加图片</el-button>
          <el-button  v-if="item.value!==''&&item.type==='text'" style="color: red;size: 13px;float: right"  @click="editor(key)">编辑</el-button>
          <el-button  v-if="item.value!==''&&item.type==='image'" style="color: red;size: 13px;float: right"  @click="editor2(key)">编辑</el-button>
          <el-button v-if="item.value!==''" @click="deleteItem(key)"  style="color: red;font-size: 13px;float: right">删除</el-button>
      </div>
      <div class="item-t" v-if="item.type==='text'" >{{item.value}}</div>
      <div class="item-i"  v-if="item.type==='image'"><img style="max-width: 300px" :src="item.value" /></div>
    </div>

    <div v-if="dialogTextVisible===true" style="background-color: honeydew" >
      <el-form>
        <el-input type="textarea" :rows="10" placeholder="请输入文本内容" v-model="controller.editorText" style="background-color: honeydew"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="warning"  @click="cancelText">取消</el-button>
        <el-button type="success" @click="saveText">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'clnews',
  props: {
    datas: {
      type: Array,
      default: function () {
        return [
          {
            type: 'text',
            value: ''
          }
        ]
      }
    }
  },
  data () {
    return {
      text: {
        addText: '添加文本',
        editText: '编辑文本'
      },
      controller: {
        editorKey: 0,
        editorTitle:'',
        editorText: '',
      },
      dialogTextVisible: false,
      content: [],
      contents:[{type:'',value:'丫丫'}]
    }
  },
  created () {
    this.setContent(this.datas)
  },
  methods: {
    setContent: function (data) {
      if (data.length > 0) {
        this.content = data
      } else {
        this.content = this.datas
      }
    },
    deleteItem: function (key) {
      if (this.content.length > 1) {
        this.$confirm('确认删除吗?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.content.splice(key, 1)
          this.$message({type: 'success', message: '删除成功!'})
        })
      } else {
        this.$message({type: 'warning', message: '内容为空不能删除，请编辑！'})
      }
    },
    editor:function (key){
      this.$confirm('确认编辑的类型?', {
        distinguishCancelAndClose: true,
        confirmButtonText: '文字',
        cancelButtonText: '图片',
        type: 'warning'
      }).then(() => {
        this.editorText(key)
      }).catch(action =>{
        if (action==='close'){
          this.dialogTextVisible=false
        }else {
        this.editImg(key)}
      })
    },
    editor2:function (key){
      this.$confirm('确认编辑的类型?', {
        distinguishCancelAndClose: true,
        confirmButtonText: '文字',
        cancelButtonText: '图片',
        type: 'warning'
      }).then(() => {
        this.content[key].value=''
        this.editorText(key)
      }).catch(action =>{
        if (action==='close'){
          this.dialogTextVisible=false
        }else {
        this.editImg(key)}
      })
    },
    addImg: function (key) {
      console.log(this.content)
      this.$emit('addImg', {key: key, type: 'addpic'})
    },
    editImg: function (key) {
      this.$emit('addImg', { key: key, type: 'editpic' })
    },
    addText: function (key) {
      this.controller.editorKey = key
      this.controller.editorTitle = this.text.addText
      this.controller.editorText = ''
      this.dialogTextVisible = true
    },
    editorText: function (key) {
      this.controller.editorKey = key
      this.controller.editorTitle = this.text.editText
      this.controller.editorText = this.content[key].value
      this.dialogTextVisible = true
    },
    saveImage: function (data, image) {
      if (data.type === 'addpic') {
        const value = {
          type: 'image',
          value: image
        }
        this.content.splice(data.key, 0, value)
        console.log(this.content)
      } else {
        /*this.content.splice(data.key, 1, value)*/
        this.$set(this.content[data.key], 'type', 'image')
        this.$set(this.content[data.key], 'value', image)
      }
    },
    cancel:function (){
      this.content.splice(this.content.length-1,1)
    },
    cancelText: function () {
      this.dialogTextVisible = false
    },
    saveText: function () {
      if (this.controller.editorText !== '') {
        if (this.controller.editorTitle === this.text.editText) {
/*
          this.$set(this.content[this.controller.editorKey], 'value', this.controller.editorText)
*/
          this.content.splice(this.controller.editorKey,1,{type: 'text', value: this.controller.editorText})
          this.dialogTextVisible = false
        } else {
          this.content.splice(this.controller.editorKey, 0, {type: 'text', value: this.controller.editorText})
          this.dialogTextVisible = false
        }
      } else {
        this.$message({type: 'error', message: '文本内容不能为空!'})
      }
    },
    test(key){
      this.contents.splice(key, 0, {type: 'text', value: '123'})
      console.log(this.contents)
    },
    getContent: function () {
      console.log('JSON.stringify(this.content)')
      console.log(JSON.stringify(this.content))
      return JSON.stringify(this.content)
    },
    clearStyle: function (key) {
      this.getStyle(key, 'w', '0')
      this.$set(this.content[key], 'style', {})
    },
    bold: function (key) {
      let temp = this.getStyle(key, 'fontWeight', 'normal')
      if (temp !== 'bold') {
        temp = 'bold'
      } else {
        temp = 'normal'
      }
      this.$set(this.content[key].style, 'fontWeight', temp)
    },
    up: function (key) {
      const i = key - 1
      if (i >= 0) {
        this.content[i] = this.content.splice(key, 1, this.content[i])[0]
      }
    },
    down: function (key) {
      const i = key + 1
      if (i < this.content.length) {
        this.content[i] = this.content.splice(key, 1, this.content[i])[0]
      }
    },
    upFontSize: function (key) {
      const temp = this.getStyle(key, 'fontSize', '12')
      this.$set(this.content[key].style, 'fontSize', (parseInt(temp) + 1) + 'px')
    },
    downFontSize: function (key) {
      const temp = this.getStyle(key, 'fontSize', '12')
      this.$set(this.content[key].style, 'fontSize', (parseInt(temp) - 1) + 'px')
    },
    // 获取一个样式
    getStyle: function (key, name, defValue) {
      let style = this.content[key].style
      if (style === undefined) {
        style = {}
        this.$set(this.content[key], 'style', style)
      }
      let temp = style[name]
      if (temp === undefined) {
        temp = defValue
        this.$set(this.content[key].style, name, defValue)
      } else {
        temp = temp.toLowerCase()
      }
      return temp.replace(';', '').replace('px', '')
    },
    // 过滤空样式
    getItemStyle: function (style) {
      if (style !== undefined) {
        return style
      }
      return {}
    },

  }
  }
</script>

<style scoped>
.item-wapper {
  height: 450px;
  padding: 15px 10px;
}
.item {
  position: relative;
  text-align: left;
}
.item-t {
  min-height: 30px;
  font-size: 12px;
  line-height: 150%;
  margin: 5px 0px;
}
/*.item-i {
  margin: 5px 0px;
}
.item-i img {
  padding: 0px;
  margin-left: 175px;
  display: block;
  border: none;
}*/
.item:hover .item-t-bar {
  display: inherit;
}

.item-t-bar {
  display: none;
  position: absolute;
  width: 100%;
  color: #ffffff;
}
</style>
