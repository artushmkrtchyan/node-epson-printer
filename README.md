### Install
#### npm i

### Running the project
#### node app.js or npm start

#### docs
##### https://www.npmjs.com/package/node-thermal-printer


## for windows

### Step 1. 
##### install driver epson https://download.epson-biz.com/modules/pos/index.php?page=single_soft&cid=6261&scat=35&pcat=3,
##### driver TM-T20ii
##### https://download.epson-biz.com/modules/search/index.php?query_text=&search_target=1&idx=pos&search_key=/Software/Printer%20Driver   "APD_511R1_T20II_EWM.zip"

### Step 2. Windows-Build-Tools 
##### npm install --global windows-build-tools.   https://github.com/felixrieseberg/windows-build-tools

### Step 3. for node-printer dependencies
##### https://www.npmjs.com/package/printer
##### npm install git+https://github.com/tojocky/node-printer.git

## for linux

##### If USB permission denid : sudo chmod +777 /dev/usb/lp1 or sudo chmod -R 777 /dev/usb/lp1

### Tested printers:
#####  .Epson TM T20II
#####  .EPSON TM-T88V
