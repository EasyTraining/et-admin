<template>
  <div>
    <a-card :loading="loading" :body-style="{ padding: 0 }">
      <a-tabs v-model="activeTab" align="center">
        <a-tab-pane key="1" tab="基本信息" />
        <a-tab-pane key="2" tab="文章正文" />
        <a-tab-pane key="3" tab="高级属性" />
      </a-tabs>
      <a-form-model
        ref="form"
        :model="formData"
        :rules="formRules"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 10 }"
      >
        <template v-if="activeTab === '1'">
          <a-form-model-item label="所属分类" prop="category_id">
            <a-tree-select
              v-model="formData.category_id"
              :tree-data="treeData"
              :replace-fields="{ title: 'name', key: 'id', value: 'id' }"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              allow-clear
              tree-default-expand-all
              placeholder="请选择所属分类"
            />
          </a-form-model-item>
          <a-form-model-item label="文章标题" prop="title">
            <a-textarea
              v-model="formData.title"
              :max-length="300"
              :auto-size="{ minRows: 3, maxRows: 5 }"
              placeholder="请填写文章标题"
            />
          </a-form-model-item>
          <a-form-model-item label="文章副标题" prop="sub_title">
            <a-textarea
              v-model="formData.sub_title"
              :max-length="300"
              :auto-size="{ minRows: 3, maxRows: 5 }"
              placeholder="请填写文章副标题"
            />
          </a-form-model-item>
          <a-form-model-item label="文章描述" prop="description">
            <a-textarea
              v-model="formData.description"
              :max-length="300"
              :auto-size="{ minRows: 3, maxRows: 5 }"
              placeholder="请填写文章描述"
            />
          </a-form-model-item>
          <a-form-model-item label="启用状态" prop="enable">
            <a-switch
              v-model="formData.enable"
              checked-children="已启用"
              un-checked-children="已停用"
            />
          </a-form-model-item>
          <a-form-model-item label="文章排序" prop="sort" extra="值越小越靠前">
            <a-input-number
              v-model="formData.sort"
              style="width: 100%"
              placeholder="请填写文章排序"
            />
          </a-form-model-item>
          <a-form-model-item label="文章作者" prop="author">
            <a-input v-model="formData.author" placeholder="请填写文章作者" />
          </a-form-model-item>
          <a-form-model-item label="文章来源" prop="from">
            <a-input v-model="formData.from" placeholder="请填写文章来源" />
          </a-form-model-item>
          <a-form-model-item label="文章备注" prop="remark">
            <a-textarea
              v-model="formData.remark"
              :max-length="300"
              :auto-size="{ minRows: 3, maxRows: 5 }"
              placeholder="请填写文章备注"
            />
          </a-form-model-item>
        </template>
        <template v-if="activeTab === '2'">
          <div style="padding: 0 15px 15px">
            <rich-editor v-model="formData.content" :height="500" />
          </div>
        </template>
        <template v-if="activeTab === '3'">
          <a-form-model-item label="SEO 关键字" prop="meta_keyword">
            <a-textarea
              v-model="formData.meta_keyword"
              :max-length="300"
              :auto-size="{ minRows: 3, maxRows: 5 }"
              placeholder="请填写关键字"
            />
          </a-form-model-item>
          <a-form-model-item label="SEO 描述" prop="meta_description">
            <a-textarea
              v-model="formData.meta_description"
              :max-length="300"
              :auto-size="{ minRows: 3, maxRows: 5 }"
              placeholder="请填写文章描述"
            />
          </a-form-model-item>
          <a-form-model-item label="已读数" prop="read_count">
            <a-input-number
              v-model="formData.read_count"
              style="width: 100%"
              placeholder="请填写已读数"
            />
          </a-form-model-item>
        </template>
      </a-form-model>
    </a-card>
    <footer-tool-bar>
      <a-button :loading="submitting" @click="goBack">返回</a-button>
      <a-button :loading="submitting" type="primary" icon="save" @click="submit">保存</a-button>
    </footer-tool-bar>
  </div>
</template>

<script>
import { _ } from "@/utils";
import RichEditor from "@/components/RichEditor";
import { formRules } from "./const";

