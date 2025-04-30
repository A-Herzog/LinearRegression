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

export {LinRegessionShowCard};

import {language} from "./Language.js";
import {LinRegessionCard} from "./LinRegessionTools.js";

/**
 * System for showing the regression line
 */
class LinRegessionShowCard extends LinRegessionCard {
  #tdUserLine;
  #tdUserLineResiduum;
  #tdCorrelationCoefficient;

  /**
   * Constructor
   */
  constructor() {
    super(language.GUI.Show.name,language.GUI.Show.info);

    this.#tdUserLine=this._addTr(language.GUI.Show.userLine+":","rgb(0,140,79)");
    this.#tdUserLineResiduum=this._addTr(language.GUI.Show.userLineResiduum+":","rgb(0,140,79)");
    this.#tdCorrelationCoefficient=this._addTr(language.GUI.Show.correlationCoefficient+":","blue");

    this._addButton(language.GUI.Show.buttonNew,"trash",_=>this.#clearPoints());

    this.#clearPoints();
  }

  #clearPoints() {
    this._points=[];
    this._showPoints();

    this.#tdUserLine.innerHTML="";
    this.#tdUserLineResiduum.innerHTML="";
    this.#tdCorrelationCoefficient.innerHTML="";
  }

  _diagramClick(p) {
    /* Add point */
    this._points.push([p.x,p.y]);

    if (this._points.length>=2) {
      /* Calculate and output correlation coefficient */
      this._calcResults();
      this.#tdCorrelationCoefficient.innerHTML="r<sub>x,y</sub>="+this._correlationCoefficient.toLocaleString();

      /* Output residuum of the optimal regression line */
      if (this._optimalB>=0) {
        this.#tdUserLine.innerHTML="f(x):="+this._optimalA.toLocaleString()+"&middot;x+"+this._optimalB.toLocaleString();
      } else {
        this.#tdUserLine.innerHTML="f(x):="+this._optimalA.toLocaleString()+"&middot;x"+this._optimalB.toLocaleString();
      }
      this.#tdUserLineResiduum.innerHTML=this._calcResiduum(this._optimalA,this._optimalB).toLocaleString();
    }

    /* Output points and regression line */
    this._showPoints();
    if (this._points.length>=2) this._addDiagramLine(this._optimalA,this._optimalB,'rgb(0,140,79)');
  }
}
