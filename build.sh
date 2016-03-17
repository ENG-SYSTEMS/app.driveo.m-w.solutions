#!/bin/bash
#ecluse
./save.sh ecluse 1
sencha app build native
cd cordova
cordova build android --release
cd platforms/android/build/outputs/apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore eng.systems.keystore android-x86-release-unsigned.apk eng.systems
rm frontapp-x86.apk
/home/enguer/Logiciels/adt-bundle/sdk/build-tools/21.1.2/zipalign -v 4 android-x86-release-unsigned.apk frontapp-x86.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore eng.systems.keystore android-armv7-release-unsigned.apk eng.systems
rm frontapp-armv7.apk
/home/enguer/Logiciels/adt-bundle/sdk/build-tools/21.1.2/zipalign -v 4 android-armv7-release-unsigned.apk frontapp-armv7.apk
cd ../../../../../..
./save.sh

#cours
./save.sh cours 1
sencha app build native
cd cordova
cordova build android --release
cd platforms/android/build/outputs/apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore eng.systems.keystore android-x86-release-unsigned.apk eng.systems
rm frontapp-x86.apk
/home/enguer/Logiciels/adt-bundle/sdk/build-tools/21.1.2/zipalign -v 4 android-x86-release-unsigned.apk frontapp-x86.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore eng.systems.keystore android-armv7-release-unsigned.apk eng.systems
rm frontapp-armv7.apk
/home/enguer/Logiciels/adt-bundle/sdk/build-tools/21.1.2/zipalign -v 4 android-armv7-release-unsigned.apk frontapp-armv7.apk
cd ../../../../../..
./save.sh

#castanet
./save.sh castanet 1
sencha app build native
cd cordova
cordova build android --release
cd platforms/android/build/outputs/apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore eng.systems.keystore android-x86-release-unsigned.apk eng.systems
rm frontapp-x86.apk
/home/enguer/Logiciels/adt-bundle/sdk/build-tools/21.1.2/zipalign -v 4 android-x86-release-unsigned.apk frontapp-x86.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore eng.systems.keystore android-armv7-release-unsigned.apk eng.systems
rm frontapp-armv7.apk
/home/enguer/Logiciels/adt-bundle/sdk/build-tools/21.1.2/zipalign -v 4 android-armv7-release-unsigned.apk frontapp-armv7.apk
cd ../../../../../..
./save.sh
