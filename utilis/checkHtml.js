const checkHtml = (text) => {
    const pattern = new RegExp(/^[A-Za-z0-9\s@_\-#%&*+.]*$/, 'g'); 
    const textMatched = text.match(pattern).join('');

    if(textMatched.length === text.length){
        return true;
    } else{
        return false;
    }
};

export default checkHtml;