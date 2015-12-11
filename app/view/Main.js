Ext.define('frontapp.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'Ext.dataview.List',
        'Ext.tab.Panel',
        'Ext.Menu',
        'Ext.Anim',
        'Ext.util.Geolocation'
    ],
    id: 'mainCard',
    config: {
        cls: 'product-list-page',
        layout: {
            type: 'card',
            align: 'center',
            animation: 'flip'
        },
        items: [
            {
               xtype: 'toolbar',
               docked: 'top',
               title: 'Envoyer une ordonnance',
               cls: 'header',
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
                align: 'center',
                items:[
                    {
                        width: '100%',
                        layout: {
                            type: 'hbox'
                        },
                        style: 'margin: 10px 10pxb',
                        items: [
                            {
                                xtype: 'image',
                                width: '100px',
                                action: 'produitImage',
                                height: '100px',
                                src: 'http://www.sencha.com/assets/images/sencha-avatar-64x64.png'
                            },
                            {
                                xtype: 'hiddenfield',
                                name: 'Image',
                                action: 'photo',
                                value: ''
                            },
                            {
                                xtype: 'button',
                                flex: 1,
                                text: 'Prendre une photo',
                                action: 'take-photo',
                                cls: 'ypm-button',
                                handler: function () {
                                    navigator.camera.getPicture(onSuccess, onFail, {
                                        quality : 90,
                                        destinationType : Camera.DestinationType.DATA_URL,
                                        sourceType : Camera.PictureSourceType.CAMERA,
                                        allowEdit : true,
                                        encodingType: Camera.EncodingType.JPEG,
                                        targetWidth: 800,
                                        targetHeight: 600,
                                        popoverOptions: CameraPopoverOptions,
                                        saveToPhotoAlbum: false
                                    });

                                    function onSuccess(imageData) {
                                        var image = Ext.Viewport.getActiveItem().down('[action=produitImage]');
                                        image.setSrc("data:image/jpeg;base64," + imageData);
                                        var hi = Ext.Viewport.getActiveItem().down('[action=photo]');
                                        hi.setValue(imageData);
                                    }

                                    function onFail(message) {
                                        alert('Failed because: ' + message);
                                    }
                                }
                            }                        ]
                    },
                    {
                        align: 'center',
                        items:[
                            {
                                title: 'Ordonnances',
                                style: 'overflow:hidden',
                                iconCls: 'cart',
                                width: '100%',
                                height: '100%',
                                xtype: 'list',
                                store: 'Ordonnances',
                                cls: 'product-list',
                                infinite: false,
                                action: 'listeproduit',
                                itemTpl: '<div class="product">'+
                                '<span class="product-dist product-near">{MontantTTC} € TTC</span>'+
                                '<h2>({Reference})</h2>'+
                                '<span class="product-hours">{TarifText}</span>'+
                                    /*'<span class="valet-address">Poids: {Poids}<br />Largeur: {Largeur} <br />Hauteur: {Hauteur} <br /> Profondeur: {Profondeur}</span>'+*/
                                '</div>',
                                grouped: false,
                                pinHeaders: false,
                                plugins: [
                                    {
                                        xclass: 'Ext.plugin.ListPaging',
                                        autoPaging: true,
                                        showAnimation: 'slideIn',
                                        loadMoreText: 'Chargement...',
                                        noMoreRecordsText: 'Pas plus d\'enregistrements'
                                    },
                                    {
                                        xclass: 'Ext.plugin.PullRefresh',
                                        pullText: 'Glissez vers le bas pour rafraichir.',
                                        releaseText:'Relachez pour rafraichir.',
                                        loadingText: 'Chargement en cours ...',
                                        loadedText: 'Chargement reussi.',
                                        lastUpdatedText: 'Mise à jour:  ',
                                        listeners : {
                                            latestfetched: function () {
                                                console.log('refresh list');
                                                this.getList().getStore().currentPage = 1;
                                                this.getList().getStore().removeAll();
                                                this.getList().getStore().load();
                                            }
                                        }
                                    }

                                ]
                            }
                        ]
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
/*                                {
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
                                    action: 'menu-ordonnance',
                                    html: '<i class="fa fa-pagelines"></i>' +
                                    '<strong>Liste des ordonnances</strong>'
                                },*/
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
            }
        }
    }
});
