import { Component, Vue } from "vue-property-decorator"
import "./404.less"

@Component
export default class extends Vue {
  private onGoBack(): void {
    this.$router.go(-1)
  }

  private onGoHome(): void {
    this.$router.push("admin/index")
  }

  protected render() {
    return (
      <div class="page-404">
        <div class="wrap">
          <p>
            <img src={require("@/assets/img/404.png")} />
          </p>
          <p class="text">抱歉！您访问的页面失联啦...</p>
          <p class="button">
            <el-button onClick={this.onGoBack}>返回上一页</el-button>
            <el-button type="primary" onClick={this.onGoHome}>
              进入首页
            </el-button>
          </p>
        </div>
      </div>
    )
  }
}
