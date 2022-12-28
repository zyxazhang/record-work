<template>
  <footer class="footer">
    <div class="n-f-ctr">
      <div class="left">
        <p class="tag">
          <span class="span1">2021~2022</span>
          <span class="span2" style="background-color: #1c74e9">小夸克</span>
        </p>
        <a class="tag" href="https://beian.miit.gov.cn" target="_blank">
          <span class="span1">TCP</span>
          <span class="span2" style="background-color: #ed7a3b">赣ICP备2022000299号</span>
        </a>
      </div>
      <div class="right"></div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'footer'
})
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 40px;
  background-color: #323233;

  .n-f-ctr {
    width: 1280px;
    height: 20px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding: 10px 0;
    font-size: 14px;

    .left {
      width: 50%;
      height: 20px;

      .tag {
        display: block;
        float: left;
        height: 20px;
        line-height: 20px;
        cursor: pointer;
        margin-right: 20px;

        .span1 {
          height: 18px;
          display: inline-block;
          padding: 0 4px;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          background-color: #5d5d5d;
          color: #fff;
        }

        .span2 {
          height: 18px;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          display: inline-block;
          padding: 0 4px;
          color: #fff;
        }
      }
    }

    .right {
      width: 50%;
      height: 20px;
    }
  }
}
</style>