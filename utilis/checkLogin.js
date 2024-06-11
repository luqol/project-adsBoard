const checkLogin = (login) => {
    const pattern = new RegExp(/^[A-Za-z0-9@_.-]{3,20}$/, 'g');
    const textMatched = login.match(pattern).join('');

    if(textMatched.length === login.length){
        return true;
    } else{
        return false;
    }
};

module.exports = checkLogin;