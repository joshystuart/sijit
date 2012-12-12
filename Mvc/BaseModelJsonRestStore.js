// This code generated by Sds\DoctrineExtensions\Dojo
define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'Sds/Store/JsonRest'
],
function(
    declare,
    lang,
    JsonRest
){

    return declare(
        'Sds/Mvc/BaseModelJsonRestStore',
        [JsonRest],
        {

            model: undefined,

            get: function(id){
                return declare.safeMixin(new this.model, this.inherited(arguments));
            },

            query: function(query, options){
                return this.inherited(arguments).map(lang.hitch(this, function(object){
                    return declare.safeMixin(new this.model, object);
                }));
            }
        }
    );
});
