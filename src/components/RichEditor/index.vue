<template>
  <div>
    <editor
      ref="editor"
      v-model="content"
      api-key="mvouuuo4671tzjo42frb61bvi97f4a7zc9v2t8t3rg0v2wht"
      :init="init"
      @onChange="onEditorChange"
    />

    <math-modal :visible="mathVisible" @cancel="mathVisible = false" @ok="insertMath" />
    <upload-modal :visible="uploadVisible" @cancel="uploadVisible = false" />
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import MathModal from "./components/MathModal";
import UploadModal from "./components/UploadModal";

export default {
  name: "UEditor",
  components: { Editor, MathModal, UploadModal },
  props: ["value", "placeholder", "height"],
  data() {
    return {
      content: "",
      init: {},
      mathVisible: false,
      uploadVisible: false,
    };
  },
  watch: {
    value(newVal) {
      this.content = newVal;
    },
  },
  created() {
    this.content = this.value;
    this.init = {
      language: "zh_CN",
      language_url: "/tinymce/langs/zh_CN.js",

      skin_url: "/tinymce/css",
      content_css: "/tinymce/css/rich.css",

      height: this.height || 120,
      inline: true,

      menubar: false,
      branding: false,
      statusbar: false,
      placeholder: this.placeholder,
      plugins: ["charmap", "table"],
      toolbar:
        "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify \
         | table media | charmap | insert-math | insert-image | removeformat",
      images_upload_handler: (blobInfo, success, failure) => {
        success("data:image/jpeg;base64," + blobInfo.base64());
      },
      setup: (editor) => {
        // editor.ui.registry.addButton("insert-math", {
        //   text: "数学公式",
        //   onAction: (_) => {
        //     this.mathVisible = true;
        //   },
        // });
        // editor.ui.registry.addButton("insert-image", {
        //   text: "插入图片",
        //   onAction: (_) => {
        //     this.uploadVisible = true;
        //   },
        // });
      },
    };
  },
  methods: {
    onEditorChange(val) {
      this.$emit("input", this.content);
    },

    insertMath(math) {
      console.log(math);
    },
  },
};
</script>
