Ext.define('frontapp.view.FicheProduit', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.dataview.List'
    ],
    config: {
        cls: 'product-list-page',
        layout: {
            type: 'card',
            align: 'center'
        },
        items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                title: 'Détail produit',
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
                    },
                    {
                        xtype : 'button',
                        hidden: false,
                        ui    : 'decline',
                        action: 'back',
                        iconCls: 'fa fa-arrow-left',
                        cls: 'open-socials',
                        text  : ''
                    },
                    {
                        xtype: 'paniertop',
                        iconCls:'fa fa-shopping-basket',
                        cls: 'open-socials'
                    }
                ]
            },
            {
                docked: 'top',
                xtype: 'toolbar',
                action: 'produittitle',
                title: 'Stéphanie Delaporta',
                cls: 'header'
            },
            {
                align: 'center',
                style: 'margin:0',
                items: [
                    {
                        layout: 'hbox',
                        height: 68,
                        width: '100%',
                        cls: 'product-barre',
                        items: [
                            {
                                action: 'produit-tarif',
                                cls: 'product-tarif',
                                height: '100%',
                                flex: 1,
                                html: ''
                            },
                            {
                                layout: 'vbox',
                                flex: 1,
                                height: '100%',
                                items: [
                                    {
                                        layout: 'hbox',
                                        width: '100%',
                                        items: [

                                            {
                                                flex:1,
                                                xtype: 'button',
                                                cls: 'driveo-button alt',
                                                iconCls: 'fa fa-minus',
                                                handler: function() {
                                                    var spin =this.up().down('[action=nbproduit]');
                                                    spin.setValue(spin.getValue()-1);
                                                }
                                            },
                                            {
                                                xtype: 'numberfield',
                                                anchor: '100%',
                                                name: 'bottles',
                                                action: 'nbproduit',
                                                labelWidth: 0,
                                                cls: 'driveo-input product-count',
                                                value: 1,
                                                maxValue: 99,
                                                clearIcon: false,
                                                minValue: 0
                                            },
                                            {
                                                flex:1,
                                                xtype: 'button',
                                                cls: 'driveo-button alt',
                                                iconCls: 'fa fa-plus',
                                                handler: function() {
                                                    var spin =this.up().down('[action=nbproduit]')
                                                    spin.setValue(spin.getValue()+1);
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'driveo-button',
                                        action: 'ajouterpanier',
                                        text: 'Ajouter au panier'
                                    },
                                    {
                                        xtype: 'hiddenfield',
                                        value: 'zob',
                                        action: 'ref'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        scrollable: true,
                        style: 'height: calc( 100% - 100px );margin-top:10px;',
                        items: [
                            {
                                xtype: 'image',
                                width: '100%',
                                action: 'produitImage',
                                height: '300px',
                                src: '/resources/images/default-photo.png'
                            },
                            {
                                xtype: 'label',
                                style: 'margin:0px 10%',
                                cls: 'driv-panel',
                                action: 'produit-info',
                                html: ''
                            }
                        ]
                    }
                ]
            }
        ]
    },
    setRecord: function (record){
        if (!record) return;
        console.log(record);
        //title
        this.down('[action=produittitle]').setTitle(record.get('Nom').substr(0,55)+'...');
        this.down('[action=produitImage]').setSrc(frontapp.utils.Config.getDomain()+'/'+record.get('Image'));
        this.down('[action=produit-info]').setHtml(
            '<h2>'+record.get('Nom')+'</h2>'+
            '<div>'+record.get('Description')+'</div>'
        );
        this.down('[action=produit-tarif]').setHtml(
            record.get('TarifText')
        );
        this.down('[action=nbproduit]').setValue(1);
        this.down('[action=ref]').setValue(record.get('Reference'));
    }
});
