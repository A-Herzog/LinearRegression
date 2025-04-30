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

export {language};

let lang;

/* German */

const languageDE={};
lang=languageDE;

lang.GUI={};
lang.GUI.appName="Lineare Regession";
lang.GUI.homeURL="warteschlangensimulation.de";
lang.GUI.imprint="Impressum";
lang.GUI.privacy="Datenschutz";
lang.GUI.privacyInfo1="Info";
lang.GUI.privacyInfo2="Alle Berechnungen laufen vollständig im Browser ab.<br>Diese Webapp führt nach dem Laden des HTML- und Skriptcodes keine weitere Kommunikation mit dem Server durch.";
lang.GUI.simulators="Simulatoren";
lang.GUI.switchLanguage="Switch to <b>English</b>";
lang.GUI.switchLanguageHint="Switch to English";
lang.GUI.switchLanguageShort="English";
lang.GUI.switchLanguageMode='default';
lang.GUI.switchLanguageFile="index.html";
lang.GUI.tabColorMode="Farbmodus";
lang.GUI.tabColorModeLight="Hell";
lang.GUI.tabColorModeDark="Dunkel";
lang.GUI.tabColorModeSystemDefault="Systemvorgabe";
lang.GUI.downloadLabel="Diese Webapp steht auch als offline-nutzbare Windows-Anwendung zur Verfügung:";
lang.GUI.downloadButton="Windows-Anwendung (exe)";
lang.GUI.pageInfo="Allgemeine Erklärung";

lang.GUI.mainInfo=`
<p>Sind mindestens drei beliebige Punkte in der Ebene gegeben, so lässt sich zumeist keine Gerade mehr angeben, die durch alle Punkte verläuft.
Das Ziel der <strong>linearen Regression</strong> ist es, eine solche Punktwolke möglichst gut durch eine Gerade zu approximieren.</p>
<p>Besonders verbreitet ist dabei die <strong>Methode der kleinsten Quadrate</strong>: Sind Punkte (x<sub>1</sub>,y<sub>1</sub>),...,(x<sub>n</sub>,y<sub>n</sub>) gegeben,
so ist eine Gerade y=ax+b gesucht, so wird zunächst für für alle Punkte der vertikale Abstand y<sub>i</sub>-(ax<sub>i</sub>+b) zwischen dem Punkt und der Geraden bestimmt,
dieser wird quadriert, dies liefert die Residuen (y<sub>i</sub>-(ax<sub>i</sub>+b))<sup>2</sup>. Nun werden die Residuensumme gebildet, d.h. alle Residuen aufeinander addiert,
und a und b werden so bestimmt, dass diese Summe möglichst klein wird. Dieses Minimierungsproblem lässt sich allgemein lösen, es ergeben sich fertige Formeln für a und b.</p>
<p>Die Regressionsgerade kann in jedem Fall berechnet werden, auch wenn eine lineare Regression gar nicht sinnvoll ist. In Anwendungen lässt sich leider nicht immer aufgrund
von Rahmenbedingungen entscheiden, ob ein linearer Zusammenhang als Beschreibung sinnvoll ist oder nicht. Daher sind Maßzahlen für die Güte der Approximation der Punktwolke
durch die Regressionsgerade nötig. Die Residuensumme kann hierfür nicht direkt als Bewertungsmaß herangezogen werden, und da ihr Wert von der Größenordnung der x- und y-Werte abhängt.
Werden also zum Beispiel andere Einheiten gewählt, ändert sich auch die Residuensumme. Einen Ausweg stellt der <strong>Korrelationskoeffizient</strong> dar:
Er liefert unabhängig von Stichprobenumfang und Größenordnung der x- und y-Werte immer Zahlen zwischen -1 und 1. Bei Werten nahe 1 bzw. -1 können die Punkte gut durch eine
steigende bzw. fallende Gerade angepasst werden. Bei Werten nahe 0 ist die Anpassung der Punktwolke durch eine Gerade als Modellbeschreibung hingegen eher unpassend.</p>
<p>Aus statistischer Sicht handelt es sich bei der linearen Regression um eine einfache Form eines linearen Modells: Auf den Wert ax+b der Geraden wird ein zufälliger Wert addiert,
der etwa Messfehler berücksichtigt. Sehr verbreitet ist dabei die Annahme, dass der Fehler einer Normalverteilung mit Erwartungswert 0 unterliegt, d.h. die Beobachtungen sind
Zufallsvariablen Y<sub>1</sub>,...,Y<sub>n</sub> mit Y<sub>i</sub>=ax<sub>i</sub>+b+Z<sub>i</sub>, wobei die Z<sub>i</sub> mit Erwartungswert 0 und einer unbekannten
Varianz σ<sup>2</sup> normalverteilt ist. Sollen aufgrund einer konkreten Stichprobe nun die Werte a und b geschätzt werden, so ergeben sich für a und b gerade die Schätzer
der Methode der kleinsten Quadrate.</p><p>In diesem Modell hat das Quadrat des Korrelationskoeffizienten, das Bestimmtheitsmaß, eine wichtige Interpretation:
Dass die y<sub>i</sub> nicht alle gleich sind, ist zum einen der Tatsache geschuldet, dass verschiedene Werte x<sub>i</sub> eingestellt wurden, zum anderen wird dies
auch durch den normalverteilten Fehlerterm verursacht. Das Bestimmtheitsmaß gibt nun den Anteil der Variation der y<sub>i</sub>, der durch die x<sub>i</sub> erklärt wird,
wieder. Bei Werten nahe 1 ist also ein sehr großer Teil der Variation der y<sub>i</sub> durch das Einstellen der x<sub>i</sub>, also durch die lineare Regression erklärbar,
während bei Werten nahe 0 die Variation der y<sub>i</sub> vor allem auf den normalverteilten Fehler zurückzuführen ist, und die Regression kaum erklärt, warum sich
unterschiedliche y<sub>i</sub> ergaben.</p>
<div id="downloadInfoArea" class="mt-5"></div>
`;

