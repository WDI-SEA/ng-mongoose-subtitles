angular.module('App')
.factory('ScriptService', ScriptService);

function ScriptService($http) {
	return {

    getTitles: function() {
      var req = {
        url: '/movie/',
        method: 'GET'
      };
      return $http(req).then(function(res) {
				if (res.status !== 200) {
					return [];
				}
				return res.data;
			});
    },

	  getScript: function(id) {
			// will need to add index in request param
	    var req = {
	      url: '/movie/script/' + id,
	      method: 'GET'
	    };
			return $http(req).then(function(res) {
				if (res.status !== 200) {
					return [];
				}
				return res.data;
			});
	  },

    createScript: function(templateId) {
	    var req = {
	      url: '/movie/create/script/' + templateId,
	      method: 'POST'
	    }
	    return $http(req);
	  },

	  editScript: function(script) {
	    var req = {
	      url: '/movie/edit/script/' + script._id,
	      method: 'PUT',
				data: script
	    }
	    return $http(req);
	  }

	}
}

ScriptService.$inject = ['$http'];
