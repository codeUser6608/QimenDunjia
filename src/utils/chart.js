// 奇门遁甲排盘工具函数

// 引入lunar-javascript库
import { Solar } from 'lunar-javascript'

// 天干
export const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']

// 地支
export const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

// 六十甲子
const SIXTY_JIAZI = [
  '甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉',
  '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未',
  '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳',
  '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯',
  '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑',
  '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥'
]

// 六旬
const SIX_XUN = [
  { name: '甲子', stems: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] },
  { name: '甲戌', stems: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] },
  { name: '甲申', stems: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] },
  { name: '甲午', stems: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] },
  { name: '甲辰', stems: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] },
  { name: '甲寅', stems: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] }
]

// 六旬对应的空亡地支
const XUN_KONG = {
  '甲子': ['戌', '亥'],
  '甲戌': ['申', '酉'],
  '甲申': ['午', '未'],
  '甲午': ['辰', '巳'],
  '甲辰': ['寅', '卯'],
  '甲寅': ['子', '丑']
}

// 根据日干支获取旬首
export const getXunShouByGanZhi = (dayGanZhi) => {
  // 找到日干支在六十甲子中的索引
  const index = SIXTY_JIAZI.indexOf(dayGanZhi)
  if (index === -1) {
    return XUN_SHOU[0] // 默认返回甲子旬
  }
  
  // 计算旬首索引（每10个干支为一旬）
  const xunIndex = Math.floor(index / 10)
  return XUN_SHOU[xunIndex]
}

// 计算公历日期的干支
export const getGanZhiFromDate = (year, month, day, hour) => {
  try {
    const solar = Solar.fromYmdHms(year, month, day, hour, 0, 0)
    const lunar = solar.getLunar()
    
    return {
      yearGanZhi: lunar.getYearInGanZhi(),
      monthGanZhi: lunar.getMonthInGanZhi(),
      dayGanZhi: lunar.getDayInGanZhi(),
      timeGanZhi: lunar.getTimeInGanZhi(),
      dayGan: lunar.getDayGan(),
      dayZhi: lunar.getDayZhi(),
      timeGan: lunar.getTimeGan(),
      timeZhi: lunar.getTimeZhi()
    }
  } catch (error) {
    console.error('计算干支出错:', error)
    return {
      yearGanZhi: '甲子',
      monthGanZhi: '甲子',
      dayGanZhi: '甲子',
      timeGanZhi: '甲子',
      dayGan: '甲',
      dayZhi: '子',
      timeGan: '甲',
      timeZhi: '子'
    }
  }
}

// 洛书九宫地盘天干排布（奇门遁甲标准）
const EARTH_PLATE_STEMS = {
  1: '戊', 2: '己', 3: '庚', 4: '辛', 5: '壬',
  6: '癸', 7: '戊', 8: '己', 9: '庚'
}

// 洛书九宫排布顺序（顺时针）
const PALACE_ORDER = [1, 2, 3, 4, 9, 8, 7, 6]

// 根据旬首确定值符位置
export const getZhiFuPosition = (xunShou) => {
  // 旬首的六仪对应的地盘位置
  const instrumentMap = {
    '戊': 1,  // 戊在坎一宫
    '己': 2,  // 己在坤二宫
    '庚': 3,  // 庚在震三宫
    '辛': 4,  // 辛在巽四宫
    '壬': 9,  // 壬在离九宫
    '癸': 6   // 癸在乾六宫
  }
  
  return instrumentMap[xunShou.instrument] || 1
}

// 计算天盘天干（根据地盘天干和旬首推演）
export const calculateHeavenStems = (xunShou, earthPlate) => {
  const heavenStems = {}
  
  // 获取值符位置（旬首所在宫）
  const zhiFuPosition = getZhiFuPosition(xunShou)
  
  // 地盘天干数组（按宫位顺序）
  const earthStemsOrder = {}
  PALACE_ORDER.forEach(palaceId => {
    earthStemsOrder[palaceId] = earthPlate[palaceId].stem
  })
  
  // 天盘天干推演：值符随旬首，天盘天干按照地盘天干顺时针旋转
  // 找到旬首六仪在地盘的位置，然后将其作为起点，顺时针推演
  const instrumentIndex = PALACE_ORDER.indexOf(zhiFuPosition)
  
  // 天干循环
  const stemCycle = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
  
  // 根据旬首的六仪确定起始天干
  const startStemIndex = stemCycle.indexOf(xunShou.instrument)
  
  // 计算每个宫位的天盘天干
  PALACE_ORDER.forEach((palaceId, index) => {
    const offset = (index - instrumentIndex + 10) % 10
    const stemIndex = (startStemIndex + offset) % 10
    heavenStems[palaceId] = stemCycle[stemIndex]
  })
  
  return heavenStems
}

