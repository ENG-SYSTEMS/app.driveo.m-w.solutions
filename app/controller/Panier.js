/**
 * @class frontapp.controller.Panier
 * @extends Ext.app.Controller
 *
 * This is an abstract base class that is extended by both the phone and tablet versions. This controller is
 * never directly instantiated, it just provides a set of common functionality that the phone and tablet
 * subclasses both extend.
 */
Ext.define('frontapp.controller.Panier', {
    extend: 'Ext.app.Controller',
    config: {
        /**
         * @private
         */
        viewCache: [],

        refs: {
            ajouterpanier: '[action=ajouterpanier]',
            nbproduit: '[action=nbproduit]',
            reference: '[action=ref]',
            viderPanier: '[action=viderPanier]',
            panier: '[action=panier]',
            commandeValider: '[action=commandeValider]'
        },

        control: {
            ajouterpanier: {
                tap: 'onAjouterProduit'
            },
            viderPanier: {
                tap: 'onViderPanier'
            },
            commandeValider: {
                tap: 'onCommandeValider'
            }
        }
    },
    onAjouterProduit: function (button) {
        var nbproduit = this.getNbproduit(),
            ref = this.getReference();

        console.log('ajouterproduit', nbproduit.getValue(),ref.getValue());
        Ext.Ajax.request({
            url:frontapp.utils.Config.getDomain()+'/Boutique/Commande/managePanier.json',
            method: 'POST',
            params: {
                user_id: frontapp.utils.Config.getCurrentUser().user_id,
                logkey: frontapp.utils.Config.getCurrentKey(),
                action: 'add',
                ref: ref.getValue(),
                qte: nbproduit.getValue()
            },
            timeout: '600000',
            async: true,
            useDefaultXhrHeader: false,
            success: function (response) {
                //chargement des données
                var obj = Ext.decode(response.responseText);
console.log('retour add produit',obj);
                //on affiche la réponse en toaster
                Ext.toast(obj.msg,2000);

                //on rafraichit le panier
                Ext.getStore('Panier').load();
            },
            failure: function (response) {
                Ext.Msg.alert('Erreur',"Une erreur s'est produit. Veuillez réessayer.");
            }
        });
    },
    onViderPanier: function (button) {
        var panier = this.getPanier();

        console.log('viderPanier');
        Ext.Ajax.request({
            url:frontapp.utils.Config.getDomain()+'/Boutique/Commande/managePanier.json',
            method: 'POST',
            params: {
                user_id: frontapp.utils.Config.getCurrentUser().user_id,
                logkey: frontapp.utils.Config.getCurrentKey(),
                action: 'empty'
            },
            timeout: '600000',
            async: true,
            useDefaultXhrHeader: false,
            success: function (response) {
                //chargement des données
                var obj = Ext.decode(response.responseText);
                console.log('retour vider panier',obj);
                //on affiche la réponse en toaster
                Ext.toast(obj.msg,2000);

                //on rafraichit le panier
                Ext.getStore('Panier').load();
            },
            failure: function (response) {
                Ext.Msg.alert('Erreur',"Une erreur s'est produit. Veuillez réessayer.");
            }
        });
    },
    onCommandeValider: function (button) {
        console.log('commandeValider');
        Ext.Ajax.request({
            url:frontapp.utils.Config.getDomain()+'/Boutique/Commande/managePanier.json',
            method: 'POST',
            params: {
                user_id: frontapp.utils.Config.getCurrentUser().user_id,
                logkey: frontapp.utils.Config.getCurrentKey(),
                action: 'valid'
            },
            timeout: '600000',
            async: true,
            useDefaultXhrHeader: false,
            success: function (response) {
                //chargement des données
                var obj = Ext.decode(response.responseText);
                console.log('retour vider panier',obj);
                //on affiche la réponse en toaster
                Ext.toast(obj.msg,2000);

                //on rafraichit le panier
                Ext.getStore('Panier').load();
                Ext.getStore('Commandes').load();
            },
            failure: function (response) {
                Ext.Msg.alert('Erreur',"Une erreur s'est produit. Veuillez réessayer.");
            }
        });
    }
});
