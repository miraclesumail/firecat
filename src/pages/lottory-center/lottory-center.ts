import {Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef} from '@angular/core';
import {IonicPage, ToastController, NavController, NavParams,Refresher} from 'ionic-angular';
import {HomeProvider} from '../../providers/home/home';
import {LoadingProvider} from '../../providers/loading/loading'

import {SscKaijiangComponent} from '../../components/lottory-center/ssc-kaijiang/ssc-kaijiang'
// import {SscDanshuangComponent} from '../../components/lottory-center/ssc-danshuang/ssc-danshuang'
// import {SscDaxiaoComponent} from '../../components/lottory-center/ssc-daxiao/ssc-daxiao'
// import {YKaijiangComponent} from '../../components/lottory-center/y-kaijiang/y-kaijiang'
// import {YDistributeComponent} from '../../components/lottory-center/y-distribute/y-distribute'
// import {K3KaijiangComponent} from '../../components/lottory-center/k3-kaijiang/k3-kaijiang'
// import {K3BaseTrendComponent} from '../../components/lottory-center/k3-base-trend/k3-base-trend'
// import {K3ShapeTrendComponent} from '../../components/lottory-center/k3-shape-trend/k3-shape-trend'
// import {K3CoodHotComponent} from '../../components/lottory-center/k3-cood-hot/k3-cood-hot'
// import {Pk10KaijiangComponent} from '../../components/lottory-center/pk10-kaijiang/pk10-kaijiang'
// import {Pk10daxiaoComponent} from '../../components/lottory-center/pk10daxiao/pk10daxiao'
// import {Pk10DanshuangComponent} from '../../components/lottory-center/pk10-danshuang/pk10-danshuang'
// import {Pk10ChanpiomComponent} from '../../components/lottory-center/pk10-chanpiom/pk10-chanpiom'
// import {Pk10LonghuComponent} from '../../components/lottory-center/pk10-longhu/pk10-longhu'
// import {LhcKaijiangComponent} from '../../components/lottory-center/lhc-kaijiang/lhc-kaijiang'
// import {LhcShengxiaoComponent} from '../../components/lottory-center/lhc-shengxiao/lhc-shengxiao'
// import {LhcBoseComponent} from '../../components/lottory-center/lhc-bose/lhc-bose'

@IonicPage()
@Component({
  selector: 'page-lottory-center',
  templateUrl: 'lottory-center.html',
})


export class LottoryCenterPage {
  lcData = {
    currentLottory: {id: 1},//当前彩种
    isK3: false,
    currentNav: SscKaijiangComponent,
    currentNavIndex: 0,
    isDrop: false,
    resultsData: {data: []}
  }
  navData: any

