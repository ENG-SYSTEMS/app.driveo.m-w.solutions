#!/bin/bash
#ecluse
./save.sh ecluse 1
sencha app build native
cd cordova
cordova build android --release
cd platforms/android/ant-build
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore eng.systems.keystore CordovaApp-release-unsigned.apk frontapp
rm frontapp.apk
/home/enguer/Logiciels/adt-bundle/sdk/build-tools/21.1.2/zipalign -v 4 CordovaApp-release-unsigned.apk frontapp.apk

#cours
./save.sh cours 1
sencha app build native
cd cordova
cordova build android --release
cd platforms/android/ant-build
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore eng.systems.keystore CordovaApp-release-unsig    ned.apk frontapp
rm frontapp.apk
/home/enguer/Logiciels/adt-bundle/sdk/build-tools/21.1.2/zipalign -v 4 CordovaApp-release-unsigned.apk frontap    p.apk

#castanet
./save.sh castanet 1
sencha app build native
cd cordova
cordova build android --release
cd platforms/android/ant-build
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore eng.systems.keystore CordovaApp-release-unsig    ned.apk frontapp
rm frontapp.apk
/home/enguer/Logiciels/adt-bundle/sdk/build-tools/21.1.2/zipalign -v 4 CordovaApp-release-unsigned.apk frontap    p.apk
