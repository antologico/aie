console.log('[AIEE Extension] Loaded');

cost port = chrome.runtime.connect(null, { name: "content" });


setInterval(() => {
  if (window.aiee) {
    const prestances = JSON.stringify(window.aiee[0].getPrestances())
    const port = chrome.runtime.connect(null, { name: "content" });

    port.postMessage({
      action: "aiee",
      aiee: prestances,
      target: "panel",
    });
  }
}, 1000)
