import ToastComponet from 'vue-toast.vue'

let Toast = {}

Toast.install = function (Vue,options={}) {
    var opt = {
        duration:3000
    }
    for (var key in options) {
        opt[key] = options[key];
    }
    Vue.prototype.$toast = function (message,option) {
        if (typeof option == "object") {
            for (let key in option) {
                opt[key] = option[key];
            }
        }
        const ToastVC = Vue.extend(ToastComponet);
        let instance = new ToastVC().$mount(document.createElement("div"));
        instance.message = message;
        instance.visible = true;
        setTimeout(function () {
            instance.visible = false;
            document.body.removeChild(instance.$el);
        },opt.duration)
    }

    Vue.prototype.$toast["show"] = function (message,option) {
        Vue.prototype.$toast(message,option);
    }
}

export default Toast;