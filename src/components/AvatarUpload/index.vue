<template>
  <div>
    <div class="preview" v-if="value">
      <div class="preview__img" v-viewer>
        <img :src="value" />
      </div>
      <div class="preview__actions">
        <a-icon type="eye" @click.stop="preview" />
        <a-icon type="delete" @click.stop="remove" />
      </div>
    </div>
    <a-upload
      v-else
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      :before-upload="beforeUpload"
      :custom-request="upload"
    >
      <a-icon :type="loading ? 'loading' : 'plus'" />
      <div class="ant-upload-text">点击上传</div>
    </a-upload>
  </div>
</template>

<script>
export default {
  name: "AvatarUpload",
  props: ["value"],
  data() {
    return {
      loading: false,
      file: null,
    };
  },
  methods: {
    beforeUpload(file) {
      const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.warning("只能上传 .jpg 或者 .png 类型的文件");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.warning("头像最大 2M");
        return false;
      }
      return true;
    },

    async upload({ file }) {
      this.loading = true;
      try {
        const fd = new FormData();
        fd.append("file", file);
        const res = await this.$http({ method: "POST", url: "/upload", data: fd });
        if (res.code !== 200) {
          this.$message.warning(res.message);
          return;
        }
        this.$emit("input", res.data);
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.loading = false;
      }
    },

    remove() {
      this.$emit("input", "");
    },

    preview() {
      const viewer = this.$el.querySelector(".preview__img").$viewer;
      viewer.show();
    },
  },
};
</script>

<style lang="less" scoped>
.preview {
  position: relative;
  width: 104px;
  height: 104px;
  margin: 0 8px 8px 0;
  position: relative;
  padding: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    .preview__img:after {
      opacity: 1;
    }

    .preview__actions {
      opacity: 1;
    }
  }

  &__img {
    position: relative;
    height: 100%;
    overflow: hidden;

    &:after {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.3s;
      opacity: 0;
      content: " ";
    }

    img {
      position: static;
      display: block;
      width: 100%;
      height: 100%;
      -o-object-fit: cover;
      object-fit: cover;
    }
  }

  &__actions {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10;
    white-space: nowrap;
    transform: translate(-50%, -50%);
    transition: all 0.3s;
    opacity: 0;

    i {
      color: #fff;
      font-size: 16px;
      margin: 0 4px;
    }
  }
}
</style>
