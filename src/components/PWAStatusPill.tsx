import { AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
export function PWAStatusPill(){
  const period = 60 * 60 * 1000;
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return;
      if (r?.active?.state === "activated") {
        registerPeriodicSync(period, swUrl, r);
      } else if (r?.installing) {
        r.installing.addEventListener("statechange", (e) => {
          const sw = e.target as ServiceWorker;
          if (sw.state === "activated") registerPeriodicSync(period, swUrl, r);
        });
      }
    },
  });

  console.log("offlineReady", offlineReady, "needRefresh", needRefresh);
  const [isVisible, setIsVisible] = useState(offlineReady || needRefresh);
  const [isRemoving, setIsRemoving] = useState(false);
  useEffect(() => {
    let timeout: number;
    if (isRemoving) {
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 1500); // 1.2s for animation + 300ms for fade out
    }
    return () => clearTimeout(timeout);
  }, [isRemoving]);

  const handleRemove = () => {
    setIsRemoving(true);
  };
  function close() {
    handleRemove();
    setOfflineReady(false);
    setNeedRefresh(false);
  }

  return (
    <div className="w-full flex justify-center items-center">
      {isVisible && (
        <div
          className="w-full flex gap-2 circle-to-pill bg-base-200 "
          data-remove={isRemoving ? true : undefined}>
          <div role="alert" className="alert alert-sm">
            <AlertCircle />
            {offlineReady ? (
              <span className="line-clamp-1">App ready to work offline</span>
            ) : (
              <span className="line-clamp-1">
                New content available, click on reload button to update.
              </span>
            )}
          </div>

          <div className="flex gap-2 justify-center items-center">
            {needRefresh && (
              <button
                className="btn btn-outline btn-sm"
                onClick={() => {
                  updateServiceWorker(true);
                  handleRemove();
                }}>
                Reload
              </button>
            )}

            <button
              className="btn btn-outline btn-sm"
              onClick={() => {
                close();
              }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};



/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 */
function registerPeriodicSync(period: number, swUrl: string, r: ServiceWorkerRegistration) {
  if (period <= 0) return;

  setInterval(async () => {
    if ("onLine" in navigator && !navigator.onLine) return;

    const resp = await fetch(swUrl, {
      cache: "no-store",
      headers: {
        cache: "no-store",
        "cache-control": "no-cache",
      },
    });

    if (resp?.status === 200) await r.update();
  }, period);
}
