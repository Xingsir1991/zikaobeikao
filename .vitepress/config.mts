import { defineConfig } from 'vitepress'

// 六个公共课科目的统一配置，按课程代码升序排列（专本一起考）
// title 用简称（导航/侧边栏），全称写在各科目 index.md 的 H1 里
const subjects = [
  { key: 'chinese',     dir: '/chinese/',     title: '04729 大学语文',  icon: '📚', desc: '古代文学、现代文阅读、写作' },
  { key: 'xigai',       dir: '/xigai/',       title: '15040 习概',      icon: '🟣', desc: '习近平新时代中国特色社会主义思想概论（专本共考）' },
  { key: 'maozhongte',  dir: '/maozhongte/',  title: '15041 毛中特',    icon: '🔵', desc: '毛泽东思想和中国特色社会主义理论体系概论（专科）' },
  { key: 'sixiu',       dir: '/sixiu/',       title: '15042 思修',      icon: '🔴', desc: '思想道德与法治（专科）' },
  { key: 'shigang',     dir: '/shigang/',     title: '15043 史纲',      icon: '🟢', desc: '中国近现代史纲要（本科）' },
  { key: 'mayuan',      dir: '/mayuan/',      title: '15044 马原',      icon: '🟡', desc: '马克思主义基本原理（本科）' },
]

export default defineConfig({
  title: '备考笔记',
  description: '大学语文与思政公共课备考资料',

  // 部署到 GitHub Pages（用户名.github.io/仓库名/），base 必须为 '/仓库名/'
  base: '/zikaobeikao/',

  // URL 去掉 .html 后缀，更干净
  cleanUrls: true,

  // 模板目录仅作为参考文件，不参与构建
  srcExclude: ['**/templates/**'],

  // 展示页面最后更新时间
  lastUpdated: true,

  head: [
    ['meta', { name: 'theme-color', content: '#3c8772' }],
  ],

  themeConfig: {
    // 顶部导航
    nav: [
      ...subjects.map(s => ({ text: `${s.icon} ${s.title.split('（')[0]}`, link: s.dir })),
      { text: '🎓 学习方法', link: '/guide' },
      { text: '✍️ 默写模式', link: '/self-test' },
      { text: '📊 进度看板', link: '/progress' },
    ],

    // 侧边栏：每个科目目录下独立展示该科目的内容
    sidebar: {
      '/chinese/':    chineseSidebar(),
      '/xigai/':      xigaiSidebar(),
      '/sixiu/':      sidebarGroup('sixiu'),
      '/mayuan/':     sidebarGroup('mayuan'),
      '/maozhongte/': sidebarGroup('maozhongte'),
      '/shigang/':    sidebarGroup('shigang'),
    },

    // 右侧大纲：展示 H2 / H3
    outline: {
      level: [2, 3],
      label: '本页目录',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    lastUpdatedText: '最后更新',

    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',

    // 本地全文搜索（miniSearch，支持中文）
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索笔记',
            buttonAriaLabel: '搜索笔记',
          },
          modal: {
            noResultsText: '没有找到相关结果',
            resetButtonTitle: '清除查询',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Xingsir1991/zikaobeikao' },
    ],
  },
})

// 生成单个科目的侧边栏分组（非 chinese 科目）
// 思修（15042）已建六章目录结构；其他科目仅有 index.md
function sidebarGroup(key: string) {
  const s = subjects.find(x => x.key === key)!
  const items: any[] = [{ text: '首页', link: `${s.dir}` }]

  // 思修 15042 六章目录（link 必须与 sixiu/ 下实际文件夹名逐字一致）
  if (key === 'sixiu') {
    items.push(
      { text: '绪论 担当复兴大任 成就时代新人', link: '/sixiu/绪论-担当复兴大任成就时代新人/' },
      { text: '第一章 领悟人生真谛 把握人生方向', link: '/sixiu/第一章-领悟人生真谛/' },
      { text: '第二章 追求远大理想 坚定崇高信念', link: '/sixiu/第二章-追求远大理想坚定崇高信念/' },
      { text: '第三章 继承优良传统 弘扬中国精神', link: '/sixiu/第三章-继承优良传统弘扬中国精神/' },
      { text: '第四章 明确价值要求 践行价值准则', link: '/sixiu/第四章-明确价值要求践行价值准则/' },
      { text: '第五章 遵守道德规范 锤炼道德品格', link: '/sixiu/第五章-道德观/' },
      { text: '第六章 学习法治思想 提升法治素养', link: '/sixiu/第六章-法治观/' },
    )
  }

  return [
    {
      text: `${s.icon} ${s.title}`,
      collapsed: false,
      items,
    },
  ]
}

