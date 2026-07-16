/**
 * 学习进度数据共享层
 *
 * 数据结构（存储在 localStorage）：
 *   key = 'study-progress'
 *   value = {
 *     "/chinese/xxx": { "title": "页面标题", "mastered": true, "ts": 1700000000000 },
 *     ...
 *   }
 *
 * 五个科目的路径前缀，用于在进度看板里分组统计。
 */

export const STORAGE_KEY = 'study-progress'

export interface ProgressItem {
  title: string
  mastered: boolean
  ts: number // 标记时间戳
}

export type ProgressMap = Record<string, ProgressItem>

// 科目分组配置（与 config.mts 保持一致）
export const SUBJECTS = [
  { key: 'chinese',    prefix: '/chinese/',    title: '大学语文',   icon: '📚' },
  { key: 'sixiu',      prefix: '/sixiu/',      title: '思修',       icon: '🔴' },
  { key: 'mayuan',     prefix: '/mayuan/',     title: '马原',       icon: '🟡' },
  { key: 'maozhongte', prefix: '/maozhongte/', title: '毛中特',     icon: '🔵' },
  { key: 'shigang',    prefix: '/shigang/',    title: '史纲',       icon: '🟢' },
] as const

/** 读取全部进度数据 */
export function loadProgress(): ProgressMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ProgressMap) : {}
  } catch {
    return {}
  }
}

/** 写入全部进度数据 */
export function saveProgress(map: ProgressMap): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
}

/** 切换某个路径的「已掌握」状态；取消时移除该条 */
export function toggleMastered(path: string, title: string): boolean {
  const map = loadProgress()
  const cur = map[path]
  if (cur?.mastered) {
    delete map[path]
    saveProgress(map)
    return false
  }
  map[path] = { title, mastered: true, ts: Date.now() }
  saveProgress(map)
  return true
}

/** 查询某个路径当前是否已掌握 */
export function isMastered(path: string): boolean {
  return !!loadProgress()[path]?.mastered
}

/** 清空全部进度（看板页提供入口） */
export function clearProgress(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_KEY)
}
