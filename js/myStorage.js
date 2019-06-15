window.myStorage = (new(function() {
    var storage; //宣告一個變數，用於確定使用哪個本地儲存函式  
    if (window.localStorage) {
        storage = localStorage; //當localStorage存在，使用H5方式  
    } else {
        storage = cookieStorage; //當localStorage不存在，使用相容方式  
    }
    this.setItem = function(key, value) {
        storage.setItem(key, value);
    };
    this.getItem = function(name) {
        return storage.getItem(name);
    };
    this.removeItem = function(key) {
        storage.removeItem(key);
    };
    this.clear = function() {
        storage.clear();
    };
})());