export default {
  name: "ArticleForm",
  components: { RichEditor },
  data() {
    return {
      loading: false,
      submitting: false,

      editedId: "",
      activeTab: "1",
      treeData: [],
      formData: {
        category_id: undefined,
        id: "",
        title: "",
        sub_title: "",
        description: "",
        enable: true,
        sort: 1,
        author: "",
        from: "",
        read_count: 1,
        remark: "",
        content: "",
        meta_keyword: "",
        meta_description: "",
      },
      formRules,

      ueConfig: {
        UEDITOR_HOME_URL: process.env.BASE_URL + "UEditor/",
        initialFrameHeight: 500,
        initialFrameWidth: "100%",
        enableAutoSave: false,
        // toolbars: [
        //   [
        //     "fullscreen",
        //     "source",
        //     "|",
        //     "undo",
        //     "redo",
        //     "|",
        //     "bold",
        //     "italic",
        //     "underline",
        //     "fontborder",
        //     "strikethrough",
        //     "superscript",
        //     "subscript",
        //     "removeformat",
        //     "formatmatch",
        //     "autotypeset",
        //     "blockquote",
        //     "pasteplain",
        //     "|",
        //     "forecolor",
        //     "backcolor",
        //     "insertorderedlist",
        //     "insertunorderedlist",
        //     "selectall",
        //     "cleardoc",
        //     "|",
        //     "rowspacingtop",
        //     "rowspacingbottom",
        //     "lineheight",
        //     "|",
        //     "customstyle",
        //     "paragraph",
        //     "fontfamily",
        //     "fontsize",
        //     "|",
        //     "directionalityltr",
        //     "directionalityrtl",
        //     "indent",
        //     "|",
        //     "justifyleft",
        //     "justifycenter",
        //     "justifyright",
        //     "justifyjustify",
        //     "|",
        //     "touppercase",
        //     "tolowercase",
        //     "|",
        //     "link",
        //     "unlink",
        //     "anchor",
        //     "|",
        //     "imagenone",
        //     "imageleft",
        //     "imageright",
        //     "imagecenter",
        //     "|",
        //     "simpleupload",
        //     "insertimage",
        //     "emotion",
        //     "scrawl",
        //     "insertvideo",
        //     "music",
        //     "attachment",
        //     "map",
        //     "gmap",
        //     "insertframe",
        //     "insertcode",
        //     "webapp",
        //     "pagebreak",
        //     "template",
        //     "background",
        //     "|",
        //     "horizontal",
        //     "date",
        //     "time",
        //     "spechars",
        //     "snapscreen",
        //     "wordimage",
        //     "|",
        //     "inserttable",
        //     "deletetable",
        //     "insertparagraphbeforetable",
        //     "insertrow",
        //     "deleterow",
        //     "insertcol",
        //     "deletecol",
        //     "mergecells",
        //     "mergeright",
        //     "mergedown",
        //     "splittocells",
        //     "splittorows",
        //     "splittocols",
        //     "charts",
        //     "|",
        //     "print",
        //     "preview",
        //     "searchreplace",
        //     "drafts",
        //     "help",
        //   ],
        // ],
      },
    };
  },
  async mounted() {
    const { id } = this.$route.params;
    this.editedId = id;
    await this.fetchTreeData();
    if (this.editedId) {
      await this.fetchDetail();
    }
  },
  methods: {
    async fetchDetail() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: `/cms/article/${this.editedId}` });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.formData = _.pick(res.data, Object.keys(this.formData));
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    async fetchTreeData() {
      this.loading = true;
      try {
        const res = await this.$http({ method: "GET", url: "/cms/search/category/tree" });
        if (res.code !== 200) {
          this.$message.error(res.message);
          return;
        }
        this.treeData = res.data || [];
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        this.loading = false;
      }
    },

    goBack() {
      this.$router.go(-1);
    },

    async submit() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        const fd = _.cloneDeep(this.formData);
        this.submitting = true;
        try {
          const res = this.editedId
            ? await this.$http({ method: "PUT", url: `/cms/article/${this.editedId}`, data: fd })
            : await this.$http({ method: "POST", url: "/cms/article", data: fd });
          if (res.code !== 200) {
            this.$message.error(res.message);
            return;
          }
          this.$message.success("操作成功");
          if (this.editedId) {
            await this.fetchDetail();
          } else {
            await this.$router.replace(`/cms/article/edit/${res.data.id}`);
          }
        } catch (e) {
          this.$message.error(e.message);
        } finally {
          this.submitting = false;
        }
      });
    },
  },
};
</script>
