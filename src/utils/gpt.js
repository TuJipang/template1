// ad.js
export function loadGPTScript(link,size,divId) {
  window.googletag = window.googletag || { cmd: [] };
  // console.log('注册',link,size,divId);
  var mapping1 = window.googletag.sizeMapping().
      addSize([0, 0],[390,size[1]], size).
      build();

  window.googletag.cmd.push(() => {
    window[divId] = window.googletag.defineSlot(link,size,divId)
    .setTargeting("test", "refresh")  // 刷新广告位
    .setCollapseEmptyDiv(true)
    .defineSizeMapping(mapping1)
    .addService(window.googletag.pubads());

    window.googletag.pubads().enableSingleRequest();
    window.googletag.enableServices();
  });
}

export function InterAdv() {
  window.googletag = window.googletag || { cmd: [] };
  googletag.cmd.push(() => {
    window.interstitialSlot = googletag.defineOutOfPageSlot(
      "/29746187/HK_CNxTW_bubblemobi.com_interstitial_320x480",
      // '/6355419/Travel/Europe/France/Paris',
      googletag.enums.OutOfPageFormat.INTERSTITIAL,
    );
    if (window.interstitialSlot) {
      window.interstitialSlot.addService(googletag.pubads()).setConfig({
        interstitial: {triggers: { navBar: true, unhideWindow: true,},},
      });
      googletag.pubads().addEventListener("slotOnload", (event) => {
        console.log('触发slotOnload。。。');
        if (window.interstitialSlot === event.slot) {
          console.log('跳转连接有效');
        }
      });

    }
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();

    googletag.display(window.interstitialSlot);
  });
}

export function InterAdv1() {
  googletag.cmd.push(() => {
    window.interstitialSlot = googletag.defineOutOfPageSlot(
      '/29746187/HK_CNxTW_bubblemobi.com_interstitial_320x480',
      googletag.enums.OutOfPageFormat.INTERSTITIAL,
    );
    console.log('===1',window.interstitialSlot);
    if (window.interstitialSlot) {
      window.interstitialSlot.addService(googletag.pubads()).setConfig({
        interstitial: {triggers: { navBar: false, unhideWindow: false,},},
      });
    }
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
    
  });
}
export function InterAdv2(flag) {
  console.log('flag',flag);
  googletag.cmd.push(() => {
    if (window.interstitialSlot) {
      window.interstitialSlot.addService(googletag.pubads()).setConfig({
        interstitial: {triggers: { navBar: flag, unhideWindow: flag,},},
      });
    }
    googletag.display(window.interstitialSlot);
  });
}
















export function clearAllSlots() {
  // console.log(123);
  googletag.cmd.push(() => {
    googletag.pubads().clear([window.interstitialSlot]);
  });
}

// export function refreshAllSlots() {
//   googletag.cmd.push(() => {
//     googletag.pubads().refresh();
//   });
// }


export function displayAd(divId) {
  // console.log('调用',divId);
  window.googletag.cmd.push(function() {
    window.googletag.display(divId);
  });
}