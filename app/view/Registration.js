Ext.define('frontapp.view.Registration', {
    xtype: 'registration',
    extend: 'Ext.Container',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Number',
        'Ext.field.Spinner',
        'Ext.field.Password',
        'Ext.field.Email',
        'Ext.field.Url',
        'Ext.field.DatePicker',
        'Ext.field.Select',
        'Ext.field.Hidden',
        'Ext.field.Radio'
    ],
    config: {
        cls: 'login-page',
        layout: {
            type: 'card',
            align: 'center'
        },
        items: [
            {
               xtype: 'toolbar',
               docked: 'top',
               title: 'Inscrivez-vous',
               cls: 'header',
               items: [
                   {
                       xtype: 'spacer'
                   },
                   {
                       xtype : 'button',
                       hidden: false,
                       ui    : 'decline',
                       action: 'login',
                       iconCls: 'fa fa-arrow-left',
                       cls: 'open-socials',
                       text  : ''
                   }
               ]
            },
            {
                xtype: 'container',
                cls: 'login-wrapper',
                scrollable: true,
                items:[
                    {
                        xtype: 'container',
                        cls: 'registrationbox',
                        width: 280,
                        items:[
                            {
                                xtype: 'fieldset',
                                instructions: '',
                                defaults: {
                                    labelWidth: '0%',
                                    clearIcon: false,
                                    autoCapitalize: false
                                },
                                items: [
                                    {
                                        xtype : 'selectfield',
                                        name : 'Civilité',
                                        cls: 'ypm-input',
                                        label : "Civilité",
                                        placeHolder: 'Civilité',
                                        required      : 1,
                                        options : [
                                            {
                                                text : 'Madame',
                                                value : 'Madame'
                                            },
                                            {
                                                text : 'Mademoiselle',
                                                value : 'Mademoiselle'
                                            },
                                            {
                                                text : 'Monsieur',
                                                value : 'Monsieur'
                                            }
                                        ]
                                    },
                                    {
                                        xtype         : 'textfield',
                                        name : 'Nom',
                                        label: 'Nom',
                                        cls: 'ypm-input',
                                        placeHolder: 'Nom',
                                        required      : 1
                                    },
                                    {
                                        xtype         : 'textfield',
                                        name : 'Prenom',
                                        label: 'Prénom',
                                        cls: 'ypm-input',
                                        placeHolder: 'Prénom',
                                        required      : 1
                                    },
                                    {
                                        xtype         : 'passwordfield',
                                        name : 'Password',
                                        label: 'Mot de passe',
                                        labelWidth: '0%',
                                        clearIcon: false,
                                        placeHolder: 'Mot de passe',
                                        cls: 'ypm-input',
                                        autoCapitalize: false,
                                        required      : 1
                                    },
                                    {
                                        xtype         : 'emailfield',
                                        name : 'Mail',
                                        label: 'Email',
                                        cls: 'ypm-input',
                                        labelWidth: '0%',
                                        clearIcon: false,
                                        placeHolder: 'Adresse email',
                                        autoCapitalize: false,
                                        required      : 0
                                    },
                                    {
                                        xtype         : 'textfield',
                                        name : 'Tel',
                                        label: 'Téléphone',
                                        placeHolder: 'Téléphone',
                                        cls: 'ypm-input',
                                        required      : 1
                                    },
                                    {
                                        xtype         : 'textfield',
                                        name : 'Adresse',
                                        label: 'Adresse',
                                        placeHolder: 'Adresse',
                                        cls: 'ypm-input',
                                        required      : 1
                                    },
                                    {
                                        xtype         : 'textfield',
                                        name : 'CodePostal',
                                        label: 'CodePostal',
                                        placeHolder: 'CodePostal',
                                        cls: 'ypm-input',
                                        required      : 1
                                    },
                                    {
                                        xtype         : 'textfield',
                                        name : 'Ville',
                                        label: 'Ville',
                                        placeHolder: 'Ville',
                                        cls: 'ypm-input',
                                        required      : 1
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'login',
                                        text: 'Annuler',
                                        cls: 'ypm-button block warning'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'enregistrercompte',
                                        text: 'Enregistrer',
                                        cls: 'ypm-button block'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
});
