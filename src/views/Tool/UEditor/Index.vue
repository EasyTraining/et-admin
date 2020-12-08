<template>
  <div>
    <a-card>
      <editor
        ref="editor"
        api-key="mvouuuo4671tzjo42frb61bvi97f4a7zc9v2t8t3rg0v2wht"
        :init="init"
      />
    </a-card>

    <math-modal :visible="mathVisible" @cancel="mathVisible = false" />
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import MathModal from "./components/MathModal";

export default {
  name: "UEditor",
  components: { Editor, MathModal },
  data() {
    return {
      init: {},

      mathVisible: true,
    };
  },
  created() {
    this.init = {
      height: 500,
      menubar: false,
      plugins: ["charmap", "table"],
      toolbar:
        "undo redo | bold italic underline strikethrough forecolor\
         | table media | charmap | insert-math | removeformat",
      setup: (editor) => {
        editor.ui.registry.addButton("insert-math", {
          text: "数学公式",
          onAction: (_) => {
            this.mathVisible = true;
          },
        });
      },
    };
  },
  methods: {},
};
</script>