// 九星标准排布
const STANDARD_STAR_POSITIONS = {
  1: '天蓬',
  2: '天任',
  3: '天冲',
  4: '天辅',
  5: '天英',
  6: '天芮',
  7: '天柱',
  8: '天心',
  9: '天禽'
}

// 根据值符位置推演九星
export const calculateStarPositions = (zhiFuPosition) => {
  const starPositions = {}
  
  // 九星在洛书九宫的原始位置
  const originalPositions = {
    '天蓬': 1, '天任': 2, '天冲': 3, '天辅': 4, '天英': 5,
    '天芮': 6, '天柱': 7, '天心': 8, '天禽': 9
  }
  
  // 值符星（天蓬）随旬首移动
  const offset = zhiFuPosition - 1
  
  // 计算每个宫位的九星
  PALACES.forEach(palace => {
    let starPosition
    
    if (palace.id === 5) {
      // 中五宫不排星
      starPosition = null
    } else {
      // 计算九星位置：根据值符位置偏移
      const adjustedPosition = ((palace.id - 1 - offset + 8) % 8) + 1
      
      // 找到对应的九星
      for (const [star, pos] of Object.entries(originalPositions)) {
        if (pos === adjustedPosition) {
          starPosition = star
          break
        }
      }
    }
    
    starPositions[palace.id] = starPosition || STANDARD_STAR_POSITIONS[palace.id]
  })
  
  return starPositions
}

// 八门
export const GATES = ['开门', '休门', '生门', '伤门', '杜门', '景门', '死门', '惊门']

// 九星
export const STARS = ['天蓬', '天任', '天冲', '天辅', '天英', '天芮', '天柱', '天心', '天禽']

// 八神
export const SPIRITS = ['值符', '腾蛇', '太阴', '六合', '白虎', '玄武', '九地', '九天']

// 九宫（洛书九宫）
export const PALACES = [
  { id: 4, name: '巽四', position: [0, 1] },
  { id: 9, name: '离九', position: [0, 2] },
  { id: 2, name: '坤二', position: [1, 0] },
  { id: 3, name: '震三', position: [1, 1] },
  { id: 5, name: '中五', position: [1, 2] },
  { id: 8, name: '艮八', position: [2, 0] },
  { id: 1, name: '坎一', position: [2, 1] },
  { id: 6, name: '乾六', position: [2, 2] },
  { id: 7, name: '兑七', position: [3, 1] }
]

// 六仪
export const INSTRUMENTS = ['戊', '己', '庚', '辛', '壬', '癸']

// 三奇
export const MIRACLES = ['乙', '丙', '丁']

// 旬首
export const XUN_SHOU = [
  { name: '甲子', instrument: '戊' },
  { name: '甲戌', instrument: '己' },
  { name: '甲申', instrument: '庚' },
  { name: '甲午', instrument: '辛' },
  { name: '甲辰', instrument: '壬' },
  { name: '甲寅', instrument: '癸' }
]

// 八卦
export const TRIGRAMS = [
  { name: '乾', direction: '西北' },
  { name: '坤', direction: '西南' },
  { name: '震', direction: '东' },
  { name: '巽', direction: '东南' },
  { name: '坎', direction: '北' },
  { name: '离', direction: '南' },
  { name: '艮', direction: '东北' },
  { name: '兑', direction: '西' }
]

// 获取旬首
export const getXunShou = (year, month, day, hour) => {
  // 使用lunar-javascript库计算日干支
  const ganZhi = getGanZhiFromDate(year, month, day, hour)
  
  // 根据日干支确定旬首
  return getXunShouByGanZhi(ganZhi.dayGanZhi)
}

