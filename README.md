# printing-service

### Install
#### ```npm i```

### Running the project
#### ```node app.js or npm start```

#### docs
##### https://www.npmjs.com/package/node-thermal-printer


## Installation for Windows

### Step 1. 
### install Node.js and npm
##### Windows 10 install node.js 12: https://nodejs.org/en/download/
##### Windows 7 install node.js 10: https://nodejs.org/dist/latest-v10.x/win-x86/


### Step 2. 
### install Epson USB driver
##### Windows 10: https://download.epson-biz.com/modules/pos/index.php?page=single_soft&cid=6261&scat=35&pcat=3
##### Windows 7: https://download.epson-biz.com/modules/pos/index.php?page=single_soft&cid=6262&scat=35&pcat=3

### install Epson printer driver
##### driver TM-T20ii (USB, no JS SDK)
##### http://download.epson-biz.com/modules/pos/index.php?page=single_soft&cid=6445&pcat=3&pid=3721

##### driver TM-T88V (USB, IP, JS SDK)
##### https://download.epson-biz.com/modules/pos/index.php?page=single_soft&cid=6454

##### driver TM-T88IV (USB, IP, JS SDK)
##### https://download.epson-biz.com/modules/pos/index.php?page=single_soft&cid=6423&pcat=3&pid=30

### Add Printer
#### go to "Devices and Printers" and add a printer named "epson-printer"

### Step 3. Windows-Build-Tools 
##### Start PowerShell as Administrator and run: ```npm install --global windows-build-tools```. https://github.com/felixrieseberg/windows-build-tools


### Step 4. for node-printer dependencies
##### To install this package https://www.npmjs.com/package/printer type:
##### npm install git+https://github.com/tojocky/node-printer.git


### Step 5. Run the app automatically
#### for autorun add this file to the inside of shell startup  "windows-autorun-printing-service.vbs"

#### Make a bat file:

##### WScript.exe "Path\to\your\windows-autorun-printing-service.vbs"

#### Add it to startup from gpedit.msc


## for linux

##### If USB permission denid : sudo chmod +777 /dev/usb/lp1 or sudo chmod -R 777 /dev/usb/lp1

### Tested printers:
#####  .Epson TM T20II
#####  .EPSON TM-T88V