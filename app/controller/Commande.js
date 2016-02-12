/**
 * @class frontapp.controller.Commande
 * @extends Ext.app.Controller
 *
 * This is an abstract base class that is extended by both the phone and tablet versions. This controller is
 * never directly instantiated, it just provides a set of common functionality that the phone and tablet
 * subclasses both extend.
 */
Ext.define('frontapp.controller.Commande', {
    extend: 'Ext.app.Controller',
    config: {
        /**
         * @private
         */
        viewCache: [],

        refs: {
            commandeListe: '[action=listecommande]'
        },

        control: {
            commandeListe: {
                itemtap: 'onListeCommandeTap'
            }
        }
    },
    onListeCommandeTap: function (list, index, target, record, e, eOpts) {
        //double click bug
        list.suspendEvents();
        Ext.Function.defer(function(){
            list.resumeEvents(true);
        }, 300);

        console.log('liste commande tap '+record.get('id'));
        this.redirectTo('commande/'+record.get('id'));
    }
});
