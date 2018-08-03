import { QiansanzhixuanfushiComponent } from './115-game/sanma/qiansanzhixuanfushi/qiansanzhixuanfushi'
import { QiansanzuxuanfushiComponent } from './115-game/sanma/qiansanzuxuanfushi/qiansanzuxuanfushi'
import { QiansanzuxuandantuoComponent } from './115-game/sanma/qiansanzuxuandantuo/qiansanzuxuandantuo'
import { QianerzhixuanfushiComponent } from './115-game/erma/qianerzhixuanfushi/qianerzhixuanfushi'
import { QianerzuxuanfushiComponent } from './115-game/erma/qianerzuxuanfushi/qianerzuxuanfushi'
import { QianerzuxuandantuoComponent } from './115-game/erma/qianerzuxuandantuo/qianerzuxuandantuo'
import { QiansanbudingweiComponent } from './115-game/budingwei/qiansanbudingwei/qiansanbudingwei'
import { DingweidanComponent } from './115-game/dingweidan/dingweidan/dingweidan'
import { RenxuanyizhongyifushiComponent } from './115-game/renxuanfushi/renxuanyizhongyifushi/renxuanyizhongyifushi'
import { RenxuanerzhongerfushiComponent } from './115-game/renxuanfushi/renxuanerzhongerfushi/renxuanerzhongerfushi'
import { RenxuansanzhongsanfushiComponent } from './115-game/renxuanfushi/renxuansanzhongsanfushi/renxuansanzhongsanfushi'
import { RenxuansizhongsifushiComponent } from './115-game/renxuanfushi/renxuansizhongsifushi/renxuansizhongsifushi'
import { RenxuanwuzhongwufushiComponent } from './115-game/renxuanfushi/renxuanwuzhongwufushi/renxuanwuzhongwufushi'
import { RenxuanliuzhongwufushiComponent } from './115-game/renxuanfushi/renxuanliuzhongwufushi/renxuanliuzhongwufushi'
import { RenxuanqizhongwufushiComponent } from './115-game/renxuanfushi/renxuanqizhongwufushi/renxuanqizhongwufushi'
import { RenxuanbazhongwufushiComponent } from './115-game/renxuanfushi/renxuanbazhongwufushi/renxuanbazhongwufushi'

import { RenxuanerzhongerdantuoComponent } from './115-game/renxuandantuo/renxuanerzhongerdantuo/renxuanerzhongerdantuo'
import { RenxuansanzhongsandantuoComponent } from './115-game/renxuandantuo/renxuansanzhongsandantuo/renxuansanzhongsandantuo'
import { RenxuansizhongsidantuoComponent } from './115-game/renxuandantuo/renxuansizhongsidantuo/renxuansizhongsidantuo'
import { RenxuanwuzhongwudantuoComponent } from './115-game/renxuandantuo/renxuanwuzhongwudantuo/renxuanwuzhongwudantuo'
import { RenxuanliuzhongwudantuoComponent } from './115-game/renxuandantuo/renxuanliuzhongwudantuo/renxuanliuzhongwudantuo'
import { RenxuanqizhongwudantuoComponent } from './115-game/renxuandantuo/renxuanqizhongwudantuo/renxuanqizhongwudantuo'
import { RenxuanbazhongwudantuoComponent } from './115-game/renxuandantuo/renxuanbazhongwudantuo/renxuanbazhongwudantuo'

export const gameConfig = {
       '三码前三直选复式':QiansanzhixuanfushiComponent,
       '三码前三组选复式':QiansanzuxuanfushiComponent,
       '三码前三组选胆拖':QiansanzuxuandantuoComponent,
       '二码前二直选复式':QianerzhixuanfushiComponent,
       '二码前二组选复式':QianerzuxuanfushiComponent,
       '二码前二组选胆拖':QianerzuxuandantuoComponent,
       '不定位前三不定位':QiansanbudingweiComponent,
       '定位胆定位胆':DingweidanComponent,
       '任选复式任选一中一复式':RenxuanyizhongyifushiComponent,
       '任选复式任选二中二复式':RenxuanerzhongerfushiComponent,
       '任选复式任选三中三复式':RenxuansanzhongsanfushiComponent,
       '任选复式任选四中四复式':RenxuansizhongsifushiComponent,
       '任选复式任选五中五复式':RenxuanwuzhongwufushiComponent,
       '任选复式任选六中五复式':RenxuanliuzhongwufushiComponent,
       '任选复式任选七中五复式':RenxuanqizhongwufushiComponent,
       '任选复式任选八中五复式':RenxuanbazhongwufushiComponent,
       '任选胆拖任选二中二胆拖':RenxuanerzhongerdantuoComponent,
       '任选胆拖任选三中三胆拖':RenxuansanzhongsandantuoComponent,
       '任选胆拖任选四中四胆拖':RenxuansizhongsidantuoComponent,
       '任选胆拖任选五中五胆拖':RenxuanwuzhongwudantuoComponent, 
       '任选胆拖任选六中五胆拖':RenxuanliuzhongwudantuoComponent,
       '任选胆拖任选七中五胆拖': RenxuanqizhongwudantuoComponent,
       '任选胆拖任选八中五胆拖': RenxuanbazhongwudantuoComponent
}