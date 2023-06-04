// mobile.js

import { checkCdnAvailability, updateVideoSrc } from './cdn.js';

// 初始化
checkCdnAvailability(updateVideoSrc); // 初始化时检测 CDN 域名的可用性，并更新视频链接
supportBackgroundPlay(); // 如果是手机端，则支持所有手机 H5 端背景播放

// 绑定事件
window.addEventListener('resize', updateVideoSrc); // 当窗口大小发生变化时，更新视频链接

// 支持所有手机 H5 端背景播放
function supportBackgroundPlay() {
  const video = document.getElementById('my-video'); // 获取视频元素
  const playPromise = video.play(); // 尝试播放视频
  if (playPromise !== undefined) { // 如果 video.play() 返回一个 Promise 对象
    playPromise.then(() => { // 如果 Promise 对象状态变为 resolved，则说明可以播放视频
      video.muted = true; // 静音播放
    }).catch(() => {
      // 忽略 Promise 对象状态变为 rejected 的情况，因为这通常是因为 autoplay 被浏览器阻止而导致的
    });
  }
}
