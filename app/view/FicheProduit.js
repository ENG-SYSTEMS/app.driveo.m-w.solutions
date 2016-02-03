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
                action: 'produittitle',
                title: 'Stéphanie Delaporta',
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
                    },
                    {
                        xtype : 'button',
                        hidden: false,
                        ui    : 'decline',
                        action: 'back',
                        iconCls: 'fa fa-arrow-left',
                        cls: 'open-socials',
                        text  : ''
                    }
                ]
            },
            {
                align: 'center',
                style: 'margin:0',
                items: [
                    {
                        layout: 'hbox',
                        height: 70,
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
                                items: [
                                    {
                                        layout: 'hbox',
                                        items: [

                                            {
                                                xtype: 'button',
                                                cls: 'ypm-button',
                                                html: '<i class="fa fa-plus-circle"></i>',
                                                handler: function() {
                                                    this.up('form').down('[name=bottles]').spinDown();
                                                }
                                            },
                                            {
                                                xtype: 'numberfield',
                                                anchor: '100%',
                                                name: 'bottles',
                                                labelWidth: 0,
                                                value: 99,
                                                maxValue: 99,
                                                minValue: 0
                                            },
                                            {
                                                xtype: 'button',
                                                cls: 'ypm-button',
                                                html: '<i class="fa fa-minus-circle"></i>',
                                                handler: function() {
                                                    this.up('form').down('[name=bottles]').spinDown();
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'ypm-button',
                                        text: 'Ajouter au panier'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        scrollable: true,
                        style: 'height: calc( 100% - 100px );',
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
        this.down('[action=produittitle]').setTitle(record.get('Nom').substr(0,35)+'...');
        this.down('[action=produitImage]').setSrc(frontapp.utils.Config.getDomain()+'/'+record.get('Image'));
        this.down('[action=produit-info]').setHtml(
            '<h2>'+record.get('Nom')+'</h2>'+
            '<div>'+record.get('Description')+'</div>'
        );
        this.down('[action=produit-tarif]').setHtml(
            record.get('TarifText')
        );

        //show valet histo
        var me = this;
        /*this.down('[action=show-valet-histo]').addListener('tap',function () {*/
/*            var url  = frontapp.utils.Config.getHistoValetUrl();
            console.log('show valet histo',me.down('[action=valet-histo]'));
            var store = new Ext.data.Store({
                model: 'frontapp.model.Course',
                proxy: {
                    method: 'POST',
                    actionMethods: {
                        create : 'POST',
                        read   : 'POST', // by default GET
                        update : 'POST',
                        destroy: 'POST'
                    },
                    useDefaultXhrHeader: false,
                    type: 'ajax',
                    url: url,
                    reader: {
                        type: 'json',
                        rootProperty: 'courses'
                    }
                }
            });
            store.getProxy().setExtraParams({
                user_id: frontapp.utils.Config.getCurrentUser().user_id,
                valet_id: record.get('id'),
                logkey: frontapp.utils.Config.getCurrentKey()
            });            store.load();
            me.down('[action=valet-histo]').setStore(store);
            me.down('[action=valet-histo]').setStyle('height: 750px; overflow:hidden');
        /*});*/
    }
});
