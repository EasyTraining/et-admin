<template>
  <a-card>
    <editor
      api-key="mvouuuo4671tzjo42frb61bvi97f4a7zc9v2t8t3rg0v2wht"
      :init="{
        height: 500,
        menubar: false,
        plugins: ['charmap', 'table'],
        toolbar:
          'undo redo | bold italic underline strikethrough forecolor\
           | table media | charmap | removeformat',
      }"
    />
  </a-card>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

export default {
  name: "UEditor",
  components: { Editor },
  data() {
    return {};
  },
};
</script>
