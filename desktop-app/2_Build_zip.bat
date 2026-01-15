cd ..
rem del LinearRegression.exe
del LinearRegression_Linux_MacOS.zip
call neu.cmd build --release
cd desktop-app
rem "C:\Program Files (x86)\NSIS\makensis.exe" Launcher.nsi
rem move LinearRegression.exe ..
cd ..
move .\dist\LinearRegression-release.zip LinearRegression_Linux_MacOS.zip
rmdir /S /Q dist
cd desktop-app