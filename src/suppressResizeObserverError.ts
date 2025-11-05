// src/suppressResizeObserverError.ts
export {}; // <- torna o arquivo um módulo para --isolatedModules

if (process.env.NODE_ENV === "production") {
  const shouldIgnore = (msg?: string) =>
    !!msg &&
    (msg.includes(
      "ResizeObserver loop completed with undelivered notifications",
    ) ||
      msg.includes("ResizeObserver loop limit exceeded"));

  const onError = (e: ErrorEvent) => {
    if (shouldIgnore(e?.message)) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  };

  const onRejection = (e: PromiseRejectionEvent) => {
    const msg = (e?.reason && (e.reason.message || String(e.reason))) || "";
    if (shouldIgnore(msg)) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  };

  window.addEventListener("error", onError, true);
  window.addEventListener("unhandledrejection", onRejection, true);

  // (Opcional) filtra do console.error pra limpar o log
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    const first = args[0];
    if (typeof first === "string" && shouldIgnore(first)) return;
    originalError(...args);
  };
}
