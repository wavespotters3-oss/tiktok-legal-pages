const params = new URLSearchParams(window.location.search);

const code = params.get("code");
const error = params.get("error");
const errorReason = params.get("error_reason");
const errorDescription = params.get("error_description");

const successSection = document.getElementById("success");
const errorSection = document.getElementById("error");
const emptySection = document.getElementById("empty");

const codeTextarea = document.getElementById("code");
const errorText = document.getElementById("errorText");
const currentUrl = document.getElementById("currentUrl");
const copyButton = document.getElementById("copyCode");

currentUrl.textContent = window.location.href;

if (code) {
  successSection.classList.remove("hidden");
  codeTextarea.value = code;
} else if (error || errorReason || errorDescription) {
  errorSection.classList.remove("hidden");

  errorText.textContent = [
    error ? `error: ${error}` : null,
    errorReason ? `error_reason: ${errorReason}` : null,
    errorDescription ? `error_description: ${errorDescription}` : null
  ]
    .filter(Boolean)
    .join("\n");
} else {
  emptySection.classList.remove("hidden");
}

copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(codeTextarea.value);
    copyButton.textContent = "Skopiowano";
  } catch {
    codeTextarea.select();
    document.execCommand("copy");
    copyButton.textContent = "Skopiowano";
  }

  setTimeout(() => {
    copyButton.textContent = "Kopiuj code";
  }, 1500);
});