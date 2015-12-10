Ext.define("frontapp.store.Ordonnances", {
    extend: 'Ext.data.Store',

    alias: 'store.Ordonnances',
    config: {
        model: 'frontapp.model.Ordonnance',
        /*autoLoad: true,*/
        proxy: {
            type: 'ajax',
            useDefaultXhrHeader: false,
            api: {
                create: frontapp.utils.Config.getDomain()+'/Pharmacie/Ordonnance/getData.json',
                read: frontapp.utils.Config.getDomain()+'/Pharmacie/Ordonnance/getData.json',
                update: frontapp.utils.Config.getDomain()+'/Pharmacie/Ordonnance/getData.json',
                destroy: frontapp.utils.Config.getDomain()+'/Pharmacie/Ordonnance/deleteData.json'
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
