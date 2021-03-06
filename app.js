/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'frontapp',

    requires: [
        'Ext.MessageBox',
        'frontapp.utils.Config',
        'frontapp.utils.LoadMaskCustom',
        'Ext.Img',
        'Ext.plugin.ListPaging',
        'Ext.plugin.PullRefresh',
        'Ext.Toast',
        'frontapp.utils.TimePickerField',
        'frontapp.utils.TimePicker',
        'Ext.Date',
        'Ext.field.Number',
        'Ext.field.Hidden',
        'Ext.field.Password',
        'Ext.field.Toggle',
        'Ext.Toast',
        'frontapp.utils.Notification'
    ],
    controllers: [
       /* 'Google',*/
        /*'Facebook',*/
        'Main',
        'Produit',
        'Ordonnance',
        'Commande',
        'Panier',
        'Registration'
    ],
    views: [
        'Main',
        'Login',
        'Produit',
        'FicheProduit',
        'Commande',
        'Ordonnance',
        'FicheOrdonnance',
        'EnvoyerOrdonnance',
        'FicheCommande',
        'Registration',
        'ResetPassword'
    ],

    icon: {
        '57': 'resources/icons/icon.png',
        '72': 'resources/icons/icon~ipad.png',
        '114': 'resources/icons/icon@2x.png',
        '144': 'resources/icons/icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    viewport: {
        autoBlurInput: false
    },

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },
    
    models: [
        'Produit',
        'Commande',
        'Ordonnance',
        'LigneCommande',
        'Promotion'
    ],
    
    stores: [
        'Produits',
        'Commandes',
        'Ordonnances',
        'Panier',
        'DetailCommande',
        'Produits',
        'ProduitALaUne',
        'Promotions'
    ],

    eventPublishers: {
        touchGesture: {
            recognizers: {
                doubleTap: null,
                longPress: null,
                rotate: null
            }
        }
    },

    checkKey: function () {
        console.log('check key');
        //Récupération du store key
        var key = localStorage.getItem('key');
        var user_id = localStorage.getItem('user_id');
        //Vérification de la clef
        if (key&&user_id) {
            console.log('vérification de la clef',key,user_id);
            var me = this;
            Ext.Ajax.request({
                params: {
                    logkey: key,
                    user_id: user_id
                },
                url: frontapp.utils.Config.getCheckAlreadyLoggedUrl(),
                useDefaultXhrHeader: false,
                success: function (response, opts) {
                    console.log ('OK',response);
                    var obj = Ext.decode(response.responseText);
                    if (obj.success) {
                        frontapp.utils.Config.setCurrentKey(obj.logtoken);
                        frontapp.utils.Config.setCurrentUser(obj);

                        //Connexion à l'application
                        me.fireEvent("onLoginView", this);
                        me.fireEvent("onLoginSuccess", this);
                    }else{
                        //on reset les infos de connexion
                        frontapp.utils.Config.resetKey();

                        //on récupère une nouvelle clef
                        me.getKey();

                        //redirection login
                        me.redirectTo('login');
                    }
                },
                failure: function (response, opts) {
                    console.log('Petit problème ' + response.status);
                    //on récupère une nouvelle clef
                    me.getKey();

                    //affichage login
                    me.redirectTo('login');

                }
            });
        }else{
            this.getKey();

            //affichage login
            this.redirectTo('login');

            return false;
        }
    },
    getKey: function () {
        console.log('download key');
        if (frontapp.utils.Config.getDomain()) {
            //Téléchargement de la clef
            var me = this;
            Ext.Ajax.request({
                url: frontapp.utils.Config.getLogkeyUrl(),
                useDefaultXhrHeader: false,
                success: function (response, opts) {
                    var obj = Ext.decode(response.responseText);
                    frontapp.utils.Config.setCurrentKey(obj.logkey);
                    console.log('Récupération de la clef temporaire =>> ' + frontapp.utils.Config.getCurrentKey());
                    console.dir(obj);

                    //fire event
                    me.fireEvent("onLoginView", this);
                },
                failure: function (response, opts) {
                    console.log('Petit problème ' + response.status);
                    // Basic alert:
                    var popup = Ext.Msg.alert('Erreur de connexion', 'Vous ne semblez pas connecté à internet. Si il s\'agit d\'un problème temporaire, pressez "OK" pour réessayer.', function () {
                        me.getKey();
                        return true;
                    });
                }
            });
        }
    },
    launch: function() {
        if(Ext.picker.Picker){
            Ext.apply(Ext.picker.Picker.prototype.config, {
                doneButton    : "OK"  ,
                cancelButton  : "Annuler"
            });
        }

        //message box traduction
        var MB = Ext.MessageBox;
        Ext.apply(MB, {
            YES: { text: 'Oui', itemId: 'yes', ui: 'action' }
        });
        Ext.apply(MB, {
            NO: { text: 'Non', itemId: 'no' }
        });
        Ext.apply(MB, {
            YESNO: [Ext.MessageBox.NO, Ext.MessageBox.YES]
        });

        //message box dont close workaround
        Ext.override(Ext.MessageBox, {    
            hide:  function() {
                if (this.activeAnimation && this.activeAnimation._onEnd) {
                    this.activeAnimation._onEnd();
                }
                return this.callParent(arguments);
            }
        });
        //set config app
        frontapp.utils.Config.setApp(this);

        //récupération de la clef
        this.checkKey();

        //recupération de la geolocalisation
        console.log('call geoloc');
        frontapp.utils.Config.initLocation();

        // Initialize the main view
        //Ext.Viewport.add(Ext.create('frontapp.view.Main'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    },
    disconnect: function () {
        console.log('deconnexion ...');
        //suppression des donnée de connexion
        frontapp.utils.Config.resetKey();

        //destruction des vues
/*        Ext.each(Ext.Viewport.getItems(),function (obj,index) {
             console.log('destruction vues '+index);
             Ext.Viewport.remove(obj);
         });*/

        //destruction du menu
        frontapp.utils.Config.resetElementMenu();

        //affichage login
        this.redirectTo('login');

        //Appel de la clef
        this.getKey();
    },
    listeners: {
        onLoginView: function ()  {
            // Destroy the #appLoadingIndicator element
            if (Ext.fly('appLoadingIndicator'))
                Ext.fly('appLoadingIndicator').destroy();
            console.log('Token recupéré, affichage du login');
            
        },
        onLoginSuccess: function () {
            console.log('login success');

            //frontappage de la clef et du user_id
           /* var lv = Ext.getStore('LocalVars');
            lv.insert(0,{'name':'key',value: frontapp.utils.Config.getCurrentKey()});
            lv.insert(1,{'name':'user_id',value: frontapp.utils.Config.getCurrentUser().user_id});*/
            localStorage.setItem('key',frontapp.utils.Config.getCurrentKey());
            localStorage.setItem('user_id',frontapp.utils.Config.getCurrentUser().user_id);

            //affichage du main
            this.redirectTo('main');

            //restauration du menu
            frontapp.utils.Config.restoreElementMenu();
            frontapp.utils.Config.showMenu();

            //redefinition du store VALET
            var geo = frontapp.utils.Config.getGeo();
            if (!geo) {
                Ext.alert('Pas de localisation !!!');
            }

            //redefinition du store COURSE
            var produits = Ext.getStore('Produits');
            produits.getProxy().setExtraParams({
                user_id: frontapp.utils.Config.getCurrentUser().user_id,
                logkey: frontapp.utils.Config.getCurrentKey()
            });

            //chargement des store
            produits.load();

            //redefinition du store ORDONNANCES
            var ordonnances = Ext.getStore('Ordonnances');
            ordonnances.getProxy().setExtraParams({
                user_id: frontapp.utils.Config.getCurrentUser().user_id,
                logkey: frontapp.utils.Config.getCurrentKey()
            });

            //chargement des store
            ordonnances.load();

            //redefinition du store COMMANDES
            var commandes = Ext.getStore('Commandes');
            commandes.getProxy().setExtraParams({
                user_id: frontapp.utils.Config.getCurrentUser().user_id,
                logkey: frontapp.utils.Config.getCurrentKey()
            });

            //chargement des store
            commandes.load();

            //redefinition du store PANIER
            var panier = Ext.getStore('Panier');
            panier.getProxy().setExtraParams({
                user_id: frontapp.utils.Config.getCurrentUser().user_id,
                logkey: frontapp.utils.Config.getCurrentKey()
            });

            //chargement des store
            panier.load();

            var promotions = Ext.getStore('Promotions');
            promotions.getProxy().setExtraParams({
                user_id: frontapp.utils.Config.getCurrentUser().user_id,
                logkey: frontapp.utils.Config.getCurrentKey()
            });

            var produitALaUne = Ext.getStore('ProduitALaUne');
            produitALaUne.getProxy().setExtraParams({
                user_id: frontapp.utils.Config.getCurrentUser().user_id,
                logkey: frontapp.utils.Config.getCurrentKey()
            });

            frontapp.utils.Notification.register();
        }
    }
});
