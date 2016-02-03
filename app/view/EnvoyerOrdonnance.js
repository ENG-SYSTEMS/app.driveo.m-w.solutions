Ext.define('frontapp.view.EnvoyerOrdonnance', {
    extend: 'Ext.Container',
    xtype: 'envoyer-ordonnance',
    requires: [
    ],
    id: 'envoyer-ordonnance',
    config: {
        cls: 'product-list-page',
        layout: {
            type: 'card',
            align: 'center',
            animation: 'flip'
        },
        scrollable:true,
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
                        xtype: 'fieldset',
                        style: 'margin:10px 10%',
                        instructions: '',
                        action: 'envoi-ordonnance',
                        defaults: {
                            labelWidth: '0%'
                        },
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'button',
                                height: '30',
                                text: 'Prendre une photo de l\'ordonnance',
                                action: 'take-photo',
                                cls: 'ypm-button',
                                handler: function () {
                                    try {
                                        navigator.camera.getPicture(onSuccess, onFail, {
                                            quality: 95,
                                            destinationType: Camera.DestinationType.DATA_URL,
                                            sourceType: Camera.PictureSourceType.CAMERA,
                                            allowEdit: true,
                                            encodingType: Camera.EncodingType.JPEG,
                                            targetWidth: 800,
                                            targetHeight: 1280,
                                            popoverOptions: CameraPopoverOptions,
                                            saveToPhotoAlbum: false
                                        });
                                    }
                                    catch (err){
                                        console.log('pas d appareil photo');
                                        var image = Ext.Viewport.getActiveItem().down('[action=ordonnanceImage]');
                                        var imageData = "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";
                                        image.setSrc("data:image/jpeg;base64,"+imageData);
                                        var hi = Ext.Viewport.getActiveItem().down('[action=ordonnancePhoto]');
                                        hi.setValue(imageData);
                                    }

                                    function onSuccess(imageData) {
                                        var image = Ext.Viewport.getActiveItem().down('[action=ordonnanceImage]');
                                        image.setSrc("data:image/jpeg;base64," + imageData);
                                        var hi = Ext.Viewport.getActiveItem().down('[action=ordonnancePhoto]');
                                        hi.setValue(imageData);
                                    }

                                    function onFail(message) {
                                        alert('Failed because: ' + message);
                                    }
                                }
                            },
                            {
                                xtype: 'image',
                                width: '100%',
                                action: 'ordonnanceImage',
                                height: '300px',
                                src: '/resources/images/default-photo.png'
                            },
                            {
                                xtype: 'hiddenfield',
                                name: 'Image',
                                action: 'ordonnancePhoto',
                                value: ''
                            },
                            {
                                xtype         : 'textareafield',
                                name : 'Commentaire',
                                label: 'Commentaire',
                                placeHolder   : 'Saisissez un commentaire',
                                maxRows: 4,
                                height: '100',
                                autoCapitalize: false,
                                required      : 0,
                                clearIcon     : false,
                                action: 'ordonnanceCommentaire'
                            },
                            {
                                xtype: 'button',
                                height: '30',
                                text: 'Envoyer l\'ordonnnance',
                                action: 'ordonnanceSubmit',
                                cls: 'ypm-button'
                            }
                        ]
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

        ]
    }
});
