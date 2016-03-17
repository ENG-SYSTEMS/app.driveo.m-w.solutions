Ext.define('frontapp.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    requires: [
        'Ext.util.Geolocation',
        'Ext.Label',
        'Ext.carousel.Carousel'
    ],
    id: 'mainCard',
    config: {
        cls: 'product-list-page',
        scrollable: true,
        items: [
            {
               xtype: 'toolbar',
               docked: 'top',
               title: 'Tableau de bord',
               cls: 'header top',
               items: [
                    {
                        xtype: 'button',
                        text: '',
                        iconCls: 'fa fa-navicon',
                        cls: 'open-socials',
                        handler: function(){
                            frontapp.utils.Config.toggleMenu();
                        }
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            },
            {
                width: '100%',
                layout: {
                    type: 'vbox'
                },
                items: [
                    {
                        layout: 'hbox',
                        items: [
                            {
                                cls: 'driveo-case success fa fa-shopping-bag',
                                flex: 1,
                                action: 'menu-commande',
                                html: 'Commandes'
                            },
                            {
                                cls: 'driveo-case warning fa fa-medkit',
                                flex: 1,
                                action: 'menu-ordonnance',
                                html: 'Ordonnances'
                            },
                            {
                                cls: 'driveo-case danger fa fa-envelope',
                                flex: 1,
                                action: 'menu-message',
                                html: 'Messages'
                            }
                        ]
                    },
                    //promotions
                    {
                        xtype: 'carousel',
                        height: 150,
                        action: 'promotion',
                        defaults: {
                            styleHtmlContent: true
                        },

                        items: [
                        ]
                    },
                    {
                        layout: 'hbox',
                        items: [
                            {
                                cls: 'driveo-case danger fa fa-user',
                                flex: 1,
                                html: 'Utilisateur'
                            },
                            {
                                flex: 2,
                                xtype: 'label',
                                cls: 'driveo-case success text',
                                action: 'user-infos',
                                html: ''
                            }
                        ]
                    },
                    //produits à la une
                    {
                        xtype: 'carousel',
                        height: 300,
                        action: 'palu',
                        defaults: {
                            styleHtmlContent: true
                        },

                        items: [
                        ]
                    },
                    /*,
                    {
                        cls: 'driv-panel warning',
                        items: [
                            {
                                html: '<h2>Ordonnances en cours</h2>'
                            },
                            {
                                action: 'ordonnances-info',
                                style: 'margin: 0 0 10px 0',
                                html: '<div>Il n\'y a pas d\'ordonnance en cours.</div>'
                            },
                            {
                                xtype: 'button',
                                width: '100%',
                                cls: 'ypm-button warning',
                                action: 'menu-ordonnance',
                                text: 'Liste des ordonnances'
                            },
                            {
                                xtype: 'button',
                                width: '100%',
                                cls: 'ypm-button',
                                action: 'menu-photo-ordonnance',
                                text: 'Nouvelle ordonnance'
                            }
                        ]
                    },
                    {
                        cls: 'driv-panel warning',
                        items: [
                            {
                                html: '<h2>Commandes en cours</h2>'
                            },
                            {
                                action: 'commandes-info',
                                style: 'margin: 0 0 10px 0',
                                html: '<div>Il n\'y a pas de commande en cours.</div>'
                            },
                            {
                                xtype: 'button',
                                width: '100%',
                                cls: 'ypm-button warning',
                                action: 'menu-commande',
                                text: 'Liste des commandes'
                            },
                            {
                                xtype: 'button',
                                width: '100%',
                                cls: 'ypm-button',
                                action: 'menu-produit',
                                text: 'Parcourir les produits'
                            }
                        ]
                    },
                    {
                        cls: 'driv-panel info',
                        xtype: 'label',
                        html: '<div><strong>La '+frontapp.utils.Config.getStoreName()+'</strong> vous remercie d\'utiliser son application. <br/> Vous pouvez envoyer une ordonnance directement votre ordonnance depuis le menu "Nouvelle ordonnance" ou rechercher un produit et effectuer une commande depuis le menu "liste des produits". <br/></div>'
                    }*/
                ]
            }
        ],
        listeners: {
            initialize: function(item){

                //initialisation du menu
                var leftmenu = Ext.create('Ext.Panel', {
                    id: 'sidemenu',
                    scrollable: false,
                    height: '100%',
                    width: '100%',
                    items: [
                        {
                            xtype: 'menu',
                            width: 265,
                            scrollable: false,
                            style: 'top: -10%;',
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            cls: 'snap-drawer snap-drawer-left',
                            items: [
                                {
                                    action: 'close-menu',
                                    cls: 'sidebar-header',
                                    html: '<a href="#" class="sidebar-logo"></a>'
                                    /*'<a href="#" class="sidebar-close"><i class="fa fa-times"></i></a>'*/
                                },
                                {
                                    cls: 'menu-item',
                                    action: 'menu-main',
                                    html: '<i class="fa fa-tablet"></i>' +
                                    '<strong>Tableau de bord</strong>'
                                },
                                {
                                    cls: 'menu-item',
                                    action: 'menu-photo-ordonnance',
                                    html: '<i class="fa fa-camera"></i>' +
                                    '<strong>Nouvelle ordonnance</strong>'
                                },
                                {
                                    cls: 'menu-item',
                                    action: 'menu-ordonnance',
                                    html: '<i class="fa fa-pagelines"></i>' +
                                    '<strong>Liste des ordonnances</strong>'
                                },
                                {
                                    cls: 'menu-item',
                                    action: 'menu-produit',
                                    html: '<i class="fa fa-list"></i>' +
                                    '<strong>Liste des produits</strong>'
                                },
                                {
                                    cls: 'menu-item',
                                    action: 'menu-commande',
                                    html: '<i class="fa fa-shopping-cart"></i>' +
                                    '<strong>Liste des commandes</strong>'
                                },
                                {
                                    cls: 'menu-item',
                                    action: 'deconnexion',
                                    html: '<i class="fa fa-sign-out"></i>' +
                                    '<strong>Déconnexion</strong>'
                                }

                            ]
                        }
                    ]
                });

                //set menu left
                /*Ext.Viewport.setMenu(leftmenu,{
                    side: 'left',
                    reveal: true
                });*/
                Ext.getBody().insertFirst(leftmenu.element);

                frontapp.utils.Config.setElementMenu(leftmenu.element);

                //swipe menu
                frontapp.utils.Config.setSwipe();

                //ouverture du menu à l'initialisation
                frontapp.utils.Config.showMenu();

                //on refraichit les donnéess
                this. refreshData();

                //a chaque fois que la liste est rechargée
                var commandes = Ext.getStore('Commandes'),
                    me = this;

                commandes.on('load', function () {
                    me.refreshData();
                })

            }
        }
    },
    _pal_interval: 0,
    _prom_interval: 0,
    refreshData: function () {
        //Définition des commandes
        var commandes = Ext.getStore('Commandes'),
            commande_input = this.down('[action=commandes-info]'),
            tab_commande = [],
            panier_encours = [];

        //recherche des commandes
        commandes.findBy(function (record){
            if (!record.get('Cloture')){
                if (record.get('Valide'))
                    tab_commande.push(record);
                else
                    panier_encours.push(record);
            }
        });

        //mise à jour des contenus
/*        if (tab_commande.length==0){
            commande_input.setHtml('<div>Il n\'y a pas de commande en cours.</div>');
        }else{
            commande_input.setHtml('<div>Il y a '+tab_commande.length+' commande(s) en cours.</div>');
        }

        //Définition des ordonnances
        var ordonnances = Ext.getStore('Ordonnances'),
            ordonnances_input = this.down('[action=ordonnances-info]'),
            tab_ordonnance = [];

        //recherche des commandes
        ordonnances.findBy(function (record){
            if (record.get('Etat')<4){
                tab_ordonnance.push(record);
            }
        });

        //mise à jour des contenus
        if (tab_ordonnance.length==0){
            ordonnances_input.setHtml('<div>Il n\'y a pas d\'ordonnance en cours.</div>');
        }else{
            ordonnances_input.setHtml('<div>Il y a '+tab_ordonnance.length+' ordonnance(s) en cours.</div>');
        }
*/
        //mise à jour des infos utilisateurs
        var user_infos = this.down('[action=user-infos]'),
            user = frontapp.utils.Config.getCurrentUser();
        if (user){
            user_infos.setHtml('<h1>'+user.Civilite+' '+user.Nom+' '+user.Prenom+'</h1>'+
            '<div>Email: '+user.Mail+'</div>'+
            '<div>Téléphone: '+user.Tel+' </div>'+
            '<div>Adresse: '+user.Adresse+' '+user.CodePostal+' '+user.Ville+' </div>');
        }

        console.log('affichage du dashboard');

        if (!this._prom_interval) {
            var promotions = Ext.getStore('Promotions'),
                prom = this.down('[action=promotion]');

            //affichage du chargement
            prom.setMasked({
                xtype: 'loadmaskypm',
                indicator: false,
                message: 'Chargement des promotions'
            });

            promotions.on('load', function () {
                prom.setHidden(true);
                prom.removeAll();
                promotions.findBy(function (r) {
                    prom.add([
                        {
                            html: '<span class="prom-title warning">' + r.get('text') + '</span>' +
                            '<span class="prom-price danger">' + r.get('textdate') + '</span>',
                            style: {
                                background: 'url(' + frontapp.utils.Config.getDomain() + '/' + r.get('image') + ')',
                                backgroundSize: 'cover'
                            }
                        }
                    ]);
                    prom.setHidden(false);
                });
                prom.setMasked(null);
            });

            promotions.load();
            this._prom_interval = setInterval(function () {
                prom.next();
            }, 5000);
        }

        if (!this._pal_interval) {
            var palu = Ext.getStore('ProduitALaUne'),
                pa = this.down('[action=palu]');

            //affichage du chargement
            pa.setMasked({
                xtype: 'loadmaskypm',
                indicator: false,
                message: 'Chargement des produits à la une'
            });

            palu.on('load',function () {
                pa.setHidden(true);
                pa.removeAll();
                palu.findBy(function (r) {
                    pa.add([
                        {
                            html : '<a href="#product/'+r.get('id')+'" class="prom-title warning">'+r.get('Nom')+'</a>'+
                            '<a href="#product/'+r.get('id')+'" class="prom-price danger">'+r.get('TarifText')+'</a>',
                            style: {
                                background: 'url('+frontapp.utils.Config.getDomain()+'/'+r.get('Image')+')',
                                backgroundSize: 'cover'
                            }
                        }
                    ]);
                    pa.setHidden(false);
                });
                pa.setMasked(null);
            });

            palu.load();
            this._pal_interval = setInterval(function () {
                pa.next();
            }, 5000);
        }

    }
});
