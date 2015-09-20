"use strict";

// script loader

(function() {

    /**
     * CONFIG
     */

    var TO_BE_LOADED = {
        states: {
            base: 'js/states/',
            scripts: [
                'list/list.js',
                'list/list-ctrl.js',
                'pomodoro/pomodoro.js',
                'pomodoro/pomodoro-ctrl.js',
                'note/note.js',
                'note/note-ctrl.js'
            ]
        },
        directives: {
            base: 'js/directives/',
            scripts: [
                'ng-draggable/ng-draggable-directive.js',
                'focus-me/focus-me-directive.js',
                'todo-list/todo-list-directive.js',
                'todo-list/todo-list-ctrl.js'
            ]
        },
        translations: {
            base: 'js/translations/',
            scripts: [
                // 'translations-config.js',
                // 'translations-it.js'
                // 'test.js'
            ]
        },
        entities: {
            base: 'js/entities/',
            scripts: [
                // 'restmod/restmod.js',
                // 'restmod/restmod-config.js',
                // 'restmod/rest-base-factory.js',
                // 'restmod/entity-manager-factory.js',
                // 'restmod/rest-cache-factory.js',
                // 'booking/booking.js',
                // 'booking/booking-factory.js',
                // 'booking/booking-manager-factory.js'
            ]
        },
        filters: {
            base: 'js/filters/',
            scripts: [
                // 'filters.js',
                // 'custom-date-filter.js'
                // 'test.js'
            ]
        },
        services: {
            base: 'js/services/',
            scripts: [
                // 'view-cache/view-cache-factory.js',
                // 'loader/loader-factory.js',
                // 'local-storage/local-storage.js',
                // 'local-storage/local-storage-factory.js',
                // 'local-storage/local-storage-keys-constants.js',
                // 'config/config-built.js',
                // 'config/config-provider.js',
                // 'config/config.js',
                // 'auth/auth-factory.js',
                // 'http/http.js',
                // 'popup/popup-factory.js',
                // 'http-rest/http-rest-factory.js',
                // 'http-rest/http-booking-factory.js',
                // 'http-rest/http-cache-factory.js'
            ]
        }
    };

    /**
     * END CONFIG
     */


    function addScript(url) {
        document.write('<script src="' + url + '"></scr' + 'ipt>');
    }

    _.each(TO_BE_LOADED, function(resources) {
        var base = resources.base;
        _.each(resources.scripts, function(script) {
            addScript(base + script);
        });
    });



})();