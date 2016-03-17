Ext.define("frontapp.store.ProduitALaUne", {
    extend: 'Ext.data.Store',

    alias: 'store.ProduitALaUne',
    config: {
        model: 'frontapp.model.Produit',
        /*autoLoad: true,*/
        proxy: {
            type: 'ajax',
            useDefaultXhrHeader: false,
            api: {
                create: frontapp.utils.Config.getDomain()+'/Boutique/Produit/getProduitUne.json',
                read: frontapp.utils.Config.getDomain()+'/Boutique/Produit/getProduitUne.json',
                update: frontapp.utils.Config.getDomain()+'/Boutique/Produit/getProduitUne.json',
                destroy: frontapp.utils.Config.getDomain()+'/Boutique/Produit/getProduitUne.json'
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
