import { WuxingComponent } from '../components/gametrend/wuxing/wuxing'
import { ZhixuanhezhiComponent } from '../components/gametrend/qiansan/zhixuanhezhi/zhixuanhezhi'
import { KuadutrendComponent } from '../components/gametrend/kuadutrend/kuadutrend'
import { DaxiaodanshuangComponent } from '../components/gametrend/daxiaodanshuang/daxiaodanshuang'
import { ZufuComponent } from '../components/gametrend/zufu/zufu'

export let config = {
    '五星':WuxingComponent,
    '前三直选和值':ZhixuanhezhiComponent
}

export const trendAll = {
    'SSC':{
       'WuxingComponent':["五星直选复式","五星直选组合","五星组选20","五星组选60","五星组选120","五星组选10","五星组选5","五星组选30","四星直选组合","四星直选复式",
       "四星组选4","四星组选6","四星组选12","四星组选24","前三直选复式","前三直选组合","中三直选复式","中三直选组合","后三直选复式","后三直选组合",
       "二星后二复式", "二星前二复式" , "一星定位胆", "任选直选复式", "任选组选复式", "任选组三复式", "任选组六复式", "任选组选24", "任选组选12", "任选组选6", "任选组选4",
       "任选直选和值","任选组选和值"
       ],
       'ZhixuanhezhiComponent':["前三直选和值", "前三组选和值", "中三直选和值", "中三组选和值", "后三直选和值", "后三组选和值", "二星后二和值", "二星前二和值"],
       'KuadutrendComponent':["前三直选跨度","前三组三","前三组六","前三包胆","前三和值尾数","前三特殊号码","中三直选跨度","中三组三","中三组六","中三包胆","中三和值尾数",
        "中三特殊号码", "后三直选跨度", "后三组三", "后三组六", "后三包胆", "后三和值尾数","后三特殊号码", "二星后二跨度", "二星前二跨度", "二星后二包胆", "二星前二包胆",
        "不定位后三一码不定位", "不定位后三二码不定位", "不定位前三一码不定位", "不定位前三二码不定位", "不定位中三一码不定位", "不定位中三二码不定位", "不定位四星一码不定位",
        "不定位四星二码不定位" , "不定位五星二码不定位" , "不定位五星三码不定位"     
       ],
       'DaxiaodanshuangComponent':["大小单双后二大小单双","大小单双后三大小单双","大小单双前二大小单双","大小单双前三大小单双","大小单双中三大小单双"]
    },
    'Xuan5':{
       'WuxingComponent':["三码前三直选复式", "二码前二直选复式","定位胆定位胆"],
       'ZufuComponent':["三码前三组选复式", "二码前二组选复式", "三码前三组选胆拖", "二码前二组选胆拖","不定位前三不定位","任选复式任选一中一复式","任选复式任选二中二复式","任选复式任选三中三复式","任选复式任选四中四复式","任选复式任选五中五复式",
       "任选复式任选六中五复式","任选复式任选七中五复式","任选复式任选八中五复式","任选胆拖任选二中二胆拖","任选胆拖任选三中三胆拖","任选胆拖任选四中四胆拖","任选胆拖任选五中五胆拖",
       "任选胆拖任选六中五胆拖","任选胆拖任选七中五胆拖","任选胆拖任选八中五胆拖"]
    }  
}

export const judgeTrend = (gameKind, gameMethod) => {
    let total = trendAll[gameKind], component;
    for(let key in total){
        if(total[key].indexOf(gameMethod) != -1){
             component = key
             break
        }
    } 
    console.log(component)
    switch(component){
        case 'WuxingComponent':
           return {component:WuxingComponent, menus:getWei(gameMethod), position:getPosition(gameMethod)}
        case 'ZhixuanhezhiComponent':
           return {component:ZhixuanhezhiComponent, menus:getWei(gameMethod),position:getPosition(gameMethod)}
        case 'KuadutrendComponent':
           return {component:KuadutrendComponent, menus:getWei(gameMethod),position:getPosition(gameMethod)}   
        case 'DaxiaodanshuangComponent':   
           return {component:DaxiaodanshuangComponent, menus:getWei(gameMethod), position:getPosition(gameMethod)}
        case 'ZufuComponent':
           return {component:ZufuComponent, menus:getWei(gameMethod), position:getPosition(gameMethod)}   
    }
}