lang.GUI.Guess={};
lang.GUI.Guess.name="Regressionsgerade raten";
lang.GUI.Guess.info="Unten wird eine zufällig erzeugte Punktwolke angezeigt. Mit zwei Mausklicks können Sie versuchen, die passende Regressionsgerade einzuzeichnen. Sie können sich die korrekte Regressionsgerade anzeigen lassen. Durch einen Vergleich der Residuensumme Ihres Vorschlags und der minimalen Residuensumme können sie sehen, wie gut Ihre Schätzung war.";
lang.GUI.Guess.userLine="Aktuelle Gerade";
lang.GUI.Guess.userLineResiduum="Residuensumme der Geraden";
lang.GUI.Guess.optimalLine="Optimale Gerade";
lang.GUI.Guess.optimalLineResiduum="Minimale Residuensumme";
lang.GUI.Guess.correlationCoefficient="Empirischer Korrelationskoeffizient";
lang.GUI.Guess.buttonNew="Neue Punkte";
lang.GUI.Guess.buttonShowSolution="Lösung anzeigen";

lang.GUI.Show={};
lang.GUI.Show.name="Regressionsgerade anzeigen";
lang.GUI.Show.info="Durch Klicken in das Koordinatensystem können Sie eine Punktwolke erzeugen für die zugehörige Regressionsgerade berechnet und angezeigt wird.";
lang.GUI.Show.userLine="Aktuelle Gerade";
lang.GUI.Show.userLineResiduum="Residuensumme der Geraden";
lang.GUI.Show.correlationCoefficient="Empirischer Korrelationskoeffizient";
lang.GUI.Show.buttonNew="Punkte löschen";

/* English */

const languageEN={};
lang=languageEN;

lang.GUI={};
lang.GUI.appName="Linear regression";
lang.GUI.homeURL="queueingsimulation.de";
lang.GUI.imprint="Imprint";
lang.GUI.privacy="Privacy";
lang.GUI.privacyInfo1="Info";
lang.GUI.privacyInfo2="All calculations are performed entirely in the browser.<br>This Webapp does not perform any further communication with the server after loading the HTML and script code.";
lang.GUI.simulators="Simulators";
lang.GUI.switchLanguage="Auf <b>Deutsch</b> umschalten";
lang.GUI.switchLanguageHint="Auf Deutsch umschalten";
lang.GUI.switchLanguageShort="Deutsch";
lang.GUI.switchLanguageMode='de';
lang.GUI.switchLanguageFile="index_de.html";
lang.GUI.tabColorMode="Color mode";
lang.GUI.tabColorModeLight="Light";
lang.GUI.tabColorModeDark="Dark";
lang.GUI.tabColorModeSystemDefault="System default";
lang.GUI.downloadLabel="This webapp is also available as an offline usable Windows application:";
lang.GUI.downloadButton="Windows application (exe)";
lang.GUI.pageInfo="General explanation";

