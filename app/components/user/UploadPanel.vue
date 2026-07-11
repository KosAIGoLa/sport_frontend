<template>
  <div class="upload-panel">
    <div class="upload-panel__inner">
      <img class="upload-panel__mascot" src="/assets/ui/appointment-penguin.png" alt="penguin">
      <p class="upload-panel__text">
        上传视频，即代表您已同意
        <a href="javascript:;" class="upload-panel__link">企鹅视频服务条款</a>
        。请勿上传违法、色情类视频!单个视频上传文件最大不能超过4G，目前仅支持mp4、rmvb、avi、wav、flv格式的视频上传。上传成功后，平台存储期限为一年
      </p>
      <p class="upload-panel__subtext">单个视频上传文件最大不能超过4G，目前仅支持mp4、rmvb、avi、wav、flv格式的视频上传</p>
      <label class="upload-panel__btn">
        <input type="file" accept="video/*" @change="$emit('upload', $event)">
        上传视频
      </label>
      <div class="upload-panel__help">
        <a href="javascript:;">哪些视频是禁止发布的？</a>
        <a href="javascript:;">如何转码超清？</a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['upload'])
</script>