function getWei(gameMethod){
    if(["五星直选复式","五星直选组合","五星组选20","五星组选60","五星组选120","五星组选10","五星组选5","五星组选30","任选直选复式", "任选组选复式", "任选直选和值","任选组选和值",
        "任选组三复式", "任选组六复式", "任选组选24", "任选组选12", "任选组选6", "任选组选4", "一星定位胆"].indexOf(gameMethod) != -1)
        return ['开奖','万位走势','千位走势','百位走势','十位走势','个位走势']

    else if(["四星直选组合","四星直选复式","四星组选4","四星组选6","四星组选12","四星组选24"].indexOf(gameMethod) != -1)
        return ['开奖','千位走势','百位走势','十位走势','个位走势']

    else if(["前三直选复式","前三直选组合","三码前三直选复式","定位胆定位胆"].indexOf(gameMethod) != -1)
        return ['开奖','万位走势','千位走势','百位走势']

    else if(["中三直选复式","中三直选组合"].indexOf(gameMethod) != -1)
        return ['开奖','千位走势','百位走势','十位走势']

    else if(["后三直选复式","后三直选组合"].indexOf(gameMethod) != -1)
        return ['开奖','百位走势','十位走势','个位走势']

    else if(["二星后二复式"].indexOf(gameMethod) != -1)
        return ['开奖','十位走势','个位走势']

    else if(["二码前二直选复式","二星前二复式"].indexOf(gameMethod) != -1)
        return ['开奖','万位走势','千位走势']

    else if(["前三直选和值", "前三组选和值", "中三直选和值", "中三组选和值", "后三直选和值", "后三组选和值", "二星后二和值", "二星前二和值"].indexOf(gameMethod) != -1)
        return ['开奖','号码走势','和值走势','冷热']

    else if(["大小单双后二大小单双","大小单双后三大小单双","大小单双前二大小单双","大小单双前三大小单双","大小单双中三大小单双"].indexOf(gameMethod) != -1)
        return ['开奖','形态走势']

    else if(["三码前三组选复式","三码前三组选胆拖","二码前二组选复式","二码前二组选胆拖","任选复式任选一中一复式","不定位前三不定位","任选复式任选二中二复式","任选复式任选三中三复式","任选复式任选四中四复式","任选复式任选五中五复式",
             "任选复式任选六中五复式","任选复式任选七中五复式","任选复式任选八中五复式","任选胆拖任选二中二胆拖","任选胆拖任选三中三胆拖","任选胆拖任选四中四胆拖","任选胆拖任选五中五胆拖",
    "任选胆拖任选六中五胆拖","任选胆拖任选七中五胆拖","任选胆拖任选八中五胆拖"].indexOf(gameMethod) != -1)
        return ['开奖','走势']

    else if(["前三直选跨度","前三组三","前三组六","前三包胆","前三和值尾数","前三特殊号码","中三直选跨度","中三组三","中三组六","中三包胆","中三和值尾数",
        "中三特殊号码", "后三直选跨度", "后三组三", "后三组六", "后三包胆", "后三和值尾数","后三特殊号码", "二星后二跨度", "二星前二跨度", "二星后二包胆", "二星前二包胆",
        "不定位后三一码不定位", "不定位后三二码不定位", "不定位前三一码不定位", "不定位前三二码不定位", "不定位中三一码不定位", "不定位中三二码不定位", "不定位四星一码不定位",
        "不定位四星二码不定位","不定位五星二码不定位" , "不定位五星三码不定位"].indexOf(gameMethod) != -1)
        return ['开奖','走势','跨度','冷热'] 
   }

function getPosition(gameMethod){
      if(["三码前三直选复式","三码前三组选复式","三码前三组选胆拖","不定位前三不定位","定位胆定位胆","前三直选和值","前三直选组合","前三直选复式","前三组选和值","前三直选跨度","前三组三","前三组六","前三包胆","前三和值尾数","前三特殊号码","不定位前三一码不定位","不定位前三二码不定位","大小单双前三大小单双"].indexOf(gameMethod) != -1)
         return [0,3]
      else if(["中三直选和值","中三直选组合","中三组选和值","中三直选跨度","中三直选复式","中三组三","中三组六","中三包胆","中三和值尾数","中三特殊号码","不定位中三一码不定位","不定位中三二码不定位","大小单双中三大小单双"].indexOf(gameMethod) != -1)
         return [1,4]
      else if(["后三直选复式","后三直选和值", "后三组选和值","后三直选组合","后三直选跨度", "后三组三", "后三组六", "后三包胆", "后三和值尾数","后三特殊号码","不定位后三一码不定位","不定位后三二码不定位","大小单双后三大小单双"].indexOf(gameMethod) != -1)
         return [2,5]
      else if(["二星后二复式","二星后二和值","二星后二跨度","二星后二包胆","大小单双后二大小单双"].indexOf(gameMethod) != -1)
         return [3,5]
      else if(["二码前二直选复式","二码前二组选复式","二码前二组选胆拖","二星前二和值","二星前二复式","二星前二跨度","二星前二包胆","大小单双前二大小单双"].indexOf(gameMethod) != -1)
         return [0,2]
      else if(["不定位四星一码不定位","不定位四星二码不定位","四星直选复式","四星直选组合","四星组选24","四星组选12","四星组选6","四星组选4"].indexOf(gameMethod) != -1)
         return [1,5]
      else if(["五星直选复式","五星直选组合","五星组选20","五星组选60","五星组选120","五星组选10","五星组选5","五星组选30","一星定位胆","不定位五星二码不定位" , "不定位五星三码不定位", "任选复式任选一中一复式",,"任选复式任选二中二复式","任选复式任选三中三复式","任选复式任选四中四复式","任选复式任选五中五复式",
        "任选复式任选六中五复式","任选复式任选七中五复式","任选复式任选八中五复式","任选胆拖任选二中二胆拖","任选胆拖任选三中三胆拖","任选胆拖任选四中四胆拖","任选胆拖任选五中五胆拖",
      "任选胆拖任选六中五胆拖","任选胆拖任选七中五胆拖","任选胆拖任选八中五胆拖","任选直选复式", "任选组选复式", "任选组三复式", "任选组六复式", "任选组选24", "任选组选12", "任选组选6", "任选组选4",
      "任选直选和值","任选组选和值"].indexOf(gameMethod) != -1)
         return [0,5]  
}

