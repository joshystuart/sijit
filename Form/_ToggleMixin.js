define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/_base/event',    
    'dojo/on',
    'dojo/when',
    'dojo/dom-construct',
    'dojo/dom-class',
    './_LabelMixin',
    './_HelpMessagesMixin',
    'dijit/form/_FormValueMixin',      
    'get!../Store/storeManager'
],
function (
    declare,
    lang,
    array,
    event,
    on,
    when,
    domConstruct,
    domClass,
    LabelMixin,
    HelpMessagesMixin,
    FormValueMixin,
    storeManager
){
    return declare(
        [LabelMixin, HelpMessagesMixin, FormValueMixin],
        {
            // store: dojo/store/api/Store
            //		A store to use for getting our list of options - rather than reading them
            //		from the `<option>` html tags.

            // query: object
            //		A query to use when fetching items from our store

            // queryOptions: object
            //		Query options to use when fetching from the store

            // storeLabel: string
            //		The entries in the drop down list come from this attribute in the dojo.store items.
            //		If ``store`` is set, labelAttr must be set too.

            // sortByLabel: Boolean
            sortByLabel: true,

            buildRendering: function(){
                this.inherited(arguments);

                var source = this.srcNodeRef,
                    value;

                // Add options tags if not using store
                if (this.get('store')){
                    this._updateOptionsFromStore();
                } else {
                    if(source){
                        array.forEach(source.childNodes, lang.hitch(this, function(node){ 
                            if (node.tagName && node.tagName == 'OPTION'){
                                this.addOption(node.value, node.text);
                                if (node.selected){
                                    this.set('value', node.value);
                                }
                            }
                        }))
                    }
                }
            },

            _setStoreLabelAttr: function(storeLabel){
                this.storeLabel = storeLabel;
                this._updateOptionsFromStore();
            },

            _setStoreAttr: function(store){
                this.store = store;
                this._updateOptionsFromStore();
            },

            _getStoreAttr: function(){

                if (this.store && typeof this.store == 'string'){
                    //get store from storeManager
                    this.store = storeManager.getStore(this.store);
                }

                return this.store;
            },

            _setQueryAttr: function(query){
                this.query = query;
                this._updateOptionsFromStore();
            },

            _updateOptionsFromStore: function(){
                if (this.store && this.storeLabel){
                    when(this.store.query(this.query, this.queryOptions), lang.hitch(this, function(data){
                        var existingOptions = this.get('options');
                        var idProperty = this.store.idProperty;

                        var addOptions = data.filter(function(option){
                            if (existingOptions[option[idProperty]]){
                                return false;
                            } else {
                                return true;
                            }
                        });

                        var removeOptions = lang.clone(existingOptions);
                        data.forEach(function(option){
                            if (existingOptions[option[idProperty]]){
                                delete removeOptions[option[idProperty]];
                            }
                        });

                        for (var index in removeOptions){
                            this.removeOption(index);
                        }

                        array.forEach(addOptions, lang.hitch(this, function(option){
                            this.addOption(option[idProperty], option[this.storeLabel]);
                        }));
                    }));
                }
            },

            addOption: function(value, label){
                var existingOptions = this.get('options'),
                    node;
                    
                if ( ! existingOptions[value]){
                    if (this.sortByLabel){
                        var created = false;
                        array.forEach(this.toggle.childNodes, lang.hitch(this, function(node){                           
                            if (node.tagName && node.tagName == 'BUTTON' && !created && node.text > label){
                                node = domConstruct.create('button',{'class': 'btn', value: value, innerHTML: label}, node, 'before');
                                created = true;
                            }
                        }));
                        if ( ! created){
                            node = domConstruct.create('button',{'class': 'btn', value: value, innerHTML: label}, this.toggle, 'last');
                        }
                    } else {                       
                        node = domConstruct.create('button',{'class': 'btn', value: value, innerHTML: label}, this.toggle, 'last');
                    }
                    
                    on(node, 'click', lang.hitch(this, function(e){
                        event.stop(e);
                        this.set('value', e.target.value);                      
                    }))                    
                }
            },

            removeOption: function(value){
                array.forEach(this.toggle.childNodes, function(node){
                    if (node && node.tagName && node.tagName == 'BUTTON' && node.value == value){
                        domConstruct.destroy(node);
                    }
                })
            },

            _setOptionsAttr: function(options){
                for (var value in options){
                    this.addOption(value, options[value]);
                }
            },

            _getOptionsAttr: function(){
                var options = {};
                array.forEach(this.toggle.childNodes, lang.hitch(this, function(node){
                    if (node.tagName && node.tagName == 'BUTTON'){
                        options[node.value] = node.text;
                    }                    
                }));
                return options;
            },

            _setValueAttr: function(value){
                this.inherited(arguments);                
                array.forEach(this.toggle.childNodes, function(node){
                    if (node && node.tagName && node.tagName == 'BUTTON'){
                        if (node.value == value){
                            domClass.add(node, 'active');
                        } else {
                            domClass.remove(node, 'active');
                        }
                    }
                })                
            },
            
            _setFocusNodeClassAttr: { node: "focusNode", type: "class" }
        }
    )
});