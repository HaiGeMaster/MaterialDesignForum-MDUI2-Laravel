<template>


  <div class="rightDiv" id="rightDiv">
    <!-- ---weather stuff--------- -->
    <div class="topDiv" id="hideWeather">
      <div class="lrectangle bgLightTint">
        <div id="conditionText">
          {{ data.conditionText }}
        </div>
        <div class="cconnt">
          <div class="humidityBar">
            <div class="thinLine"></div>
            <!-- <div class="slider" id="slider">
              <div id="humidityLevel">
                {{ data.humidityLevel }}
              </div>
            </div> -->

            <mdui-button class="slider" id="slider">
              <!-- <div id="humidityLevel"> -->
                {{ data.humidityLevel }}
              <!-- </div> -->
            </mdui-button>

            <mdui-button-icon variant="filled" class="afterIcon">
              <mdi-icon icon="mdi-invert-colors" />
            </mdui-button-icon>
          </div>

          <div class="tilesContainer">
            <!-- <div class="tiles">
              <div class="icon">
                <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path id="darkFeelsLikeIcon" class="accentColor"
                    d="M8 10.255V5C8 3.93913 8.42143 2.92172 9.17157 2.17157C9.92172 1.42143 10.9391 1 12 1C13.0609 1 14.0783 1.42143 14.8284 2.17157C15.5786 2.92172 16 3.93913 16 5V10.255C17.223 11.1066 18.1423 12.3262 18.6241 13.7365C19.1059 15.1467 19.125 16.6739 18.6788 18.0958C18.2325 19.5176 17.3441 20.76 16.1429 21.642C14.9416 22.524 13.4903 22.9996 12 22.9996C10.5097 22.9996 9.05837 22.524 7.85714 21.642C6.6559 20.76 5.7675 19.5176 5.32123 18.0958C4.87496 16.6739 4.89412 15.1467 5.37592 13.7365C5.85772 12.3262 6.77702 11.1066 8 10.255ZM8 16C8 17.0609 8.42143 18.0783 9.17157 18.8284C9.92172 19.5786 10.9391 20 12 20C13.0609 20 14.0783 19.5786 14.8284 18.8284C15.5786 18.0783 16 17.0609 16 16H8Z" />
                </svg>
              </div>
              <span id="feelsLike">
                {{ data.feelsLike }}
              </span>
            </div>
            <div class="tiles location">
              <div class="icon">
                <img src="./svgs/location.svg" alt="" />
              </div>
              <span class="location_spn" id="location">
                {{ data.location }}
              </span>
            </div> -->

            <mdui-button variant="elevated">
              {{ data.feelsLike }}
              <mdi-icon icon="mdi-weather-sunny" slot="icon" />
            </mdui-button>

            <mdui-button>
              {{ data.location }}
              <mdi-icon icon="mdi-map-marker-radius" slot="icon" />
            </mdui-button>
          </div>
        </div>
      </div>

      <!-- -----rAndakar-------- -->
      <div class="rAndakar">
        <svg fill="none" height="100%" viewBox="0 0 288 288" width="100%" xmlns="http://www.w3.org/2000/svg">
          <rect class="bgLightTint" fill="#E2EEFF" height="304.742" rx="123.401" transform="rotate(45 164.485 -51)"
            width="246.801" x="164.485" y="-51" />
        </svg>
        <div class="wInfo">
          <div id="temp">
            {{ data.currentTemp }}
          </div>
          <div id="wIcon">
            <!-- <i class="wIcon wi" :class="data.weatherIconIndex"></i> -->
            <i :class="`wIcon wi ${data.weatherIconIndex}`"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- ------end of weather stuff------------ -->

    <!-- ----------end of search with------------- -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      hideWeatherVisible: false,
      isFahrenheit: false,
      currentLanguage: 'en', // Assuming default language is English
      isRTL: false, // Assuming default is not RTL
      currentLanguage: 'en',
      translations: {
        en: {
          conditionText: 'Condition',
          humidityLevel: 'Humidity',
          location: 'Location',
          minMaxTemp: 'Min/Max Temp',
          feelsLike: 'Feels Like',
          GPSDisclaimer: 'GPS Disclaimer message'
        },
        // Add other languages as needed
      },
      data: {
        conditionText: "未知",
        humidityLevel: "湿度 --%",
        feelsLike: "体感温度 --°C",
        location: "未知位置",
        currentTemp: "--°C",
        weatherIconIndex: -1
      }
    };
  },
  created() {
    this.loadInitialState();
    if (!this.hideWeatherVisible) {
      this.getWeatherData();
    }
  },
  watch: {
    hideWeatherVisible(newValue) {
      localStorage.setItem("hideWeatherVisible", newValue);
      this.toggleInactiveState(newValue);
      if (!newValue) {
        this.getWeatherData();
      }
    },
    isFahrenheit(newValue) {
      localStorage.setItem("fahrenheitCheckboxState", newValue);
    }
  },
  methods: {
    loadInitialState() {
      const savedState = localStorage.getItem("hideWeatherVisible") === "true";
      this.hideWeatherVisible = savedState;

      const isFahrenheitSaved = localStorage.getItem("fahrenheitCheckboxState") === "true";
      this.isFahrenheit = isFahrenheitSaved;
    },
    toggleInactiveState(isInactive) {
      // Assuming you have a way to select elements to disable
      // For example, if you have a ref to the elements
      // this.$refs.weatherElements.forEach(element => {
      //   element.classList.toggle("inactive", isInactive);
      // });
      // For simplicity, we'll just log it here
      console.log('Toggle inactive state:', isInactive);
      elementsToDisable.forEach((element) => {
        element.classList.toggle("inactive", isInactive);
      });
    },
    async getWeatherData() {
      // 默认API密钥列表
      const weatherApiKeys = [
        "d36ce712613d4f21a6083436240910",
        "db0392b338114f208ee135134240312",
        "de5f7396db034fa2bf3140033240312",
        "c64591e716064800992140217240312",
        "9b3204c5201b4b4d8a2140330240312",
        "eb8a315c15214422b60140503240312",
        "cd148ebb1b784212b74140622240312",
        "7ae67e219af54df2840140801240312",
        "0a6bc8a404224c8d89953341241912",
        "f59e58d7735d4739ae953115241912",
        "17859d22a346495c988115334252703",
        "97cc2ef3bc4f45b3b0d120816252703",
        "51348f046e3f47ee99d120933252703",
        "ddbba7cc66044f96b43121046252703",
        "ab1b595515084775be2121201252703",
      ];
      const defaultApiKey = weatherApiKeys[Math.floor(Math.random() * weatherApiKeys.length)];

      // 确定使用哪个API密钥
      const savedApiKey = localStorage.getItem("weatherApiKey");
      const apiKey = savedApiKey || defaultApiKey;

      // 确定位置 - 使用保存的位置或默认值
      let currentUserLocation = localStorage.getItem("weatherLocation") || "auto:ip";

      // 获取天气数据
      try {
        // 检查是否有缓存的天气数据
        let parsedData = JSON.parse(localStorage.getItem("weatherParsedData"));
        const weatherParsedTime = parseInt(localStorage.getItem("weatherParsedTime"));
        const weatherParsedLocation = localStorage.getItem("weatherParsedLocation");
        const weatherParsedLang = localStorage.getItem("weatherParsedLang");

        const retentionTime = savedApiKey ? 435000 : 960000; // 7.25分钟(用户API)或16分钟(默认API)

        if (
          !parsedData ||
          Date.now() - weatherParsedTime > retentionTime ||
          weatherParsedLocation !== currentUserLocation ||
          weatherParsedLang !== this.currentLanguage
        ) {
          // 需要重新获取天气数据
          let weatherApi = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${currentUserLocation}&days=1&aqi=no&alerts=no&lang=zh`; // 使用中文

          let data = await fetch(weatherApi);
          parsedData = await data.json();

          if (!parsedData.error) {
            // 只提取我们需要的数据
            parsedData = {
              location: {
                name: parsedData.location.name,
              },
              current: {
                condition: {
                  text: parsedData.current.condition.text,
                  icon: parsedData.current.condition.icon,
                },
                temp_c: parsedData.current.temp_c,
                feelslike_c: parsedData.current.feelslike_c,
                humidity: parsedData.current.humidity,
              },
            };

            // 保存过滤后的天气数据
            localStorage.setItem("weatherParsedData", JSON.stringify(parsedData));
            localStorage.setItem("weatherParsedTime", Date.now());
            localStorage.setItem("weatherParsedLocation", currentUserLocation);
            localStorage.setItem("weatherParsedLang", "zh"); // 设置为中文
          }
        }

        // 确保parsedData存在且有current属性
        if (!parsedData || !parsedData.current) {
          throw new Error("无效的天气数据结构");
        }

        // 完整的天气图标代码到Weather Icons类的映射 (包含所有图标)
        const weatherIconMappings = {
          // Day icons
          113: "wi-day-sunny", // 晴
          116: "wi-day-cloudy", // 局部多云
          119: "wi-cloudy", // 多云
          122: "wi-cloudy", // 阴
          143: "wi-fog", // 薄雾
          176: "wi-day-rain", // 零星小雨
          179: "wi-day-snow", // 零星小雪
          182: "wi-day-sleet", // 零星雨夹雪
          185: "wi-day-sleet", // 零星冻雨
          200: "wi-day-thunderstorm", // 雷暴
          227: "wi-snow-wind", // 吹雪
          230: "wi-snow-wind", // 暴风雪
          248: "wi-fog", // 雾
          260: "wi-fog", // 冻雾
          263: "wi-sprinkle", // 零星小雨
          266: "wi-sprinkle", // 小雨
          281: "wi-rain-mix", // 冻雨
          284: "wi-rain-mix", // 大冻雨
          293: "wi-day-showers", // 零星小阵雨
          296: "wi-day-showers", // 小阵雨
          299: "wi-day-rain", // 有时中雨
          302: "wi-rain", // 中雨
          305: "wi-rain", // 有时大雨
          308: "wi-rain", // 大雨
          311: "wi-rain-mix", // 零星小冻雨
          314: "wi-rain-mix", // 中到大冻雨
          317: "wi-sleet", // 小雨夹雪
          320: "wi-sleet", // 中到大雨夹雪
          323: "wi-day-snow", // 零星小雪
          326: "wi-snow", // 小雪
          329: "wi-snow", // 零星中雪
          332: "wi-snow", // 中雪
          335: "wi-snow", // 零星大雪
          338: "wi-snow", // 大雪
          350: "wi-hail", // 冰雹
          353: "wi-day-showers", // 小雨阵雨
          356: "wi-showers", // 中到大雨阵雨
          359: "wi-rain", // 暴雨阵雨
          362: "wi-sleet", // 小雨夹雪阵雨
          365: "wi-sleet", // 中到大雨夹雪阵雨
          368: "wi-snow", // 小雪阵雨
          371: "wi-snow", // 中到大雪阵雨
          374: "wi-hail", // 小冰雹阵雨
          377: "wi-hail", // 中到大冰雹阵雨
          386: "wi-day-thunderstorm", // 零星雷雨阵雨
          389: "wi-thunderstorm", // 中到大雷雨阵雨
          392: "wi-day-snow-thunderstorm", // 零星雷雪阵雨
          395: "wi-snow-thunderstorm", // 中到大雷雪阵雨

          // Night icons (with _n suffix)
          "113_n": "wi-night-clear", // 晴朗
          "116_n": "wi-night-alt-cloudy", // 局部多云
          "119_n": "wi-night-alt-cloudy", // 多云
          "122_n": "wi-night-alt-cloudy", // 阴
          "143_n": "wi-night-fog", // 薄雾
          "176_n": "wi-night-alt-rain", // 零星小雨
          "179_n": "wi-night-alt-snow", // 零星小雪
          "182_n": "wi-night-alt-sleet", // 零星雨夹雪
          "185_n": "wi-night-alt-sleet", // 零星冻雨
          "200_n": "wi-night-alt-thunderstorm", // 雷暴
          "227_n": "wi-night-alt-snow-wind", // 吹雪
          "230_n": "wi-night-alt-snow-wind", // 暴风雪
          "248_n": "wi-night-fog", // 雾
          "260_n": "wi-night-fog", // 冻雾
          "263_n": "wi-night-sprinkle", // 零星小雨
          "266_n": "wi-night-sprinkle", // 小雨
          "281_n": "wi-night-rain-mix", // 冻雨
          "284_n": "wi-night-rain-mix", // 大冻雨
          "293_n": "wi-night-alt-showers", // 零星小阵雨
          "296_n": "wi-night-alt-showers", // 小阵雨
          "299_n": "wi-night-alt-rain", // 有时中雨
          "302_n": "wi-night-rain", // 中雨
          "305_n": "wi-night-rain", // 有时大雨
          "308_n": "wi-night-rain", // 大雨
          "311_n": "wi-night-rain-mix", // 零星小冻雨
          "314_n": "wi-night-rain-mix", // 中到大冻雨
          "317_n": "wi-night-sleet", // 小雨夹雪
          "320_n": "wi-night-sleet", // 中到大雨夹雪
          "323_n": "wi-night-alt-snow", // 零星小雪
          "326_n": "wi-night-snow", // 小雪
          "329_n": "wi-night-alt-snow", // 零星中雪
          "332_n": "wi-night-snow", // 中雪
          "335_n": "wi-night-alt-snow", // 零星大雪
          "338_n": "wi-night-snow", // 大雪
          "350_n": "wi-night-hail", // 冰雹
          "353_n": "wi-night-alt-showers", // 小雨阵雨
          "356_n": "wi-night-alt-showers", // 中到大雨阵雨
          "359_n": "wi-night-rain", // 暴雨阵雨
          "362_n": "wi-night-sleet", // 小雨夹雪阵雨
          "365_n": "wi-night-sleet", // 中到大雨夹雪阵雨
          "368_n": "wi-night-snow", // 小雪阵雨
          "371_n": "wi-night-snow", // 中到大雪阵雨
          "374_n": "wi-night-hail", // 小冰雹阵雨
          "377_n": "wi-night-hail", // 中到大冰雹阵雨
          "386_n": "wi-night-alt-thunderstorm", // 零星雷雨阵雨
          "389_n": "wi-night-thunderstorm", // 中到大雷雨阵雨
          "392_n": "wi-night-alt-snow-thunderstorm", // 零星雷雪阵雨
          "395_n": "wi-night-snow-thunderstorm", // 中到大雷雪阵雨
        };

        // 从解析的数据中提取我们需要的信息
        const conditionText = parsedData.current.condition.text; // 天气状况文本(已设置为中文)

        // 简单格式化数字
        const formatNumber = (num) => Math.round(num).toString();
        const humidity = parsedData.current.humidity;
        const tempCelsius = formatNumber(parsedData.current.temp_c);
        const feelsLikeCelsius = formatNumber(parsedData.current.feelslike_c);

        // 确定天气图标索引
        const weatherApiIcon = parsedData.current.condition.icon;
        const conditionCode = weatherApiIcon.split("/").pop().replace(".png", "");
        const isNight = weatherApiIcon.includes("night");
        const weatherIconKey = isNight ? `${conditionCode}_n` : conditionCode;

        // 获取对应的Weather Icons类
        const weatherIconClass = weatherIconMappings[weatherIconKey] || "wi-na";

        // 为了返回图标索引，我们需要创建一个反向映射表
        // 但由于图标键可能是字符串(如"113_n")，我们需要处理这种情况
        // 创建一个从图标类到索引的映射
        const iconClassToIndexMap = {};
        for (const [key, value] of Object.entries(weatherIconMappings)) {
          // 提取数字部分作为索引
          let index;
          if (key.endsWith("_n")) {
            // 对于夜间图标，去掉_n后缀并转换为数字
            index = parseInt(key.replace("_n", ""));
          } else {
            // 对于日间图标，直接转换为数字
            index = parseInt(key);
          }
          iconClassToIndexMap[value] = index;
        }

        // 现在可以通过图标类名查找索引
        // const weatherIconIndex = iconClassToIndexMap[weatherIconClass] !== undefined ? iconClassToIndexMap[weatherIconClass] : -1;

        
        const slider = document.getElementById("slider");
        if (humidity > 40) {
          slider.style.width = `calc(${humidity}% - 60px)`;
        }
        // 返回所需的数据，全部使用中文
        this.data = {
          conditionText: conditionText, // 天气状况文本(已为中文)
          humidityLevel: `湿度 ${humidity}%`, // 湿度
          feelsLike: `体感温度 ${feelsLikeCelsius}°C`, // 体感温度
          location: parsedData.location.name, // 位置
          currentTemp: `${tempCelsius}°C`, // 当前温度
          weatherIconIndex: weatherIconClass // 天气图标索引
        };
        this.$forceUpdate()
      } catch (error) {
        console.error("获取天气数据出错:", error);
        // 返回默认值以防出错
        this.data = {
          conditionText: "未知",
          humidityLevel: "湿度 --%",
          feelsLike: "体感温度 --°C",
          location: "未知位置",
          currentTemp: "--°C",
          weatherIconIndex: -1
        };
        this.$forceUpdate()
      }
    }
  }
};
</script>

<style scoped lang="less">
@media screen and (max-width: 720px) {
  .rightDiv {
    scale: 0.75;
  }
}

@media screen and (max-width: 1200px) {
  .rightDiv {
    transform: translateX(0px);
    /* background-color: rgba(0, 0, 255, 0.159); */
  }
}

@media screen and (max-width: 1400px) {
  .rightDiv {
    transform: translateX(50px);
  }
}



.rightDiv {
  position: relative;
  width: 640px;
  transform: translateX(100px);

  .topDiv {
    height: 196px;
    display: flex;
    justify-content: flex-end;

    .rAndakar {
      position: relative;
      height: 100%;
      aspect-ratio: 1 / 1;
      margin-inline-start: 30px; //var(--gap);

      /* animation: rAndAnm 1s; */
      /* transition: rotate 1s; */
      .wInfo {
        position: absolute;
        inset: 0;
        margin: auto;
        transform: translateX(14px);
        width: 100px;
        height: 80%;
      }
    }

    .lrectangle {
      height: 100%;
      width: 100%;
      border-radius: 30px;
      padding: 20px;
      position: relative;

      .cconnt {
        width: calc(100% - 40px);
        bottom: 20px;
        height: fit-content;
        position: absolute;
        font-size: 1rem;

        .humidityBar {
          border-radius: 20px;
          height: 40px;
          width: 100%;
          margin-bottom: 20px;
          position: relative;

          .thinLine {
            position: absolute;
            width: calc(100% - 60px);
            // background-color: rgb(var(--mdui-color-primary));
            background-color: white;
            .mdui-theme-dark & {
              background-color: black;
            }
            height: 6px;
            border-radius: 10px;
            top: 0;
            bottom: 0;
            margin: auto;
          }

          .afterIcon {
            right: 0;
            position: absolute;
            // content: "";
            // height: 100%;
            // width: 40px;
            // background-color: var(--darkColor-blue);
            // background-image: url(./svgs/humidity.svg);
            // background-repeat: no-repeat;
            // background-position: center;
            // background-size: 66%;
            // inset-inline-end: 0;
            // border-radius: 100%;
        }

          .slider {
            height: 100%;
            width: calc(10% - 60px);
            min-width: 42%;
            background-color: rgb(var(--mdui-color-primary));
            border-radius: 100px;
            position: absolute;
            transition: width 1s;

          }
        }

        .tilesContainer {
          height: 50px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;

          .tiles {
            background-color: rgb(var(--mdui-color-primary));
            border-radius: 22px;
            position: relative;
            height: 50px;

            span {
              position: absolute;
              top: 0;
              inset-inline-start: 46px;
              bottom: 0;
              margin: auto;
              // color: var(--textColorDark-blue);
              height: fit-content;
            }
          }

          .location {
            background-color: rgb(var(--mdui-color-primary));
          }
        }
      }
    }
  }
}

#conditionText {
  font-size: 1.2rem;
  color: rgb(var(--mdui-color-primary));
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 372px;
}

.bgLightTint {
  fill: rgb(var(--mdui-color-secondary-container));
  background-color: rgb(var(--mdui-color-secondary-container));
}

#humidityLevel {
  // color: rgb(var(--mdui-color-primary));
  width: fit-content;
  position: absolute;
  bottom: 0;
  top: 0;
  margin: auto;
  inset-inline-start: 20px;
  height: fit-content;
}

#temp {
  font-size: 3.5rem;
  font-weight: bold;
  color: rgb(var(--mdui-color-primary));
  margin: auto;
  width: fit-content;
}

.tempUnit {
  font-size: 0.4em;
  position: relative;
  top: -1.1em;
  inset-inline-start: 3px;
  color: rgb(var(--mdui-color-primary));
}

#wIcon {
  width: 80px;
  height: 80px;
  margin-top: -11px;
  margin-inline-start: -30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wi {
  font-size: 2.5rem;
}
</style>