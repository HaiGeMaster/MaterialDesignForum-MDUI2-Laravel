<template>
  <div class="leftDiv" id="leftDiv" @click="toggleClockType">
    <div class="clock" id="analogClock">
      <svg fill="none" height="100%" viewBox="0 0 461 461" width="100%" xmlns="http://www.w3.org/2000/svg">
        <path class="bgLightTint" clip-rule="evenodd"
          d="M93.6379 63.9405C89.7543 78.4344 78.4333 89.7554 63.9394 93.639L56.4989 95.6327C34.0934 101.636 20.7969 124.666 26.8005 147.072L28.7201 154.236C32.6038 168.73 28.46 184.195 17.8497 194.805L12.3015 200.353C-4.1005 216.755 -4.10051 243.348 12.3015 259.75L17.9236 265.372C28.5338 275.983 32.6776 291.447 28.794 305.941L26.8004 313.382C20.7968 335.787 34.0933 358.817 56.4989 364.821L63.9395 366.815C78.4334 370.698 89.7544 382.019 93.638 396.513L95.6322 403.956C101.636 426.361 124.666 439.658 147.071 433.654L154.513 431.66C169.007 427.777 184.472 431.92 195.082 442.531L200.353 447.802C216.755 464.204 243.348 464.204 259.75 447.802L265.097 442.455C275.707 431.845 291.172 427.701 305.666 431.585L313.383 433.653C335.788 439.656 358.818 426.36 364.822 403.954L366.815 396.515C370.699 382.021 382.02 370.7 396.514 366.816L403.955 364.822C426.361 358.819 439.657 335.789 433.654 313.383L431.586 305.665C427.702 291.172 431.846 275.707 442.456 265.096L447.802 259.75C464.204 243.348 464.204 216.755 447.802 200.353L442.53 195.081C431.92 184.471 427.776 169.006 431.66 154.512L433.654 147.071C439.657 124.665 426.361 101.635 403.955 95.6312L396.514 93.6373C382.02 89.7537 370.699 78.4327 366.815 63.9389L364.822 56.4994C358.818 34.0938 335.788 20.7974 313.383 26.8009L305.942 28.7946C291.448 32.6782 275.983 28.5345 265.373 17.9242L259.75 12.3015C243.348 -4.10051 216.755 -4.1005 200.353 12.3015L194.806 17.8491C184.196 28.4593 168.731 32.6031 154.237 28.7195L147.071 26.7995C124.666 20.7959 101.636 34.0924 95.6322 56.498L93.6379 63.9405Z"
          fill="#FFF" fill-rule="evenodd" />
      </svg>
      <div class="centerPoint">
        <div class="sui" id="hour"></div>
        <div class="sui" id="second"></div>
        <div class="sui" id="minute"></div>
      </div>
    </div>
    <div class="clock" id="digitalClock">
      <svg fill="none" height="100%" viewBox="60 0 460 450" width="100%" xmlns="http://www.w3.org/2000/svg">
        <rect class="bgLightTint" height="350" rx="180" width="460" x="60" y="40"></rect>
        <text id="digidate" x="290" y="120" text-anchor="middle" fill="#E2EEFF" font-size="28" font-family="Arial"
          class="digidate">
          Mon 1
        </text>
        <text x="290" y="260" id="digiclock" class="digiclock" font-family="Arial">
          <tspan id="digihours">6</tspan>
          <tspan id="digicolon">:</tspan>
          <tspan id="digiminutes">28</tspan>
        </text>
        <text id="amPm" x="290" y="330" text-anchor="middle" fill="#E2EEFF" font-size="28" font-family="Arial"
          class="amPm">
          AM
        </text>
      </svg>
    </div>
    <div class="ttteexxtt">
      <!-- <mdui-switch @change="handleSwitchChange">
        切换为数字时钟
      </mdui-switch> -->
      <div id="date"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftDiv: null,
      hourHand: null,
      minuteHand: null,
      secondHand: null,
      digihours: null,
      digiminutes: null,
      amPm: null,
      digidate: null,
      digitalClock: null,
      analogClock: null
    };
  },
  mounted() {
    // 在组件挂载后获取DOM元素
    this.leftDiv = document.getElementById("leftDiv");
    this.hourHand = document.getElementById("hour");
    this.minuteHand = document.getElementById("minute");
    this.secondHand = document.getElementById("second");
    this.digihours = document.getElementById("digihours");
    this.digiminutes = document.getElementById("digiminutes");
    this.amPm = document.getElementById("amPm");
    this.digidate = document.getElementById("digidate");
    this.digitalClock = document.getElementById("digitalClock");
    this.analogClock = document.getElementById("analogClock");

    // 初始化时钟
    this.initializeClock();

    // 处理窗口大小变化
    window.addEventListener("resize", this.handleClockVisibility);

    // 监听时钟类型变化
    window.addEventListener('storage', this.handleStorageChange);
  },
  beforeUnmount() {
    // 移除事件监听器，避免内存泄漏
    window.removeEventListener("resize", this.handleClockVisibility);
    window.removeEventListener('storage', this.handleStorageChange);
  },
  methods: {
    // ---------------------- Clock func ----------------------
    initializeClock() {
      // 获取当前时间并计算初始角度
      this.updateClock();

      // 设置定时器更新时钟
      if (localStorage.getItem("clocktype") === "analog" || !localStorage.getItem("clocktype")) {
        // 模拟时钟每0.5秒更新一次
        setInterval(this.updateAnalogClock, 500);
        // 隐藏数字时钟
        this.digitalClock.style.display = "none";
        // 显示模拟时钟
        this.analogClock.style.display = "block";
      } else {
        // 数字时钟每秒更新一次
        setInterval(this.updateDigitalClock, 1000);
        // 隐藏模拟时钟
        this.analogClock.style.display = "none";
        // 显示数字时钟
        this.digitalClock.style.display = "block";
      }
    },
    updateClock() {
      // 获取当前时间
      const now = new Date();

      // 更新模拟时钟
      if (localStorage.getItem("clocktype") === "analog" || !localStorage.getItem("clocktype")) {
        this.updateAnalogClock(now);
      }

      // 更新数字时钟
      if (localStorage.getItem("clocktype") === "digital" || !localStorage.getItem("clocktype")) {
        this.updateDigitalClock(now);
      }
    },
    updateAnalogClock(now = new Date()) {
      // 计算指针角度
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours() % 12;

      // 计算旋转角度
      const secondDegrees = seconds * 6; // 每秒6度
      const minuteDegrees = minutes * 6 + seconds / 10; // 每分钟6度 + 秒的影响
      const hourDegrees = hours * 30 + minutes / 2; // 每小时30度 + 分钟的影响

      // 应用旋转
      this.secondHand.style.transform = `rotate(${secondDegrees}deg)`;
      this.minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
      this.hourHand.style.transform = `rotate(${hourDegrees}deg)`;

      // 更新日期
      this.updateDate();
    },
    updateDigitalClock(now = new Date()) {
      // 获取时间格式设置
      const hourFormatStored = localStorage.getItem("hourformat");
      let hourFormat = hourFormatStored === "true"; // 默认为false(24小时制)

      // 获取12/24小时制设置
      const is12HourFormat = hourFormat;

      // 获取当前时间
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      // 确定AM/PM
      const period = is12HourFormat ? (hours < 12 ? "AM" : "PM") : "";

      // 转换为12小时制
      if (is12HourFormat) {
        hours = hours % 12;
        hours = hours ? hours : 12; // 0点显示为12点
      }

      // 格式化时间显示
      this.digihours.textContent = hours.toString().padStart(2, '0');
      this.digiminutes.textContent = minutes.toString().padStart(2, '0');
      this.amPm.textContent = period;

      // 更新日期
      this.updateDate();
    },
    updateDate() {
      const now = new Date();
      const dayOfWeek = now.toLocaleDateString(undefined, { weekday: 'short' });
      const dayOfMonth = now.getDate();
      const month = now.toLocaleDateString(undefined, { month: 'short' });

      // 更新模拟时钟的日期
      if (localStorage.getItem("clocktype") === "analog" || !localStorage.getItem("clocktype")) {
        document.getElementById("date").innerText = `${dayOfWeek} ${dayOfMonth} ${month}`;
      }

      // 更新数字时钟的日期
      if (localStorage.getItem("clocktype") === "digital" || !localStorage.getItem("clocktype")) {
        this.digidate.textContent = `${dayOfWeek} ${dayOfMonth} ${month}`;
      }
    },
    handleClockVisibility() {
      // 这个函数可以根据窗口大小调整时钟显示
      // 目前保留为空，因为主要功能已在initializeClock中实现
    },
    handleStorageChange(event) {
      if (event.key === 'clocktype') {
        // 时钟类型改变时重新初始化
        this.initializeClock();
      }
    },
    // 处理开关变化事件
    handleSwitchChange(event) {
      // 根据开关状态设置时钟类型
      const isDigital = event.target.checked;
      if (isDigital) {
        // 切换为数字时钟
        localStorage.setItem("clocktype", "digital");
      } else {
        // 切换为模拟时钟
        localStorage.setItem("clocktype", "analog");
      }
      // 重新初始化时钟
      this.initializeClock();
    },
    toggleClockType() {
      // 切换时钟类型
      const isDigital = localStorage.getItem("clocktype") === "digital";
      localStorage.setItem("clocktype", isDigital ? "analog" : "digital");
      // 重新初始化时钟
      this.initializeClock();
    }
  }
};
</script>

