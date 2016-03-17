Ext.define('frontapp.components.DropdownMenu',{
    extend:'Ext.Button',
    alias:'widget.dropdownmenu',

    config:{
        menuWrapper:{
			xtype:'panel',
			layout:'fit',
			cls:'menuwrapper',
			width:'80%',
			height:'90%',
			modal:true,
			hideOnMaskTap:true,
			top:'-100%',
			right:'10%',
            style: 'padding-top: 10px;'
		},
        items:null,
		
		menu:null,
		verticalShrinkWrap:true,
		
        //Private
        menuContainer:this,
        listeners: {
            tap: function () {
                this.togglePanel();
            },
            initialize: function () {
                var me = this;
            },
            hide: function (){
                this.hidePanel();
            }
        }
    },
    createPanel: function () {
        var curview = Ext.Viewport.getActiveItem(),
            me = this;

        this._panel = curview.add(this.getMenuWrapper());
        this._panel.hideOLD = this._panel.hide;
        this._panel.hide = function () {
            var those = this;
            Ext.defer(function () {
                those.hideOLD();
            },300);
            me.hidePanel();
        }

        //creation du contenu
        this._panel.add(this.getItems());
    },
    _animationShow: new Ext.Anim({
        easing: 'easeIn',
        duration: 300,
        autoClear: false,
        to: {
            top: '5px'
        }
    }),
    _animationHide: Ext.Anim({
        easing: 'easeOut',
        duration: 300,
        autoClear: false,
        to: {
            top: '-100%'
        }
    }),
    _show: false,
    showPanel: function () {
        console.log('show');
        this._animationShow.run(this._panel.element);
        this._panel.show();
        this._show = true;
    },
    hidePanel: function () {
        console.log('hide');
        this._animationHide.run(this._panel.element);
        this._show = false;
    },
    togglePanel: function () {
        if (!this._panel) {
            this.createPanel();
        }
        if (this._show)this._panel.hide();
        else this.showPanel();
    }
});
