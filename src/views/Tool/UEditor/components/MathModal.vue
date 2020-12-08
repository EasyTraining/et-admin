<template>
  <a-modal
    title="数学公式"
    :keyboard="false"
    :width="1200"
    centered
    :visible="visible"
    @ok="onOk"
    @cancel="onCancel"
    :body-style="{ padding: 0 }"
  >
    <div style="padding: 0 15px 15px">
      <a-tabs v-model="activeTab">
        <a-tab-pane key="TOOLS" tab="快捷工具">
          <div class="tools">
            <a-popover v-for="(tool, toolIdx) in tools" :key="toolIdx" placement="bottomLeft">
              <div class="tool">
                <div class="tool__icon">
                  <img :src="'/latex/' + tool.icon" />
                </div>
                <div class="tool__name">{{ tool.name }}</div>
                <div class="tool__down">
                  <a-icon type="caret-down" />
                </div>
              </div>
              <div class="popovers" slot="content">
                <div class="popover" v-for="(group, groupIdx) in tool.children" :key="groupIdx">
                  <div class="popover__hd">{{ group.name }}</div>
                  <div class="popover__bd">
                    <div
                      class="popover__tool"
                      v-for="(item, itemIdx) in group.children"
                      :key="itemIdx"
                      @click="insert(item.code)"
                    >
                      <img :src="'/latex/' + item.icon" :style="{ width: item.w + 'px' }" />
                    </div>
                  </div>
                </div>
              </div>
            </a-popover>
          </div>
        </a-tab-pane>
        <a-tab-pane key="TEMPLATES" tab="公式模板" force-render>
          <div class="tools">
            <a-popover v-for="(tool, toolIdx) in templates" :key="toolIdx" placement="bottomLeft">
              <div class="tool">
                <div class="tool__icon">
                  <img :src="'/latex/' + tool.icon" />
                </div>
                <div class="tool__name">{{ tool.name }}</div>
                <div class="tool__down">
                  <a-icon type="caret-down" />
                </div>
              </div>
              <div class="popovers" slot="content">
                <div class="popover" v-for="(group, groupIdx) in tool.children" :key="groupIdx">
                  <div class="popover__hd">{{ group.name }}</div>
                  <div class="popover__bd">
                    <div
                      class="popover__tool"
                      v-for="(item, itemIdx) in group.children"
                      :key="itemIdx"
                      @click="insert(item.code)"
                    >
                      <img :src="'/latex/' + item.icon" :style="{ width: item.w + 'px' }" />
                    </div>
                  </div>
                </div>
              </div>
            </a-popover>
          </div>
        </a-tab-pane>
      </a-tabs>
      <a-divider />
      <a-row :gutter="15">
        <a-col :span="17">
          <p>输入区域：</p>
          <a-textarea v-model="formula" :auto-size="{ minRows: 10, maxRows: 10 }" />
        </a-col>
        <a-col :span="7">
          <p>输出区域：</p>
          <span ref="mathJaxEl">{{ formula }}</span>
        </a-col>
      </a-row>
    </div>
  </a-modal>
</template>

<script>
import latex from "@/utils/latex";

export default {
  name: "MathModal",
  props: ["visible"],
  data() {
    return {
      tools: latex.TOOLS,
      templates: latex.TEMPLATES,

      activeTab: "TEMPLATES",
      formula: "x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.",
    };
  },
  watch: {
    formula() {
      this.renderMathJax();
    },
    visible(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.renderMathJax();
        });
      }
    },
  },
  mounted() {
    if (this.visible) {
      this.$nextTick(() => {
        this.renderMathJax();
      });
    }
  },
  methods: {
    renderContent() {
      this.$refs.mathJaxEl.innerHTML = `$$${this.formula}$$`;
    },

    renderMathJax() {
      this.renderContent();
      if (!window.MathJax) return;
      window.MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [
            ["$", "$"],
            ["(", ")"],
          ],
          displayMath: [
            ["$$", "$$"],
            ["[", "]"],
          ],
          processEscapes: true,
          processEnvironments: true,
        },
        displayAlign: "center",
        "HTML-CSS": {
          styles: { ".MathJax_Display": { margin: 0 } },
          linebreaks: { automatic: true },
        },
      });
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, this.$refs.mathJaxEl]);
    },

    insert(formula) {
      // TODO: 获取光标位置
      this.formula = formula;
    },

    onOk() {
      this.$emit("ok", this.formula);
    },

    onCancel() {
      this.$emit("cancel", null);
    },
  },
};
</script>

<style lang="less" scoped>
.tools {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;

  .tool {
    margin: 0 4px;
    padding: 8px 10px;
    background: #f8f9fa;
    cursor: pointer;

    &:hover {
      color: #2194c2;
    }

    &__icon {
      img {
        width: 100%;
      }
    }

    &__name {
      text-align: center;
      font-size: 12px;
    }

    &__down {
      text-align: center;
      font-size: 10px;
    }
  }
}

.popovers {
  width: 635px;
  max-height: 400px;
  overflow-y: auto;

  .popover {
    &__hd {
      margin-top: 10px;
      margin-bottom: 5px;
    }

    &__bd {
    }

    &__tool {
      background: #f8f9fa;
      padding: 7px 4px;
      margin: 4px;
      cursor: pointer;
      display: inline-block;

      img {
        width: 26px;
      }
    }
  }
}
</style>
