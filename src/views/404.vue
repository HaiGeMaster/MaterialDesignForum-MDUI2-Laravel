<template>
  <div class="error-404-body">
    <div class="error-404-message">
      <span class="text404">
        🚀
        {{
          `${$t('Message.Client.PageNotFound.Page404')}`
        }}
      </span>
      <br />
      <mdui-button full-width variant="filled" 

      style="height: 52px;"
      @click="$router.push('/')">
        {{
          $t('Message.Client.PageNotFound.BackToHome')
        }}
      </mdui-button>
    </div>
  </div>
</template>
<style lang="less">
.error-404-body {
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 3s ease-in-out infinite;
  /* background-color: black; */
  /* 背景颜色为黑色 */
  /* color: rgba(255, 0, 0, 0.5); */
  /* 字体颜色为白色 */
  /* font-family: Arial, sans-serif; */
  /* 使用无衬线字体 */

  .text404 {
    font-size: 5em;
    font-weight: 900;
    opacity: 0.3;
  }
}

// .error-404-message {
//   font-size: 5em;
//   font-weight: 900;
//   opacity: 0.3;
// }


@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}
</style>