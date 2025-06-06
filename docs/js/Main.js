/*
Copyright 2025 Alexander Herzog

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

export {isDesktopApp, initApp};

import {language} from "./Language.js";
import {Card} from "./Tools.js";
import {LinRegessionGuessCard} from "./GuessBox.js";
import {LinRegessionShowCard} from "./ShowBox.js";

/**
 * Is the system running as Neutralions desktop app (true) or as a web page (false)?
 */
const isDesktopApp=(typeof(NL_OS)!='undefined');
if (isDesktopApp) {
  Neutralino.init();
  Neutralino.events.on("windowClose",()=>Neutralino.app.exit());
}

const navTitles=[
  language.GUI.pageInfo,
  language.GUI.Guess.name,
  language.GUI.Show.name
];

const nav=[
  navInfo,
  navGuess,
  navShow
];

const boxes=[
  new Card(language.GUI.appName,language.GUI.mainInfo),
  new LinRegessionGuessCard(),
  new LinRegessionShowCard()
];

/**
 * Fills in the language strings to the GUI elements.
 */
function initGUILanguage() {
  /* Header */
  appName1.innerHTML=language.GUI.appName;
  languageButton.title=language.GUI.switchLanguageHint;
  languageButton.querySelector('.menuButtonTitleShort').innerHTML=language.GUI.switchLanguageShort;
  languageButton.querySelector('.menuButtonTitleLong').innerHTML=language.GUI.switchLanguage;
  languageButton.onclick=()=>{
    localStorage.setItem('selectedLanguage',language.GUI.switchLanguageMode);
    document.location.href=language.GUI.switchLanguageFile;
  }

  menuColorMode.title=language.GUI.tabColorMode;
  menuColorModeLight.innerHTML=language.GUI.tabColorModeLight;
  menuColorModeDark.innerHTML=language.GUI.tabColorModeDark;
  menuColorModeSystemDefault.innerHTML=language.GUI.tabColorModeSystemDefault;

  let selectedColorMode=localStorage.getItem('selectedColorMode');
  if (selectedColorMode==null) {
    menuColorModeSystemDefault.classList.add("bi-check");
    const mode=(document.documentElement.dataset.bsTheme=='dark')?language.GUI.tabColorModeDark:language.GUI.tabColorModeLight;
    menuColorModeSystemDefault.innerHTML=menuColorModeSystemDefault.innerHTML+" ("+mode+")";
  } else {
    if (document.documentElement.dataset.bsTheme=='dark') menuColorModeDark.classList.add("bi-check"); else menuColorModeLight.classList.add("bi-check");
  }

  /* Content */
  nav.forEach((n,i)=>{
    n.innerHTML=navTitles[i];
    n.style.cursor="pointer";
    const nr=i;
    n.onclick=()=>selectMode(nr);
  });

  boxes.forEach(box=>mainContainer.appendChild(box.div));

  /* Footer */
  appName2.innerHTML=language.GUI.appName;
  linkImprint.innerHTML=language.GUI.imprint;
  linkPrivacy.innerHTML=language.GUI.privacy;
  linkMainHome.innerHTML=language.GUI.homeURL;
  linkMainHome.href="https://"+language.GUI.homeURL;
  infoLocalDataOnly2.querySelector("h3").innerHTML=language.GUI.privacyInfo1;
  infoLocalDataOnly2.querySelector("div").innerHTML=language.GUI.privacyInfo2;
  infoSimulators.innerHTML=language.GUI.simulators;
}

/**
 * Activates one of the program functions.
 * @param {Number} nr Dialog page to be activates (number from 0 to 2)
 */
function selectMode(nr) {
  boxes.forEach((box,i)=>{
    nav[i].classList.toggle("active",nr==i);
    box.setVisible(nr==i);
  });
}

/**
 * Prepares the layout switcher which will remove the "loading..." text
 * and replace it with the app content.
 */
function startApp() {
  document.addEventListener('readystatechange',event=>{if (event.target.readyState=="complete") {
    if (isDesktopApp) {
      infoLocalDataOnly1.style.display="none";
      infoLocalDataOnly2.style.display="none";
    }
    mainContent.style.display="";
    infoLoading.style.display="none";
  }});
}

/**
 * Initializes the complete web app.
 */
function initApp() {
  initGUILanguage();
  selectMode(0);
  startApp();
}
