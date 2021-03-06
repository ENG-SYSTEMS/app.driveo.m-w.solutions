/**
 * @class Activafrontapp.controller.Main
 * @extends Ext.app.Controller
 *
 * This is an abstract base class that is extended by both the phone and tablet versions. This controller is
 * never directly instantiated, it just provides a set of common functionality that the phone and tablet
 * subclasses both extend.
 */
Ext.define('frontapp.controller.Main', {
    extend: 'Ext.app.Controller',
    /*requires: ['Ext.device.Device'],*/
    config: {
        /**
         * @private
         */
        viewCache: [],

        refs: {
            main: '#mainCard',
            /*** general ***/
            closeMenu: '[action=close-menu]',
            back: '[action=back]',
            login: '[action=login]',
            addproduit: '[action=addproduit]',
            /*** navigation ***/
            menuMain: '[action=menu-main]',
            menuProduit: '[action=menu-produit]',
            menuCommande: '[action=menu-commande]',
            menuOrdonnance: '[action=menu-ordonnance]',
            menuNewOrdonnance: '[action=menu-photo-ordonnance]',

            loginbutton: '[action=loginbutton]',
            logintext: '[action=logintext]',
            domaintext: '[action=domaintext]',
            passtext: '[action=passtext]',
            deconnexion: '[action=deconnexion]'

        },

        control: {
            closeMenu: {
                tap: 'onCloseMenu'  
            },
            addproduit: {
                tap: function () {
                    this.redirectTo('product/add');
                }
            },
            loginbutton: {
                tap: 'onLoginTap'
            },
            deconnexion: {
                tap: 'onDeconnexion'
            },
            back: {
                tap: 'onBackTap'
            },
            login: {
                tap: function () {
                    this.redirectTo('login');
                }
            },
            menuMain: {
                tap: function () {
                    this.redirectTo('main');
                }
            },
            menuProduit: {
                tap: function () {
                    this.redirectTo('produit');
                }
            },
            menuCommande: {
                tap: function () {
                    this.redirectTo('commande');
                }
            },
            menuNewOrdonnance: {
                tap: function () {
                    this.redirectTo('new-ordonnance');
                }
            },
            menuOrdonnance: {
                tap: function () {
                    this.redirectTo('ordonnance');
                }
            }
        },
        routes: {
            /** root cards **/
            'main': 'showMain',
            'produit': 'showProduit',
            'commande': 'showCommande',
            'commande/:id': 'showFicheCommande',
            'ordonnance': 'showOrdonnance',
            'ordonnance/:id': 'showFicheOrdonnance',
            'new-ordonnance': 'showNewOrdonnance',
            'login' : 'showLogin',
            'product/:id': 'showProduct',
            'product/add': 'addProduct',
            'param' : 'showParametres',
            'registration' : 'showRegistration',
            'resetpassword' : 'showResetPassword'
        }
    },
     /***************************
     * CONNEXION / DECONNEXION
     ***************************/
    onDeconnexion: function () {
        console.log('deconnexion utilisateur');
        frontapp.utils.Config.getApp().disconnect();
        frontapp.utils.Config.hideMenu();
    },
    onLoginTap: function () {
        console.log('login en cours...');
        var curview = Ext.Viewport.getActiveItem();
        //masquage de la vue en cours pendant le chargement
        curview.setMasked({
            xtype: 'loadmaskypm',
            indicator: false/*
            message: 'Vérification des données utilisateurs ...'*/
        });
        var me = this;
        //verification des champs
        var user = this.getLogintext().getValue();
        var pass = this.getPasstext().getValue();
        var domain = this.getDomaintext().getValue();
        if (user.length&&pass.length&&domain.length) {
            Ext.Ajax.request({
                params: {
                    login: user,
                    pass: pass
                },
                url: frontapp.utils.Config.getLoginUrl(),
                useDefaultXhrHeader: false,
                success: function(response, opts) {
                   var obj = Ext.decode(response.responseText);
                   console.log('Récupération de la donnée utilisateur');

                   //suppresion de la page de chargement
                   curview.setMasked(null);

                   //test de la réponse
                   if (obj.success) {
                        console.log('Utilisateur connecté', obj);
                        frontapp.utils.Config.setCurrentKey(obj.logtoken);
                        frontapp.utils.Config.setCurrentUser(obj);
                        frontapp.utils.Config.getApp().fireEvent('onLoginSuccess',this);
                   }else{
                        var popup = Ext.Msg.alert('Erreur', obj.msg);
                   }

                },
                failure: function(response, opts) {
                    console.log('Petit problème ' + response.status);

                    //suppresion de la page de chargement
                    curview.setMasked(null);

                    // Basic alert:
                    Ext.Msg.alert('Erreur de connexion', 'Vous ne semblez pas connecté à internet. Si il s\'agit d\'un problème temporaire, pressez "OK" pour réessayer.', function(){
                        return true;
                    });
                }
            });
        }else{
            //un des champs est vide
            Ext.Msg.alert('Erreur de saisie', 'Veuillez saisir un identifiant et un mot de passe.', function(){
                return true;
            });
            curview.setMasked(null);
        }
    },
    /********************************
     * NAVIGATION
     * ******************************/
    onCloseMenu: function () {
        frontapp.utils.Config.hideMenu();
        console.log('close menu');
    },
    /***
     * onBackTap
     * On presse le bouton back
     */
    onBackTap: function ( button, e, eOpts ) {
        console.log('itemtap back');
        var appHistory = this.getApplication().getHistory();

        // fire previous route
        appHistory.back();

        // prevent the default navigation view
        // back button behavior from firing
        return false;
    },
    onProduitAddTap: function ( button, e, eOpts ) {
        frontapp.utils.Config.hideMenu();
        this.redirectTo('produit/add');
    },
    _indexViews: [],
    _currentLevel: 0,
    manageView: function (level,name_view) {
        console.log('---- show view ----', name_view,'level',level);

        //redirection accueil si pas de clef
        if (!frontapp.utils.Config.getCurrentKey()&&name_view!='frontapp.view.Login'&&name_view=='frontapp.form.Registration') {
            console.log('perte de clef... attente...');
            //_____________________________________________________________________________________________________________
            //                                                                                                  ANIMATIONS
            //Ext.Viewport.getLayout().setAnimation({type: 'fade', direction: 'right'});
            //_____________________________________________________________________________________________________________
            //frontapp.utils.Config.getApp().disconnect();
            return;
        }else if (frontapp.utils.Config.getCurrentKey()&&(name_view=='frontapp.view.Login'||name_view=='frontapp.form.Registration')&&frontapp.utils.Config.getCurrentUser()){
            console.log('interdit ya une clef mais la vue est login ou registration et connecté');
            return;
        }else if (frontapp.utils.Config.getCurrentKey()&&(name_view!='frontapp.view.Login'&&name_view!='frontapp.form.Registration')&&!frontapp.utils.Config.getCurrentUser()){
            console.log('interdit ya une clef mais la vue est login ou registration et pas de user');
            return;
        }

        var commview;

        //gestion des effets
        switch (this._currentLevel-level){
            case 1:
                //_____________________________________________________________________________________________________________
                //                                                                                                  ANIMATIONS
                Ext.Viewport.getLayout().setAnimation({type: 'slide', direction: 'right'});
                //_____________________________________________________________________________________________________________
            break;
            case -1:
                //_____________________________________________________________________________________________________________
                //                                                                                                  ANIMATIONS
                Ext.Viewport.getLayout().setAnimation({type: 'slide', direction: 'left'});
                //_____________________________________________________________________________________________________________
            break;
            default:
                //_____________________________________________________________________________________________________________
                //                                                                                                  ANIMATIONS
                Ext.Viewport.getLayout().setAnimation({type: 'fade', direction: 'left'});
                //____________________________________________________________________________________________________________
            break;
        }

        //maintenance de l'index des vues chargées
        if (this._indexViews[name_view]){
            console.log();
            commview = this._indexViews[name_view];
        }else{
            this._indexViews[name_view] = commview = Ext.create(name_view);
        }
        Ext.Viewport.setActiveItem(commview);
        this._currentLevel=level;

        return commview;
    },
    /********************************
     * ROUTING
     * ******************************/
    showLogin: function () {
        frontapp.utils.Config.hideMenu();
        this.manageView(0,'frontapp.view.Login');
    },
    showMain: function () {
        frontapp.utils.Config.hideMenu();
        var curview  = this.manageView(0,'frontapp.view.Main');
        if (curview)
            curview.setMasked(false);
    },
    showProduit: function () {
        frontapp.utils.Config.hideMenu();
        this.manageView(1,'frontapp.view.Produit');
    },
    showRegistration: function () {
        frontapp.utils.Config.hideMenu();
        this.manageView(1,'frontapp.view.Registration');
    },
    showResetPassword: function () {
        frontapp.utils.Config.hideMenu();
        this.manageView(1,'frontapp.view.ResetPassword');
    },
    showFicheCommande: function (id) {
        var ficheview = this.manageView(2,'frontapp.view.FicheCommande');
        var comStore = Ext.getStore('Commandes');
        var record = comStore.getById(id);
        ficheview.setRecord(record);
    },
    showCommande: function () {
        frontapp.utils.Config.hideMenu();
        this.manageView(1,'frontapp.view.Commande');
    },
    showOrdonnance: function () {
        frontapp.utils.Config.hideMenu();
        this.manageView(1,'frontapp.view.Ordonnance');
    },
    showNewOrdonnance: function () {
        frontapp.utils.Config.hideMenu();
        this.manageView(1,'frontapp.view.EnvoyerOrdonnance');
    },
    showFicheOrdonnance: function (id) {
        var ficheview = this.manageView(2,'frontapp.view.FicheOrdonnance');
        var ordoStore = Ext.getStore('Ordonnances');
        var record = ordoStore.getById(id);
        ficheview.setRecord(record);
    },
    showProduct: function (id) {
        var ficheview = this.manageView(2,'frontapp.view.FicheProduit');
        var valetStore = Ext.getStore('Produits');
        var record = valetStore.getById(id);
        if (ficheview)
            ficheview.setRecord(record);
    }
 });