// 计算地盘天干
export const calculateEarthPlate = (xunShou) => {
  const earthPlate = {}
  
  // 地盘天干按洛书九宫排布
  const earthStems = {
    1: '戊', 2: '己', 3: '庚', 4: '辛', 5: '壬',
    6: '癸', 7: '戊', 8: '己', 9: '庚'
  }
  
  PALACES.forEach(palace => {
    earthPlate[palace.id] = {
      palace: palace.id,
      name: palace.name,
      stem: earthStems[palace.id] || '戊',
      branch: getBranchByPalace(palace.id)
    }
  })
  
  return earthPlate
}

// 根据宫位获取地支
export const getBranchByPalace = (palaceId) => {
  const branchMap = {
    1: '子', 2: '丑', 3: '寅', 4: '卯', 5: '辰',
    6: '巳', 7: '午', 8: '未', 9: '申'
  }
  return branchMap[palaceId] || '子'
}

// 计算天盘九星
export const calculateHeavenPlate = (xunShou, earthPlate) => {
  const heavenPlate = {}
  
  // 获取值符位置
  const zhiFuPosition = getZhiFuPosition(xunShou)
  
  // 计算九星位置
  const starPositions = calculateStarPositions(zhiFuPosition)
  
  // 计算天盘天干
  const heavenStems = calculateHeavenStems(xunShou, earthPlate)
  
  PALACES.forEach(palace => {
    heavenPlate[palace.id] = {
      palace: palace.id,
      name: palace.name,
      star: starPositions[palace.id] || '天蓬',
      stem: heavenStems[palace.id] || '甲'
    }
  })
  
  return heavenPlate
}

// 计算人盘八门
export const calculateHumanPlate = (xunShou) => {
  const humanPlate = {}
  
  // 八门按洛书九宫排布（简化版）
  const gatePositions = {
    1: '休门', 2: '死门', 3: '伤门', 4: '杜门', 5: null,
    6: '开门', 7: '惊门', 8: '生门', 9: '景门'
  }
  
  PALACES.forEach(palace => {
    humanPlate[palace.id] = {
      palace: palace.id,
      name: palace.name,
      gate: gatePositions[palace.id]
    }
  })
  
  return humanPlate
}

// 计算神盘八神
export const calculateSpiritPlate = (xunShou) => {
  const spiritPlate = {}
  
  // 八神按洛书九宫排布（简化版）
  const spiritPositions = {
    1: '值符', 2: '腾蛇', 3: '太阴', 4: '六合', 5: null,
    6: '白虎', 7: '玄武', 8: '九地', 9: '九天'
  }
  
  PALACES.forEach(palace => {
    spiritPlate[palace.id] = {
      palace: palace.id,
      name: palace.name,
      spirit: spiritPositions[palace.id]
    }
  })
  
  return spiritPlate
}

// 生成完整排盘
export const generateChart = (year, month, day, hour) => {
  const xunShou = getXunShou(year, month, day, hour)
  const earthPlate = calculateEarthPlate(xunShou)
  
  return {
    timeInfo: {
      year,
      month,
      day,
      hour,
      xunShou: xunShou.name
    },
    earthPlate: earthPlate,
    heavenPlate: calculateHeavenPlate(xunShou, earthPlate),
    humanPlate: calculateHumanPlate(xunShou),
    spiritPlate: calculateSpiritPlate(xunShou)
  }
}

// 生成空间排盘
export const generateSpaceChart = (direction) => {
  // 根据方位确定旬首（简化版）
  const directionMap = {
    'north': 0,
    'northeast': 1,
    'east': 2,
    'southeast': 3,
    'south': 4,
    'southwest': 5,
    'west': 0,
    'northwest': 1
  }
  
  const xunShouIndex = directionMap[direction] || 0
  const xunShou = XUN_SHOU[xunShouIndex]
  const earthPlate = calculateEarthPlate(xunShou)
  
  return {
    timeInfo: {
      direction,
      xunShou: xunShou.name
    },
    earthPlate: earthPlate,
    heavenPlate: calculateHeavenPlate(xunShou, earthPlate),
    humanPlate: calculateHumanPlate(xunShou),
    spiritPlate: calculateSpiritPlate(xunShou)
  }
}

