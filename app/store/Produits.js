Ext.define("frontapp.store.Produits", {
    extend: 'Ext.data.Store',

    alias: 'store.Produits',
    config: {
        model: 'frontapp.model.Produit',
        /*autoLoad: true,*/
        proxy: {
            type: 'ajax',
            useDefaultXhrHeader: false,
            api: {
                create: frontapp.utils.Config.getDomain()+'/Boutique/Produit/getData.json',
                read: frontapp.utils.Config.getDomain()+'/Boutique/Produit/getData.json',
                update: frontapp.utils.Config.getDomain()+'/Boutique/Produit/getData.json',
                destroy: frontapp.utils.Config.getDomain()+'/Boutique/Produit/deleteData.json'
            },
            actionMethods: {
                create : 'POST',
                read   : 'POST',
                update : 'POST',
                destroy: 'POST'
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
