<template>
  <div class="centerDiv">

    <Clock />

    <Weather />

  </div>
</template>

<script>
import Clock from '@/components/mdt/clock.vue'
import Weather from '@/components/mdt/weather.vue'
export default {
  name: 'MDT',
  components: {
    Clock,
    Weather,
  }
}
</script>

<style lang="less" scoped>
// @media screen and (max-width: 500px) {
//   .centerDiv {
//     position: relative;
//     margin-bottom: 6rem;
//     padding-top: 0;
//   }
// }

// @media screen and (max-width: 720px) {
//   .centerDiv {
//     width: calc(100% - 4rem);
//     margin-bottom: 10rem;
//     align-self: center;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//   }
// }

// @media screen and (max-width: 1200px) {
//   .centerDiv {
//     /* display: grid
// ; */
//     grid-template-columns: auto;
//     padding-bottom: 100px;
//     position: relative;
//     inset-inline-start: 0;
//     inset-inline-end: 0;
//     margin: 0 auto;
//     padding-top: 60px;
//   }
// }

// .centerDiv {
//   display: grid;
//   grid-template-columns: auto auto;
//   width: fit-content;
//   height: fit-content;
//   /* background-color: #17a638; */
//   // padding-bottom: calc(var(--shortcut-size) + var(--gap) * 2);
// }

// 超大屏（>1200px）：默认两列（无需媒体查询，直接用默认样式）
.centerDiv {
  display: grid;
  grid-template-columns: auto auto;
  width: fit-content;
  height: fit-content;

  margin-bottom: 100px;
}

// 大屏（720px~1200px）：单列居中
@media screen and (max-width: 1200px) {
  .centerDiv {
    grid-template-columns: auto; /* 单列 */
    padding-top: 60px;
    padding-bottom: 100px;
    margin: 0 auto;
  }
}

// 中屏（500px~720px）：紧凑单列
@media screen and (max-width: 720px) {
  .centerDiv {
    width: calc(100% - 4rem);
    margin-bottom: 10rem;
    align-self: center;
  }
}

// 小屏（<500px）：极端适配
@media screen and (max-width: 500px) {
  .centerDiv {
    margin-bottom: 6rem;
    padding-top: 0;
  }
}
</style>