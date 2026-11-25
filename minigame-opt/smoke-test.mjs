import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const noop=()=>{};
let drawCalls=0, fillTextCalls=0;
const ctx=new Proxy({}, { get:(t,k)=>{
  if(k==='canvas') return {width:1280,height:720};
  if(k==='measureText') return ()=>({width:10});
  if(k==='fillText'||k==='strokeText') return ()=>{fillTextCalls++};
  if(k==='fillRect'||k==='strokeRect'||k==='drawImage'||k==='fill'||k==='stroke'||k==='arc'||k==='fillText') { return ()=>{drawCalls++}; }
  if(k==='createLinearGradient'||k==='createRadialGradient'||k==='createPattern') return ()=>({addColorStop:noop});
  if(k==='getImageData') return ()=>({data:new Uint8ClampedArray(4)});
  return ()=>{};
}, set:()=>true });
const canvas={ width:1280,height:720, getContext:()=>ctx, style:{}, addEventListener:noop, removeEventListener:noop };
const listeners={};
const wx=new Proxy({
  getWindowInfo:()=>({windowWidth:1280,windowHeight:720,pixelRatio:2}),
  getSystemInfoSync:()=>({windowWidth:1280,windowHeight:720,pixelRatio:2}),
  createCanvas:()=>canvas,
  createWebAudioContext:()=>({createOscillator:()=>({connect:noop,start:noop,stop:noop,frequency:{value:0},type:''}),createGain:()=>({connect:noop,gain:{value:0,setValueAtTime:noop,linearRampToValueAtTime:noop}}),destination:{},currentTime:0,resume:noop}),
  getStorageSync:()=>null, setStorageSync:noop, removeStorageSync:noop,
  onTouchStart:(f)=>{listeners.ts=f}, onTouchMove:(f)=>{listeners.tm=f}, onTouchEnd:(f)=>{listeners.te=f}, onTouchCancel:noop,
  onShow:noop, onHide:noop, vibrateShort:noop, showToast:noop,
  createRewardedVideoAd:()=>({load:()=>Promise.resolve(),show:()=>Promise.resolve(),onClose:noop,offClose:noop}),
  getLaunchOptionsSync:()=>({scene:1001,query:{}}),
}, { get:(t,k)=> k in t ? t[k] : ()=>{} });
const sandbox={
  console, wx, Math, Date, JSON, Object, Array, Number, String, Boolean, Set, Map, WeakMap, Uint8Array, Uint8ClampedArray, Float32Array, Int32Array, Promise, Proxy, Symbol, RegExp, Error, isFinite, parseInt, parseFloat,
  setTimeout, clearTimeout,
  document:{ createElement:(t)=>t==='canvas'?{getContext:()=>ctx,style:{},width:1280,height:720}:{style:{},appendChild:noop,setAttribute:noop}, addEventListener:noop, removeEventListener:noop, getElementById:()=>({style:{}}) },
  navigator:{maxTouchPoints:5},
  Image:class{constructor(){this.style={}} set src(v){this._s=v;} get src(){return this._s}},
  Path2D:class{moveTo(){}lineTo(){}arc(){}closePath(){}},
};
sandbox.window=sandbox; sandbox.globalThis=sandbox;
let errors=[];
process.on('uncaughtException', e=>{ errors.push('uncaught: '+e.message); });
const code=readFileSync(resolve(__dirname,'dist/game.js'),'utf8');
vm.createContext(sandbox);
vm.runInContext(code, sandbox, {filename:'game.js'});
console.log('✓ game.js 加载成功');
await new Promise(r=>setTimeout(r,600));
console.log('✓ 运行 600ms');
console.log('  Canvas 绘制调用次数:', drawCalls, '| 文字绘制:', fillTextCalls);
console.log('  未捕获异常:', errors.length? errors.join(' | ') : '无');
if (drawCalls===0) { console.log('✗ 没有任何绘制，主循环可能未渲染'); process.exitCode=1; }
else console.log('✓ 主循环正常渲染（游戏画面已绘制）');
process.exit(process.exitCode||0);
