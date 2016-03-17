Ext.define("frontapp.store.Promotions", {
    extend: 'Ext.data.Store',

    alias: 'store.Promotions',
    config: {
        model: 'frontapp.model.Promotion',
        /*autoLoad: true,*/
        proxy: {
            type: 'ajax',
            useDefaultXhrHeader: false,
            api: {
                create: frontapp.utils.Config.getDomain()+'/Boutique/Promotion/getPromotion.json',
                read: frontapp.utils.Config.getDomain()+'/Boutique/Promotion/getPromotion.json',
                update: frontapp.utils.Config.getDomain()+'/Boutique/Promotion/getPromotion.json',
                destroy: frontapp.utils.Config.getDomain()+'/Boutique/Promotion/getPromotion.json'
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
