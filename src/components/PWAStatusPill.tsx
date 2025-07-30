import { AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
export function PWAStatusPill() {
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

  const [isRemoving, setIsRemoving] = useState(false);
  useEffect(() => {
    let timeout: number;
    if (isRemoving) {
      timeout = setTimeout(() => {
        setOfflineReady(false);
        setNeedRefresh(false);
      }, 1500); // 1.2s for animation + 300ms for fade out
    }
    return () => clearTimeout(timeout);
  }, [isRemoving, setNeedRefresh, setOfflineReady]);

  const handleRemove = () => {
    setIsRemoving(true);
  };
  function close() {
    handleRemove();
  }

  return (
    <div className="flex w-full items-center justify-center">
      {(offlineReady || needRefresh) && (
        <div
          className="circle-to-pill flex w-full gap-2 bg-gray-100 border border-gray-300"
          data-remove={isRemoving ? true : undefined}
        >
          <div role="alert" className="alert-sm alert bg-white border border-gray-200">
            <AlertCircle className="text-blue-600" />
            {offlineReady ? (
              <span className="line-clamp-1 text-gray-700 font-medium">
                App is ready to work offline
              </span>
            ) : (
              <span className="line-clamp-1 text-gray-700 font-medium">
                New content available, click reload to update
              </span>
            )}
            <div className="flex items-center justify-center gap-2">
              {needRefresh && (
                <button
                  className="btn btn-sm bg-blue-600 text-white border-none"
                  onClick={() => {
                    updateServiceWorker(true);
                    handleRemove();
                  }}
                >
                  Reload
                </button>
              )}

              <button
                className="btn btn-outline btn-sm"
                onClick={() => {
                  close();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 */
function registerPeriodicSync(
  period: number,
  swUrl: string,
  r: ServiceWorkerRegistration,
) {
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
