// 資料存放至 data
var data;
// 細分區域後的資料 存在 citieData
var citieData = [];




// 暫存選項城市
var localCity = localStorage.getItem('city');
// 暫存選項縣市
var localCitie = localStorage.getItem('citie');

if (localCity == '' || localCity == null) {
    localStorage.setItem('city','全部區域');
    localCity = localStorage.getItem('city');
};
if (localCitie == '' || localCitie == null) {
    localStorage.setItem('citie','全部區域');
    localCitie = localStorage.getItem('citie');
};





// 獲取資料
function getData() {
    //開啟讀取動畫
    openLoading();
    var xhr = new XMLHttpRequest();
    xhr.open('GET','https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json',true);
    
    xhr.send(null);
    
    xhr.onload = function(){
        data = JSON.parse(xhr.responseText);
        data = data.features;
        

        // 縣市列表
        upcity();


        // 預設 城市選擇框選項
        document.getElementById('city').selectedIndex = localStorage.getItem('city-Num');

        if (localCitie == '全部區域' || localCitie == null || localCitie == '') {
            
        }else{
            // 預設 縣市選擇框選項
            document.getElementById('citie').selectedIndex = localStorage.getItem('citie-Num');
        }


        //關閉讀取動畫
        closeLoading();
    }
}

// 全域變數來存放日期格式
var timeDetails = {};
function getDay() {
    //先創建一個Date實體
    var time = new Date();
    //獲取當前時間(取得的值為一個毫秒数值)
    var theTime = time.getTime();

    timeDetails = {
        year: time.getFullYear(),
        month: time.getMonth() + 1,
        date: time.getDate(),
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds(),
        day: time.getDay(),
    };
    return time.toLocaleString();
}

// 判斷日期單雙購買限制
function ifDay(day) {
    if (day == 1){
        return '一'
    }else if (day == 2){
        return '二'
    }else if (day == 3){
        return '三'
    }else if (day == 4){
        return '四'
    }else if (day == 5){
        return '五'
    }else if (day == 6){
        return '六'
    }else{
        return '日'
    }
}




// 篩選城市 並渲染
function renderList(city){
    // 空字串放置累加資料
    var str = '';
    // 篩選後的區域資料 方便用來進一步列表渲染區域
    citieData = [];

    document.querySelector('.list').innerHTML = str;

    //篩選縣市 列表
    upcitie();

    //關閉讀取動畫
    closeLoading();

}



// 篩選縣市 並渲染
function renderListCitie(citie){
    var str = '';

    document.querySelector('.list').innerHTML = str;
    //關閉讀取動畫
    closeLoading();


}




document.querySelector('.list').addEventListener('click',function (e){
    if (e.target.nodeName !== 'H3') {
        return;
    }
    
});













// 宣告全域 selectCity 讓兩個 function 使用 並且可以進行排錯 不然使用區域變數會比較好
var selectCity = '<option value="全部區域">全部區域</option>';

// 篩選城市 列表
function upcity() {

    selectCity = '<option value="全部區域">全部區域</option>';

    // 先準備空陣列，它是篩選後的資料庫
    var allZone = [];

    // 這使用indexOf的特性 如果沒重複資料 就會判定為-1 利用這個來讓allZone 增加陣列
    for (var i = 0; i < data.length; i++) {
        if (allZone.indexOf(data[i].properties.county) === -1 && data[i].properties.county !== '') {
            allZone.push(data[i].properties.county);
        }
    }
    for (var i = 0; i < allZone.length ; i++) {
        selectCity += '<option value="' + allZone[i] + '">' + allZone[i] + '</option>';
    }
    document.querySelector('.choose').innerHTML = selectCity
    //選到的城市 選染LI 縣市
    upcitie();
}

// 篩選縣市 列表
function upcitie() {

    selectCity = '<option value="全部區域">全部區域</option>';

    // 先準備空陣列，它是篩選後的資料庫
    var allZone = [];

    // 這使用indexOf的特性 如果沒重複資料 就會判定為-1 利用這個來讓allZone 增加陣列
    for (var i = 0; i < citieData.length; i++) {
        if (allZone.indexOf(citieData[i].properties.town) === -1 && citieData[i].properties.town !== '') {
            allZone.push(citieData[i].properties.town);
        }
    }
    for (var i = 0; i < allZone.length ; i++) {
        selectCity += '<option value="' + allZone[i] + '">' + allZone[i] + '</option>';
    }
    document.querySelector('.choose-citie').innerHTML = selectCity
}



















// 開啟讀取動畫
function openLoading() {
    document.querySelector('.loading').classList.remove('disNone');
    //console.log('開始載入');
}
// 關閉讀取動畫
function closeLoading() {
    document.querySelector('.loading').classList.add('disNone');
    //console.log('關閉載入');
}







var listSwitch = 0;
// 手機開關地圖
document.querySelector('.black').addEventListener('click',function(e){
    e.preventDefault();
    init()

    if (listSwitch === 0) {
        e.target.classList.remove('fa-caret-left');
        e.target.classList.add('fa-caret-right');
        document.querySelector('.frame').classList.add('close')
        document.querySelector('.map').classList.add('closeMap')
        document.querySelector('.black').classList.add('closeBtn')
        document.querySelector('.header').classList.add('close')
        listSwitch += 1
    }else{
        e.target.classList.remove('fa-caret-right');
        e.target.classList.add('fa-caret-left');
        document.querySelector('.frame').classList.remove('close')
        document.querySelector('.map').classList.remove('closeMap')
        document.querySelector('.black').classList.remove('closeBtn')
        document.querySelector('.header').classList.remove('close')
        listSwitch = 0;
    }

})







// 篩選城市 切換監聽
document.querySelector('.choose').addEventListener('change',function (e) {
    //開啟讀取動畫
    openLoading();
    //篩選城市 並渲染點擊的城市
    renderList(e.target.value);

    
    // 讓localStorage 的縣市資料清空
    localStorage.removeItem('citie-Num')
    localStorage.removeItem('citie')


    // 使用 localStorage 儲存上次選擇區域
    localStorage.setItem(this.id,e.target.value);
    // 使用 localStorage 儲存上次選擇區域 selectedIndex 來預選
    localStorage.setItem(this.id+'-Num',e.target.selectedIndex);
    
})
// 篩選縣市 切換監聽
document.querySelector('.choose-citie').addEventListener('change',function (e) {
    //開啟讀取動畫
    openLoading();
    //篩選縣市 並渲染點擊的縣市
    renderListCitie(e.target.value);



    // 使用 localStorage 儲存上次選擇區域
    localStorage.setItem(this.id,e.target.value);
    // 使用 localStorage 儲存上次選擇區域 selectedIndex 來預選
    localStorage.setItem(this.id+'-Num',e.target.selectedIndex);

})




// 初始化
function init() {
    //獲取資料
    getData();
    // 當前日期
    document.querySelector('.day').textContent = getDay();
    // 購買限制更新資訊
    document.querySelector('.week span').textContent = ifDay(timeDetails.day)

}

init();









































