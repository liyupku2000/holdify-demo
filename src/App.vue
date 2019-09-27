<template>
<div  class="container">
  <div class="toolbar">
    <button class="btn btn-default" @click="compile">Compile Vue Template w/ Holdify >></button>
  </div>
  <div class="row code-area-row">
    <div class="col-lg-6">
      <codemirror class="code-area" v-model="origin" :options="htmlOption"></codemirror>
    </div>
    <div class="col-lg-6">
      <codemirror class="code-area" v-model="compiled" :options="jsOption"></codemirror>
    </div>
  </div>
</div>
</template>

<script>
import { Component } from 'vue-property-decorator'
import Vue from 'vue'

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
  origin =
`<div>
  <div v-for="(dataObj, key) in dict" :key="key">
    <VueHolder :vars="{dataObj: 'dict[key]'}">
      <ChildComponent :data="dataObj" />
    </VueHolder>
  </div>
</div>`

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
    this.compile();
  }

  compile() {
    const compiled = require('vue-template-compiler').compile(this.origin, {
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
.container
  width: 100%
  padding: 20px
  .toolbar
    text-align: center
  .code-area-row
    margin-top: 20px
</style>

<style lang="sass">
.CodeMirror
  height: calc(100vh - 175px)
</style>