
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

export {LinRegessionCard}

import {TwoColCard, Diagram, InfoText, Button} from "./Tools.js";

/**
 * Regression line card base functions
 */
class LinRegessionCard extends TwoColCard {
  /**
   * Diagram containing the points and the regression line
   */
  _diagram;

  /**
   * Points to be displayed in the diagram
   */
  _points=[];

  /**
   * Value a in a*x+b for the optimal regession line
   */
  _optimalA;

    /**
   * Value b in a*x+b for the optimal regession line
   */
  _optimalB;

  /**
   * Correlation coefficient of the points
   */
  _correlationCoefficient;

  #table;
  #buttonsLine;

  /**
   * Constructor
   * @param {String} title Card title
   * @param {String} info Optional info text to be shown in the box
   */
  constructor(title, info=null) {
    super(title,info);

    this._col1.append(this._diagram=new Diagram());
    this._diagram.onclick=p=>this._diagramClick(p);

    this._col2.div.appendChild(this.#table=document.createElement("table"));
    this.#table.className="mt-3 mb-3";

    this._col2.append(this.#buttonsLine=new InfoText());
  }

  /**
   * Adds a new output table line.
   * @param {String} text Text on the left in the table line
   * @param {String} color Color of the table line
   * @returns Right cell of the new table line
   */
  _addTr(text, color=null) {
    const tr=document.createElement("tr");
    this.#table.appendChild(tr);

    const td1=document.createElement("td");
    tr.appendChild(td1);
    if (color!=null) td1.style.color=color;
    td1.innerHTML=text;

    const td2=document.createElement("td");
    tr.appendChild(td2);
    if (color!=null) td2.style.color=color;
    return td2;
  }

  /**
   * Click handler for clicks on the diagram.
   * @param {Object} p Clicked point (in diagram coordinates), object with properties "x" and "y"
   */
  _diagramClick(p) {
  }

  /**
   * Adds a button.
   * @param {String} Text on button
   * @param {String} Icon on button (without leading "bi-")
   * @param {Function} Callback for clicks
   */
  _addButton(title, icon, onclick) {
    this.#buttonsLine.append(new Button(title,icon,onclick));
  }

  /**
   * Updates the points in the diagram.
   */
  _showPoints() {
    this._diagram.data.datasets=[{type: 'scatter', data: this._points.map(p=>({x: p[0], y: p[1]})), borderColor: 'blue'}];
    this._diagram.chart.update();
  }

  /**
   * Adds a regression line to the diagram.
   * @param {Number} a Value a in a*x+b
   * @param {Number} b Value b in a*x+b
   * @param {String} color Color of the line
   */
  _addDiagramLine(a, b, color) {
    const yValues=this._diagram.data.labels.map(x=>a*x+b);
    const line={type: 'line', borderColor: color, pointRadius: 0, data: yValues};
    this._diagram.data.datasets.push(line);
    this._diagram.chart.update();
  }

  /**
   * Calculates the residuum between the points and the regression line.
   * @param {Number} a Value a in a*x+b
   * @param {Number} b Value b in a*x+b
   * @returns Residuum
   */
  _calcResiduum(a, b) {
    return this._points.map(p=>(a*p[0]+b-p[1])**2).reduce((a,b)=>a+b);
  }

  /**
   * Calculates _correlation coefficient and optimal regression line from the points array.
   */
  _calcResults() {
    /* Calculate correlation coefficient */
    const mx=this._points.map(p=>p[0]).reduce((a,b)=>a+b)/this._points.length;
    const my=this._points.map(p=>p[1]).reduce((a,b)=>a+b)/this._points.length;
    const vx=this._points.map(p=>(p[0]-mx)**2).reduce((a,b)=>a+b)/(this._points.length-1);
    const vy=this._points.map(p=>(p[1]-my)**2).reduce((a,b)=>a+b)/(this._points.length-1);
    this._correlationCoefficient=this._points.map(p=>(p[0]-mx)*(p[1]-my)).reduce((a,b)=>a+b)/((this._points.length-1)*Math.sqrt(vx)*Math.sqrt(vy));

    /* Calculate optimal regression line */
    this._optimalA=(this._points.map(p=>p[0]*p[1]).reduce((a,b)=>a+b)-this._points.length*mx*my)/((this._points.length-1)*vx);
    this._optimalB=my-this._optimalA*mx;
  }
}
