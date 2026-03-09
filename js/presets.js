// 预置主题数据 - 5套主题及相关词汇
const presets = [
  {
    id: 1,
    theme: "超市",
    title: "走进超市",
    pinyin: "zǒu jìn chāo shì",
    vocabulary: {
      // 核心角色与设施
      core: [
        { pinyin: "shōu yín yuán", hanzi: "收银员" },
        { pinyin: "huò jià", hanzi: "货架" },
        { pinyin: "shōu yín tái", hanzi: "收银台" },
        { pinyin: "gòu wù chē", hanzi: "购物车" },
        { pinyin: "gòu wù lán", hanzi: "购物篮" }
      ],
      // 常见物品/工具
      items: [
        { pinyin: "píng guǒ", hanzi: "苹果" },
        { pinyin: "niú nǎi", hanzi: "牛奶" },
        { pinyin: "miàn bāo", hanzi: "面包" },
        { pinyin: "jī dàn", hanzi: "鸡蛋" },
        { pinyin: "shuǐ guǒ", hanzi: "水果" },
        { pinyin: "shū cài", hanzi: "蔬菜" },
        { pinyin: "bǎn nǎi", hanzi: "酸奶" },
        { pinyin: "bǐng gān", hanzi: "饼干" }
      ],
      // 环境与装饰
      environment: [
        { pinyin: "chū kǒu", hanzi: "出口" },
        { pinyin: "rù kǒu", hanzi: "入口" },
        { pinyin: "dēng", hanzi: "灯" },
        { pinyin: "qiáng", hanzi: "墙" },
        { pinyin: "dì bǎn", hanzi: "地板" }
      ]
    }
  },
  {
    id: 2,
    theme: "医院",
    title: "快乐医院",
    pinyin: "kuài lè yī yuàn",
    vocabulary: {
      core: [
        { pinyin: "yī shēng", hanzi: "医生" },
        { pinyin: "hù shì", hanzi: "护士" },
        { pinyin: "bìng chuáng", hanzi: "病床" },
        { pinyin: "tī wēn qi", hanzi: "体温计" },
        { pinyin: "tīng zhěn qì", hanzi: "听诊器" }
      ],
      items: [
        { pinyin: "yào", hanzi: "药" },
        { pinyin: "kǒu zhào", hanzi: "口罩" },
        { pinyin: "shā bù", hanzi: "纱布" },
        { pinyin: "bēi zi", hanzi: "杯子" },
        { pinyin: "shuǐ", hanzi: "水" },
        { pinyin: "zhěn duàn shū", hanzi: "诊断书" },
        { pinyin: "zhù shè qì", hanzi: "注射器" },
        { pinyin: "bìng lì", hanzi: "病历" }
      ],
      environment: [
        { pinyin: "mén", hanzi: "门" },
        { pinyin: "chuāng hu", hanzi: "窗户" },
        { pinyin: "yǐ zi", hanzi: "椅子" },
        { pinyin: "zhuō zi", hanzi: "桌子" },
        { pinyin: "dēng", hanzi: "灯" }
      ]
    }
  },
  {
    id: 3,
    theme: "公园",
    title: "公园游记",
    pinyin: "gōng yuán yóu jì",
    vocabulary: {
      core: [
        { pinyin: "pēn quán", hanzi: "喷泉" },
        { pinyin: "cháng yǐ", hanzi: "长椅" },
        { pinyin: "lù dēng", hanzi: "路灯" },
        { pinyin: "huā tán", hanzi: "花坛" },
        { pinyin: "cǎo dì", hanzi: "草地" }
      ],
      items: [
        { pinyin: "qī qiú", hanzi: "气球" },
        { pinyin: "fēng zheng", hanzi: "风筝" },
        { pinyin: "shā jī", hanzi: "沙具" },
        { pinyin: "pá huá dān", hanzi: "滑滑梯" },
        { pinyin: "dàng yǐ", hanzi: "荡椅" },
        { pinyin: "huā", hanzi: "花" },
        { pinyin: "shù", hanzi: "树" },
        { pinyin: "niǎo", hanzi: "鸟" }
      ],
      environment: [
        { pinyin: "lù", hanzi: "路" },
        { pinyin: "hú", hanzi: "湖" },
        { pinyin: "qiáo", hanzi: "桥" },
        { pinyin: "tíng zi", hanzi: "亭子" },
        { pinyin: "yún", hanzi: "云" }
      ]
    }
  },
  {
    id: 4,
    theme: "学校",
    title: "校园生活",
    pinyin: "xiào yuán shēng huó",
    vocabulary: {
      core: [
        { pinyin: "lǎo shī", hanzi: "老师" },
        { pinyin: "xué shēng", hanzi: "学生" },
        { pinyin: "jiào shì", hanzi: "教室" },
        { pinyin: "hēi bǎn", hanzi: "黑板" },
        { pinyin: "shū zhuō", hanzi: "书桌" }
      ],
      items: [
        { pinyin: "shū bāo", hanzi: "书包" },
        { pinyin: "bǐ", hanzi: "笔" },
        { pinyin: "běn zi", hanzi: "本子" },
        { pinyin: "qiān bǐ", hanzi: "铅笔" },
        { pinyin: "xiàng pí", hanzi: "橡皮" },
        { pinyin: "chǐ zi", hanzi: "尺子" },
        { pinyin: "shū", hanzi: "书" },
        { pinyin: "kè běn", hanzi: "课本" }
      ],
      environment: [
        { pinyin: "mén", hanzi: "门" },
        { pinyin: "chuāng", hanzi: "窗" },
        { pinyin: "dēng", hanzi: "灯" },
        { pinyin: "guó qí", hanzi: "国旗" },
        { pinyin: "cāo chǎng", hanzi: "操场" }
      ]
    }
  },
  {
    id: 5,
    theme: "餐厅",
    title: "美食天地",
    pinyin: "měi shí tiān dì",
    vocabulary: {
      core: [
        { pinyin: "chú shī", hanzi: "厨师" },
        { pinyin: "fú wù yuán", hanzi: "服务员" },
        { pinyin: "cān zhuō", hanzi: "餐桌" },
        { pinyin: "yǐ zi", hanzi: "椅子" },
        { pinyin: "chú fáng", hanzi: "厨房" }
      ],
      items: [
        { pinyin: "fàn", hanzi: "饭" },
        { pinyin: "cài", hanzi: "菜" },
        { pinyin: "tāng", hanzi: "汤" },
        { pinyin: "miàn tiáo", hanzi: "面条" },
        { pinyin: "jiǎo zi", hanzi: "饺子" },
        { pinyin: "sháo zi", hanzi: "勺子" },
        { pinyin: "kuài zi", hanzi: "筷子" },
        { pinyin: "wǎn", hanzi: "碗" }
      ],
      environment: [
        { pinyin: "mén", hanzi: "门" },
        { pinyin: "qiáng", hanzi: "墙" },
        { pinyin: "zhuō bù", hanzi: "桌布" },
        { pinyin: "huā", hanzi: "花" },
        { pinyin: "dēng", hanzi: "灯" }
      ]
    }
  }
];
