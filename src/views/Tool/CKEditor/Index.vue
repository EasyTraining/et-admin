<template>
  <div>
    <ckeditor ref="editor" :editor="editor" v-model="editorData" :config="editorConfig" />
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// npm i --save @ckeditor/ckeditor5-build-classic @ckeditor/ckeditor5-vue2

// https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs-v2.html

// OCR:
// https://ckeditor.com/mathtype/demo/#ckeditor5
export default {
  name: "CKEditor",
  data() {
    return {
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        // The configuration of the editor.
      },
    };
  },
};
</script>
