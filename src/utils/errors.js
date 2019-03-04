import _errorKey from '../App.error';

let _errorKeyInversion = {};
for (let key in _errorKey) {
    let code = _errorKey[key];
    _errorKeyInversion[code] = key;
}

function _getErrorMessageFromCode(context, code) {
    return context.props.intl.formatMessage({id: `error.${_errorKeyInversion[code]}`})
}

export const errorCode =_errorKey;
export const errorKey = _errorKeyInversion;
export const getErrorMessageFromCode = _getErrorMessageFromCode;
