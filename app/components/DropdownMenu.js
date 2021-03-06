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
                this._animationShow = new Ext.Anim({
                    easing: 'easeIn',
                    duration: 300,
                    autoClear: false,
                    to: {
                        top: '5px'
                    }
                });
                this._animationHide = new Ext.Anim({
                    easing: 'easeOut',
                    duration: 300,
                    autoClear: false,
                    to: {
                        top: '-100%'
                    }
                });
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
    _show: false,
    showPanel: function () {
        //this._animationShow.run(this._panel.element);
        this._panel.show();
        this._panel.setStyle('display','block !important');
        this._panel.addCls('down');
        this._show = true;
    },
    hidePanel: function () {
        console.log('hide');
        //this._animationHide.run(this._panel.element);
        //TweenLite.to(this._panel.element,0.3,{top: '-800'});
        this._panel.removeCls('down');
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
