// Shared helpers for Jyoti's daily pages. Data is stored only in this browser (localStorage).
(function () {
  var J = (window.J = {});

  J.today = function (d) {
    d = d || new Date();
    var m = d.getMonth() + 1, day = d.getDate();
    return d.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (day < 10 ? "0" : "") + day;
  };
  J.dt = function (key) {
    var p = key.split("-");
    return new Date(+p[0], +p[1] - 1, +p[2]);
  };
  J.shift = function (key, n) {
    var d = J.dt(key);
    d.setDate(d.getDate() + n);
    return J.today(d);
  };
  J.pretty = function (key) {
    return J.dt(key).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
  };
  J.load = function (k, def) {
    try {
      var v = localStorage.getItem("jyoti-" + k);
      return v ? JSON.parse(v) : def;
    } catch (e) { return def; }
  };
  J.save = function (k, v) {
    try { localStorage.setItem("jyoti-" + k, JSON.stringify(v)); return true; }
    catch (e) { return false; }
  };
  J.esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  J.moods = [
    null,
    { e: "😞", l: "Rough", c: "#ff6f6f" },
    { e: "😕", l: "Low", c: "#ffa86f" },
    { e: "😐", l: "Okay", c: "#ffd23f" },
    { e: "🙂", l: "Good", c: "#9be564" },
    { e: "😄", l: "Great", c: "#2ec4b6" }
  ];

  J.nav = function (active) {
    var links = [
      ["index.html", "Home", "home"],
      ["today.html", "Today", "today"],
      ["tasks.html", "Focus", "focus"],
      ["wins.html", "Wins", "wins"],
      ["history.html", "History", "history"]
    ];
    var el = document.getElementById("nav");
    if (!el) return;
    el.innerHTML = '<nav>' + links.map(function (l) {
      return '<a href="' + l[0] + '"' + (l[2] === active ? ' class="on"' : "") + ">" + l[1] + "</a>";
    }).join("") + "</nav>";
  };

  J.spark = function (x, y, n) {
    var set = ["✨", "⭐", "🎉", "💜", "🌟"];
    for (var i = 0; i < (n || 6); i++) {
      var s = document.createElement("span");
      s.className = "spark";
      s.textContent = set[Math.floor(Math.random() * set.length)];
      s.style.left = (x + (Math.random() * 80 - 40)) + "px";
      s.style.top = (y + (Math.random() * 30 - 15)) + "px";
      document.body.appendChild(s);
      setTimeout((function (e) { return function () { e.remove(); }; })(s), 1200);
    }
  };
})();
