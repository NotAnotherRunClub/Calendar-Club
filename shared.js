/* shared.js — helpers used by index.html (public page) and editor.html (organisers). */
(function () {
'use strict';
const DAYS = 24;

/* ===== CITIES (name|aliases ; lat ; lon) — used to place dots on the map ===== */
const CITY_SRC = `
Budapest|Bp|Buda|Pest;47.4979;19.0402
Debrecen;47.5316;21.6273
Szeged;46.2530;20.1414
Miskolc;48.1035;20.7784
Pécs;46.0727;18.2323
Győr;47.6875;17.6504
Nyíregyháza;47.9554;21.7167
Kecskemét;46.8964;19.6897
Székesfehérvár;47.1860;18.4221
Szombathely;47.2307;16.6218
Szolnok;47.1621;20.1825
Tatabánya;47.5692;18.4048
Kaposvár;46.3594;17.7968
Érd;47.3919;18.9136
Veszprém;47.0933;17.9115
Békéscsaba;46.6847;21.0987
Zalaegerszeg;46.8417;16.8416
Sopron;47.6817;16.5845
Eger;47.9025;20.3772
Nagykanizsa;46.4590;16.9897
Dunaújváros;46.9619;18.9355
Hódmezővásárhely;46.4181;20.3303
Salgótarján;48.0936;19.8003
Cegléd;47.1726;19.7977
Baja;46.1803;18.9547
Esztergom;47.7928;18.7406
Gödöllő;47.5974;19.3600
Szentendre;47.6694;19.0756
Vác;47.7757;19.1355
Siófok;46.9049;18.0580
Balatonfüred;46.9610;17.8719
Keszthely;46.7684;17.2437
Mosonmagyaróvár;47.8689;17.2689
Gyöngyös;47.7826;19.9330
Budaörs;47.4619;18.9531
Szigetszentmiklós;47.3447;19.0447
Gyula;46.6483;21.2830
Kiskunfélegyháza;46.7114;19.8517
Ajka;47.1011;17.5586
Paks;46.6217;18.8573
Tata;47.6492;18.3194
Törökbálint;47.4392;18.9153
Szekszárd;46.3474;18.7062
Orosháza;46.5650;20.6672
Hatvan;47.6672;19.6833
Szentes;46.6541;20.2610
Mezőkövesd;47.8167;20.5667
Kazincbarcika;48.2500;20.6167
Ózd;48.2167;20.3000
Jászberény;47.5000;19.9167
Várpalota;47.2000;18.1333
Gárdony;47.2000;18.6167
Velence;47.2333;18.6500
Balatonalmádi;47.0333;18.0167
Hévíz;46.7900;17.1900
Tihany;46.9122;17.8903
Visegrád;47.7853;18.9700
Pilisvörösvár;47.6167;18.9167
Budakeszi;47.5111;18.9289
Biatorbágy;47.4667;18.8167
Gyál;47.3833;19.2167
Dunakeszi;47.6333;19.1333
Vienna|Wien|Bécs|Becs;48.2082;16.3738
Bratislava|Pozsony;48.1486;17.1077
Prague|Praha|Prága|Praga;50.0755;14.4378
Berlin;52.5200;13.4050
Munich|München|Munchen|Múnchen;48.1351;11.5820
Mainz;49.9929;8.2473
Frankfurt;50.1109;8.6821
Hamburg;53.5511;9.9937
Cologne|Köln|Koeln;50.9375;6.9603
Stuttgart;48.7758;9.1829
Dresden;51.0504;13.7373
Leipzig;51.3397;12.3731
Düsseldorf|Dusseldorf;51.2277;6.7735
Heidelberg;49.3988;8.6724
Nuremberg|Nürnberg|Nurnberg;49.4521;11.0767
Zagreb|Zágráb|Zagrab;45.8150;15.9819
Ljubljana;46.0569;14.5058
Belgrade|Beograd|Belgrád;44.7866;20.4489
Novi Sad|Újvidék|Ujvidek;45.2671;19.8335
Subotica|Szabadka;46.1000;19.6667
Bucharest|București|Bukarest;44.4268;26.1025
Cluj-Napoca|Cluj|Kolozsvár|Kolozsvar;46.7712;23.6236
Timișoara|Timisoara|Temesvár|Temesvar;45.7489;21.2087
Oradea|Nagyvárad|Nagyvarad;47.0465;21.9189
Satu Mare|Szatmárnémeti;47.7928;22.8853
Târgu Mureș|Targu Mures|Marosvásárhely|Marosvasarhely;46.5456;24.5625
Miercurea Ciuc|Csíkszereda|Csikszereda;46.3600;25.8000
Sfântu Gheorghe|Sepsiszentgyörgy;45.8650;25.7870
Sibiu|Nagyszeben;45.7983;24.1256
Brașov|Brasov|Brassó|Brasso;45.6427;25.5887
Sofia;42.6977;23.3219
Warsaw|Warszawa|Varsó|Varso;52.2297;21.0122
Kraków|Krakow|Krakkó|Krakko;50.0647;19.9450
Wrocław|Wroclaw;51.1079;17.0385
Gdańsk|Gdansk;54.3520;18.6466
Rome|Roma|Róma;41.9028;12.4964
Milan|Milano|Milánó|Milano;45.4642;9.1900
Venice|Venezia;45.4408;12.3155
Florence|Firenze;43.7696;11.2558
Turin|Torino;45.0703;7.6869
Naples|Napoli;40.8518;14.2681
Paris|Párizs|Parizs;48.8566;2.3522
Lyon;45.7640;4.8357
Marseille;43.2965;5.3698
Nice;43.7102;7.2620
London;51.5074;-0.1278
Manchester;53.4808;-2.2426
Edinburgh;55.9533;-3.1883
Dublin;53.3498;-6.2603
Madrid;40.4168;-3.7038
Barcelona;41.3874;2.1686
Valencia;39.4699;-0.3763
Seville|Sevilla;37.3891;-5.9845
Lisbon|Lisboa;38.7223;-9.1393
Porto;41.1579;-8.6291
Amsterdam;52.3676;4.9041
Rotterdam;51.9244;4.4777
Brussels|Bruxelles;50.8503;4.3517
Antwerp;51.2194;4.4025
Luxembourg;49.6116;6.1319
Zürich|Zurich;47.3769;8.5417
Geneva|Genf;46.2044;6.1432
Bern;46.9480;7.4474
Basel;47.5596;7.5886
Innsbruck;47.2692;11.4041
Salzburg;47.8095;13.0550
Graz;47.0707;15.4395
Linz;48.3069;14.2858
Copenhagen|Koppenhága|Koppenhaga;55.6761;12.5683
Stockholm;59.3293;18.0686
Gothenburg|Göteborg;57.7089;11.9746
Oslo;59.9139;10.7522
Helsinki;60.1699;24.9384
Tallinn;59.4370;24.7536
Riga;56.9496;24.1052
Vilnius;54.6872;25.2797
Athens|Athén|Athen;37.9838;23.7275
Thessaloniki;40.6401;22.9444
Istanbul;41.0082;28.9784
Ankara;39.9334;32.8597
Kyiv|Kiev;50.4501;30.5234
Lviv;49.8397;24.0297
Uzhhorod|Ungvár|Ungvar;48.6208;22.2879
Berehove|Beregszász|Beregszasz;48.2064;22.6439
Mukachevo|Munkács|Munkacs;48.4439;22.7178
Košice|Kosice|Kassa;48.7164;21.2611
Komárom|Komarno|Komárno;47.7432;18.1196
Dunajská Streda|Dunaszerdahely;47.9922;17.6178
Nitra|Nyitra;48.3069;18.0864
Banská Bystrica|Besztercebánya;48.7364;19.1462
Tbilisi;41.7151;44.8271
Chișinău|Chisinau;47.0105;28.8638
Sarajevo;43.8563;18.4131
Skopje;41.9981;21.4254
Tirana;41.3275;19.8187
Podgorica;42.4304;19.2594
Split;43.5081;16.4402
Dubrovnik;42.6507;18.0944
Reykjavik;64.1466;-21.9426
New York;40.7128;-74.0060
Los Angeles;34.0522;-118.2437
Chicago;41.8781;-87.6298
San Francisco;37.7749;-122.4194
Boston;42.3601;-71.0589
Washington;38.9072;-77.0369
Toronto;43.6532;-79.3832
Vancouver;49.2827;-123.1207
Mexico City;19.4326;-99.1332
São Paulo|Sao Paulo;-23.5505;-46.6333
Buenos Aires;-34.6037;-58.3816
Dubai;25.2048;55.2708
Tel Aviv;32.0853;34.7818
Cairo;30.0444;31.2357
Cape Town;-33.9249;18.4241
Nairobi;-1.2921;36.8219
Mumbai;19.0760;72.8777
Delhi;28.6139;77.2090
Bangkok;13.7563;100.5018
Singapore;1.3521;103.8198
Hong Kong;22.3193;114.1694
Shanghai;31.2304;121.4737
Beijing;39.9042;116.4074
Tokyo;35.6762;139.6503
Seoul;37.5665;126.9780
Sydney;-33.8688;151.2093
Melbourne;-37.8136;144.9631
Auckland;-36.8509;174.7645
`;

const norm = (t) => String(t == null ? '' : t).toLowerCase()
  .replace(/ł/g, 'l').replace(/ø/g, 'o').replace(/ß/g, 'ss').replace(/đ/g, 'd').replace(/æ/g, 'ae').replace(/œ/g, 'oe')
  .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const pad2 = (n) => String(n).padStart(2, '0');
const fmtKm = (n) => n == null ? '—' : n.toFixed(2);
const fmtTime = (sec) => { if (sec == null) return '—'; sec = Math.round(sec); const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60; return h + ':' + pad2(m) + ':' + pad2(s); };
const fmtPace = (p) => { if (p == null || !isFinite(p)) return '—'; const t = Math.round(p); return Math.floor(t / 60) + ':' + pad2(t % 60); };
const fmtInt = (n) => n == null ? '—' : String(Math.round(n));
function parseNum(v) { if (v == null) return null; const t = String(v).trim().replace(/\s/g, '').replace(',', '.'); if (t === '') return null; const n = Number(t); return Number.isFinite(n) ? n : NaN; }
function parseTime(v) {
  const t = String(v == null ? '' : v).trim(); if (!t) return null;
  let m = t.match(/^(\d{1,2}):(\d{2}):(\d{2})$/);
  if (m) { const a = +m[1], b = +m[2], c = +m[3]; return (b < 60 && c < 60) ? a * 3600 + b * 60 + c : NaN; }
  m = t.match(/^(\d{1,3}):(\d{2})$/);
  if (m) { const b = +m[1], c = +m[2]; return c < 60 ? b * 60 + c : NaN; }
  return NaN;
}
const newId = () => 'r' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

const CITIES = new Map(); const CITY_LIST = [];
for (const line of CITY_SRC.trim().split('\n')) {
  const [names, lat, lon] = line.split(';'); const arr = names.split('|');
  const rec = { name: arr[0], lat: +lat, lon: +lon }; CITY_LIST.push(rec);
  for (const n of arr) CITIES.set(norm(n), rec);
}
const cityKey = (c) => { const t = CITIES.get(norm(c)); return norm(t ? t.name : c); };

/* sanitise one entry coming from data.json (never trust the file blindly).
   An entry says whether the runner FINISHED that day's distance (done) and, optionally, the time it took (sec).
   `km` is derived: a finished day is worth its own number (day 7 = 7 km), an unfinished one 0. */
function clean(id, d) {
  if (!d || typeof d !== 'object') return null;
  const day = Math.round(+d.day);
  if (!(day >= 1 && day <= DAYS)) return null;
  const str = (x, n) => String(x == null ? '' : x).trim().slice(0, n);
  const num = (x, lo, hi) => { if (x == null || x === '') return null; x = +x; return Number.isFinite(x) && x >= lo && x <= hi ? x : null; };
  const name = str(d.name, 80); if (!name) return null;
  let done = d.done;
  if (typeof done !== 'boolean') { const k = +d.km; done = Number.isFinite(k) && k > 0 ? k >= day - 1e-9 : false; } // old-style entry that still carries km
  return { id: str(id || d.id, 40), name, city: str(d.city, 80), day, done, km: done ? day : 0, sec: done ? num(d.sec, 1, 172800) : null, lat: num(d.lat, -90, 90), lon: num(d.lon, -180, 180), at: +(d.at || d.createdAt) || 0 };
}

/* "yes" / "no" in a few spellings (English, Hungarian, ticks) -> true / false / null */
function parseDone(v) {
  if (typeof v === 'boolean') return v;
  const raw = String(v == null ? '' : v).trim();
  if (/^[✓✔☑]/.test(raw)) return true;
  if (/^[✗✘✕×☐]/.test(raw)) return false;
  const t = raw.toLowerCase();
  if (['1', 'yes', 'y', 'true', 'igen', 'i', 'x', 'done', 'finished', 'ok'].includes(t)) return true;
  if (['0', 'no', 'n', 'false', 'nem', '-', 'not finished', 'fail'].includes(t)) return false;
  return null;
}

/* validate + normalise a hand-typed result. `known(city)` returns {lat,lon} or null. */
function buildRecord(x, known) {
  const name = String(x.name || '').trim(); if (!name) return { error: 'Runner name is missing' };
  const city = String(x.city || '').trim(); if (!city) return { error: 'City is missing' };
  const day = /^\d{1,2}$/.test(String(x.day).trim()) ? parseInt(x.day, 10) : NaN; if (!(day >= 1 && day <= DAYS)) return { error: 'Day must be 1–24' };
  const done = parseDone(x.done); if (done == null) return { error: 'Finished the distance? Use yes or no' };
  const sec = done ? parseTime(x.time) : null; if (Number.isNaN(sec)) return { error: 'Time must look like 0:38:20 or 38:20' };
  let lat = parseNum(x.lat), lon = parseNum(x.lon);
  if (lat == null || lon == null) { const t = known(city); if (!t) return { error: `“${city}” is not in the city list — add latitude and longitude`, needCoords: true }; lat = t.lat; lon = t.lon; }
  if (!(lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180)) return { error: 'Coordinates are out of range' };
  return { value: { name: name.slice(0, 80), city: city.slice(0, 80), day, done, sec, lat: Math.round(lat * 1e4) / 1e4, lon: Math.round(lon * 1e4) / 1e4 } };
}

/* fictional sample data — used by ?demo on the public page and #demo in the editor */
function demoEntries(upTo) {
  upTo = upTo || 9;
  let a = 20261125; const rnd = () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const names = ['Kovács Anna', 'Nagy Bence', 'Szabó Dóra', 'Tóth Gergő', 'Varga Hanna', 'Horváth Márk', 'Kiss Lilla', 'Molnár Dávid', 'Németh Réka', 'Farkas Zsombor', 'Balogh Eszter', 'Papp Máté', 'Takács Fanni', 'Juhász Ádám', 'Mészáros Boglárka', 'Oláh Levente', 'Simon Nóra', 'Rácz Péter', 'Fehér Kata', 'Gulyás Tamás', 'Biró Vivien', 'Lukács Olivér', 'Török Zsófia', 'Fekete Bálint', 'Sándor Luca', 'Kelemen Soma'];
  const cities = ['Budapest', 'Budapest', 'Budapest', 'Budapest', 'Budapest', 'Debrecen', 'Szeged', 'Pécs', 'Győr', 'Miskolc', 'Vienna', 'Mainz', 'Berlin', 'London', 'Cluj-Napoca', 'Zagreb'];
  const out = []; const t0 = 1764000000000; let n = 0;
  names.forEach((nm, i) => {
    const city = cities[Math.floor(rnd() * cities.length)], grit = 0.55 + rnd() * 0.45, pace = 290 + rnd() * 150;
    for (let d = 1; d <= upTo; d++) {
      if (rnd() > grit + (d < 4 ? .3 : 0)) continue;
      const c = rnd() < .12 ? cities[Math.floor(rnd() * cities.length)] : city, k = CITIES.get(norm(c));
      const done = rnd() < 0.9, sec = done && rnd() > 0.06 ? Math.round(d * pace * (0.97 + rnd() * .08)) : null;
      out.push({ id: 'demo' + (++n), name: nm, city: c, day: d, done, sec, lat: k.lat, lon: k.lon, at: t0 + (d * 100 + i) * 60000 });
    }
  });
  return out;
}

window.CC = { DAYS, norm, pad2, fmtKm, fmtTime, fmtPace, fmtInt, parseNum, parseTime, parseDone, newId, CITIES, CITY_LIST, cityKey, clean, buildRecord, demoEntries };
})();
