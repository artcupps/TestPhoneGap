var app = {

renderHomeView: function() {
    $('body').html(this.homeTpl());
    $('.search-key').on('keyup', $.proxy(this.findByName, this));
},
showAlert: function (message, title) {
	    if (navigator.notification) {
	        navigator.notification.alert(message, null, title, 'OK');
	    } else {
	        alert(title ? (title + ": " + message) : message);
	    }
}, 
findByName: function() {
    console.log('findByName');
    var self = this;
    this.store.findByName($('.search-key').val(), function(employees) {
        $('.employee-list').html(self.employeeLiTpl(employees));
    });
},

initialize: function() {
	var self = this;

	//Activities in the application
	this.homeTpl = Handlebars.compile($("#home-tpl").html());
	this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());

	//Renders the first activity after datacalloction
    this.store = new WebSqlStore(function() {
    	self.renderHomeView();
    	self.showAlert('Store Initialized', 'Info');
    });
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    }

};

app.initialize();