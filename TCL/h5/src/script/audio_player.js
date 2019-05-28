import axios from '../https/http' //引入axios插件处理http请求
import native from './native'

class AudioSource {//封装播放信息
    constructor() {
        this.track_id = new String;//单曲id
        this.source = new String;//来源（思必驰等等）
        this.album_id = new String;//专辑id(专辑必传)
        this.playback_position = new Number;//播放位置(专辑必传)
        this.resource_type = new String;//资源类型 album专辑    single单曲
        this.is_restart = new Boolean;//从头播放
        this.device_id = native.getDeviceId();//播放设备id（音响的id）
    }
}

class AudioPlayer {
    constructor() { // 确保只有单例
        if (constructor.unique !== undefined) {
            return constructor.unique;
        }
        this.onvolume = "";
        this.onplay = "";
        this.onpause = "";
        this.onnearlyfinished = "";
        this.audio_source = new AudioSource();
        constructor.unique = this;
    }

    play() {//用户操作APP主动播放（发了播放请求）
        console.log("audio_player.js--play");
        axios.post('/api/app/v1/user/resource/play', this.audio_source)
            .then((res) => {
                if (res.data.error_code !== 0) //没有正常播放
                    console.log(`audio_player.js--play--error_code=${res.data.error_code},${res.data.error_msg}`);
                else {//正常播放
                    localStorage.record_id = res.data.data.record_id;
                    console.log("audio_player.js--play success--record_id = " + localStorage.record_id);
                }
            }).catch(function (error) {
            console.log(error);
        });
    }

    pause() {//用户操作APP主动暂停
        console.log("audio_player.js--pause");
        native.pause();
    }

    onPlay(track_id) {//APP接收音响消息同步播放状态（并没有去发播放请求）
        console.log("audio_player.js--onPlay");
        if (this.onplay)
            this.onplay(track_id);
    }

    onPause() {//APP接收音响消息同步暂停状态
        console.log("audio_player.js--onPause");
        if (this.onpause)
            this.onpause();
    }

    onNearlyFinished(event) {
        console.log("audio_player.js--onFinished");
        if (this.onnearlyfinished)
            this.onnearlyfinished(event);
    }

    onAudioEvent(pay_load, play_status) {//同步音响播放状态
        var obj = JSON.parse(pay_load);
        var arr = obj.audioItemId.split(".");//把包含了record_id和track_id的字符串以"."为标识截取为一个数组
        console.log("audio_player.js--onAudioEvent---response.record_id = " + arr[0]);
        console.log("audio_player.js--onAudioEvent---localStorage.record_id = " + localStorage.record_id);
        if (localStorage.record_id && localStorage.record_id == arr[0]) {
            if (play_status == "play")
                this.onPlay(arr[1]);
            else
                this.onPause();
        } else {
            this.onPause();
        }
    }

    onVolume(pay_load) {//同步音响音量
        console.log("volume.js--onVolume");
        var obj = JSON.parse(pay_load);
        if (this.onvolume)
            this.onvolume(obj.volume);
    }
}

var audio = new AudioPlayer();//构造一个AudioPlayer类取名为audio
window.on_audio_event = function (pay_load, play_status) {//提供接口让原生调用，实时传递音响播放状态，参数为json字符串
    audio.onAudioEvent(pay_load, play_status);
};
window.on_volume_event = function (pay_load) {//提供接口让原生调用，实时传递音响音量，参数为number
    audio.onVolume(pay_load);
};
export default audio;//导出audio类供其他组件使用