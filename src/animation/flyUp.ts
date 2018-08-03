import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/animations'

export const flyUp = trigger('flyUp', [
  state('in', style({transform: 'translateY(100%)'})), // 默认平移0
  transition('void => *', [ // 进场动画
    animate(400, keyframes([
      style({opacity: 0, transform: 'translateY(100%)'}),
      style({opacity: 1, transform: 'translateY(0)'})
    ]))
  ]),
  transition('* => void', [ // 离场动画
    animate(400, keyframes([
      style({opacity: 1, transform: 'translateY(0)'}),
      style({opacity: 0, transform: 'translateY(100%)'})
    ]))
  ])

]);



// export const flyIn = trigger('flyIn', [
//   state('in', style({transform: 'translate(100%)'})), // 默认平移0
//
//   transition('void => *', [ // 进场动画
//     animate(300, keyframes([
//       style({opacity: 0, transform: 'translateY(-100%)', offset: 0}),
//       style({opacity: 1, transform: 'translateY(-50%)',  offset: 0.3}),
//       style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
//     ]))
//   ]),
//   transition('* => void', [ // 离场动画
//     animate(300, keyframes([
//       style({opacity: 1, transform: 'translateY(0)',     offset: 0}),
//       style({opacity: 1, transform: 'translateY(50%)', offset: 0.7}),
//       style({opacity: 0, transform: 'translateY(100%)',  offset: 1.0})
//     ]))
//   ])
//
// ]);

// export const flyOut = trigger('flyOut', [
//   state('in', style({transform: 'translate(0)'})), // 默认平移0
//
//   transition('void => *', [ // 进场动画
//     animate(300, keyframes([
//       style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
//       style({opacity: 1, transform: 'translateX(25px)',  offset: 0.3}),
//       style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
//     ]))
//   ]),
//   transition('* => void', [ // 离场动画
//     animate(300, keyframes([
//       style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
//       style({opacity: 1, transform: 'translateX(-25px)', offset: 0.7}),
//       style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
//     ]))
//   ])
//
// ]);


















































