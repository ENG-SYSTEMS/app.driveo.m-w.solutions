#!/bin/bash
if [ $1 ]
then
	if [ $1 -eq ${cat current} ]
	then
		cp -f app/utils/Config.js app/utils/Config.js.$1
		cp -Rf resources resources.$1
		cp -Rf cordova cordova.$1	
	else
		if [ $2 ]
		then
			cp -f app/utils/Config.js app/utils/Config.js.$1
			cp -Rf resources resources.$1
			cp -Rf cordova cordova.$1
		else
			echo "attention il ne s'agit pas du projet cureent ${cat current}, ajoute 1 en second parametre pour confirmer."
		fi
	fi
	echo $i > current
else
	echo "impossble de trouver le parametre $1"
fi


