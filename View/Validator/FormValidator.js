define([
    'dojo/_base/declare',
    'Sds/Validator/BaseValidator'
],
function(
    declare,
    BaseValidator
){
    return declare(
        'Sds/View/Validator/FormValidator',
        [BaseValidator],
        {
            isValid: function(value){

                this.messages = [];

                var result = true;
                if (value) {
                    this.messages = value;
                    result = false;
                }

                return result;
            }
        }
    );
});