<style lang="less" scoped>
#leftDiv {
  // Main container styles
  width: 300px;
  height: 300px;

  // Switch element
  .mdui-switch {
    // Switch styling here
  }

  // Analog clock styles
  #analogClock {
    width: 300px;
    height: 300px;
    border-radius: 100%;
    position: relative;

    svg {
      position: absolute;
      animation: clockAnm 1s;

      path.bgLightTint {
        fill: rgb(var(--mdui-color-secondary-container));
      }
    }

    .centerPoint {
      width: 20px;
      height: 20px;
      position: absolute;
      inset: 0;
      margin: auto;

      .sui {
        position: absolute;
        width: 20px;
        height: 100px;
        background-color: rgb(var(--mdui-color-primary));
        top: -90px;
        transform-origin: bottom;
        border-radius: 10px;

        &::after {
          content: "";
          position: absolute;
          width: 20px;
          height: 30px;
          background-color: rgb(var(--mdui-color-primary));
          bottom: -10px;
          border-radius: 100px;
        }
      }

      #hour {
        height: 80px;
        top: -70px;
        background-color: rgb(var(--mdui-color-primary));
        transform: rotate(90deg);
        transition: transform 1.5s;
      }

      #minute {
        z-index: 9 !important;
        transition: transform 1.5s;
      }

      #second {
        background-color: #00000000;
        transition: transform 1s;

        &::after {
          content: "";
          position: absolute;
          width: 20px;
          height: 20px;
          background-color: rgb(var(--mdui-color-primary));
          top: -28px;
          border-radius: 100%;
        }
      }
    }
  }

  // Digital clock styles
  #digitalClock {
    width: 300px;
    height: 300px;
    border-radius: 100%;
    position: relative;

    svg {
      height: 100%;
      // viewBox="60 0 460 450";
      width: 100%;

      rect.bgLightTint {
        height: 350;
        rx: 180;
        width: 460;
        x: 60;
        y: 40;
        fill: rgb(var(--mdui-color-secondary-container));
      }

      text.digidate {
        x: 290;
        y: 120;
        text-anchor: middle;
        fill: rgb(var(--mdui-color-primary));
        font-size: 28px;
        font-family: Arial;
      }

      text.digiclock {
        x: 290;
        y: 260;
        font-family: Arial;
        font-size: 8rem;
        fill: rgb(var(--mdui-color-primary));
        text-anchor: middle;

        tspan#digihours,
        tspan#digiminutes {
          fill: rgb(var(--mdui-color-primary));
        }

        tspan#digicolon {
          animation: blink 1s infinite;
        }
      }

      text.amPm {
        x: 290;
        y: 330;
        text-anchor: middle;
        fill: rgb(var(--mdui-color-primary));
        font-size: 28px;
        font-family: Arial;
      }
    }
  }

  #date {
    font-size: 1.36rem;
    // background-color: var(--bg-color-blue);
    padding: 3px 10px;
    width: fit-content;
    border-radius: 10px;
  }

}


