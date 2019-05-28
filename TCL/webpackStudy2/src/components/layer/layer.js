import './layer.less'
import tpl from './layer.html'
import tpl1 from './layer.ejs'

function layer() {
    return {
        name:'layer',
        tpl:tpl
    };
}

function layer1Class() {
    return {
        name:'layer1',
        tpl:tpl1
    }
}

export {layer1Class,layer};