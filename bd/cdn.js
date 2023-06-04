// cdn.js

// CDN 域名列表
const cdnList = [
  'cdn.jsdelivr.net',
  'fastly.jsdelivr.net',
  'gcore.jsdelivr.net',
  'testingcf.jsdelivr.net'
];

// 可用的 CDN 域名列表
let availableCdnList = [];

// 检测 CDN 域名的可用性
export function checkCdnAvailability(callback) {
  availableCdnList = []; // 清空之前的可用 CDN 域名列表

  const promises = cdnList.map((cdn) => {
    const startTime = new Date().getTime(); // 记录开始时间
    return fetch(`https://${cdn}/gh/kaitey168/AG001@main/bd/static/picture/lila${isMobile() ? 'ih5' : 'ipc'}.mp4`, { method: 'HEAD' }) // 发送 HEAD 请求到 CDN 域名的视频链接
      .then((response) => {
        const endTime = new Date().getTime(); // 记录结束时间
        if (response.status === 200) { // 如果返回的状态码为 200，则说明该 CDN 域名可用
          availableCdnList.push({ cdn, time: endTime - startTime }); // 将可用的 CDN 域名和访问时间添加到可用 CDN 域名列表中
        }
      })
      .catch(() => {
        // 忽略 Promise 对象状态变为 rejected 的情况
      });
  });

  Promise.all(promises).then(() => {
    // 根据访问时间对可用 CDN 域名列表进行排序，选择访问时间最短的 CDN 域名
    availableCdnList.sort((a, b) => a.time - b.time);
    callback(); // 调用回调函数
  });
}

// 更新视频链接
export function updateVideoSrc() {
  const video = isMobile() ? document.getElementById('my-video') : document.querySelector('#video-background video'); // 获取视频元素
  const src = availableCdnList.length > 0 ? `https://${availableCdnList[0].cdn}/gh/kaitey168/AG001@main/bd/static/picture/lila${isMobile() ? 'ih5' : 'ipc'}.mp4` : 'https://xn--001-oi2jz4d.wxianlutiaozhuan.xyz/static/picture/lilaipc.mp4'; // 根据可用 CDN 域名列表动态构建视频链接
  video.src = src; // 更新视频链接
}