  @ViewChild('dynLottoryComponent', {read: ViewContainerRef})
  dynLottoryComponent: ViewContainerRef;
  dynComponent: ComponentRef<any>

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public homeprv: HomeProvider,
              public loadingPrvd: LoadingProvider,
              public toastCtrl: ToastController,
              private resolver: ComponentFactoryResolver) {

    this.lcData.currentLottory = this.homeprv.homeData.lottoryList.SSC[0];//默认显示重庆时时彩开奖

    this.changeNav(this.homeprv.homeData.lottoryList.SSC.nav)
  }

  ngAfterContentInit() {
    this.createDynComponent(this.lcData.currentNav, this.lcData.currentLottory.id)
  }

  //下拉选择彩种
  triggleMenu() {
    this.lcData.isDrop = !this.lcData.isDrop;
  }

  //下拉刷新
  doRefresh(refresher: Refresher) {
    console.log(this.lcData.currentNav)
    console.log(this.lcData.currentLottory.id)
    this.createDynComponent(this.lcData.currentNav, this.lcData.currentLottory.id)
    setTimeout(() => {
      refresher.complete()
    }, 2000)

  }



  //创建动态组件
  createDynComponent(componentName, id) {
    this.dynLottoryComponent.clear()
    const dynComp = this.resolver.resolveComponentFactory(componentName)
    this.dynComponent = this.dynLottoryComponent.createComponent(dynComp, 0);

    this.homeprv.http.fetchData('/api-lotteries-h5/load-issues/' + id + '?count=90&sort=asc').then(data => {
      this.lcData.resultsData = {data: []};
      if (data.IsSuccess == 1) {

        console.log(this.lcData.currentLottory.group)
        this.lcData.resultsData = data;
        if (this.lcData.currentLottory.group == 'SSC') {

          for (let i = 0, len = data.data.length; i < len; i++) {
            this.lcData.resultsData.data[i].code = data.data[i].code.split('');
            this.lcData.resultsData.data[i].sum = 0;
            for (let j = 0, len1 = this.lcData.resultsData.data[i].code.length; j < len1; j++) {
              this.lcData.resultsData.data[i].sum += parseInt(this.lcData.resultsData.data[i].code[j])
            }
          }

        } else if (this.lcData.currentLottory.group == 'K3') {

          let k3numList = ['1', '2', '3', '4', '5', '6']
          // this.lcData.resultsData.data = data.data.reverse()
          this.lcData.resultsData.data = data.data
          // this.lcData.resultsDatadata[i].shapeData = []
          for (let i = 0, len = data.data.length; i < len; i++) {
            this.lcData.resultsData.data[i].blanket = [0, 0, 0, 0, 0, 0]
            this.lcData.resultsData.data[i].code = data.data[i].code.split('');
            this.lcData.resultsData.data[i].sum = 0;
            //跨度
            this.lcData.resultsData.data[i].spacing = parseInt(this.lcData.resultsData.data[i].code[2]) - parseInt(this.lcData.resultsData.data[i].code[0]);
            //形态数组去重
            this.lcData.resultsData.data[i].shapeData = Array.from(new Set(this.lcData.resultsData.data[i].code));
            for (let j = 0, len1 = this.lcData.resultsData.data[i].code.length; j < len1; j++) {
              this.lcData.resultsData.data[i].sum += parseInt(this.lcData.resultsData.data[i].code[j])

              for (let k = 0, len2 = k3numList.length; k < len2; k++) {

                if (this.lcData.resultsData.data[i].code[j] == k3numList[k]) {
                  // console.log(this.lcData.resultsData.data[i].code[j])
                  this.lcData.resultsData.data[i].blanket[k3numList[k] - 1]++
                }
              }
            }

          }
          this.dynComponent.instance.lottoryId = this.lcData.currentLottory.id;

        } else if (this.lcData.currentLottory.group == 'LHC') {
          for (let i = 0, len = data.data.length; i < len; i++) {
            this.lcData.resultsData.data[i].code = data.data[i].code.split(' ');
          }

        } else if (this.lcData.currentLottory.group == '11Y') {
          for (let i = 0, len = data.data.length; i < len; i++) {
            this.lcData.resultsData.data[i].code = data.data[i].code.split(' ').sort();

            this.lcData.resultsData.data[i].sum = 0;
            this.lcData.resultsData.data[i].spacing = parseInt(this.lcData.resultsData.data[i].code[4]) - parseInt(this.lcData.resultsData.data[i].code[0]);//跨度
            this.lcData.resultsData.data[i].big = 0;//大
            this.lcData.resultsData.data[i].small = 0;//小
            this.lcData.resultsData.data[i].odd = 0;//单
            this.lcData.resultsData.data[i].even = 0;//双

            for (let j = 0, len1 = this.lcData.resultsData.data[i].code.length; j < len1; j++) {
              this.lcData.resultsData.data[i].sum += parseInt(this.lcData.resultsData.data[i].code[j])
              if (parseInt(this.lcData.resultsData.data[i].code[j]) > 5) {
                this.lcData.resultsData.data[i].big++;
              } else {
                this.lcData.resultsData.data[i].small++;
              }
              if (parseInt(this.lcData.resultsData.data[i].code[j]) % 2 == 0) {
                this.lcData.resultsData.data[i].even++;
              } else {
                this.lcData.resultsData.data[i].odd++;
              }
            }
          }
          this.dynComponent.instance.lottoryId = this.lcData.currentLottory.id;

        } else {

          for (let i = 0, len = data.data.length; i < len; i++) {
            this.lcData.resultsData.data[i].code = data.data[i].code.split(',');
            this.lcData.resultsData.data[i].sum = parseInt(this.lcData.resultsData.data[i].code[0]) + parseInt(this.lcData.resultsData.data[i].code[1]);
          }

        }
        this.dynComponent.instance.resultsData = this.lcData.resultsData;
        console.log(this.lcData.resultsData)
      } else {
        this.loadingPrvd.showToast(this.toastCtrl, '哎呦喂，网络是不是开小差了')
      }
    })
  }


  //改变导航
  changeNav(data) {
    console.log(data)
    return this.navData = data
  }

  //改变动态组件
  changeDynComponent(_index, nav) {

    for (let i = 0; i < this.navData.length; i++) {
      this.navData[i].flag = false;
    }
    this.lcData.currentNav = nav.c;
    this.lcData.currentNavIndex = _index;
    this.currentNav(this.lcData.currentNavIndex);
    this.createDynComponent(nav.c, this.lcData.currentLottory.id)
  }

  //切换导航的索引状态
  currentNav(_index) {
    this.navData[_index].flag = true;
  }

  // 彩种切换
  switchLottory(_lottory) {

    console.log(_lottory)
    this.lcData.currentLottory = _lottory;
    localStorage.lottoryId = this.lcData.currentLottory.id;
    this.lcData.isDrop = false;
    this.clearLottoryStatus();
    _lottory.flag = true;
    // 切换导航内容
    this.navData = this.homeprv.homeData.lottoryList[_lottory.group].nav;
    //当前显示的第一个导航
    this.lcData.currentNav = this.navData[0].c
    //k3样式切换
    _lottory.group == 'K3' ? this.lcData.isK3 = true : this.lcData.isK3 = false;
    //创建组件
    this.createDynComponent(this.lcData.currentNav, this.lcData.currentLottory.id)
  }


  //清楚彩种状态
  clearLottoryStatus() {
    for (let item in this.homeprv.homeData.lottoryList) {
      for (let i = 0; i < this.homeprv.homeData.lottoryList[item].length; i++) {
        this.homeprv.homeData.lottoryList[item][i].flag = false;
      }
    }
  }

}
