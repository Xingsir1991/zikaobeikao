<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { loadProgress, clearProgress, SUBJECTS, type ProgressMap } from '../progress'

const progress = ref<ProgressMap>({})

onMounted(() => {
  refresh()
})

function refresh() {
  progress.value = loadProgress()
}

// 按科目分组统计已掌握条目
const grouped = computed(() => {
  const all = progress.value
  return SUBJECTS.map(s => {
    const items = Object.entries(all)
      .filter(([path, item]) => item.mastered && path.startsWith(s.prefix))
      .map(([path, item]) => ({ path, ...item }))
      .sort((a, b) => b.ts - a.ts) // 最近的在前
    return { ...s, items, count: items.length }
  })
})

const totalCount = computed(() =>
  grouped.value.reduce((sum, g) => sum + g.count, 0),
)

function handleClear() {
  if (confirm(`确定要清空全部 ${totalCount.value} 条学习进度吗？此操作不可撤销。`)) {
    clearProgress()
    refresh()
  }
}
</script>

<template>
  <div class="progress-board">
    <!-- 汇总卡片 -->
    <div class="pb-summary">
      <div class="pb-summary-num">{{ totalCount }}</div>
      <div class="pb-summary-label">已掌握知识点</div>
    </div>

    <!-- 分科目展示 -->
    <div v-for="g in grouped" :key="g.key" class="pb-subject">
      <div class="pb-subject-head">
        <span class="pb-subject-icon">{{ g.icon }}</span>
        <span class="pb-subject-title">{{ g.title }}</span>
        <span class="pb-subject-count">{{ g.count }} 篇</span>
      </div>

      <ul v-if="g.items.length" class="pb-list">
        <li v-for="it in g.items" :key="it.path" class="pb-item">
          <a :href="it.path">{{ it.title }}</a>
          <span class="pb-time">{{ new Date(it.ts).toLocaleDateString() }}</span>
        </li>
      </ul>
      <p v-else class="pb-empty">还没有标记已掌握的内容，去学习页面点击「标记为已掌握」吧～</p>
    </div>

    <!-- 操作区 -->
    <div class="pb-actions">
      <button class="pb-btn" @click="refresh">🔄 刷新</button>
      <button class="pb-btn pb-btn-danger" :disabled="totalCount === 0" @click="handleClear">
        🗑️ 清空全部
      </button>
    </div>

    <p class="pb-tip">
      💡 数据保存在浏览器本地（localStorage），换浏览器/设备不会同步。
      建议定期截图或手动记录关键进度。
    </p>
  </div>
</template>

<style scoped>
.progress-board {
  margin: 16px 0;
}

.pb-summary {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  margin-bottom: 24px;
  border-radius: 12px;
  background: var(--vp-home-hero-name-background);
  color: var(--vp-home-hero-name-color);
}

.pb-summary-num {
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
}

.pb-summary-label {
  margin-top: 8px;
  font-size: 14px;
  opacity: 0.9;
}

.pb-subject {
  margin-bottom: 24px;
  padding: 16px 20px;
  border-radius: 8px;
  background: var(--vp-custom-block-details-bg);
  border: 1px solid var(--vp-custom-block-details-border);
}

.pb-subject-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.pb-subject-count {
  margin-left: auto;
  font-size: 13px;
  font-weight: 400;
  color: var(--vp-c-text-2);
  padding: 2px 10px;
  border-radius: 12px;
  background: var(--vp-c-default-soft);
}

.pb-list {
  list-style: none;
  padding: 0;
  margin: 12px 0 0;
}

.pb-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px dashed var(--vp-c-divider);
  font-size: 14px;
}

.pb-item:last-child {
  border-bottom: none;
}

.pb-item a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  flex: 1;
}

.pb-item a:hover {
  text-decoration: underline;
}

.pb-time {
  color: var(--vp-c-text-3);
  font-size: 12px;
  margin-left: 12px;
}

.pb-empty {
  margin: 12px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.pb-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.pb-btn {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid var(--vp-button-alt-border);
  background: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
  transition: all 0.2s ease;
}

.pb-btn:hover {
  background: var(--vp-button-alt-hover-bg);
}

.pb-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pb-btn-danger {
  border-color: var(--vp-button-danger-border, #dd2c2c);
  background: var(--vp-button-danger-bg, transparent);
  color: var(--vp-button-danger-text, #dd2c2c);
}

.pb-tip {
  margin-top: 16px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}
</style>
