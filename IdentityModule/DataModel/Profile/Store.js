// This code generated by Sds\DoctrineExtensions\Dojo
define([
    'dojo/_base/declare',
    'Sds/Store/JsonRest'
],
function(
    declare,
    JsonRest
){
    // Will return dojo object store to manage server model
    // instances with a json rest api.

    return declare(
        'Sds/IdentityModule/DataModel/Profile/Store',
        [JsonRest],
        {

            idProperty: '',

            target: 'Profile'
        }
    );
});
