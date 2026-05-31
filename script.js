const welcomeScreen = document.getElementById('welcomeScreen');
const menuScreen = document.getElementById('menuScreen');
const nextBtn = document.getElementById('nextBtn');
const backToTopBtn = document.getElementById('backToTop');
const wifiModal = document.getElementById('wifiModal');
const rouletteModal = document.getElementById('rouletteModal');
const floatingRollBtn = document.getElementById('floatingRollBtn');
const happyHourBar = document.getElementById('happyHourBar');
const luckyModal = document.getElementById('luckyModal');
const fallingContainer = document.getElementById('fallingBtnContainer');

let selectedLang = '';
let happyHourInterval = null;
let isHappyHourActive = false;

// VARIJABLE ZA SRETNI POPUST
let luckyInterval = null;
let isLuckyActive = false;
let luckyTimeLeft = 300; 

const translations = {
  bs: {
    welcome: 'Dobrodošli',
    subtitle: 'Odaberite jezik menija i istražite našu ponudu pića.',
    nextBtnText: 'Dalje',
    addressText: 'Maršala Tita 12, Sarajevo',
    hoursText: 'Pon - Ned: 07:00 - 23:00',
    wifiTitle: '🛜 Wi-Fi Informacije',
    wifiNet: 'Naziv mreže:',
    wifiPass: 'Lozinka:',
    wifiCopy: 'Kopiraj šifru',
    wifiCopied: 'Kopirano!',
    wifiClose: 'Zatvori',
    rouletteTitle: '🎲 Izaberi za mene',
    rouletteSub: 'Ne znate šta naručiti? Prepustite odluku našem ruletu sreće!',
    rouletteBtn: 'Pokreni rulet',
    rouletteRolling: 'Biram...',
    hhActiveBar: '🔥 HAPPY HOUR: SVI TOPLI NAPICI 2KM! Ističe za:',
    hhSoonBar: '🕒 Happy Hour počinje za:',
    hhActiveTimer: 'Akcija ističe za:',
    hhSoonTimer: 'Happy Hour počinje za:',
    luckyTitle: '🎉 Čestitamo!',
    luckyMessage: 'Ulovili ste skrivenu nagradu! Osvojili ste 20% popusta na bilo koji desert sa menija. Imate 5 minuta da je iskoristite!',
    luckyAccept: 'Prihvati',
    luckyDecline: 'Odbij',
    luckyTimerText: 'Sretni popust ističe za:',
    categories: {
      hot: 'Topli Napici', soda: 'Gazirana pića', juice: 'Cijeđeni sokovi',
      water: 'Vode', dessert: 'Deserti', beer: 'Pive', wine: 'Vina'
    },
    items: {
      espresso: 'Espresso', descEspresso: 'Klasična kafa',
      macchiato: 'Makiato', descMacchiato: 'Espresso sa malo mliječne pjene',
      cappuccino: 'Cappuccino', descCappuccino: 'Sa mliječnom pjenom',
      cola: 'Coca-Cola', descCola: 'Osvježavajuće gazirano piće',
      fanta: 'Fanta', descFanta: 'Sa ukusom narandže',
      sprite: 'Sprite', descSprite: 'Osvježavajući limun-limeta ukus',
      orange: 'Cijeđena narandža', descOrange: '100% prirodni sok od narandže',
      lemonade: 'Limunada', descLemonade: 'Svježe cijeđeni limun',
      mixJuice: 'Mix Meni', descMixJuice: 'Narandža, limun, grejp i med',
      waterStill: 'Negazirana voda', descWaterStill: 'Prirodna izvorska voda 0.33l',
      waterSpark: 'Gazirana voda', descWaterSpark: 'Mineralna gazirana voda 0.33l',
      waterFlav: 'Voda sa okusom', descWaterFlav: 'Lagani voćni okus',
      choco: 'Čokoladni kolač', descChoco: 'Bogati kolač sa belgijskom čokoladom',
      cheese: 'Cheesecake', descCheese: 'Lagani kolač sa sirom i šumskim voćem',
      pancakes: 'Palačinke', descPancakes: 'Sa Nutellom ili marmeladom',
      beerLocal: 'Domaće pivo', descBeerLocal: 'Svijetlo pivo, točeno ili flaširano 0.33l',
      beerPrem: 'Premium Lager', descBeerPrem: 'Vrhunsko uvozno pivo 0.33l',
      beerDark: 'Tamno pivo', descBeerDark: 'Bogati okus prženog slada 0.33l',
      wineWhite: 'Bijelo vino', descWineWhite: 'Vrhunsko suho bijelo vino 0.187l',
      wineRed: 'Crveno vino', descWineRed: 'Kvalitetno crno/crveno vino 0.187l',
      wineRose: 'Rose vino', descWineRose: 'Osvježavajuće i lagano rose vino 0.187l'
    }
  },
  en: {
    welcome: 'Welcome',
    subtitle: 'Choose your menu language and explore our drinks.',
    nextBtnText: 'Next',
    addressText: 'Marsala Tita 12, Sarajevo',
    hoursText: 'Mon - Sun: 07:00 - 23:00',
    wifiTitle: '🛜 Wi-Fi Information',
    wifiNet: 'Network Name:',
    wifiPass: 'Password:',
    wifiCopy: 'Copy Password',
    wifiCopied: 'Copied!',
    wifiClose: 'Close',
    rouletteTitle: '🎲 Choose for Me',
    rouletteSub: "Don't know what to order? Let our roulette wheel decide!",
    rouletteBtn: 'Spin Roulette',
    rouletteRolling: 'Choosing...',
    hhActiveBar: '🔥 HAPPY HOUR: ALL HOT DRINKS 2KM! Expires in:',
    hhSoonBar: '🕒 Happy Hour starts in:',
    hhActiveTimer: 'Offer ends in:',
    hhSoonTimer: 'Happy Hour starts in:',
    luckyTitle: '🎉 Congratulations!',
    luckyMessage: 'You caught a hidden reward! You got 20% off on any dessert from the menu. You have 5 minutes to use it!',
    luckyAccept: 'Accept',
    luckyDecline: 'Decline',
    luckyTimerText: 'Lucky discount expires in:',
    categories: {
      hot: 'Hot Drinks', soda: 'Carbonated Drinks', juice: 'Fresh Juices',
      water: 'Water', dessert: 'Desserts', beer: 'Beers', wine: 'Wines'
    },
    items: {
      espresso: 'Espresso', descEspresso: 'Classic coffee',
      macchiato: 'Macchiato', descMacchiato: 'Espresso with a bit of milk foam',
      cappuccino: 'Cappuccino', descCappuccino: 'With milk foam',
      cola: 'Coca-Cola', descCola: 'Refreshing carbonated drink',
      fanta: 'Fanta', descFanta: 'Orange flavored',
      sprite: 'Sprite', descSprite: 'Refreshing lemon-lime flavor',
      orange: 'Fresh Orange Juice', descOrange: '100% natural orange juice',
      lemonade: 'Lemonade', descLemonade: 'Freshly squeezed lemon',
      mixJuice: 'Mix Menu', descMixJuice: 'Orange, lemon, grapefruit and honey',
      waterStill: 'Still Water', descWaterStill: 'Natural spring water 0.33l',
      waterSpark: 'Sparkling Water', descWaterSpark: 'Mineral sparkling water 0.33l',
      waterFlav: 'Flavored Water', descWaterFlav: 'Light fruit flavor',
      choco: 'Chocolate Cake', descChoco: 'Rich cake with Belgian chocolate',
      cheese: 'Cheesecake', descCheese: 'Light cake with cheese and forest fruit',
      pancakes: 'Pancakes', descPancakes: 'With Nutella or marmalade',
      beerLocal: 'Local Beer', descBeerLocal: 'Light beer, draft or bottled 0.33l',
      beerPrem: 'Premium Lager', descBeerPrem: 'Premium imported beer 0.33l',
      beerDark: 'Dark Beer', descBeerDark: 'Rich roasted malt flavor 0.33l',
      wineWhite: 'White Wine', descWineWhite: 'Premium dry white wine 0.187l',
      wineRed: 'Red Wine', descWineRed: 'Quality red wine 0.187l',
      wineRose: 'Rose Wine', descWineRose: 'Refreshing and light rose wine 0.187l'
    }
  },
  de: {
    welcome: 'Willkommen',
    subtitle: 'Wählen Sie Ihre Sprache und entdecken Sie unser Angebot.',
    nextBtnText: 'Weiter',
    addressText: 'Marsala Tita 12, Sarajevo',
    hoursText: 'Mo - So: 07:00 - 23:00',
    wifiTitle: '🛜 Wi-Fi Informationen',
    wifiNet: 'Netzwerkname:',
    wifiPass: 'Passwort:',
    wifiCopy: 'Passwort kopieren',
    wifiCopied: 'Kopiert!',
    wifiClose: 'Schließen',
    rouletteTitle: '🎲 Wähle für mich',
    rouletteSub: 'Wissen Sie nicht, was Sie bestellen sollen? Lassen Sie das Glücksrad entscheiden!',
    rouletteBtn: 'Glücksrad drehen',
    rouletteRolling: 'Wähle...',
    hhActiveBar: '🔥 HAPPY HOUR LÄUFT! ALLE HEISSGETRÄNKE 2KM! Endet in:',
    hhSoonBar: '🕒 Happy Hour beginnt in:',
    hhActiveTimer: 'Aktion endet in:',
    hhSoonTimer: 'Happy Hour beginnt in:',
    luckyTitle: '🎉 Glückwunsch!',
    luckyMessage: 'Sie haben eine versteckte Belohnung gefangen! Sie erhalten 20% Rabatt auf alle Desserts der Speisekarte. Sie haben 5 Minuten Zeit, um es zu nutzen!',
    luckyAccept: 'Ablehnen',
    luckyDecline: 'Akzeptieren',
    luckyTimerText: 'Glücksrabatt endet in:',
    categories: {
      hot: 'Heißgetränke', soda: 'Erfrischungsgetränke', juice: 'Frische Säfte',
      water: 'Wasser', dessert: 'Desserts', beer: 'Biere', wine: 'Weine'
    },
    items: {
      espresso: 'Espresso', descEspresso: 'Klassischer Kaffee',
      macchiato: 'Macchiato', descMacchiato: 'Espresso mit etwas Milchschaum',
      cappuccino: 'Cappuccino', descCappuccino: 'Mit Milchschaum',
      cola: 'Coca-Cola', descCola: 'Erfrischendes kohlensäurehaltiges Getränk',
      fanta: 'Fanta', descFanta: 'Mit Orangengeschmack',
      sprite: 'Sprite', descSprite: 'Erfrischender Zitronen-Limetten-Geschmack',
      orange: 'Frischer Orangensaft', descOrange: '100% natürlicher Orangensaft',
      lemonade: 'Zitronenlimonade', descLemonade: 'Frisch gepresste Zitrone',
      mixJuice: 'Mix Menü', descMixJuice: 'Orange, Zitrone, Grapefruit und Honig',
      waterStill: 'Stilles Wasser', descWaterStill: 'Natürliches Quellwasser 0.33l',
      waterSpark: 'Prickelndes Wasser', descWaterSpark: 'Mineralwasser mit Kohlensäure 0.33l',
      waterFlav: 'Wasser mit Geschmack', descWaterFlav: 'Leichter Fruchtgeschmack',
      choco: 'Schokoladenkuchen', descChoco: 'Reichhaltiger Kuchen mit belgischer Schokolade',
      cheese: 'Cheesecake', descCheese: 'Leichter Kuchen mit Frischkäse und Waldbeeren',
      pancakes: 'Pfannkuchen', descPancakes: 'Mit Nutella oder Marmelade',
      beerLocal: 'Lokales Bier', descBeerLocal: 'Helles Bier, vom Fass oder aus der Flasche 0.33l',
      beerPrem: 'Premium Lager', descBeerPrem: 'Erstklassiges Importbier 0.33l',
      beerDark: 'Dunkelbier', descBeerDark: 'Reicher Geschmack von geröstetem Malz 0.33l',
      wineWhite: 'Weißwein', descWineWhite: 'Premium trockener Weißwein 0.187l',
      wineRed: 'Rotwein', descWineRed: 'Qualitätsrotwein 0.187l',
      wineRose: 'Rosewein', descWineRose: 'Erfrischender und leichter Roséwein 0.187l'
    }
  }
};

