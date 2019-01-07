<template>
  <div class="ace-container">
    <div class="ace-editor" ref="ace"></div>
 
    <!-- <div class="config-panel" v-show="toggle">
      <div>
        <div class="item">
          <label class="title">语言</label>
          <el-select class="value" v-model="modePath" @change="handleModelPathChange" size="mini" value-key="name">
            <el-option v-for="mode in modeArray"
                       :key="mode.name"
                       :label="mode.name"
                       :value="mode.path">
            </el-option>
          </el-select>
        </div>
 
        <div class="item">
          <label class="title">换行</label>
          <el-select class="value" v-model="wrap" @change="handleWrapChange" size="mini" value-key="name">
            <el-option v-for="wrap in wrapArray"
                       :key="wrap.name"
                       :label="wrap.name"
                       :value="wrap.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
 
    <div class="bookmarklet" @click="toggleConfigPanel">aa</div> -->
    <div v-for="item in schmeData">
       <p v-for="(val, key, index) in item">{{key}}--{{val}}</p>
      
    </div>
  </div>
</template>
 
<script>
import ace from "ace-builds";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/snippets/html";
import "ace-builds/src-noconflict/snippets/css";
import "ace-builds/src-noconflict/snippets/scss";
import "ace-builds/src-noconflict/snippets/json";
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/snippets/text";
import "ace-builds/src-noconflict/snippets/sql";
import "ace-builds/src-noconflict/snippets/sqlserver";
import  "ace-builds/webpack-resolver";
import   "ace-builds/src-noconflict/ace";


import langTools from "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/mode-sqlserver";

// const themeArray = [{
//   name: 'monokai',
//   path: 'ace/theme/monokai'
// }]

const wrapArray = [
  {
    name: "开启",
    value: true
  },
  {
    name: "关闭",
    value: false
  }
];

const modeArray = [
  {
    name: "JavaScript",
    path: "ace/mode/javascript"
  },
  {
    name: "HTML",
    path: "ace/mode/html"
  },
  {
    name: "CSS",
    path: "ace/mode/css"
  },
  {
    name: "SCSS",
    path: "ace/mode/scss"
  },
  {
    name: "Json",
    path: "ace/mode/json"
  },
  {
    name: "Java",
    path: "ace/mode/java"
  },
  {
    name: "Text",
    path: "ace/mode/text"
  },
  {
    name: "SQL",
    path: "ace/mode/sql"
  }
];
const Data = [{meta: "abcdefg", caption: "sonic", value: "sonic", score:1}]

export default {
  props: {
    value: String
  },
  data() {
    return {
      aceEditor: null,
      toggle: false,
      wrap: true,
      themePath: "ace/theme/monokai",
      modePath: "ace/mode/sql",
      modeArray: modeArray,
      wrapArray: wrapArray,
      data:[
        {
                name : "qianhaiyang大帅比",
                value : "qianhaiyang大帅比",
                caption: "qianhaiyang大帅比",
                meta: "qianhaiyang大帅比",
                type: "local",
                score : 1000 // 让test排在最上面
        }
      ],
      schmeData:[]
    };
  },
  mounted() {
    this.aceEditor = ace.edit(this.$refs.ace, {
      maxLines: 20,
      minLines: 10,
      fontSize: 14,
      value: this.value ? this.value : "",
      theme: this.themePath,
      mode: this.modePath,
      wrap: this.wrap,
      tabSize: 4
    });
    this.aceEditor.setHighlightActiveLine(false);
    // 激活自动提示
    this.aceEditor.setOptions({
      enableSnippets: true,
      enableLiveAutocompletion: true,
      enableBasicAutocompletion: true
    });
    this.aceEditor.getSession().on("change", this.change);
    // this.aceEditor.getSession().selection.on('changeSelection', this.changeSelection);

    this.aceEditor.getSession().setUseWrapMode(true);//设置代码折叠
   this.aceEditor.getSession().setUseSoftTabs(true);
    //将自定义提示弄到方法里面，然后传自定义字段调用
    this.zidingyi(this.data)
  },
  
  
  methods: {
    toggleConfigPanel() {
      this.toggle = !this.toggle;
    },
    // changeSelection(e) {
    //   console.log(e)
    // },
    change() {
      this.$emit("input", this.aceEditor.getSession().getValue());
      console.log(this.aceEditor.getSession().getValue());
      this.aceEditor.getSession().setUseWrapMode(true);//设置代码折叠
      console.log(this.aceEditor.selection.getCursor())
      console.log(this.data)
    },
    handleModelPathChange(modelPath) {
      this.aceEditor.getSession().setMode(modelPath);
    },
    handleWrapChange(wrap) {
      this.aceEditor.getSession().setUseWrapMode(wrap);
    },
    zidingyi(data) {
      console.log(data)
      this.$http.get('/api/sql').then(
        res=>{
          console.log('res')
          console.log(res)
          this.schmeData = res.data.data
          let _table = res.data.table
          let arr = []
          let NewArr = []
          
          for (let i = 0; i < _table.length; i++) {
            for (const key in _table[i]) {
              if (_table[i].hasOwnProperty(key)) {
                const element = _table[i][key];
                arr.push(key)
                // console.log(key)
                arr.push(element)
                // console.log(element)
                
              }
            }
            // [...new Set(arr)]
            
            console.log(arr)
            
            for (let i = 0; i < arr.length; i++) {
              const element = arr[i];
               if(NewArr.indexOf(arr[i]) == -1){
                    NewArr.push(arr[i]);
                }
            }
            
          }
          console.log(NewArr)
          for (let i = 0; i < NewArr.length; i++) {
            const element = NewArr[i];
            let obj ={
              name : "",
              value : "",
              caption: "",
              meta: "",
              type: "local",
              score : 1000 // 让test排在最上面
            }
            obj.name = element
            obj.value = element
            obj.caption = element
            obj.meta = element
            this.data.push(obj)
          }
        }
      )
      langTools.addCompleter({
      getCompletions: function(editor, session, pos, prefix, callback,) {
        // callback(null,  [
        //     {
        //         name : "qianhaiyang大帅比",
        //         value : "qianhaiyang大帅比",
        //         caption: "qianhaiyang大帅比",
        //         meta: "qianhaiyang大帅比",
        //         type: "local",
        //         score : 1000 // 让test排在最上面
        //     }
        // ]);
        console.log(data)
        callback(null,data)
      }
    });
    }
  }
};
</script>
 
<style lang='css' scoped>
/* .ace-container {
  position: relative;
}
.ace-containe .config-panel {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 100%;
  overflow: scroll;
  box-shadow: grey -5px 2px 3px;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1;
}
.ace-containe .config-panel .item {
  margin: 10px auto;
  text-align: center;
}
.ace-containe .config-panel .item .title {
  color: white;
  margin: 0 10px;
  font-size: 14px;
}
.ace-containe .bookmarklet {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 20px;
  height: 20px;
  z-index: 2;
  cursor: pointer;
  border-width: 9px;
  border-style: solid;
  border-color: lightblue gray gray rgb(206, 173, 230);
  border-image: initial;
} */
</style>
