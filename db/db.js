var mysql      = require('mysql');

var connection = null;
var db = function(){};

db.prototype.connect = function(){
    this.connection = mysql.createConnection({
      host     : 'localhost',
      port     : '3306',
      user     : 'root',
      password : '',
      database : 'my_blog'
    });
}

db.prototype.open = function(next) {
    var _this = this;
    if(!this.connection || this.connection.state == 'disconnected'){
        this.connect();
    }

    this.connection.connect(function(err,ok){
        if(!err){
            next && next.call(_this);
        }else{
            console.log(err);
            console.log('err', _this.connection.state, 'shuld be not connected ??')
        }
    });
    
};

db.prototype.close = function(next) {
    var _this = this;

    if(this.connection.state === 'authenticated'){
        this.connection.end(function(){
            next && next.call(_this, _this.connection);
        });
    }else{
        console.log('close err:','already closed? ')
    }
    
};

module.exports = db;