@media screen and (max-width: 1200px) {
  .leftDiv {
    transform: translateX(0px);
    /* background-color: green; */
    margin: 30px 0;
  }
}

@media screen and (max-width: 1400px) {
  .leftDiv {
    transform: translateX(-50px);
  }
}

.leftDiv {
  /* padding-inline-end: 100px; */
  transform: translateX(-100px);
  /* background-color: rgba(102, 51, 153, 0.404); */
  /* height: fit-content; */
}

// Animations
@keyframes blink {
  50% {
    opacity: 0;
  }
}

@keyframes clockAnm {
  from {
    transform: rotate(40deg);
  }

  to {
    transform: rotate(0deg);
  }
}


@media screen and (max-width: 1200px) {
  .ttteexxtt {
    position: absolute;
    /* background-color: yellow; */
    height: fit-content;
    width: fit-content;
    bottom: 0;
    top: 0;
    inset-inline-start: 300px;
    margin-block: auto;
    margin-inline-start: var(--gap);
    margin-inline-end: auto;
  }
}

.ttteexxtt {
  position: relative;
  top: 1.6rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}
</style>

<!-- <style scoped lang="less">

.digiclock {
  text-anchor: middle;
  fill: rgb(var(--mdui-color-primary));
  font-size: 8rem;
  // font-weight: lighter;
  margin: auto;
  width: fit-content;
  direction: ltr;
  unicode-bidi: isolate;
}

