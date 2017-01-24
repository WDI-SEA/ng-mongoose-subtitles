angular.module('App')
.component('newComp', {
    templateUrl: 'app/containers/new/new.html',
    controller: NewCompCtrl,
    controllerAs: 'newComp'
});

function NewCompCtrl(ScriptService) {
    var newComp = this;
    newComp.scripts = [];
    ScriptService.getTitles().then(function(scripts) {
        console.log("got scripts:", scripts);
        newComp.scripts = scripts;
    });

    newComp.add = {};

    newComp.submit = function(){
        ScriptService.createScript(newComp.add.title, newComp.add.id);
    };
}

NewCompCtrl.$inject = ['ScriptService'];