// POKRETANJE TIMERA ČIM SE STRANICA UCITA (TAČKA 2)
window.addEventListener('DOMContentLoaded', () => {
  // Provera da li je u ovoj sesiji igra već pokrenuta ili završena
  if (!sessionStorage.getItem('lucky_game_played')) {
    
    // ODRADITI PROVJERU ŠANSE 1/3 (TAČKA 3)
    const chance = Math.floor(Math.random() * 3) + 1; // Generiše 1, 2 ili 3
    
    if (chance === 1) {
      // Gost je sretnik, pokreni tajmer od 30 sekundi
      setTimeout(spawnFallingButton, 30000);
    }
    
    // Zabilježi u sesiji da je šansa iskorištena za ovu posjetu da se ne ponavlja vraćanjem na početnu
    sessionStorage.setItem('lucky_game_played', 'true');
  }
});

const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, observerOptions);

function setupScrollAnimations() {
  document.querySelectorAll('.scroll-reveal').forEach(el => scrollObserver.observe(el));
}

function selectLanguage(lang) {
  selectedLang = lang;
  const t = translations[lang];

  document.getElementById('mainTitle').innerText = t.welcome;
  document.getElementById('mainSubtitle').innerText = t.subtitle;
  nextBtn.innerText = t.nextBtnText;

  document.querySelectorAll('.flag-btn').forEach(btn => btn.classList.remove('selected'));
  document.getElementById(`flag-${lang}`).classList.add('selected');

  nextBtn.removeAttribute('disabled');
  nextBtn.classList.add('active');

  applyMenuTranslations(t);
}

