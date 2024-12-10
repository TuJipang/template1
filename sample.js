window.googletag = window.googletag || { cmd: [] };
let interstitialSlot;

googletag.cmd.push(() => {
  interstitialSlot = googletag.defineOutOfPageSlot(
    "/6355419/Travel/Europe/France/Paris",
    googletag.enums.OutOfPageFormat.INTERSTITIAL,
  );

  if (interstitialSlot) {
    interstitialSlot.addService(googletag.pubads()).setConfig({
      interstitial: {
        triggers: {
          navBar: true,
          unhideWindow: true,
        },
      },
    });

    document.getElementById("status").textContent = "Interstitial is loading...";


    googletag.pubads().addEventListener("slotOnload", (event) => {
      console.log(event);
      // if (interstitialSlot === event.slot) {
      //   document.getElementById("link").style.display = "block";
      //   document.getElementById("status").textContent = "Interstitial is loaded.";
      // }
    });

  }

  googletag
    .defineSlot("/6355419/Travel/Europe", [100, 100], "static-ad-1")
    .addService(googletag.pubads());


  googletag.pubads().enableSingleRequest();
  googletag.enableServices();

  googletag.display(interstitialSlot);
});
