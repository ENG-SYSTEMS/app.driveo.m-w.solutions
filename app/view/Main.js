Ext.define('frontapp.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    requires: [
        'Ext.util.Geolocation',
        'Ext.Label'
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
                width: '80%',
                layout: {
                    type: 'vbox'
                },
                style: 'margin: 10px 10%',
                items: [
                    {
                        xtype: 'label',
                        cls: 'driv-panel',
                        action: 'user-infos',
                        html: '<h1>Mr MESSIN Enguerrand</h1>'+
                            '<div>Email: enguer@enguer.com</div>'+
                            '<div>Téléphone: 06 76 56 81 14 </div>'+
                            '<div>Adresse: 1 chemin des alouettes, 30230 Bouillargues </div>'
                    },
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
                    }
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
        if (tab_commande.length==0){
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

        //mise à jour des infos utilisateurs
        var user_infos = this.down('[action=user-infos]'),
            user = frontapp.utils.Config.getCurrentUser();
        if (user){
            user_infos.setHtml('<h1>'+user.Civilite+' '+user.Nom+' '+user.Prenom+'</h1>'+
            '<div>Email: '+user.Mail+'</div>'+
            '<div>Téléphone: '+user.Tel+' </div>'+
            '<div>Adresse: '+user.Adresse+' '+user.CodePostal+' '+user.Ville+' </div>');
        }

    }
});
