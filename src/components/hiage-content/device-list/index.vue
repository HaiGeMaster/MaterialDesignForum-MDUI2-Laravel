<template>
  <div class="device-wrapper">
    <div class="device" ref="topics">
      <!-- <TopicItem v-for="device in data" :image="device.image" :title="device.title" :href="device.href" /> -->
      <!-- 从最后一个开始循环 -->
      <TopicItem v-for="(device, index) in data" :key="index" :image="device.image" :title="device.title" :href="device.href" :price="device.price"/>
    </div>
    <mdui-button-icon v-show="topics_show_arrow_left" @click="jumpTo('left')" class="arrow-left" variant="tonal">
      <mdi-icon icon="mdi-chevron-left" />
    </mdui-button-icon>
    <mdui-button-icon v-show="topics_show_arrow_right" @click="jumpTo('right')" class="arrow-right" variant="tonal"
      :loading="loading">
      <mdi-icon icon="mdi-chevron-right" />
    </mdui-button-icon>
  </div>
</template>
<script>
import TopicItem from '../device-item/index.vue';
import {
  scrollHorizontal,
  // GetTopics,
  // Get_G_INDEX_TOPICS,
} from '@/api/global.js';
export default {
  name: 'device-list',
  components: {
    TopicItem,
  },
  data: () => ({
    loading: false,
    topics_show_arrow_left: false,
    topics_show_arrow_right: true,
    data: [
      {
        image: '/assets/haige_content/my_device/29-Ninebot Mmax2 110P EVA 2.jpg',
        title: 'Ninebot Mmax2 110P EVA 2',
        href: '',
        price: 10999,
      },
      {
        image: '/assets/haige_content/my_device/28-Ninebot Mmax2 110P.jpg',
        title: 'Ninebot Mmax2 110P',
        href: '',
        price: 8999,
      },
      {
        image: '/assets/haige_content/my_device/27-Ninebot F90.png',
        title: 'Ninebot F90',
        href: '',
        price: 4299,
      },
      {
        image: '/assets/haige_content/my_device/26-HUAWEI WATCH FIT 3.jpg',
        title: 'HUAWEI WATCH FIT 3',
        href: '',
        price: 865,
      },
      {
        image: '/assets/haige_content/my_device/25-HUAWEI FreeBuds SE 2.jpg',
        title: 'HUAWEI FreeBuds SE 2',
        href: '',
        price: 139,
      },
      {
        image: '/assets/haige_content/my_device/24-HUAWEI Mate Pad Pro 13.2 2023.png',
        title: 'HUAWEI Mate Pad Pro 13.2 2023',
        href: '',
        price: 5699,//5134
      },
      {
        image: '/assets/haige_content/my_device/23-HUAWEI M-Pencil 2.png',
        title: 'HUAWEI M-Pencil 2',
        href: '',
        price: 299,
      },
      {
        image: '/assets/haige_content/my_device/22-HUAWEI Mate 30 Pro 5G.png',
        title: 'HUAWEI Mate 30 Pro 5G',
        href: '',
        price: 6499,
      },
      {
        image: '/assets/haige_content/my_device/21-HUAWEI Mate Pad Pro 12.6 2022.jpg',
        title: 'HUAWEI Mate Pad Pro 12.6 2022',
        href: '',
        price: 3799,
      },
      {
        image: '/assets/haige_content/my_device/20-DELL 16 Plus 7610.jpg',
        title: 'DELL 16 Plus 7610',
        href: '',
        price: 8999,
      },
      {
        image: '/assets/haige_content/my_device/19-HUAWEI Enjoy 9e.jpg',
        title: 'HUAWEI Enjoy 9e',
        href: '',
        price: 999,
      },
      {
        image: '/assets/haige_content/my_device/18-HUAWEI Enjoy Max.jpg',
        title: 'HUAWEI Enjoy Max',
        href: '',
        price: 1699,
      },
      {
        image: '/assets/haige_content/my_device/17-Nubia Play 5G.jpg',
        title: 'Nubia Play 5G',
        href: '',
        price: 1899,
      },
      {
        image: '/assets/haige_content/my_device/16-HUAWEI Mate Pad Pro 10.8 2019.jpg',
        title: 'HUAWEI Mate Pad Pro 10.8 2019',
        href: '',
        price: 3799,
      },
      {
        image: '/assets/haige_content/my_device/15-Apple iPhone X.jpg',
        title: 'Apple iPhone X',
        href: '',
        price: 5999,
      },
      {
        image: '/assets/haige_content/my_device/14-HUAWEI Mate 30 Pro.png',
        title: 'HUAWEI Mate 30 Pro',
        href: '',
        price: 5499,
      },
      {
        image: '/assets/haige_content/my_device/13-HUAWEI P30 Pro.jpg',
        title: 'HUAWEI P30 Pro',
        href: '',
        price: 5488,
      },
      {
        image: '/assets/haige_content/my_device/12-HONOR PlayWith 8a.jpg',
        title: 'HONOR PlayWith 8a',
        href: '',
        price: 838,
      },
      {
        image: '/assets/haige_content/my_device/11-HONOR 8X Max.jpg',
        title: 'HONOR 8X Max',
        href: '',
        price: 1699,
      },
      {
        image: '/assets/haige_content/my_device/10-HONOR Bracelet 5.jpg',
        title: 'HONOR Bracelet 5',
        href: '',
        price: 179,
      },
      {
        image: '/assets/haige_content/my_device/9-HONOR PlayWith 7.jpg',
        title: 'HONOR PlayWith 7',
        href: '',
        price: 799,
      },
      {
        image: '/assets/haige_content/my_device/8-HONOR MagicBook 14.jpg',
        title: "HONOR MagicBook 14'",
        href: '',
        price: 4388,
      },
      {
        image: '/assets/haige_content/my_device/7-HONOR Play.jpg',
        title: 'HONOR Play',
        href: '',
        price: 2399,
      },
      {
        image: '/assets/haige_content/my_device/6-MEIZU 5.jpg',
        title: 'MEIZU 5',
        href: '',
        price: 599,
      },
      {
        image: '/assets/haige_content/my_device/5-UNISCOM.png',
        title: 'UNISCOM',
        href: '',
        price: 799,
      },
      {
        image: '/assets/haige_content/my_device/4-DaMai m6a iph 4.jpg',
        title: 'DaMai m6a iph 4',
        href: '',
        price: 499,
      },
      {
        image: '/assets/haige_content/my_device/3-Volte S7.jpg',
        title: 'Volte S7',
        href: '',
        price: 499,
      },
      {
        image: '/assets/haige_content/my_device/2-SHOWN P1.jpg',
        title: 'SHOWN P1',
        href: '',
        price: 299,
      },
      {
        image: '/assets/haige_content/my_device/1-ZTE U819.jpg',
        title: 'ZTE U819',
        href: '',
        price: 199,
      },
    ]
  }),
  methods: {
    jumpTo(position) {
      const element = this.$refs.topics;
      const isLeft = position === 'left';
      const offset = element.offsetWidth * (isLeft ? -1 : 1);
      const _this = this;
      if (position === 'right') {
        // this.GetTopics();
      } else {
        this.topics_show_arrow_right = true;
      }
      scrollHorizontal(element, {
        offset,
        callback: () => {
          _this.jumpEnd(element, position);
        },
      });
    },
    jumpEnd(element, position) {
      this.topics_show_arrow_left = element.scrollLeft > 0;
      if (position === 'right') {
        this.topics_show_arrow_right = (element.scrollLeft + element.offsetWidth < element.scrollWidth);
      }
      else {
        this.topics_show_arrow_right = (element.scrollLeft + element.offsetWidth < element.scrollWidth);
      }
    },
    
  },
};
</script>
<style lang="less">
@import "./index.less";
</style>