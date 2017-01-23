angular.module('App')
.component('homeComp', {
  templateUrl: 'app/containers/home/home.html',
  controller: HomeCompCtrl,
  controllerAs: 'homeComp'
});

function HomeCompCtrl(ScriptService) {
    var homeComp = this;
    homeComp.scripts = [];
    ScriptService.getTitles().then(function(scripts) {
      console.log("got scripts:", scripts);
      homeComp.scripts = scripts;
    });
}

HomeCompCtrl.$inject = ['ScriptService'];
