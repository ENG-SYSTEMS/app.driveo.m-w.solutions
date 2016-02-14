Ext.define('frontapp.view.ResetPassword', {
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
               title: 'Mot de passe perdu',
               cls: 'header',
               items: [
                   {
                       xtype: 'spacer'
                   },
                   {
                       xtype : 'button',
                       hidden: false,
                       ui    : 'decline',
                       action: 'back',
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
                                    labelWidth: '0%'
                                },
                                items: [
                                    {
                                        style: 'margin: 10px 0;',
                                        html: '<p>Veuillez saisir votre adresse mail afin de lancer une procédure de récupération de mot de passe.< br /> Vous recevrez un nouveau mot de passe par email</p>'
                                    },
                                    {
                                        xtype         : 'textfield',
                                        name : 'username',
                                        label: 'Email',
                                        cls: 'ypm-input',
                                        action: 'emailResetPassword',
                                        labelWidth: '0%',
                                        clearIcon: false,
                                        placeHolder: 'Email',
                                        autoCapitalize: false,
                                        required      : 1
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'validerResetPassword',
                                        text: 'Envoyer',
                                        cls: 'ypm-button block'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'back',
                                        text: 'Annuler',
                                        cls: 'ypm-button block warning'
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
