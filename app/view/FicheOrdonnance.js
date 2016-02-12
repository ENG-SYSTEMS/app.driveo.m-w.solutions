Ext.define('frontapp.view.FicheOrdonnance', {
    extend: 'Ext.Container',
    xtype: 'fiche-ordonnance',
    requires: [
    ],
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
                                xtype: 'label',
                                cls: 'driv-panel',
                                action: 'ordonnance-info',
                                html: ''
                            },
                            {
                                xtype: 'image',
                                width: '100%',
                                action: 'ordonnanceImage',
                                height: '300px',
                                src: '/resources/images/default-photo.png'
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
    },
    setRecord: function (record){
        if (!record) return;
        console.log(record);
        //title
        this.down('[action=ordonnanceImage]').setSrc(frontapp.utils.Config.getDomain()+'/'+record.get('Image'));
        this.down('[action=ordonnance-info]').setHtml(
            '<h3>Date: '+record.get('Date')+'</h3>'+
            '<div>Etat: '+record.get('EtatText')+'</div>'+
            '<div>Commentaires: '+record.get('Commentaire')+'</div>'
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
