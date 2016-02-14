/**
 * @class Activafrontapp.controller.Registration
 * @extends Ext.app.Controller
 *
 * This is an abstract base class that is extended by both the phone and tablet versions. This controller is
 * never directly instantiated, it just provides a set of common functionality that the phone and tablet
 * subclasses both extend.
 */
Ext.define('frontapp.controller.Registration', {
    extend: 'Ext.app.Controller',
    config: {
        /**
         * @private
         */
        viewCache: [],

        refs: {
            creacompte: '[action=creacompte]',
            enregistrercompte: '[action=enregistrercompte]',
            resetpassword: '[action=resetpassword]'
        },

        control: {
            creacompte: {
                tap: 'onRegistrationTap'
            },
            resetpassword: {
                tap: 'onResetPasswordTap'
            },
            enregistrercompte: {
                tap: 'onEnregistrerTap'
            }
        }
    },
    onRegistrationTap: function () {
      this.redirectTo('registration');
    },
    onResetPasswordTap: function () {
        this.redirectTo('resetpassword');
    },
    onEnregistrerTap: function (button, e, eOpts) {
        var me = this;
        var curview = Ext.Viewport.getActiveItem();
        curview.setMasked({
            xtype: 'loadmaskypm',
            indicator: false,
            message: 'Enregistrement en cours ...'
        });

        var data = {
            Civilite: curview.down('[name=Civilité]').getValue(),
            Nom: curview.down('[name=Nom]').getValue(),
            Prenom: curview.down('[name=Prenom]').getValue(),
            Pass: curview.down('[name=Password]').getValue(),
            Mail: curview.down('[name=Mail]').getValue(),
            Tel: curview.down('[name=Tel]').getValue(),
            Adresse: curview.down('[name=Adresse]').getValue(),
            CodePostal: curview.down('[name=CodePostal]').getValue(),
            Ville: curview.down('[name=Ville]').getValue(),
            Pays: 'France'
        };
        console.log('registration form ',data);
        var url = frontapp.utils.Config.getRegistrationUrl();

        Ext.Ajax.request({
            url: url,
            useDefaultXhrHeader: false,
            params: data,
            method: 'POST',
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);

                //suppression du masque
                curview.setMasked(false);

                if (obj.success) {
                    //enregistrement du commentaire en local
                    console.log('enregistrement utilisateur envoyé avec succès');
                    frontapp.utils.Config.setCurrentKey(obj.logtoken);
                    frontapp.utils.Config.setCurrentUser(obj);
                    frontapp.utils.Config.getApp().fireEvent('onLoginSuccess',this);
                }else{
                    Ext.Msg.alert('Erreur',obj.msg);
                }
            },
            failure: function(response, opts) {
                //suppression du masque
                curview.setMasked(false);
                console.log('Enregistrement du produit échoué ' + response.status);
                Ext.Msg.alert('Erreur de connexion', 'Il y a un problème veuillez réessayer ultérieurement.');
            }
        });
    }
});
