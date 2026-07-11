<template>
  <div
    class="user-avatar-with-menu"
    :class="`user-avatar-with-menu--${menuAlign}`"
    @mouseenter="visible = true"
    @mouseleave="visible = false"
  >
    <UserAvatar :count="count" />
    <div v-show="visible" class="user-avatar-with-menu__popup">
      <UserMenu :tail-align="menuAlign" @logout="handleLogout" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  count: { type: Number, default: 0 },
  menuAlign: { type: String, default: 'right' }
})

const emit = defineEmits(['logout'])
const visible = ref(false)

function handleLogout() {
  visible.value = false
  emit('logout')
}
</script>

<style scoped>
.user-avatar-with-menu {
  @apply relative flex items-center h-full cursor-pointer;
}
.user-avatar-with-menu__popup {
  @apply absolute top-full z-[102] pt-2;
}
.user-avatar-with-menu--right .user-avatar-with-menu__popup {
  @apply right-0;
}
.user-avatar-with-menu--center .user-avatar-with-menu__popup {
  @apply left-1/2 -translate-x-1/2;
}
</style>
