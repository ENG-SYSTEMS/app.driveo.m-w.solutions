Ext.define("frontapp.store.Commandes", {
    extend: 'Ext.data.Store',

    alias: 'store.Commande',
    config: {
        model: 'frontapp.model.Commande',
        /*autoLoad: true,*/
        proxy: {
            type: 'ajax',
            useDefaultXhrHeader: false,
            api: {
                create: frontapp.utils.Config.getDomain()+'/Boutique/Commande/getData.json',
                read: frontapp.utils.Config.getDomain()+'/Boutique/Commande/getData.json',
                update: frontapp.utils.Config.getDomain()+'/Boutique/Commande/getData.json',
                destroy: frontapp.utils.Config.getDomain()+'/Boutique/Commande/deleteData.json'
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
