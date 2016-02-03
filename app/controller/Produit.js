/**
 * @class Activafrontapp.controller.Main
 * @extends Ext.app.Controller
 *
 * This is an abstract base class that is extended by both the phone and tablet versions. This controller is
 * never directly instantiated, it just provides a set of common functionality that the phone and tablet
 * subclasses both extend.
 */
Ext.define('frontapp.controller.Produit', {
    extend: 'Ext.app.Controller',
    config: {
        /**
         * @private
         */
        viewCache: [],

        refs: {
            produitsearchbutton: '[action=produitsearchbutton]',
            produitsearch: '[action=produitsearch]',
            produitbarcode: '[action=produitbarcode]',
            listeproduit: '[action=listeproduit]',
            enregistrerproduit: '[action=enregistrerproduit]'

        },

        control: {
            produitsearchbutton: {
                tap: 'onSearch'
            },
            produitbarcode: {
                tap: 'onBarcode'
            },
            listeproduit: {
                itemtap: 'onListeProduitTap'
            },
            enregistrerproduit: {
                tap: 'onEnregistrerProduitTap'
            }
        }
    },
    onListeProduitTap: function (list, index, target, record, e, eOpts) {
        //double click bug
        list.suspendEvents();
        Ext.Function.defer(function(){
            list.resumeEvents(true);
        }, 300);

        console.log('liste produit tap '+record.get('id'));
        this.redirectTo('product/'+record.get('id'));
    },
    onEnregistrerProduitTap: function (button, e, eOpts) {
        var me = this;
        var curview = Ext.Viewport.getActiveItem();
        curview.setMasked({
            xtype: 'loadmaskypm',
            indicator: false,
            message: 'Enregistrement en cours ...'
        });

        var data = {
            logkey: frontapp.utils.Config.getCurrentKey(),
            user_id: frontapp.utils.Config.getCurrentUser().user_id,
            Nom: curview.down('[name=Nom]').getValue(),
            frontappReference: curview.down('[name=frontappReference]').getValue(),
            Commentaire: curview.down('[name=Commentaire]').getValue(),
            EAN: curview.down('[name=EAN]').getValue(),
            Image: curview.down('[name=Image]').getValue(),
            Tarif: curview.down('[name=Tarif]').getValue(),
            id: (button.getRecord())?button.getRecord().get('id'):''
        };
        console.log('new produit form ',data);
        if (data.id>0)
            var url = frontapp.utils.Config.getProduitSaveUrl()+data.id+'/Save.json';
        else var url = frontapp.utils.Config.getProduitSaveUrl()+'Save.json';
        Ext.Ajax.request({
            url: url,
            useDefaultXhrHeader: false,
            params: data,
            method: 'POST',
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);

                //suppression du masque
                curview.setMasked(false);

                //enregistrement du commentaire en local
                console.log('véhicule envoyé avec succés');
                var produitStore = Ext.getStore('Produits');
                produitStore.load();

                if (!data.id) me.redirectTo('main');
            },
            failure: function(response, opts) {
                //suppression du masque
                curview.setMasked(false);
                console.log('Enregistrement du produit échoué ' + response.status);
                Ext.Msg.alert('Erreur de connexion', 'Il y a un problème veuillez réessayer ultérieurement.');
            }
        });
    },
    onSearch: function () {
        var value = this.getProduitsearch().getValue(),
            produits = Ext.getStore('Produits')

        //lancement de la recherche
        var ep = produits.getProxy().getExtraParams();
        ep.search = value;
        produits.getProxy().setExtraParams(ep);
        produits.load();

    },
    onBarcode: function () {
        var me = this;
        try {
            Ext.device.Scanner.scan({
                success: function (result) {
                    console.dir(result);
                    if (!result.cancelled) {
                        var code = result.text;
                        me.getProduitsearch().setValue(code);
                        me.onSearch();
                    } else Ext.Msg.alert('Erreur', 'Vous avez annulé le scan.');
                },
                failure: function (error) {
                    console.dir(error);
                    Ext.Msg.alert('Erreur', 'Une erreur est survenue bizarrement...');
                }
            });
        }catch (e){
            console.log('Impossible de charger le plugin barcode');
            me.getProduitsearch().setValue('Impossible de charger le scanner');
            me.onSearch();
        }
    }
});
