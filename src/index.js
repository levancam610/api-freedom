import React from 'react';
import ReactDOM from 'react-dom';
const rootEl = document.getElementById("root");
/*
color options : 
	 'light.purple'		'dark.purple'
	 'light.blue'		  'dark.blue'
	 'light.green'		'dark.green'
	 'light.orange'		'dark.orange'
	 'light.red'		  'dark.red'
*/
var color = 'light.purple';
if (localStorage.getItem('themeColor')) {
    color = localStorage.getItem('themeColor');
}

let render = () => {
 // import("./assets/css/sass/themes/gogo.light.blue.scss").then(rs=>{ console.log("hihi")});
    switch (color) {
        case "light.purple":
            import("./assets/css/sass/themes/gogo.light.purple.scss").then(x => {
                const MainApp = require('./App').default;
                ReactDOM.render(
                    <MainApp />,
                    rootEl
                );
            });
        break;
        case "light.blue":
            import("./assets/css/sass/themes/gogo.light.blue.scss").then(x => {
                const MainApp = require('./App').default;
                ReactDOM.render(
                    <MainApp />,
                    rootEl
                );
            });
            break;
        case "light.green":
            import("./assets/css/sass/themes/gogo.light.green.scss").then(x => {
                const MainApp = require('./App').default;
                ReactDOM.render(
                    <MainApp />,
                    rootEl
                );
            });
            break;
        case "light.orange":
            import("./assets/css/sass/themes/gogo.light.orange.scss").then(x => {
                const MainApp = require('./App').default;
                ReactDOM.render(
                    <MainApp />,
                    rootEl
                );
            });
            break;
        case "light.red":
            import("./assets/css/sass/themes/gogo.light.red.scss").then(x => {
                const MainApp = require('./App').default;
                ReactDOM.render(
                    <MainApp />,
                    rootEl
                );
            });
            break;
        case "dark.purple":
            import("./assets/css/sass/themes/gogo.dark.purple.scss").then(x => {
                const MainApp = require('./App').default;
                ReactDOM.render(
                    <MainApp />,
                    rootEl
                );
            });
            break;
        case "dark.blue":
            import("./assets/css/sass/themes/gogo.dark.blue.scss").then(x => {
                const MainApp = require('./App').default;
                ReactDOM.render(
                    <MainApp />,
                    rootEl
                );
            });
            break;
        case "dark.green":
            import("./assets/css/sass/themes/gogo.dark.green.scss").then(x => {
                const MainApp = require('./App').default;
                ReactDOM.render(
                    <MainApp />,
                    rootEl
                );
            });
            break;
        case "dark.orange":
            import("./assets/css/sass/themes/gogo.dark.orange.scss").then(x => {
                const MainApp = require('./App').default;
                ReactDOM.render(
                    <MainApp />,
                    rootEl
                );
            });
            break;
        case "dark.red":
            import("./assets/css/sass/themes/gogo.dark.red.scss").then(x => {
                const MainApp = require('./App').default;
                ReactDOM.render(
                    <MainApp />,
                    rootEl
                );
            });
            break;


    }


};
/*
if (module.hot) {
    module.hot.accept('./App', () => {
        const css = import('./assets/css/sass/themes/gogo.' + color + '.scss').then(x => {
            const NextApp = require('./App').default;

            render(
                <NextApp />,
                rootEl
            );
        });
    });

}*/

render() 