// 大学语文按文体分组的侧边栏
// 新增文章时，归入对应文体分组即可

// 习概（15040）按"章→节"两层嵌套的侧边栏
// 新增章节时：在对应章分组内补一行叶子项即可
function xigaiSidebar() {
  return [
    {
      text: '🟣 15040 习概',
      collapsed: false,
      items: [
        { text: '首页', link: '/xigai/' },

        // 第一章（已建笔记）
        {
          text: '第一章 新时代坚持和发展中国特色社会主义',
          collapsed: false,
          items: [
            { text: '章节导读', link: '/xigai/ch01/' },
            { text: '第一节 方向决定道路，道路决定命运', link: '/xigai/ch01/第一节-方向决定道路道路决定命运' },
            { text: '第二节 中国特色社会主义进入新时代', link: '/xigai/ch01/第二节-中国特色社会主义进入新时代' },
            { text: '第三节 新时代坚持和发展中国特色社会主义要一以贯之', link: '/xigai/ch01/第三节-新时代坚持和发展中国特色社会主义要一以贯之' },
          ],
        },

        // 第二章（已建笔记）
        {
          text: '第二章 以中国式现代化全面推进中华民族伟大复兴',
          collapsed: false,
          items: [
            { text: '章节导读', link: '/xigai/ch02/' },
            { text: '第一节 中华民族近代以来最伟大的梦想', link: '/xigai/ch02/第一节-中华民族近代以来最伟大的梦想' },
            { text: '第二节 中国式现代化是强国建设、民族复兴的唯一正确道路', link: '/xigai/ch02/第二节-中国式现代化是强国建设民族复兴的唯一正确道路' },
            { text: '第三节 推进中国式现代化行稳致远', link: '/xigai/ch02/第三节-推进中国式现代化行稳致远' },
          ],
        },

        // 第三章（已建笔记）
        {
          text: '第三章 坚持党的全面领导',
          collapsed: false,
          items: [
            { text: '章节导读', link: '/xigai/ch03/' },
            { text: '第一节 中国共产党领导是中国特色社会主义最本质的特征', link: '/xigai/ch03/第一节-中国共产党领导是中国特色社会主义最本质的特征' },
            { text: '第二节 坚持党对一切工作的领导', link: '/xigai/ch03/第二节-坚持党对一切工作的领导' },
            { text: '第三节 健全和完善党的领导制度体系', link: '/xigai/ch03/第三节-健全和完善党的领导制度体系' },
          ],
        },

        // 第四章（已建笔记）
        {
          text: '第四章 坚持以人民为中心',
          collapsed: false,
          items: [
            { text: '章节导读', link: '/xigai/ch04/' },
            { text: '第一节 江山就是人民，人民就是江山', link: '/xigai/ch04/第一节-江山就是人民人民就是江山' },
            { text: '第二节 坚持人民至上', link: '/xigai/ch04/第二节-坚持人民至上' },
            { text: '第三节 全面落实以人民为中心的发展思想', link: '/xigai/ch04/第三节-全面落实以人民为中心的发展思想' },
          ],
        },

        // 第 5-17 章待建（笔记完成后逐步补入）
      ],
    },
  ]
}
function chineseSidebar() {
  return [
    {
      text: '📚 大学语文',
      collapsed: false,
      items: [
        { text: '📖 首页', link: '/chinese/' },

        // 📝 议论文（诸子 / 奏疏 / 史论 / 学术随笔 / 思想随笔，含文言与白话）
        {
          text: '📝 议论文',
          collapsed: false,
          items: [
            { text: '《齐桓晋文之事》', link: '/chinese/议论文/1-齐桓晋文之事' },
            { text: '《秋水》', link: '/chinese/议论文/2-秋水' },
            { text: '《谏逐客书》', link: '/chinese/议论文/3-谏逐客书' },
            { text: '《过秦论》（上）', link: '/chinese/议论文/4-过秦论' },
            { text: '《五代史伶官传序》', link: '/chinese/议论文/5-五代史伶官传序' },
            { text: '《咬文嚼字》', link: '/chinese/议论文/6-咬文嚼字' },
            { text: '《容忍与自由》', link: '/chinese/议论文/7-容忍与自由' },
            { text: '《如何避免愚蠢的见识》', link: '/chinese/议论文/8-如何避免愚蠢的见识' },
          ],
        },

        // 🧭 议论文方法论课件（8 篇议论文的总结）
        { text: '🧭 议论文三要素（课件）', link: '/chinese/议论文阅读与写作' },

        // 📜 记叙文（史传 / 传记 / 寓言 / 游记 / 抒情散文，含文言与白话）
        {
          text: '📜 记叙文',
          collapsed: false,
          items: [
            { text: '《冯谖客孟尝君》', link: '/chinese/记叙文/1-冯谖客孟尝君' },
            { text: '《垓下之围》', link: '/chinese/记叙文/2-垓下之围' },
            { text: '《张中丞传后叙》', link: '/chinese/记叙文/3-张中丞传后叙' },
            { text: '《种树郭橐驼传》', link: '/chinese/记叙文/4-种树郭橐驼传' },
            { text: '《秦晋崤之战》', link: '/chinese/记叙文/5-秦晋崤之战' },
            { text: '《爱尔克的灯光》', link: '/chinese/记叙文/6-爱尔克的灯光' },
            { text: '《都江堰》', link: '/chinese/记叙文/7-都江堰' },
            { text: '《纪念傅雷》', link: '/chinese/记叙文/8-纪念傅雷' },
            { text: '《哭小弟》', link: '/chinese/记叙文/9-哭小弟' },
            { text: '《马伶传》', link: '/chinese/记叙文/10-马伶传' },
            { text: '《蚂蚁大战》', link: '/chinese/记叙文/11-蚂蚁大战' },
            { text: '《牡丹的拒绝》', link: '/chinese/记叙文/12-牡丹的拒绝' },
            { text: '《秋夜》', link: '/chinese/记叙文/13-秋夜' },
            { text: '《我与地坛》', link: '/chinese/记叙文/14-我与地坛' },
            { text: '《西湖七月半》', link: '/chinese/记叙文/15-西湖七月半' },
            { text: '《先妣事略》', link: '/chinese/记叙文/16-先妣事略' },
            { text: '《香市》', link: '/chinese/记叙文/17-香市' },
            { text: '《前赤壁赋》', link: '/chinese/记叙文/18-前赤壁赋' },
          ],
        },

        // 🧭 记叙文方法论课件（18 篇记叙文的总结）
        { text: '🧭 记叙文六要素（课件）', link: '/chinese/记叙文阅读与写作' },

        // 🎵 诗歌（诗 / 词 / 曲 / 古体近体 / 词牌散曲）—— 含古代诗、词、现代新诗、译诗
        {
          text: '🎵 诗歌',
          collapsed: false,
          items: [
            { text: '《蒹葭》（诗经·秦风）', link: '/chinese/诗歌/1-蒹葭' },
            { text: '《湘夫人》（九歌）', link: '/chinese/诗歌/2-九歌·湘夫人' },
            { text: '《陌上桑》（汉乐府）', link: '/chinese/诗歌/3-陌上桑' },
            { text: '《归园田居·其一》', link: '/chinese/诗歌/4-归园田居·其一' },
            { text: '《行路难·其一》', link: '/chinese/诗歌/5-行路难·其一' },
            { text: '《登高》', link: '/chinese/诗歌/6-登高' },
            { text: '《长恨歌》', link: '/chinese/诗歌/7-长恨歌' },
            { text: '《早雁》', link: '/chinese/诗歌/8-早雁' },
            { text: '《虞美人》', link: '/chinese/诗歌/9-虞美人' },
            { text: '《八声甘州》', link: '/chinese/诗歌/10-八声甘州' },
            { text: '《江城子》', link: '/chinese/诗歌/11-江城子' },
            { text: '《声声慢》', link: '/chinese/诗歌/12-声声慢' },
            { text: '《摸鱼儿》', link: '/chinese/诗歌/13-摸鱼儿' },
            { text: '《一句话》', link: '/chinese/诗歌/14-一句话' },
            { text: '《雨巷》', link: '/chinese/诗歌/15-雨巷' },
            { text: '《再别康桥》', link: '/chinese/诗歌/16-再别康桥' },
            { text: '《祖国啊，我亲爱的祖国》', link: '/chinese/诗歌/17-祖国啊，我亲爱的祖国' },
            { text: '《我愿意是急流》', link: '/chinese/诗歌/18-我愿意是急流' },
          ],
        },

        // 🧭 诗歌方法论课件（抒情方法，18 首诗歌的总结之一）
        { text: '🧭 诗歌的抒情方法（课件）', link: '/chinese/诗歌的抒情方法' },

        // 📕 小说（传奇 / 章回 / 现代短篇 / 外国短篇）
        {
          text: '📕 小说',
          collapsed: false,
          items: [
            { text: '《枕中记》', link: '/chinese/小说/1-枕中记' },
            { text: '《婴宁》', link: '/chinese/小说/2-婴宁' },
            { text: '《宝黛吵架》', link: '/chinese/小说/3-宝黛吵架' },
            { text: '《断魂枪》', link: '/chinese/小说/4-断魂枪' },
            { text: '《哦，香雪》', link: '/chinese/小说/5-哦，香雪' },
            { text: '《苦恼》', link: '/chinese/小说/6-苦恼' },
            { text: '《麦琪的礼物》', link: '/chinese/小说/7-麦琪的礼物' },
          ],
        },

        // 🧭 小说方法论课件（7 篇小说的总结）
        { text: '🧭 小说的艺术特点（课件）', link: '/chinese/小说的艺术特点' },

        // 🎯 冲刺复习（对接考点，四大文体齐全）
        {
          text: '🎯 冲刺复习',
          collapsed: false,
          items: [
            { text: '冲刺·议论文', link: '/chinese/冲刺复习/议论文' },
            { text: '冲刺·记叙文', link: '/chinese/冲刺复习/记叙文' },
            { text: '冲刺·诗歌', link: '/chinese/冲刺复习/诗歌' },
            { text: '冲刺·小说', link: '/chinese/冲刺复习/小说' },
          ],
        },

        // 📝 真题与模拟（自考大学语文 04729）
        {
          text: '📝 真题与模拟',
          collapsed: false,
          items: [
            { text: '自考题型说明（总纲）', link: '/chinese/真题/00-题型说明' },
            { text: '模拟卷一（含解析）', link: '/chinese/真题/01-模拟卷一' },
            { text: '模拟卷二（含解析）', link: '/chinese/真题/02-模拟卷二' },
            { text: '考点专项·字词翻译', link: '/chinese/真题/10-专项-字词翻译' },
            { text: '考点专项·手法鉴赏', link: '/chinese/真题/11-专项-手法鉴赏' },
            { text: '考点专项·人物形象', link: '/chinese/真题/12-专项-人物形象' },
            { text: '考点专项·主旨情感', link: '/chinese/真题/13-专项-主旨情感' },
            { text: '课文真题库·议论文', link: '/chinese/真题/20-课文-议论文' },
            { text: '课文真题库·记叙文', link: '/chinese/真题/21-课文-记叙文' },
            { text: '课文真题库·诗歌', link: '/chinese/真题/22-课文-诗歌' },
            { text: '课文真题库·小说', link: '/chinese/真题/23-课文-小说' },
          ],
        },
      ],
    },
  ]
}
