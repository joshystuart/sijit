// This code generated by Sds\DoctrineExtensions\Dojo
define([
    'dojo/_base/declare',
    'Sds/Common/Form/ValidationTextBox',
    'Sds/IdentityModule/DataModel/Identity/Roles/Validator'
],
function(
    declare,
    ValidationTextBox,
    RolesValidator
){
    // Will return an Input for the roles field

    return declare(
        'Sds/IdentityModule/DataModel/Identity/Roles/Input',
        [ValidationTextBox],
        {
            validator: new RolesValidator,

            name: "roles",

            label: "Roles:"
        }
    );
});