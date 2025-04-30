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

export {Box, Card, Row, Col, TwoColCard, InfoText, Diagram, Button};

/**
 * Generates a simple div element box.
 */
class Box {
  #mainDiv;

  /**
   * Constructor
   */
  constructor() {
    this.#mainDiv=document.createElement("div");
    this.#mainDiv.style.display="none";
  }

  /**
   * Appends a box type element to the box.
   * @param {Object} element Box type element
   */
  append(element) {
    if (element.setVisible) element.setVisible(true);
    this.#mainDiv.appendChild(element.div);
  }

  /**
   * html div element
   */
  get div() {
    return this.#mainDiv;
  }

  /**
   * Shows or hides the element
   * @param {boolean} visible Visible status
   */
  setVisible(visible) {
    this.#mainDiv.style.display=visible?"":"none";
  }
}


/**
 * Generates a card element.
 */
class Card extends Box {
  /**
   * Body element of the card
   */
  _body;

  /**
   * Constrcutor
   * @param {String} title Card title
   * @param {String} info Optional info text to be shown in the box
   */
  constructor(title, info=null) {
    super();
    this.div.className="card mb-3";

    const header=document.createElement("div");
    header.className="card-header";
    header.innerHTML=title;
    this.div.appendChild(header);

    this._body=document.createElement("div");
    this._body.className="card-body";
    this.div.appendChild(this._body);

    if (info!=null) this.append(new InfoText(info));
  }

  /**
   * Appends a box type element.
   * @param {Object} element Box type element
   */
  append(element) {
    if (element.setVisible) element.setVisible(true);
    this._body.appendChild(element.div);
  }
}


/**
 * Generates a div with classname "row".
 */
class Row {
  #div;

  /**
   * Constrcutor
   */
  constructor() {
    this.#div=document.createElement("div");
    this.#div.className="row";
  }

  /**
   * html div element
   */
  get div() {
    return this.#div;
  }

  /**
   * Appends a box type element.
   * @param {Object} element Box type element
   */
  append(element) {
    if (element.setVisible) element.setVisible(true);
    this.#div.appendChild(element.div);
  }
}


/**
 * Generates a div with classname "col".
 */
class Col {
  #div;

  /**
   * Constrcutor
   */
  constructor() {
    this.#div=document.createElement("div");
    this.#div.className="col-lg-6";
  }

  /**
   * html div element
   */
  get div() {
    return this.#div;
  }

  /**
   * Appends a box type element.
   * @param {Object} element Box type element
   */
  append(element) {
    if (element.setVisible) element.setVisible(true);
    this.#div.appendChild(element.div);
  }
}


/**
 * Generates a card with two columns in one row.
 */
class TwoColCard extends Card {
  /**
   * Left column
   */
  _col1;

  /**
   * Right column
   */
  _col2;

   /**
   * Constructor
   * @param {String} title Card title
   * @param {String} info Optional info text to be shown in the box
   */
   constructor(title, info=null) {
    super(title,info);

    const row=new Row();
    this.append(row);

    row.append(this._col1=new Col());
    row.append(this._col2=new Col());
  }
}


/**
 * Generates an info text element.
 */
class InfoText {
  /**
   * html div element in which the text is to be displayed
   */
  _div;

  /**
   * Constructor
   * @param {String} text Info text to be shown
   */
  constructor(text=null) {
    this._div=document.createElement("div");
    if (text!=null) this._processInner(text);
  }

  /**
   * Preprocesses the text and sets it in the inner html div element.
   * @param {String} text Info text to be shown
   */
  _processInner(text) {
    this._div.innerHTML=text;
  }

  /**
   * @param {String} newText
   */
  set text(newText) {
    this._div.innerHTML="";
    this._processInner(newText);
  }

  /**
   * html div element
   */
  get div() {
    return this._div;
  }

  /**
   * Appends a box type element.
   * @param {Object} element Box type element
   */
  append(element) {
    if (element.setVisible) element.setVisible(true);
    this._div.appendChild(element.div);
  }
}


/**
 * Generates a Chartjs diagram
 */
class Diagram {
  #div;
  #data;
  #canvas;
  #onclick
  #chart;

  /**
   * Constructor
   */
  constructor() {
    this.#div=document.createElement("div");
    this.#div.className="mt-3 mb-3";
    this.#canvas=document.createElement("canvas");
    this.#div.appendChild(this.#canvas);

    this.#data={};
    this.#data.labels=Array.from({ length: 201}, (_, i) => (i-100)/100);
    const setup={data: this.#data, options: this.#getOptions()};
    this.#chart=new Chart(this.#canvas,setup);

    this.#canvas.style.maxHeight="600px";
    this.#canvas.style.maxWidth="600px";
  }

  #getOptions() {
    return {
      aspectRatio: 1,
      scales: {
        x: {min: -1, max: 1},
        y: {min: -1, max: 1},
      },
      plugins: {legend: {display: false}},
      animation: {duration: 0},
      onClick: (event,_,chart)=>{
        const x=chart.scales.x.getValueForPixel(event.x);
        const y=chart.scales.y.getValueForPixel(event.y);
        if (this.#onclick) this.#onclick({x: x, y: y});
      }
    };
  }

  /**
   * Sets an onclick handler
   * @param {any} Onclick handler
   */
  set onclick(value) {
    this.#onclick=value;
  }

  /**
   * Returns the array containing the data sets.
   */
  get data() {
    return this.#data;
  }

  /**
   * Returns the Chartjs object.
   */
  get chart() {
    return this.#chart;
  }

  /**
   * Returns the canvas object.
   */
  get canvas() {
    return this.#canvas;
  }

  /**
   * html div element
   */
  get div() {
    return this.#div;
  }
}


/**
 * Generates a button
 */
class Button {
  #button;

  /**
   * Constrcutor
   * @param {String} Text on button
   * @param {String} Icon on button (without leading "bi-")
   * @param {Function} Callback for clicks
   */
  constructor(title, icon, onclick) {
    this.#button=document.createElement("button");
    this.#button.className="btn btn-primary bi bi-"+icon+" me-2";
    this.#button.innerHTML=" "+title;
    this.#button.onclick=onclick;
  }

  /**
   * html element
   */
  get div() {
    return this.#button;
  }
}
