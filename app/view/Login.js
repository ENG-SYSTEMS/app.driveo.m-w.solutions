Ext.define('frontapp.view.Login', {
    extend: 'Ext.Container',
    requires: [
        'Ext.form.FieldSet'
    ],
    xtype: 'login',
    config: {
        cls: 'login-page',
        items: [
            /*{
                docked: 'top',
                xtype: 'titlebar',
                title: 'Youpark.me',
                cls: 'header'
            },*/
            {
                xtype: 'container',
                cls: 'login-wrapper',
                scrollable: true,
                items:[
                    {
                        xtype: 'container',
                        cls: 'loginbox',
                        width: 280,
                        items:[
                            {
                                width: '100%',
                                height: 200,
                                cls: 'titre_logo',
                                html: '<h1></h1>'
                            },
                            {
                                xtype: 'fieldset',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        action: 'logintext',
                                        name : 'login',
                                        cls: 'ypm-input',
                                        value: '',
                                        labelWidth: '0%',
                                        clearIcon: false,
                                        placeHolder: 'Identifiant',
                                        listeners: {
                                            focus: function () {
                                                Ext.Viewport.setHeight('100.1%');
                                                //Ext.Viewport.setHeight('100%');
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'passwordfield',
                                        labelWidth: '0%',
                                        action: 'passtext',
                                        cls: 'ypm-input',
                                        name : 'password',
                                        clearIcon: false,
                                        value: '',
                                        placeHolder: 'Mot de passe'
                                    },
                                    {
                                        xtype: 'textfield',
                                        labelWidth: '0%',
                                        action: 'domaintext',
                                        cls: 'ypm-input',
                                        name : 'domain',
                                        clearIcon: false,
                                        hidden: true,
                                        value: '',
                                        placeHolder: 'Domaine'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'loginbutton',
                                        text: 'Connexion',
                                        cls: 'ypm-button block success',
                                        value: ''
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'creacompte',
                                        text: 'Créer un compte',
                                        cls: 'ypm-button block warning',
                                        value: ''
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'resetpassword',
                                        text: 'Mot de passe perdu',
                                        cls: 'ypm-button block danger',
                                        value: ''
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        listeners: {
            initialize: function () {
                this.down('[action=domaintext]').setValue(frontapp.utils.Config.getDomain());
            },
            resize: function () {
                console.log('RESIZE !!!!!!!');
            },
            hide: function () {
                Ext.Viewport.setHeight('100%');
            }
        }
    }
});
