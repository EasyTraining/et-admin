<template>
  <div>
    <a-form-model ref="form" :model="formData" :rules="formRules" :label-col="{ span: 5 }" :wrapper-col="{ span: 17 }">
      <a-card :body-style="{ padding: 0 }">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" tab="基本信息">
            <a-row :gutter="15">
              <a-col :span="12">
                <a-form-model-item label="文章标题" prop="title">
                  <a-textarea
                    v-model="formData.title"
                    :max-length="300"
                    :auto-size="{ minRows: 1, maxRows: 5 }"
                    placeholder="请填写文章标题"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item label="文章副标题" prop="sub_title">
                  <a-textarea
                    v-model="formData.sub_title"
                    :max-length="300"
                    :auto-size="{ minRows: 1, maxRows: 5 }"
                    placeholder="请填写文章副标题"
                  />
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row :gutter="15">
              <a-col :span="12">
                <a-form-model-item label="文章描述" prop="description">
                  <a-textarea
                    v-model="formData.description"
                    :max-length="300"
                    :auto-size="{ minRows: 1, maxRows: 5 }"
                    placeholder="请填写文章描述"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :span="12"></a-col>
            </a-row>
            <a-row :gutter="15">
              <a-col :span="12"></a-col>
              <a-col :span="12"></a-col>
            </a-row>
            <a-row :gutter="15">
              <a-col :span="12">
                <a-form-model-item label="文章作者" prop="author">
                  <a-input v-model="formData.author" :max-length="100" placeholder="请填写文章作者" />
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item label="文章来源" prop="from">
                  <a-input v-model="formData.from" :max-length="100" placeholder="请填写文章来源" />
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane key="2" tab="文章正文">
            <a-form-model-item label="文章内容" prop="content">
              <a-textarea
                v-model="formData.content"
                :max-length="300"
                :auto-size="{ minRows: 2, maxRows: 5 }"
                placeholder="请填写文章内容"
              />
            </a-form-model-item>
          </a-tab-pane>
          <a-tab-pane key="3" tab="高级属性"> Content of Tab Pane 2 </a-tab-pane>
        </a-tabs>
      </a-card>
    </a-form-model>
    <footer-tool-bar>
      <a-button :loading="submitting" type="primary" icon="save" @click="submit">保存</a-button>
    </footer-tool-bar>
  </div>
</template>

<script>
export default {
  name: "ArticleForm",
  data() {
    return {
      mounting: false,
      submitting: false,

      formData: {},
      formRules: {},
    };
  },
};
</script>
