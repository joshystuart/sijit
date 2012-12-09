define([
    'dojo/_base/declare',
    'dojo/i18n!Sds/nls/validatorMessages',
    'Sds/Common/Validator/BaseValidator',
    'dojox/validate/creditCard'
],
function(
    declare,
    validatorMessages,
    BaseValidator,
    creditCard
){
    return declare(
        'Sds/Common/Validator/CreditCardValidator',
        [BaseValidator],
        {
            _isValid: function(value){

                var messages = [];
                var result = true;

                if ( ! creditCard.isValidCreditCardNumber(value)){
                    result = false;
                    messages.push(validatorMessages.creditCardValidatorMessage);
                }

                return {result: result, messages: messages};
            }
        }
    );
});