#digicolon {
  animation: blink 1s infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

#digiminutes,
#digihours {
  fill: rgb(var(--mdui-color-primary));
}

.digidate {
  fill: rgb(var(--mdui-color-primary));
}

/* ____________Clock_____________________---- */
#digitalClock {
  width: 300px;
  height: 300px;
  border-radius: 100%;
  position: relative;
}

#analogClock {
  width: 300px;
  height: 300px;
  border-radius: 100%;
  position: relative;
}

#clock svg {
  position: absolute;
  animation: clockAnm 1s;

  // path {
  //   fill: rgb(var(--mdui-color-secondary-container));
  // }
}

.bgLightTint {
  fill: rgb(var(--mdui-color-secondary-container));
}

@keyframes clockAnm {
  from {
    transform: rotate(40deg);
  }

  to {
    transform: rotate(0deg);
  }
}

.clock .centerPoint {
  width: 20px;
  height: 20px;
  position: absolute;
  inset: 0;
  margin: auto;
}

.clock .centerPoint .sui {
  position: absolute;
  width: 20px;
  height: 100px;
  background-color: rgb(var(--mdui-color-primary));
  top: -90px;
  transform-origin: bottom;
  border-radius: 10px;
}

#hour {
  height: 80px;
  top: -70px;
  background-color: rgb(var(--mdui-color-primary));
  transform: rotate(90deg);
  transition: transform 1.5s;
}

#hour::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 30px;
  background-color: rgb(var(--mdui-color-primary));
  bottom: -10px;
  border-radius: 100px;
}

#minute {
  z-index: 9 !important;
  transition: transform 1.5s;
}

#minute::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 30px;
  background-color: rgb(var(--mdui-color-primary));
  bottom: -10px;
  border-radius: 100px;
}

#second {
  background-color: #00000000;
  transition: transform 1s;
}

#second::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: rgb(var(--mdui-color-primary));
  top: -28px;
  border-radius: 100%;
}
</style> -->

<!-- <style scoped lang="less">
@media screen and (max-width: 1200px) {
  .leftDiv {
    transform: translateX(0px);
    /* background-color: green; */
    margin: var(--gap) 0;
  }
}

@media screen and (max-width: 1400px) {
  .leftDiv {
    transform: translateX(-50px);
  }
}

.leftDiv {
  /* padding-inline-end: 100px; */
  transform: translateX(-100px);
  /* background-color: rgba(102, 51, 153, 0.404); */
  /* height: fit-content; */

  .clock {
    .centerPoint {
      width: 20px;
      height: 20px;
      position: absolute;
      inset: 0;
      margin: auto;


      #hour {
        height: 80px;
        top: -70px;
        background-color: rgb(var(--mdui-color-primary));
        transform: rotate(90deg);
        transition: transform 1.5s;
      }

      #hour::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 30px;
        background-color: rgb(var(--mdui-color-primary));
        bottom: -10px;
        border-radius: 100px;
      }

      #minute {
        z-index: 9 !important;
        transition: transform 1.5s;
      }

      #minute::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 30px;
        background-color: rgb(var(--mdui-color-primary));
        bottom: -10px;
        border-radius: 100px;
      }

      #second {
        background-color: #00000000;
        transition: transform 1s;
      }

      #second::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 20px;
        background-color: rgb(var(--mdui-color-primary));
        top: -28px;
        border-radius: 100%;
      }
    }
  }

  #analogClock {
    width: 300px;
    height: 300px;
    border-radius: 100%;
    position: relative;
  }

  #digitalClock {
    width: 300px;
    height: 300px;
    border-radius: 100%;
    position: relative;
  }
}

.bgLightTint {
  fill: rgb(var(--mdui-color-secondary-container));
  background-color: rgb(var(--mdui-color-secondary-container));
}

.digidate {
  fill: var(--textColorDark-blue);
}


.digiclock {
  text-anchor: middle;
  fill: var(--darkColor-blue);
  font-size: 8rem;
  font-weight: lighter;
  margin: auto;
  width: fit-content;
  direction: ltr;
  unicode-bidi: isolate;
}

#digihours {
  fill: var(--darkerColor-blue);
}

#digicolon {
  animation: blink 1s infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style> -->