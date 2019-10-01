export default [
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
title: 'v-for Loop on Dict',
template:
`<div>
  <div v-for="(dataObj, key) in dict" :key="key">
    <VueHolder name="MyChild">
      <ChildComponent :key="key" :data="dataObj" />
    </VueHolder>
  </div>
</div>`
},

{
title: 'v-for Loop on Array',
template:
`<div>
  <div v-for="dataObj in array" :key="dataObj.id">
    <VueHolder name="MyChild">
      <ChildComponent :data="dataObj" />
    </VueHolder>
  </div>
</div>`
},

{
title: 'Multiple v-for Loops',
template:
`<div>
  <div v-for="country in countries" :key="country.name">
    <div v-for="city in country.cities" :key="city.name">
      <vue-holder name="CityCard">
        <CityCard :country="country" :city="city" />
      </vue-holder>
    </div>
  </div>
</div>`
},

{
title: `Custom :uid - 1`,
template:
`<div>
  <div v-for="(dataObj, key) in dict">
    <VueHolder name="MyChild" :uid="{ key }">
      <ChildComponent :key="key" :data="dataObj" />
    </VueHolder>
  </div>
</div>`
},

{
title: `Custom :uid - 2`,
template:
`<div>
  <div v-for="dataObj in array">
    <VueHolder name="MyChild" :uid="{ id: #dataObj#.id }">
      <ChildComponent :data="dataObj" />
    </VueHolder>
  </div>
</div>`
},

{
title: `Custom :vars`,
template:
`<div>
  <div v-for="(dataObj, key) in dict" :key="key">
    <VueHolder :vars="{ dataObj: 'dict[key]' }">
      <ChildComponent :key="key" :data="dataObj" />
    </VueHolder>
  </div>
</div>`
},
]