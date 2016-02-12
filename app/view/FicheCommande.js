Ext.define('frontapp.view.FicheCommande', {
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
                action: 'commandetitle',
                title: 'COMMANDE',
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
                style: 'margin:0',
                items: [
                    {
                        flex:1,
                        layout: 'hbox',
                        height: 45,
                        width: '100%',
                        cls: 'product-barre',
                        action: 'detailcommande'
                    },
                    {
                        flex:1,
                        title: 'Détail commande',
                        iconCls: 'home',
                        width: '100%',
                        height: '100%',
                        xtype: 'list',
                        store: 'DetailCommande',
                        cls: 'product-list',
                        infinite: false,
                        itemTpl: '<div class="product">'+
                        '<img src="'+frontapp.utils.Config.getDomain()+'/{Image}.mini.60x60.jpg" class="float-left product-avatar" alt="img">'+
                        '<span class="product-dist product-near">{TarifText}</span>'+
                        '<h2>{Titre}</h2>'+
                        '<span class="valet-address">Quantité: {Quantite}</span>'+
                            /*'<span class="valet-address">Poids: {Poids}<br />Largeur: {Largeur} <br />Hauteur: {Hauteur} <br /> Profondeur: {Profondeur}</span>'+*/
                        '</div>',
                        grouped: false,
                        pinHeaders: false
                    }
                ]
            }
        ]
    },
    setRecord: function (record){
        this.down('[action=commandetitle]').setTitle(record.get('RefCommande'));
        this.down('[action=detailcommande]').setHtml('<div class="product">'+
            '<span class="product-dist product-near warning">Montant total: '+record.get('MontantTTC')+' € TTC</span>'+
            '<h2>&nbsp;</h2>'+
            '<div style="float:left">'+record.get('Etat')+'</div>'+
            '</div>');

        //redefinition du store PANIER
        var dc = Ext.getStore('DetailCommande');
        dc.getProxy().setApi({
            read: frontapp.utils.Config.getDomain()+'/Boutique/Commande/'+record.get('id')+'/LigneCommande/getData.json'
        });
        dc.getProxy().setExtraParams({
            user_id: frontapp.utils.Config.getCurrentUser().user_id,
            logkey: frontapp.utils.Config.getCurrentKey()
        });

        //chargement des store
        dc.load();

    }
});