function applyMenuTranslations(t) {
  document.getElementById('infoAddress').innerText = t.addressText;
  document.getElementById('infoHours').innerText = t.hoursText;
  document.getElementById('popTitle').innerText = t.wifiTitle;
  document.getElementById('popNetName').innerText = t.wifiNet;
  document.getElementById('popPassName').innerText = t.wifiPass;
  document.getElementById('popCopyBtn').innerText = t.wifiCopy;
  document.getElementById('popClose').innerText = t.wifiClose;

  document.getElementById('rouletteTitle').innerText = t.rouletteTitle;
  document.getElementById('rouletteSub').innerText = t.rouletteSub;
  document.getElementById('rollActionBtn').innerText = t.rouletteBtn;
  document.getElementById('rouletteClose').innerText = t.wifiClose;

  document.getElementById('luckyTitle').innerText = t.luckyTitle;
  document.getElementById('luckyMessage').innerText = t.luckyMessage;
  document.getElementById('luckyAcceptBtn').innerText = t.luckyAccept;
  document.getElementById('luckyDeclineBtn').innerText = t.luckyDecline;

  document.getElementById('catHot').childNodes[0].nodeValue = t.categories.hot + " ";
  document.getElementById('catSoda').innerText = t.categories.soda;
  document.getElementById('catJuice').innerText = t.categories.juice;
  document.getElementById('catWater').innerText = t.categories.water;
  document.getElementById('catDessert').childNodes[0].nodeValue = t.categories.dessert + " ";
  document.getElementById('catBeer').innerText = t.categories.beer;
  document.getElementById('catWine').innerText = t.categories.wine;

  for (const key in t.items) {
    const element = document.getElementById(key.startsWith('desc') ? key : 'item' + key.charAt(0).toUpperCase() + key.slice(1));
    if (element) element.innerText = t.items[key];
  }
  updateHappyHourEngine();
  updateDessertPrices();
}

