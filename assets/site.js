/* Hartwell Labs — site behaviour.
   1. przyciski COPY w blokach .cmd
   2. link "Download for AI" — wersja markdownowa bieżącej strony (llms.txt) */
(function () {
  document.querySelectorAll(".cp").forEach(function (b) {
    b.addEventListener("click", function () {
      navigator.clipboard.writeText(b.dataset.code).then(function () {
        b.textContent = "COPIED";
        setTimeout(function () { b.textContent = "COPY"; }, 1400);
      });
    });
  });

  /* --- AI: .md twin każdej strony ---------------------------------------
     Każda strona ma plik <sama-strona>.md z pełną treścią i specyfikacją
     wyglądu. Użytkownik, który nie może podać AI linku do strony, klika
     "AI" i dostaje gotowy plik do wklejenia w czacie. Konwencja llmstxt.org */
  var path = location.pathname.replace(/\/+$/, "");
  var mdUrl = (path === "" ? "/index.md" : path + ".md") + "?download=1";
  var host = document.querySelector(".header-in");
  if (host) {
    var a = document.createElement("a");
    a.className = "ai-link";
    a.href = mdUrl;
    a.title = "Pobierz tę stronę jako .md dla chatu AI (llms.txt)";
    a.setAttribute("download", "");
    a.textContent = "AI";
    var cta = host.querySelector(".header-cta");
    if (cta) { cta.parentNode.insertBefore(a, cta); }
    else { host.appendChild(a); }
  }
  /* link w stopce — działa też bez JS */
  var foot = document.querySelector("footer .f-fine");
  if (foot && !foot.querySelector(".ai-foot")) {
    var s = document.createElement("span");
    s.className = "ai-foot";
    s.style.marginLeft = "18px";
    s.innerHTML = '<a href="/llms.txt" title="llms.txt — indeks wszystkich stron w markdownie">llms.txt</a>' +
      ' · <a href="/llms-full.txt" title="llms-full.txt — wszystkie strony w jednym pliku">llms-full.txt</a>';
    foot.appendChild(s);
  }
})();