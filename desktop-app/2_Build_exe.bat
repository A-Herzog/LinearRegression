cd ..
del LinearRegression.exe

call neu.cmd build --release --embed-resources

move .\dist\LinearRegression\LinearRegression-win_x64.exe LinearRegression.exe
rmdir /S /Q dist
cd desktop-app