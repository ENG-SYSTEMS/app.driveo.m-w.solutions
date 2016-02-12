Ext.define("frontapp.store.Panier", {
    extend: 'Ext.data.Store',

    alias: 'store.Panier',
    config: {
        model: 'frontapp.model.LigneCommande',
        /*autoLoad: true,*/
        proxy: {
            type: 'ajax',
            useDefaultXhrHeader: false,
            api: {
                read: frontapp.utils.Config.getDomain()+'/Boutique/Commande/getPanierData.json'
            },
            actionMethods: {
                read   : 'POST',
            },
            reader: {
                type: 'json',
                rootProperty: 'results',
                totalProperty: 'total'
            },
            writer: {
                type: 'json',
                writeAllFields: true
            }
        }
    }
});
