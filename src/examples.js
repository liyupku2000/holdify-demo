export default [
  {
    title: 'Try it Yourself',
    template: ``
  },
  {
    title: 'Basic Example',
    template:
`<div>
  <VueHolder>
    <MyChildComponent />
  </VueHolder>
</div>`
  },
  {
    title: 'Basic v-for Expamle',
    template:
`<div>
  <div v-for="(dataObj, key) in dict" :key="key">
    <VueHolder>
      <ChildComponent :data="dataObj" />
    </VueHolder>
  </div>
</div>`
  },
]