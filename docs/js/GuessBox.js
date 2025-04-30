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

export {LinRegessionGuessCard};

import {language} from "./Language.js";
import {LinRegessionCard} from "./LinRegessionTools.js";

/**
 * System for guessing the regression line
 */
class LinRegessionGuessCard extends LinRegessionCard {
  #p1=null;
  #tdUserLine;
  #tdUserLineResiduum;
  #tdOptimalLine;
  #tdOptimalLineResiduum;
  #tdCorrelationCoefficient;

  /**
   * Constructor
   */
  constructor() {
    super(language.GUI.Guess.name,language.GUI.Guess.info);

    this.#tdUserLine=this._addTr(language.GUI.Guess.userLine+":","rgb(140,28,0)");
    this.#tdUserLineResiduum=this._addTr(language.GUI.Guess.userLineResiduum+":","rgb(140,28,0)");
    this.#tdOptimalLine=this._addTr(language.GUI.Guess.optimalLine+":","rgb(0,140,79)");
    this.#tdOptimalLineResiduum=this._addTr(language.GUI.Guess.optimalLineResiduum+":","rgb(0,140,79)");
    this.#tdCorrelationCoefficient=this._addTr(language.GUI.Guess.correlationCoefficient+":","blue");

    this._addButton(language.GUI.Guess.buttonNew,"arrow-clockwise",_=>this.#generatePoints());
    this._addButton(language.GUI.Guess.buttonShowSolution,"check-circle",_=>this.#showOptimalLine());

    this.#generatePoints();
  }

  #generatePoints() {
    /* Generate and show points */
    this._points=[];
    const k=Math.random()*2-1;
    for (let i=1;i<=50;i++) {
        const x=Math.random()*2-1;
        const x2=Math.random()*2-1;
        const y=k*x+Math.sqrt(1-k*k)*x2;
        this._points.push([x,y]);
    }
    this._showPoints();

    /* Calculate and output correlation coefficient */
    this._calcResults();
    this.#tdCorrelationCoefficient.innerHTML="r<sub>x,y</sub>="+this._correlationCoefficient.toLocaleString();

    /* Output residuum of the optimal regression line */
    this.#tdOptimalLineResiduum.innerHTML=this._calcResiduum(this._optimalA,this._optimalB).toLocaleString();
  }

  _diagramClick(p) {
    if (this.#p1==null) {
      /* First point clicked */
      this._diagram.data.datasets=this._diagram.data.datasets.filter(dataset=>dataset.borderColor!='rgb(140,28,0)');
      this._diagram.chart.update();
      this.#tdUserLine.innerHTML="";
      this.#tdUserLineResiduum.innerHTML="";
      this.#p1=p;
    } else {
      /* Second point clicked */
      const p1=this.#p1;
      const p2=p;
      const a=(p2.x==p1.x)?10000:((p2.y-p1.y)/(p2.x-p1.x));
      const b=p1.y-p1.x*a;
      this._addDiagramLine(a,b,'rgb(140,28,0)');
      if (b>=0) {
        this.#tdUserLine.innerHTML="f(x):="+a.toLocaleString()+"&middot;x+"+b.toLocaleString();
      } else {
        this.#tdUserLine.innerHTML="f(x):="+a.toLocaleString()+"&middot;x"+b.toLocaleString();
      }
      this.#tdUserLineResiduum.innerHTML=this._calcResiduum(a,b).toLocaleString();
      this.#p1=null;
    }
  }

  #showOptimalLine() {
    if (this._optimalB>=0) {
      this.#tdOptimalLine.innerHTML="f(x):="+this._optimalA.toLocaleString()+"&middot;x+"+this._optimalB.toLocaleString();
    } else {
      this.#tdOptimalLine.innerHTML="f(x):="+this._optimalA.toLocaleString()+"&middot;x"+this._optimalB.toLocaleString();
    }
    this._addDiagramLine(this._optimalA,this._optimalB,'rgb(0,140,79)');
  }
}