// 分析格局
export const analyzeChart = (chart) => {
  const analysis = {
    overall: {
      rating: 'AVERAGE',
      summary: '格局平稳，需谨慎行事'
    },
    gates: [],
    stars: [],
    spirits: [],
    combinations: []
  }
  
  // 分析八门
  Object.values(chart.humanPlate).forEach(item => {
    if (item.gate) {
      const gateInfo = getGateInfo(item.gate)
      analysis.gates.push({
        gate: item.gate,
        palace: item.name,
        meaning: gateInfo.meaning,
        advice: gateInfo.advice
      })
    }
  })
  
  // 分析九星
  Object.values(chart.heavenPlate).forEach(item => {
    const starInfo = getStarInfo(item.star)
    analysis.stars.push({
      star: item.star,
      palace: item.name,
      meaning: starInfo.meaning,
      advice: starInfo.advice
    })
  })
  
  // 分析八神
  Object.values(chart.spiritPlate).forEach(item => {
    if (item.spirit) {
      const spiritInfo = getSpiritInfo(item.spirit)
      analysis.spirits.push({
        spirit: item.spirit,
        palace: item.name,
        meaning: spiritInfo.meaning,
        advice: spiritInfo.advice
      })
    }
  })
  
  return analysis
}

// 获取门信息
export const getGateInfo = (gateName) => {
  const gateData = {
    '开门': { meaning: '开启、开始、顺利', advice: '宜开业、求职、出行' },
    '休门': { meaning: '休息、休养、平和', advice: '宜休养、调解、求医' },
    '生门': { meaning: '生长、生机、财源', advice: '宜求财、种植、投资' },
    '伤门': { meaning: '伤害、受伤、矛盾', advice: '忌出行、签约、争斗' },
    '杜门': { meaning: '阻碍、困难、不通', advice: '宜躲藏、隐匿' },
    '景门': { meaning: '景象、光明、声名', advice: '宜考试、演出、宣传' },
    '死门': { meaning: '死亡、终结、失败', advice: '忌开业、出行、签约' },
    '惊门': { meaning: '惊恐、惊慌、意外', advice: '忌出行、开业、重要决策' }
  }
  return gateData[gateName] || { meaning: '', advice: '' }
}

// 获取星信息
export const getStarInfo = (starName) => {
  const starData = {
    '天蓬': { meaning: '盗贼、阴谋、暗算', advice: '宜防守、躲藏' },
    '天任': { meaning: '贵人、助力、安稳', advice: '宜求职、合作、求财' },
    '天冲': { meaning: '冲动、急躁、行动', advice: '宜行动、创业、竞争' },
    '天辅': { meaning: '辅助、帮助、贵人', advice: '宜学习、考试、合作' },
    '天英': { meaning: '灾祸、火灾、血光', advice: '忌开业、出行、重要决策' },
    '天芮': { meaning: '疾病、病痛、灾患', advice: '宜求医、休养' },
    '天柱': { meaning: '柱石、支撑、依靠', advice: '宜创业、投资、合作' },
    '天心': { meaning: '心智、智慧、谋略', advice: '宜策划、谋略、决策' },
    '天禽': { meaning: '禽鸟、捕捉、收获', advice: '宜求财、收获、捕捉' }
  }
  return starData[starName] || { meaning: '', advice: '' }
}

// 获取神信息
export const getSpiritInfo = (spiritName) => {
  const spiritData = {
    '值符': { meaning: '吉祥、贵人、助力', advice: '宜开业、求财、求职、出行' },
    '腾蛇': { meaning: '纠缠、麻烦、虚惊', advice: '忌开业、求财、重要决策' },
    '太阴': { meaning: '隐秘、暗中、谋划', advice: '宜谋划、策划、暗中行动' },
    '六合': { meaning: '和合、合作、婚姻', advice: '宜合作、婚姻、调解' },
    '白虎': { meaning: '凶猛、争斗、血光', advice: '忌开业、出行、争斗' },
    '玄武': { meaning: '暗算、欺骗、盗贼', advice: '宜防守' },
    '九地': { meaning: '稳固、根基、防守', advice: '宜防守、稳固、求稳' },
    '九天': { meaning: '高远、远大、升迁', advice: '宜升迁、远行、发展' }
  }
  return spiritData[spiritName] || { meaning: '', advice: '' }
}
