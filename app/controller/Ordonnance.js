/**
 * @class frontapp.controller.Ordonnance
 * @extends Ext.app.Controller
 *
 * This is an abstract base class that is extended by both the phone and tablet versions. This controller is
 * never directly instantiated, it just provides a set of common functionality that the phone and tablet
 * subclasses both extend.
 */
Ext.define('frontapp.controller.Ordonnance', {
    extend: 'Ext.app.Controller',
    config: {
        /**
         * @private
         */
        viewCache: [],

        refs: {
            ordonnancePhoto: '[action=ordonnancePhoto]',
            ordonnanceImage: '[action=ordonnanceImage]',
            ordonnanceCommentaire: '[action=ordonnanceCommentaire]',
            ordonnanceSachetDose: '[action=ordonnanceSachetDose]',
            ordonnanceLivraison: '[action=ordonnanceLivraison]',
            ordonnanceSubmit: '[action=ordonnanceSubmit]',
            ordonnanceListe: '[action=listeordonnance]'
        },

        control: {
            ordonnanceSubmit: {
                tap: 'onSubmitTap'
            },
            ordonnanceListe: {
                itemtap: 'onListeOrdonnanceTap'
            }
        }
    },
    onListeOrdonnanceTap: function (list, index, target, record, e, eOpts) {
        //double click bug
        list.suspendEvents();
        Ext.Function.defer(function(){
            list.resumeEvents(true);
        }, 300);

        console.log('liste ordonnance tap '+record.get('id'));
        this.redirectTo('ordonnance/'+record.get('id'));
    },
    onSubmitTap: function (button, e, eOpts) {
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
            Image: this.getOrdonnancePhoto().getValue(),
            Commentaire: this.getOrdonnanceCommentaire().getValue(),
            SachetDose: this.getOrdonnanceSachetDose().getValue(),
            Livraison: this.getOrdonnanceLivraison().getValue(),
            id: (button.getRecord())?button.getRecord().get('id'):''
        };
        console.log('new ordonnance sending ',data);
        if (data.id>0)
            var url = frontapp.utils.Config.getOrdonnanceSaveUrl()+data.id+'/send.json';
        else var url = frontapp.utils.Config.getOrdonnanceSaveUrl()+'send.json';
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
                var produitStore = Ext.getStore('Produits');
                produitStore.load();

                me.redirectTo('ordonnance');
                //on reinistialise le formulaire

                me.resetForm();
            },
            failure: function(response, opts) {
                //suppression du masque
                curview.setMasked(false);
                console.log('Enregistrement du produit échoué ' + response.status);
                Ext.Msg.alert('Erreur de connexion', 'Il y a un problème veuillez réessayer ultérieurement.');
            }
        });
    },
    resetForm: function () {
        var Image= this.getOrdonnanceImage(),
            Commentaire = this.getOrdonnanceCommentaire();

        Image.setSrc('');
        Commentaire.setValue('');
    }
});
