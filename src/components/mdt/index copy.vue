<template>
    <div class="clock-container">
        <!-- 隐藏时钟的复选框（仅在大屏显示） -->
        <div v-if="screenWidth > 500" class="clock-toggle">
            <label>
                <input type="checkbox" v-model="isClockHidden" />
                隐藏时钟
            </label>
        </div>

        <!-- 模拟时钟 -->
        <div v-show="clocktype === 'analog' && !isClockHidden" id="analogClock" class="analog-clock">
            <!-- 这里你可以放模拟时钟的 DOM 结构，比如秒针、分针、时针 -->
            <div id="second" class="hand second-hand"></div>
            <div id="minute" class="hand minute-hand"></div>
            <div id="hour" class="hand hour-hand"></div>
        </div>

        <!-- 数字时钟 -->
        <div v-show="clocktype === 'digital' && !isClockHidden" id="digitalClock" class="digital-clock">
            <div id="date" class="date">{{ dateText }}</div>
            <div id="digitime" class="time">
                <span id="digihours">{{ digiHours }}</span>
                <span id="digicolon">:</span>
                <span id="digiminutes">{{ digiMinutes }}</span>
                <span id="amPm" v-if="is12HourFormat">{{ amPm }}</span>
            </div>
        </div>

        <!-- 问候语（仅数字时钟显示） -->
        <div v-if="clocktype === 'digital' && greetingEnabled" class="greeting">
            {{ greeting }}
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

// ====================== 响应式数据 ======================

// 是否隐藏时钟（用户设置）
const isClockHidden = ref(false);

// 当前屏幕宽度
const screenWidth = ref(window.innerWidth);

// 时钟类型：'analog' | 'digital'
const clocktype = ref('analog'); // 默认模拟时钟

// 是否启用问候语（硬编码为 true，不再从 localStorage 读取）
const greetingEnabled = ref(true);

// 是否使用 12 小时制（硬编码为 false，不再从 localStorage 读取）
const is12HourFormat = ref(false);

// 数字时钟显示内容
const dateText = ref('');
const digiHours = ref('00');
const digiMinutes = ref('00');
const amPm = ref('');

// 当前问候语
const greeting = ref('');

// 当前语言（硬编码为 'en'，不再从 localStorage 读取）
const currentLanguage = ref('en');

// ====================== 生命周期 & 事件监听 ======================

// 监听窗口大小变化
const handleResize = () => {
    screenWidth.value = window.innerWidth;
};

onMounted(() => {
    // 初始化时钟类型（仍然保留）
    loadClockType();

    // 初始化时钟显示（不再加载用户设置和语言）
    initializeClockDisplay();

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);

    // 监听页面可见性变化（节省资源）
    document.addEventListener('visibilitychange', handleVisibilityChange);
});

onBeforeUnmount(() => {
    // 清理事件监听器
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
});

// ====================== 方法：加载时钟类型（保留） ======================

function loadClockType() {
    const savedClockType = localStorage.getItem('clocktype');
    if (savedClockType) {
        clocktype.value = savedClockType;
    } else {
        clocktype.value = 'analog'; // 默认模拟时钟
        localStorage.setItem('clocktype', clocktype.value);
    }
}

// ====================== 移除以下函数（不再需要） ======================
// function loadUserSettings() { ... }
// function loadLanguage() { ... }

// ====================== 方法：保存用户设置（保留，但部分逻辑可能不再需要） ======================

function saveClockType() {
    localStorage.setItem('clocktype', clocktype.value);
}

function saveUserSettings() {
    localStorage.setItem('hideClockVisible', isClockHidden.value);
    localStorage.setItem('greetingEnabled', greetingEnabled.value);
    localStorage.setItem('hourformat', is12HourFormat.value);
}

function saveLanguage() {
    localStorage.setItem('selectedLanguage', currentLanguage.value);
}

// ====================== 方法：初始化时钟显示（不再调用 loadUserSettings 和 loadLanguage） ======================

function initializeClockDisplay() {
    updateDateText();
    if (clocktype.value === 'digital') {
        updateDigitalClock();
    } else {
        // 模拟时钟初始化角度
        updateAnalogClock();
    }

    // 如果当前不是小屏幕，应用隐藏状态
    if (screenWidth.value > 500) {
        applyClockState(isClockHidden.value);
    }
}

// ====================== 其他方法（保持不变） ======================

function updateDateText() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const dayOfMonth = now.getDate();
    const month = now.getMonth();

    dateText.value = `${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek]}, ${dayOfMonth} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month]}`;
}

function updateDigitalClock() {
    const now = new Date();

    let hours = now.getHours();
    if (is12HourFormat.value) {
        hours = hours % 12 || 12;
        amPm.value = hours < 12 ? 'AM' : 'PM';
    } else {
        amPm.value = '';
    }
    digiHours.value = hours.toString().padStart(2, '0');
    digiMinutes.value = now.getMinutes().toString().padStart(2, '0');

    updateGreeting();
}

function updateAnalogClock() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondDeg = seconds * 6;
    const minuteDeg = minutes * 6 + seconds / 10;
    const hourDeg = 30 * hours + minutes / 2;

    const secondEl = document.getElementById('second');
    if (secondEl) {
        secondEl.style.transform = `rotate(${secondDeg}deg)`;
    }

    const minuteEl = document.getElementById('minute');
    if (minuteEl) {
        minuteEl.style.transform = `rotate(${minuteDeg}deg)`;
    }

    const hourEl = document.getElementById('hour');
    if (hourEl) {
        hourEl.style.transform = `rotate(${hourDeg}deg)`;
    }
}

function updateGreeting() {
    const hour = new Date().getHours();
    let greetingKey;

    if (hour < 12) {
        greetingKey = 'morning';
    } else if (hour < 17) {
        greetingKey = 'afternoon';
    } else {
        greetingKey = 'evening';
    }

    const greetings = {
        morning: 'Good Morning',
        afternoon: 'Good Afternoon',
        evening: 'Good Evening'
    };
    greeting.value = greetings[greetingKey];
}

function applyClockState(isHidden) {
    console.log('Apply clock state:', isHidden ? 'hidden' : 'visible');
}

function handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
        if (clocktype.value === 'digital') {
            updateDigitalClock();
        } else {
            updateAnalogClock();
        }
    }
}

// ====================== 监听器（不再需要保存 language 相关设置） ======================

watch(isClockHidden, (newVal) => {
    saveUserSettings();
});

watch(greetingEnabled, (newVal) => {
    saveUserSettings();
});

watch(is12HourFormat, (newVal) => {
    saveUserSettings();
});

watch(clocktype, (newVal) => {
    saveClockType();
    initializeClockDisplay();
});
</script>

<style scoped lang="less">


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
  background-color: rgb(var(--mdui-color-secondary));
  top: -90px;
  transform-origin: bottom;
  border-radius: 10px;
}

#hour {
  height: 80px;
  top: -70px;
  background-color: rgb(var(--mdui-color-secondary));
  transform: rotate(90deg);
  transition: transform 1.5s;
}

#hour::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 30px;
  background-color: rgb(var(--mdui-color-secondary));
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
  background-color: rgb(var(--mdui-color-secondary));
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
  background-color: rgb(var(--mdui-color-secondary));
  top: -28px;
  border-radius: 100%;
}
</style>