lang.GUI.mainInfo=`
<p>If there are three or more points given in the plane, usually one can not precisely specify a line which passes through all the points any more.
The aim of the <strong>linear regression</strong> is to approximate such a point cloud as well as possible by a straight line.</p>
<p>The method of <strong>least squares</strong> is quite common here: If the points (x<sub>1</sub>,y<sub>1</sub>),...,(x<sub>n</sub>,y<sub>n</sub>)
are given, a line y=ax+b is in search. As the first step for all points the vertical distance y<sub>i</sub>-(ax<sub>i</sub>+b) between the point
and the straight line is calculated. This distance then is squared and provides the residuals (y<sub>i</sub>-(ax<sub>i</sub>+b))<sup>2</sup>.
Now the residuals will be summed up and a and b are determined so that this sum is as small as possible. This minimization problem can be solved,
it will become the final formulas for a and b in general.</p>
<p>The regression line can be calculated in any case, even if a linear regression is not meaningful.
In applications unfortunately one can not always decide by the conditions whether a linear relationship as a description is useful or not.
Therefore, measures of the quality of the approximation of the point cloud by the regression line are needed.
The residual sum can not not be used directly as an evaluation measure, because their value depends on the magnitude of the x and y values.
If, for example, other units are selected, the residual sum changes.
One solution of this&nbsp;is the <strong>correlation coefficient</strong>: It provides independent of sample size and the magnitude
 of the x and y values ​​always a&nbsp;number between -1 and 1. On values ​​close to 1 or -1, the points can be well matched by a rising or falling straight line.
 On values ​​near 0, the adaptation of the point cloud by a straight line is rather inappropriate as a model description.</p>
 <p>From a statistical point of view the linear regression is&nbsp;a simple form of a linear model: A random value, which is taking into account the measurement error,
 is added to the straight line&nbsp;ax+b. It is very common to assume&nbsp;that the error is normally distributed with mean of 0, i.e. that the observations are
 random variables Y<sub>1</sub>,...,Y<sub>n</sub> with Y<sub>i</sub>=ax<sub>i</sub>+b+Z<sub>i</sub>, where the Z<sub>i</sub> are normally distributed
 with an expected value of 0 and an unknown variance σ<sup>2</sup>. If there is the task to estimate the values a and b based on a concrete sample,
 for a and b just the estimators of the least squares method will appear.</p>
 <p>In this model, the square of the correlation coefficient, the coefficient of determination, has an important interpretation:
 The fact that the y<sub>i</sub> are not all the same is due to the fact that that different values x<sub>i</sub> have been set and that the error term is normally distributed.
 The coefficient of determination now gives the part of the variation of y<sub>i</sub> which can be explained by x<sub>i</sub>.
 For values close to 1 a very large part of the variation of y<sub>i</sub> can be explained by the adjusting of the x<sub>i</sub>, i.e. by the linear regression.
 For values close to 0, the variation of the y<sub>i</sub> is mainly due to the normally distributed error and can hardly be explained by the regression.</p>
<div id="downloadInfoArea" class="mt-5"></div>
`;

lang.GUI.Guess={};
lang.GUI.Guess.name="Guessing the regression line";
lang.GUI.Guess.info="n the figure below a scatter plot of randomly generated points appears. By two mouse clicks you can try define a appropriate regression line for the plot. You can also display the correct regression line. By comparing the residual sum of your proposal and the minimum residual sum you can see how good your estimation was.";
lang.GUI.Guess.userLine="Current line";
lang.GUI.Guess.userLineResiduum="Residual sum of the line";
lang.GUI.Guess.optimalLine="Optimal line";
lang.GUI.Guess.optimalLineResiduum="Minimum residual sum";
lang.GUI.Guess.correlationCoefficient="Empirical correlation coefficient";
lang.GUI.Guess.buttonNew="New points";
lang.GUI.Guess.buttonShowSolution="Show solution";

lang.GUI.Show={};
lang.GUI.Show.name="Display the regression line";
lang.GUI.Show.info="By clicking in the coordinate system, you can create a point cloud. for which the corresponding regression line will be calculated and displayed.";
lang.GUI.Show.userLine="Current line";
lang.GUI.Show.userLineResiduum="Residual sum of the line";
lang.GUI.Show.correlationCoefficient="Empirical correlation coefficient";
lang.GUI.Show.buttonNew="Clear points";

/* Activate language */

const language=(document.documentElement.lang=='de')?languageDE:languageEN;
