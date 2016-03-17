Ext.define('frontapp.model.Promotion', {
    extend: 'Ext.data.Model',
    config: {
        autoLoad: true,
        fields: [
            {name: 'id', type: 'int'},
            {name: 'image', type: 'string'},
            {name: 'textdate', type: 'string'},
            {name: 'text', type: 'string'}
        ]
    }
});
