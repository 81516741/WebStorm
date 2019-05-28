exports.install = function (Vue, option) {
    Vue.prototype.load_page_home_more = function (category_id, title) {
        let page_name = 'home/more';
        let url = page_name + '?category_id=' + category_id;
        this.native.loadPage(url, title);
    };
    Vue.prototype.load_page_home_search_result = function (search_key) {
        let page_name = 'search/result';
        let url = page_name + '?search_key=' + search_key;
        this.$router.push(url);//在一个webview里做h5跳转
    };
    Vue.prototype.load_page_home_search_result_more = function (search_key, source, search_type, title) {
        let page_name = 'home/search/result/more';
        let url = page_name + '?search_key=' + search_key + "&source=" + source + "&search_type=" + search_type;
        this.native.loadPage(url, title);
    };
    Vue.prototype.load_page_home_album_details = function (album_id, source, title) {
        let page_name = 'home/album_details';
        let url = page_name + '?album_id=' + album_id + "&source=" + source + "&album_title=" + title;
        this.native.loadPage(url, title);
    };
    Vue.prototype.load_page_home_play = function (obj, title) {
        let page_name = 'home/play';
        let params = this.qs.stringify(obj, {arrayFormat: 'repeat'});
        let url = page_name + '?' + params;
        this.native.loadPage(url, title);
    };
    Vue.prototype.load_page_skill_introduction = function (obj) {
        let page_name = 'skill/introduction';
        let params = this.qs.stringify(obj, {arrayFormat: 'repeat'});
        let url = page_name + '?' + params;
        this.native.loadPage(url, obj.name);
    };
    Vue.prototype.load_page_channel_edit = function (channel_id, channel_type) {
        let page_name = 'channel/channel_edit';
        let url = page_name + "?channel_id=" + channel_id + "&channel_type=" + channel_type;
        this.native.loadPage(url, '');//频道初始页跳到二级页面调原生接口做跳转，二级到345级页面都是h5自己跳转
    };
    Vue.prototype.load_page_programme_edit = function (obj, index) {
        let page_name = 'channel_edit/programme_edit';
        let params = this.qs.stringify(obj, {arrayFormat: 'repeat'});
        let url = page_name + '?' + params + "&index=" + index;
        this.$router.push(url);//在一个webview里做h5跳转
    };
    Vue.prototype.load_page_programme_select = function () {
        let url = 'programme_edit/programme_select';
        this.$router.push(url);//在一个webview里做h5跳转
    };
    Vue.prototype.load_page_clock_edit = function () {
        let url = 'clock/clock_edit';
        this.$router.push(url);//在一个webview里做h5跳转
    };

};