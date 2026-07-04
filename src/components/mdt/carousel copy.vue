<template>
  <div class="carousel-container">
    <div class="carousel-slats" ref="carousel">
      <!-- 轮播项 -->
      <div v-for="(slide, index) in slides" :key="index" class="slat">
        <img :src="slide.image" :alt="slide.title">
        <div class="carousel-content">
          <h2 class="carousel-title">{{ slide.title }}</h2>
          <p class="carousel-description">{{ slide.description }}</p>
        </div>
      </div>
    </div>

    <!-- 控制按钮 -->
    <div class="carousel-controls">

      <mdui-button-icon @click="goToPrev">
        <mdi-icon icon="mdi-chevron-left"></mdi-icon>
      </mdui-button-icon>
      <mdui-button-icon @click="goToNext">
        <mdi-icon icon="mdi-chevron-right"></mdi-icon>
      </mdui-button-icon>
    </div>

    <!-- 指示器 -->
    <div class="indicators">
      <div v-for="(_, index) in slides" :key="index" class="indicator" :class="{ active: currentIndex === index }"
        @click="goToSlide(index)"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Md3Carousel',
  data() {
    return {
      // 幻灯片数据
      slides: [
        {
          image: "https://cn.cfmoto.com/upload/image/20250726/20250726113122.jpg",
          title: "自然风景",
          description: "美丽的自然景观展示，感受大自然的魅力。"
        },
        {
          image: "https://cncfmoto.oss-cn-hangzhou.aliyuncs.com/Product/20250729/xntd1.png",
          title: "城市风光",
          description: "现代都市的繁华景象，展现城市独特魅力。"
        },
        {
          image: "https://cncfmoto.oss-cn-hangzhou.aliyuncs.com/Product/20250729/xntd2.png",
          title: "建筑设计",
          description: "精美的建筑杰作，展示人类智慧的结晶。"
        }
      ],
      currentIndex: 0,
      isAnimating: false,
      animationDelay: 50, // 每个百叶窗切片的延迟时间（毫秒）
      currentBlindIndex: null, // 当前正在动画的百叶窗索引
      blindAnimating: null, // 当前正在动画的百叶窗切片
      autoplayInterval: null
    };
  },
  mounted() {
    this.initialize();
    this.startAutoplay();

    // 添加鼠标悬停事件监听
    const container = this.$refs.carousel;
    container.addEventListener('mouseenter', this.pauseAutoplay);
    container.addEventListener('mouseleave', this.startAutoplay);
  },
  beforeUnmount() {
    // 清除自动播放和事件监听
    this.pauseAutoplay();
    const container = this.$refs.carousel;
    if (container) {
      container.removeEventListener('mouseenter', this.pauseAutoplay);
      container.removeEventListener('mouseleave', this.startAutoplay);
    }
  },
  methods: {
    initialize() {
      // 初始化百叶窗效果
      this.activateBlinds(this.currentIndex);
    },
    getBlindStyle(slideIndex, blindIndex) {
      // 只有当前幻灯片的百叶窗显示动画效果
      if (slideIndex !== this.currentIndex) {
        return { transform: 'scaleY(1)', transition: 'none' };
      }

      // 当前幻灯片的百叶窗切片样式
      return {
        transform: this.blindAnimating === slideIndex && this.currentBlindIndex === blindIndex ?
          'scaleY(0)' : 'scaleY(1)',
        transition: this.blindAnimating === slideIndex && this.currentBlindIndex === blindIndex ?
          `transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)` : 'none'
      };
    },
    activateBlinds(index) {
      this.currentBlindIndex = index;
      // 延迟一点以获取正确的transitionDelay
      setTimeout(() => {
        const blindElements = this.$el.querySelectorAll(`.slat:nth-child(${index + 1}) .blind-slice`);
        blindElements.forEach((element, i) => {
          element.style.transitionDelay = `${i * this.animationDelay}ms`;
          element.classList.add('active');
        });
        this.blindAnimating = index;
      }, 10);
    },
    deactivateBlinds(index) {
      this.currentBlindIndex = index;
      const blindElements = this.$el.querySelectorAll(`.slat:nth-child(${index + 1}) .blind-slice`);
      blindElements.forEach((element, i) => {
        // 添加反向延迟：从底部到顶部
        element.style.transitionDelay = `${(blindElements.length - i - 1) * this.animationDelay}ms`;
        element.classList.remove('active');
      });
      this.blindAnimating = index;
    },
    goToSlide(index) {
      if (this.isAnimating || index === this.currentIndex) return;

      this.isAnimating = true;
      this.deactivateBlinds(this.currentIndex);

      setTimeout(() => {
        this.currentIndex = index;
        this.activateBlinds(this.currentIndex);
        this.isAnimating = false;
      }, this.animationDelay * 11); // 10个切片 * 50ms + 缓冲时间
    },
    goToNext() {
      const nextIndex = (this.currentIndex + 1) % this.slides.length;
      this.goToSlide(nextIndex);
    },
    goToPrev() {
      const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.goToSlide(prevIndex);
    },
    startAutoplay() {
      this.pauseAutoplay();
      this.autoplayInterval = setInterval(this.goToNext, 5000);
    },
    pauseAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
        this.autoplayInterval = null;
      }
    }
  }
};
</script> 

<style scoped>
.carousel-container {
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.carousel-slats {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  height: 400px;
}

.slat {
  min-width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.slat img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blinds {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 2;
}

.blind-slice {
  flex: 1;
  height: 100%;
  background-color: rgb(var(--mdui-color-secondary-container));
  transform-origin: center bottom;
  transform: scaleY(1);
}

.blind-slice.active {
  transform: scaleY(0);
}

.carousel-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 24px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
  z-index: 1;
}

.carousel-title {
  margin: 0;
  font-size: 24px;
  font-weight: 500;
}

.carousel-description {
  margin: 8px 0 0;
  font-size: 16px;
  opacity: 0.9;
}

.carousel-controls {
  position: absolute;
  top: 0;
  right: 0;
  padding: 16px;
  display: flex;
  gap: 8px;
  z-index: 3;
}

.indicators {
  position: absolute;
  bottom: 88px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  z-index: 3;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.indicator.active {
  background-color: white;
  transform: scale(1.2);
}
</style>