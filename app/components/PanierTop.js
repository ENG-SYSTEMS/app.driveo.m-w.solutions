Ext.define('frontapp.components.PanierTop', {
    extend: 'frontapp.components.DropdownMenu',
    alias: 'widget.paniertop',
    config: {
        items: [
            {
                layout: 'vbox',
                items: [
                    {
                        flex:1,
                        title: 'Panier',
                        width: '100%',
                        cls: 'product-list',
                        xtype: 'list',
                        store: 'Panier',
                        infinite: false,
                        action: 'panier',
                        itemTpl: '<div class="product">'+
                        '<span class="product-dist product-near">{TarifText}</span>'+
                        '<h2>{Titre}</h2>'+
                        '<span class="valet-address">Quantité: {Quantite}</span>'+
                        '</div>',
                        grouped: false,
                        pinHeaders: false,
                        plugins: [
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
                    },
                    {
                        xtype: 'button',
                        style: 'height: 40px',
                        height:40,
                        cls: 'driveo-button',
                        text: 'Valider la commande',
                        action: 'commandeValider'
                    },
                    {
                        xtype: 'button',
                        style: 'height: 40px',
                        height:40,
                        cls: 'driveo-button alt',
                        text: 'Vider le panier',
                        action: 'viderPanier'
                    }
                ]
            }
        ]
    }
});