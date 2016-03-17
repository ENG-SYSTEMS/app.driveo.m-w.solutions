#!/bin/bash
if [ $1 ]; then
	echo "param recu $1"
	if [ "$1" == "$(cat current)" ]; then
		echo "meme projet, essayez sans paramètre $1"
	else
		if [ $2 ]; then
			#switch project
			cp -f app/utils/Config.js app/utils/Config.js.last
			cp -f app/utils/Config.js.$1 app/utils/Config.js
			rm resources.last -Rf
			mv resources resources.last
			cp -Rf "resources.$1" resources
			rm cordova.last -Rf
			mv cordova cordova.last
			cp -Rf "cordova.$1" cordova
			cp -f app.json app.json.last	
			cp -f app.json.$1 app.json	
			echo "switch autre projet $(cat current) vers $1. sauvegarde en .last"
			echo $1 > current
		else
			echo "attention il ne s'agit pas du projet current $1, ajoute 1 en second parametre pour changer de projet"
		fi
	fi
else
	cp -f app/utils/Config.js app/utils/Config.js.$(cat current)
	rm -Rf resources.$(cat current)
        cp -Rf resources "resources.$(cat current)"
	rm -Rf cordova.$(cat current)
        cp -Rf cordova "cordova.$(cat current)"
	cp -f app.json app.json.$(cat current)	

	echo "sauvegarde du projet par défaut $(cat current)";
fi


