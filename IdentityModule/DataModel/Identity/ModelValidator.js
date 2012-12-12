// This code generated by Sds\DoctrineExtensions\Dojo
define([
    'dojo/_base/declare',
    'Sds/Common/Validator/ModelValidator',
    'Sds/IdentityModule/DataModel/Identity/Firstname/Validator',
    'Sds/IdentityModule/DataModel/Identity/Lastname/Validator',
    'Sds/IdentityModule/DataModel/Identity/Email/Validator',
    'Sds/IdentityModule/DataModel/Identity/Credential/Validator',
    'Sds/IdentityModule/DataModel/Identity/IdentityName/Validator',
    'Sds/IdentityModule/DataModel/Identity/Roles/Validator'
],
function(
    declare,
    ModelValidator,
    FirstnameValidator,
    LastnameValidator,
    EmailValidator,
    CredentialValidator,
    IdentityNameValidator,
    RolesValidator
){
    // Will return an validator that can be used to validate
    // a complete instance of the document/model

    return declare(
        'Sds/IdentityModule/DataModel/Identity/ModelValidator',
        [ModelValidator],
        {

            validators: [
                new FirstnameValidator,
                new LastnameValidator,
                new EmailValidator,
                new CredentialValidator,
                new IdentityNameValidator,
                new RolesValidator
            ]
        }
    );
});