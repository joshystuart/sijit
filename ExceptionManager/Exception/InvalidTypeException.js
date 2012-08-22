define([
    'dojo/_base/lang',
    'dojo/errors/create',
    'Sds/ExceptionManager/Severity',
    'Sds/ExceptionManager/Exception/BaseException'
],
function(
    lang,
    create,
    Severity,
    BaseException
){
	return create(
        "InvalidTypeException",
        function(message, options){

            this.severity = Severity.WARNING;

            this.display = false;

            this.log = true;

            lang.mixin(this, options);
        },
        BaseException
    )
});