function navigateToMenu() {
  if (!selectedLang) return;
  welcomeScreen.style.display = 'none';
  menuScreen.style.display = 'block';
  floatingRollBtn.style.display = 'flex';
  happyHourBar.style.display = 'block';
  
  setupScrollAnimations();
  
  if(happyHourInterval) clearInterval(happyHourInterval);
  happyHourInterval = setInterval(updateHappyHourEngine, 1000);
  updateHappyHourEngine();

  window.scrollTo({top:0, behavior:'smooth'});
}

function goHome(){
  menuScreen.style.display = 'none';
  floatingRollBtn.style.display = 'none';
  happyHourBar.style.display = 'none';
  welcomeScreen.style.display = 'flex';
  if(happyHourInterval) clearInterval(happyHourInterval);
  window.scrollTo({top:0, behavior:'smooth'});
}

function toggleCategory(el){
  const cat = el.parentElement;
  const content = cat.querySelector('.category-content');
  cat.classList.toggle('active');
  if(cat.classList.contains('active')){
    content.style.maxHeight = content.scrollHeight + 'px';
  } else {
    content.style.maxHeight = '0px';
  }
}

function updateHappyHourEngine() {
  if (!selectedLang) return;
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentSecond = now.getSeconds();
  
  const startHour = 7;
  const endHour = 10;
  
  const t = translations[selectedLang];
  const catContainer = document.getElementById('catHotContainer');
  const internalTimer = document.getElementById('hotDrinksTimer');
  let totalSecondsLeft = 0;
  
  if (currentHour >= startHour && currentHour < endHour) {
    isHappyHourActive = true;
    catContainer.classList.add('happy-hour-active');
    const targetTime = (endHour * 3600);
    const currentTime = (currentHour * 3600) + (currentMinute * 60) + currentSecond;
    totalSecondsLeft = targetTime - currentTime;
    
    const mins = Math.floor((totalSecondsLeft % 3600) / 60);
    const secs = totalSecondsLeft % 60;
    const timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    happyHourBar.className = "happy-hour-bar active-now";
    document.getElementById('happyHourText').innerHTML = `${t.hhActiveBar} <span class="highlight">${timeString}</span>`;
    internalTimer.innerText = `${t.hhActiveTimer} ${timeString}`;
    
    document.getElementById('priceEspresso').innerText = "2.00 KM";
    document.getElementById('priceMacchiato').innerText = "2.00 KM";
    document.getElementById('priceCappuccino').innerText = "2.00 KM";
  } else {
    isHappyHourActive = false;
    catContainer.classList.remove('happy-hour-active');
    let diffSeconds = 0;
    const currentTime = (currentHour * 3600) + (currentMinute * 60) + currentSecond;
    const targetTime = (startHour * 3600);
    
    if (currentHour < startHour) diffSeconds = targetTime - currentTime;
    else diffSeconds = (24 * 3600 - currentTime) + targetTime;
    
    const hrs = Math.floor(diffSeconds / 3600);
    const mins = Math.floor((diffSeconds % 3600) / 60);
    const secs = diffSeconds % 60;
    const timeString = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    happyHourBar.className = "happy-hour-bar";
    document.getElementById('happyHourText').innerHTML = `${t.hhSoonBar} ${timeString}`;
    internalTimer.innerText = `${t.hhSoonTimer} ${timeString}`;
    
    document.getElementById('priceEspresso').innerText = "2.50 KM";
    document.getElementById('priceMacchiato').innerText = "3.00 KM";
    document.getElementById('priceCappuccino').innerText = "3.50 KM";
  }
}

