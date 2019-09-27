<template>
<div>
  <div class="header">
    <h2>{{examples[currentIndex].title}}</h2>
    <div class="index-row">
      <a v-for="(example, index) in examples" :key="example.title" @click="load(index)">{{ index }}</a>
    </div>
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
  currentIndex = 2

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
    this.load(1);
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
  padding-left: 20px
  a
    cursor: pointer
    font-size: 16px
    margin-right: 8px
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