<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useData } from 'vitepress'
import { toggleMastered, isMastered } from '../progress'

// 从 VitePress 拿到当前页面的相对路径和标题
const { page, theme } = useData()

const mastered = ref(false)
const pageTitle = ref('')

onMounted(() => {
  // page.relativePath 形如 "chinese/xxx.md"，转成站点路径
  const path = '/' + (page.value.relativePath || '').replace(/\.md$/, '').replace(/\/index$/, '/')
  // 优先用页面第一个 H1 / frontmatter.title，否则用相对路径
  pageTitle.value = (page.value.frontmatter?.title as string)
    || (theme.value.title as string)
    || path
  mastered.value = isMastered(path)
})

function handleToggle() {
  const path = '/' + (page.value.relativePath || '').replace(/\.md$/, '').replace(/\/index$/, '/')
  mastered.value = toggleMastered(path, pageTitle.value || path)
}
</script>

<template>
  <div class="mark-read">
    <button
      class="mr-btn"
      :class="{ 'is-mastered': mastered }"
      @click="handleToggle"
    >
      <span class="mr-icon">{{ mastered ? '✅' : '⚪' }}</span>
      <span>{{ mastered ? '已掌握（点击取消）' : '标记为已掌握' }}</span>
    </button>
  </div>
</template>

<style scoped>
.mark-read {
  margin: 24px 0;
  padding: 16px 20px;
  border-radius: 8px;
  background: var(--vp-custom-block-details-bg);
  border: 1px solid var(--vp-custom-block-details-border);
}

.mr-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid var(--vp-button-brand-border);
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
  transition: all 0.2s ease;
}

.mr-btn:hover {
  background: var(--vp-button-brand-hover-bg);
}

.mr-btn.is-mastered {
  border-color: var(--vp-button-alt-border);
  background: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
}

.mr-icon {
  font-size: 16px;
}
</style>