function spawnFallingButton() {
  fallingContainer.innerHTML = `<button class="falling-btn" onclick="triggerLuckyModal()">?</button>`;
  setTimeout(() => { fallingContainer.innerHTML = ''; }, 8000);
}

function triggerLuckyModal() {
  fallingContainer.innerHTML = ''; 
  luckyModal.style.display = 'flex';
}

function declineLuckyDiscount() {
  luckyModal.style.display = 'none';
}

function acceptLuckyDiscount() {
  luckyModal.style.display = 'none';
  isLuckyActive = true;
  luckyTimeLeft = 300; 
  
  // Tek sada dodajemo klasu koja aktivira ljubičastu boju i pali bedž (TAČKA 1)
  document.getElementById('catDessertContainer').classList.add('lucky-discount-active');
  
  if(luckyInterval) clearInterval(luckyInterval);
  luckyInterval = setInterval(runLuckyTimer, 1000);
  
  runLuckyTimer(); 
}

function runLuckyTimer() {
  const t = translations[selectedLang || 'bs'];
  const timerDisplay = document.getElementById('dessertTimer');
  
  if (luckyTimeLeft <= 0) {
    clearInterval(luckyInterval);
    isLuckyActive = false;
    
    // POPUST ISTEKAO: Brišemo ljubičastu klasu, uklanjamo bedž i vraćamo sve na fabričke postavke (TAČKA 1)
    document.getElementById('catDessertContainer').classList.remove('lucky-discount-active');
    timerDisplay.innerText = '';
    updateDessertPrices();
    return;
  }
  
  const mins = Math.floor(luckyTimeLeft / 60);
  const secs = luckyTimeLeft % 60;
  const timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  
  timerDisplay.innerText = `${t.luckyTimerText} ${timeString}`;
  updateDessertPrices();
  
  luckyTimeLeft--;
}

