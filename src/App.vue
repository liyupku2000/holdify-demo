<template>
<div>
  <div class="header">
    <div class="page-index">
      <div class="index-row">
        <button v-for="(example, index) in examples" :key="example.title"
                :class="{selected: index===currentIndex, leftmost: !index, rightmost: index===examples.length-1}"
                @click="load(index)">
          {{ index }}
        </button>
      </div>
    </div>
    <div class="title">{{examples[currentIndex].title}}</div>
  </div>
  <div class="code-row">
    <div class="code-col">
      <codemirror v-model="template" :options="htmlOption"></codemirror>
    </div>
    <div class="button-col">
      <button class="btn btn-default" @click="compile">Try >></button>
    </div>
    <div class="code-col">
      <codemirror v-model="compiled" :options="jsOption"></codemirror>
    </div>
  </div>
</div>
</template>

<script>
import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import Examples from './examples'

import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/ambiance.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/addon/edit/closetag.js'

@Component({
  components: { codemirror }
})
export default class App extends Vue {
  examples = Examples
  currentIndex = 0

  template=''
  compiled = ''

  htmlOption = {
    autoCloseTags: true,
    mode: 'text/html',
    lineWrapping: true,
    theme: 'ambiance'
  }

  jsOption = {
    readOnly: true,
    mode: 'text/javascript',
    lineWrapping: true,
    theme: 'monokai'
  }

  mounted() {
    this.load(this.currentIndex);
  }

  load(index) {
    this.currentIndex = index;
    this.template = this.examples[index].template;
    this.compile();
  }

  compile() {
    const compiled = require('vue-template-compiler').compile(this.template, {
      modules: [{
        postTransformNode: require('vue-component-holder/holdify')()
      }]
    });
    if (compiled.errors.length) {
      this.compiled = compiled.errors.join('\n');
    } else {
      const prettier = require('prettier/standalone');
      const parserBabylon = require('prettier/parser-babylon');
      const render = `function render() { ${compiled.render} }`;
      this.compiled = prettier.format(render, {
        parser: 'babel',
        plugins: [parserBabylon]
      });
    }
  }
}
</script>

<style scoped lang="sass">
.header
  padding: 20px 0 0 25px
  .title
    margin-left: 20px
    font-weight: bold
    font-size: 22px
    float: left
  .page-index
    float: left
    margin-top: 2px
    border: 1px solid #ccc
    border-radius: 6px
    button
      background: #fff
      padding: 5px 10px
      border: 0
      border-right: 1px solid #ccc
      border-radius: 0
      font-size: 13px
      color: #767676
    button.selected
      background: #ddd
      cursor: default
      color: #333
      font-weight: bold
    button.leftmost
      border-top-left-radius: 6px
      border-bottom-left-radius: 6px
    button.rightmost
      border-right: 0
      border-top-right-radius: 6px
      border-bottom-right-radius: 6px
.code-row
  display: flex
  flex-direction: row
  width: 100%
  padding: 20px
  .code-col
    width: 47%
  .button-col
    text-align: center
    width: 6%
    button
      margin-top: 35vh
</style>

<style lang="sass">
.CodeMirror
  height: calc(100vh - 175px)
</style>