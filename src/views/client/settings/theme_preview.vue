<template>
  <div class="container" id="theme_preview">
    <div class="header">
      <h1>MaterialDesignForum-Vuetify2 <span class="version-tag">v25.7.15</span></h1>
      <p>主题详情页面</p>
    </div>

    <!-- 新增的轮播图部分 -->
    <mdui-card :variant="mainStore.getIsDark ? 'filled' : 'elevated'">
      <h2><i class="material-icons">collections</i>主题预览</h2>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            style="
              background-image:
                linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
                url('https://source.unsplash.com/random/800x400/?material,design');
            "
          >
            首页预览
          </div>
          <div
            class="swiper-slide"
            style="
              background-image:
                linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
                url('https://source.unsplash.com/random/800x400/?forum,discussion');
            "
          >
            论坛页面
          </div>
          <div
            class="swiper-slide"
            style="
              background-image:
                linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
                url('https://source.unsplash.com/random/800x400/?dark,theme');
            "
          >
            暗黑模式
          </div>
          <div
            class="swiper-slide"
            style="
              background-image:
                linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
                url('https://source.unsplash.com/random/800x400/?dark,theme');
            "
          >
            暗黑模式
          </div>
        </div>
        <!-- 分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 导航按钮 -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </mdui-card>

    <mdui-card :variant="mainStore.getIsDark ? 'filled' : 'elevated'">
      <h2><i class="material-icons">palette</i>简介</h2>
      <div class="info-item">
        <!-- <span class="info-label">图标:</span>
        <span class="info-value">mdi-vuetify</span> -->
        <span class="info-label">描述:</span>
        <span class="info-value">XXXXXXXXXXXXXXXXXXXX</span>
      </div>
      <!-- <div class="info-item"> -->
      <!-- <span class="info-label">图标颜色:</span>
        <span class="info-value" style="color: #2196f3;">#2196f3</span> -->
      <!-- </div> -->
    </mdui-card>

    <mdui-card :variant="mainStore.getIsDark ? 'filled' : 'elevated'">
      <h2><i class="material-icons">info</i>基本信息</h2>
      <div class="info-item">
        <span class="info-label">名称:</span>
        <span class="info-value">MaterialDesignForum-Vuetify2</span>
      </div>
      <div class="info-item">
        <span class="info-label">版本:</span>
        <span class="info-value">25.7.15</span>
      </div>
      <div class="info-item">
        <span class="info-label">描述:</span>
        <span class="info-value">Material Design MaterialDesignForum for Vuetify2</span>
      </div>
      <div class="info-item">
        <span class="info-label">作者:</span>
        <span class="info-value">HaiGeMaster</span>
      </div>
    </mdui-card>

    <mdui-card :variant="mainStore.getIsDark ? 'filled' : 'elevated'">
      <h2><i class="material-icons">settings</i>功能设置</h2>
      <div class="info-item">
        <span class="info-label">是否禁用:</span>
        <span class="info-value">否</span>
      </div>
      <div class="enabled-notice">此主题当前处于启用状态</div>

      <div class="info-item">
        <span class="info-label">语言路由:</span>
        <span class="info-value">支持</span>
      </div>

      <div class="info-item">
        <span class="info-label">IE支持:</span>
        <span class="info-value">不支持</span>
      </div>
      <div class="disabled-notice">此主题不支持Internet Explorer浏览器</div>
    </mdui-card>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css'
export default {
  name: 'ThemePreview',
  mounted() {
    // 初始化Swiper
    new Swiper('.swiper-container', {
      // 启用所需模块
      // loop: true, // 禁用循环模式
      // slidesPerView: 1,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })
  },
}
</script>
<style>
#theme_preview {
  /* mdui-card {
    width: 100%;
  } */

  .container {
    max-width: 800px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 30px;
  }

  .header {
    text-align: center;
    margin-bottom: 30px;

    h1 {
      font-size: 28px;
      margin-bottom: 10px;
      color: #2196f3;
    }

    p {
      color: #666;
      font-size: 16px;
    }
  }

  mdui-card,
  .card {
    width: 100%;
    margin: 16px;

    /* border-radius: 8px; */
    padding: 20px;

    /* margin-bottom: 20px; */

    /* background-color: #fff; */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    h2 {
      font-size: 18px;
      margin-bottom: 15px;
      /* color: #333; */
      display: flex;
      align-items: center;

      i {
        margin-right: 10px;
      }
    }
  }

  .info-item {
    margin-bottom: 10px;
  }

  .info-label {
    font-weight: bold;
    /* color: #555; */
    margin-right: 8px;
  }

  /* .info-value { */
  /* color: #333; */
  /* } */

  .disabled-notice {
    /* background-color: #ffebee; */
    color: #c62828;
    padding: 10px;
    border-radius: 4px;
    margin-top: 10px;
  }

  .enabled-notice {
    /* background-color: #e8f5e9; */
    color: #2e7d32;
    padding: 10px;
    border-radius: 4px;
    margin-top: 10px;
  }

  .version-tag {
    display: inline-block;
    /* background-color: #e3f2fd; */
    color: #2196f3;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 14px;
    margin-left: 10px;
  }

  /* 轮播图样式 */
  .swiper-container {
    width: 100%;
    height: 300px;
    margin: 20px 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-position: center;
    color: white;
    font-size: 24px;
    font-weight: bold;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  }

  .swiper-pagination {
    .swiper-pagination-bullet {
      /* background: white; */
      opacity: 0.6;

      &.swiper-pagination-bullet-active {
        /* background: #2196f3; */
        opacity: 1;
      }
    }
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: white;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  }
}
</style>
