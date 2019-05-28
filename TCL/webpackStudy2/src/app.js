import {layer,layer1Class} from './components/layer/layer'
import './css/common.css'

const  App = function () {
    var dom = document.getElementById('app');
    var layerObj = new layer()
    dom.innerHTML =  layerObj.tpl;

    var dom1 = document.getElementById('app1');
    var layerObj1 = new layer1Class()
    dom1.innerHTML =  layerObj1.tpl({
        name:'帅气',
        arr:['小明','小华','小帅']
    });
}


new App()