function updateDessertPrices() {
  const basePrices = { choco: 6.00, cheese: 5.50, pancakes: 5.00 };
  
  for (const item in basePrices) {
    const priceEl = document.getElementById(`price${item.charAt(0).toUpperCase() + item.slice(1)}`);
    if (!priceEl) continue;
    
    if (isLuckyActive) {
      const oldPriceStr = basePrices[item].toFixed(2);
      const newPriceStr = (basePrices[item] * 0.8).toFixed(2);
      
      priceEl.innerHTML = `
        <div class="price-container">
          <span class="old-price">${oldPriceStr} KM</span>
          <span class="new-price">${newPriceStr} KM</span>
        </div>
      `;
    } else {
      priceEl.innerText = `${basePrices[item].toFixed(2)} KM`;
    }
  }
}

function spinRoulette() {
  const t = translations[selectedLang || 'bs'];
  const itemsArray = [];
  const regularHotPrices = { espresso: "2.50 KM", macchiato: "3.00 KM", cappuccino: "3.50 KM" };
  const baseDessertPrices = { choco: 6.00, cheese: 5.50, pancakes: 5.00 };
  
  for (const key in t.items) {
    if (!key.startsWith('desc')) {
      const elementId = 'item' + key.charAt(0).toUpperCase() + key.slice(1);
      const htmlItem = document.getElementById(elementId);
      
      if (htmlItem) {
        let priceText = "";
        if(key === 'espresso' || key === 'macchiato' || key === 'cappuccino') {
          priceText = isHappyHourActive ? "2.00 KM" : regularHotPrices[key];
        } else if (key === 'choco' || key === 'cheese' || key === 'pancakes') {
          priceText = isLuckyActive ? (baseDessertPrices[key] * 0.8).toFixed(2) + " KM" : baseDessertPrices[key].toFixed(2) + " KM";
        } else {
          const priceElement = htmlItem.parentElement.nextElementSibling;
          priceText = priceElement ? priceElement.innerText : "";
        }
        itemsArray.push({ name: t.items[key], price: priceText });
      }
    }
  }

  if (itemsArray.length === 0) return;
  const resultName = document.getElementById('rouletteResultName');
  const resultPrice = document.getElementById('rouletteResultPrice');
  const rollBtn = document.getElementById('rollActionBtn');
  
  rollBtn.disabled = true;
  let counter = 0;
  
  const interval = setInterval(() => {
    const randomItem = itemsArray[Math.floor(Math.random() * itemsArray.length)];
    resultName.innerText = randomItem.name;
    resultName.style.color = "#aaa";
    resultPrice.innerText = t.rouletteRolling;
    counter++;
    
    if (counter > 15) {
      clearInterval(interval);
      const finalItem = itemsArray[Math.floor(Math.random() * itemsArray.length)];
      resultName.innerText = finalItem.name;
      resultName.style.color = "#ff7a00";
      resultPrice.innerText = finalItem.price;
      rollBtn.disabled = false;
    }
  }, 100);
}

function openRouletteModal() {
  document.getElementById('rouletteResultName').innerText = "???";
  document.getElementById('rouletteResultPrice').innerText = "-";
  rouletteModal.style.display = 'flex';
}
function closeRouletteModal() { rouletteModal.style.display = 'none'; }
window.openWifiModal = function() { wifiModal.style.display = 'flex'; }
window.closeWifiModal = function() { wifiModal.style.display = 'none'; }

function copyWifiPassword() {
  const passwordText = document.getElementById('wifiPassword').innerText;
  navigator.clipboard.writeText(passwordText).then(() => {
    const copyBtn = document.getElementById('popCopyBtn');
    const currentLang = selectedLang || 'bs';
    copyBtn.innerText = translations[currentLang].wifiCopied;
    copyBtn.style.background = '#00cc66';
    setTimeout(() => {
      copyBtn.innerText = translations[currentLang].wifiCopy;
      copyBtn.style.background = '#333';
    }, 2000);
  });
}

window.onscroll = function() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    if(menuScreen.style.display === 'block') backToTopBtn.style.display = "flex";
  } else {
    backToTopBtn.style.display = "none";
  }
};
function scrollToTop() { window.scrollTo({top: 0, behavior: 'smooth'}); }
