// pc.js

import { checkCdnAvailability, updateVideoSrc } from './cdn.js';

// 初始化
checkCdnAvailability(updateVideoSrc); // 初始化时检测 CDN 域名的可用性，并更新视频链接

// 绑定事件
window.addEventListener('resize', updateVideoSrc); // 当窗口大小发生变化时，更新视频链接
