import router from '../router' //引入路由配置文件
class EmptyNative {

    setTitle(title) {
        console.log("native.js--setTitle", title);
        document.title = title;
    }

    loadPage(url, title) {
        let base_url = 'http://localhost:8081/#/';
        let complete_url = base_url + url;
        console.log("native.js--load_page " + complete_url);
        self.location.href = complete_url;
        this.setTitle(title);
    }

    goBack() {
        router.go(-1);//返回上一级页面
    }

    getDeviceId() {
        console.log("native.js--getDeviceId");
        return "5c492668162a2599cc352203";
    }

    getDeviceStatus() {
        console.log("native.js--getDeviceStatus");
        return '1';
    }

    getDeviceVolume() {
        console.log("native.js--getDeviceVolume");
        return 60;
    }

    setDeviceVolume(volume) {
        console.log("native.js--setDeviceVolume:" + volume);
    }

    getAudioPlayStatus() {
        console.log("native.js--getAudioPlayStatus");
    }

    pause() {
        console.log("native.js--pause");
    }

    getToken() {
        console.log("native.js--getToken");
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTYzMzAyMzAsImlhdCI6MTU1NTg5ODIzMCwidWlkIjoiNWM0OTFiODkxNjJhMjU5OWNjMzUyMWZlIiwidmNvZGUiOiI3N2IwNjViYy0yMzE1LTRiNWMtOWRmNC1iYWU0ODZjNDViOWUifQ.F4PJFkUXJXZeFwabMC5Xn4SvGbC9LZFa34ddRopS-xw";
    }

    callPhone() {
        console.log("native.js--callPhone");
        alert('请拨打：400-812-3456 联系客服！')
    }
}

class AndroidNative {

    setTitle(title) {
        console.log("native.js--setTitle");
        android.setTitle(title);
    }

    isDebug() {
        console.log("native.js--isDebug");
        return android.isDebug();
    }

    loadPage(url, title) {
        let base_url;
        if (this.isDebug())
            base_url = 'https://testtsound.tclking.com/index.html#/';//测试服务器地址
        else
            base_url = 'https://tsound.tclking.com/index.html#/';//正式服务器地址
        let complete_url = base_url + url;
        console.log("native.js--load_page " + complete_url);
        android.loadPage(complete_url, title);
    }

    goBack() {
        android.goBack();
    }

    getDeviceId() {
        console.log("native.js--getDeviceId");
        return android.getDeviceId();
    }

    getDeviceStatus() {
        console.log("native.js--getDeviceStatus");
        return android.getDeviceStatus();
    }

    getDeviceVolume() {
        console.log("native.js--getDeviceVolume");
        android.getDeviceVolume();
    }

    setDeviceVolume(volume) {
        console.log("native.js--setDeviceVolume---volume = " + volume);
        android.setDeviceVolume(volume);
    }

    getAudioPlayStatus() {
        console.log("native.js--getAudioPlayStatus");
        android.getAudioPlayStatus();
    }

    pause() {
        console.log("native.js--pause");
        android.pause();
    }

    getToken() {
        console.log("native.js--getToken");
        return android.getToken();
    }

    callPhone() {
        console.log("native.js--callPhone");
        android.callPhone();
    }
}

class IOSNative {

    setTitle(title) {
        console.log("native.js--setTitle");
        setTitle(title);
    }

    isDebug() {
        console.log("native.js--isDebug");
        return isDebug();
    }

    loadPage(url, title) {
        let base_url;
        if (this.isDebug())
            base_url = 'https://testtsound.tclking.com/index.html#/';//测试服务器地址
        else
            base_url = 'https://tsound.tclking.com/index.html#/';//正式服务器地址
        let complete_url = base_url + url;
        console.log("native.js--load_page " + complete_url);
        loadPage(complete_url, title);
    }

    goBack() {
        goBack();
    }

    getDeviceId() {
        console.log("native.js--getDeviceId");
        return getDeviceId();
    }

    getDeviceStatus() {
        console.log("native.js--getDeviceStatus");
        return getDeviceStatus();
    }

    getDeviceVolume() {
        console.log("native.js--getDeviceVolume");
        getDeviceVolume();
    }

    setDeviceVolume(volume) {
        console.log("native.js--setDeviceVolume---volume = " + volume);
        setDeviceVolume(volume);
    }

    getAudioPlayStatus() {
        console.log("native.js--getAudioPlayStatus");
        getAudioPlayStatus();
    }

    pause() {
        console.log("native.js--pause");
        pause();
    }

    getToken() {
        console.log("native.js--getToken");
        return getToken();
    }

    callPhone() {
        console.log("native.js--callPhone");
        callPhone();
    }
}

let native;
let p = navigator.platform;
let u = navigator.userAgent;
let is_ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
if (p == "Win32" || p == "Win64" || p == "MacPPC" || p == "MacIntel" || p == "X11" || p == "Linux i686")//PC调试环境
{
    console.log('PC环境--供PC端调试');
    native = new EmptyNative();
}
else if (is_ios) {
    console.log('Mobile环境--IOS移动端');
    native = new IOSNative();
} else {
    console.log('Mobile环境--Android移动端');
    native = new AndroidNative();
}
export default native;
