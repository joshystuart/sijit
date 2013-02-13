// This code generated by Sds\DoctrineExtensions\Dojo
define([
    'dojo/_base/declare',
    '../../Mvc/BaseModel'
],
function(
    declare,
    BaseModel
){
    // Will return a model for Sds\IdentityModule\DataModel\ForgotCredentialToken

    return declare(
        'Sds/IdentityModule/DataModel/ForgotCredentialToken',
        [
            BaseModel
        ],
        {
            _fields: [
            	"code",
            	"identityName",
            	"expires",
            	"_className"
            ],

            _className: 'Sds\\IdentityModule\\DataModel\\ForgotCredentialToken'
        }
    );
});
