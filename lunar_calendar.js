
function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

function getLday(d) {
  var day = +Intl.DateTimeFormat("zh-TW-u-ca-chinese", { day: "numeric" }).format(d).match(/\d+/)[0];
  return day;
}

class LunarCalendar extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      card.header = '';
      this.content = document.createElement('div');
      this.content.style.padding = '0px';
      card.appendChild(this.content);
      this.appendChild(card);
    }

    //const entityId = this.config.entity;
    //const state = hass.states[entityId];
    //const stateStr = state ? state.state : 'unavailable';
    const date = new Date();
    const ddd = getMonday(date);

    //ddd.getDate();
    var day = [], lday = [];
    day[0] = ddd.getDate(); lday[0] = getLday(ddd);
    ddd.setDate(ddd.getDate() + 1); day[1] = ddd.getDate(); lday[1] = getLday(ddd);
    ddd.setDate(ddd.getDate() + 1); day[2] = ddd.getDate(); lday[2] = getLday(ddd);
    ddd.setDate(ddd.getDate() + 1); day[3] = ddd.getDate(); lday[3] = getLday(ddd);
    ddd.setDate(ddd.getDate() + 1); day[4] = ddd.getDate(); lday[4] = getLday(ddd);
    ddd.setDate(ddd.getDate() + 1); day[5] = ddd.getDate(); lday[5] = getLday(ddd);
    ddd.setDate(ddd.getDate() + 1); day[6] = ddd.getDate(); lday[6] = getLday(ddd);

    var act = date.getDay();
    if (act == 0) act = 7; else act = act;

    var today = Intl.DateTimeFormat("vi-VN", { weekday: "long" }).format(date);
    var m='';
    var currdate = (new Date()).toLocaleDateString('en-GB'),
    m = +Intl.DateTimeFormat("zh-TW-u-ca-chinese", { month: "numeric" }).format(date),
    d = +Intl.DateTimeFormat("zh-TW-u-ca-chinese", { day: "numeric" }).format(date).match(/\d+/)[0];


    if (String(m).match(/\d+/)) {
      var y = +Intl.DateTimeFormat("zh-TW-u-ca-chinese", {
        year: "numeric"
      }).format(date).match(/\d+/)[0],
        m = +Intl.DateTimeFormat("zh-TW-u-ca-chinese", {
          month: "numeric"
        }).format(date).match(/\d+/)[0],
        can = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"],
        chi = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

      y = can[(y - 1) % 10] + ' ' + chi[(y - 1) % 12];
    } else {
      var m = Intl.DateTimeFormat("zh-TW-u-ca-chinese", {month: "numeric"}).format(date).replace(/閏|月|正|二|三|四|五|六|七|八|九|十|冬|臘/gu, function (x) {
        return {
            閏: '*', // nhuan
            月: '',
            正: '1',
            二: '2',
            三: '3',
            四: '4',
            五: '5',
            六: '6',
            七: '7',
            八: '8',
            九: '9',
            十: '10',
            冬: '11',
            臘: '12'
        }[x];
    }),
    y = Intl.DateTimeFormat("zh-TW-u-ca-chinese", {year: "numeric"}).format(date).replace(/\d+/gu, '').replace(/年|甲|乙|丙|丁|戊|己|庚|辛|壬|癸|子|丑|寅|卯|辰|巳|午|未|申|酉|戌|亥/gu, function (x) {
        return {
            年: "",
            甲: "Giáp ",
            乙: "Ất ",
            丙: "Bính ",
            丁: "Đinh ",
            戊: "Mậu ",
            己: "Kỷ ",
            庚: "Canh ",
            辛: "Tân ",
            壬: "Nhâm ",
            癸: "Quý ",
            子: "Tý",
            丑: "Sửu",
            寅: "Dần",
            卯: "Mão",
            辰: "Thìn",
            巳: "Tỵ",
            午: "Ngọ",
            未: "Mùi",
            申: "Thân",
            酉: "Dậu",
            戌: "Tuất",
            亥: "Hợi"
        }[x];
    });
    };

    this.content.innerHTML = `
      <div class="ldate">
        <div class="day">
          ${today}
        </div>
        <div class="date">
          <div class="date1">${currdate}</div>
          <div class="date2">${d}.${m} ${y}</div>
        </div>
        <div class="week">
          <div class="we">
            <div class="we0">TH 2</div>
            <div class="we1">${day[0]}</div>
            <div class="we2">${lday[0]}</div>
          </div>
          <div class="we">
            <div class="we0">TH 3</div>
            <div class="we1">${day[1]}</div>
            <div class="we2">${lday[1]}</div>
          </div>
          <div class="we act">
            <div class="we0">TH 4</div>
            <div class="we1">${day[2]}</div>
            <div class="we2">${lday[2]}</div>
          </div>
          <div class="we">
            <div class="we0">TH 5</div>
            <div class="we1">${day[3]}</div>
            <div class="we2">${lday[3]}</div>
          </div>
          <div class="we">
            <div class="we0">TH 6</div>
            <div class="we1">${day[4]}</div>
            <div class="we2">${lday[4]}</div>
          </div>
          <div class="we">
            <div class="we0">TH 7</div>
            <div class="we1">${day[5]}</div>
            <div class="we2">${lday[5]}</div>
          </div>
          <div class="we red">
            <div class="we0">CN</div>
            <div class="we1">${day[6]}</div>
            <div class="we2">${lday[6]}</div>
          </div>

        </div>
      </div>
            <style>
        body{
          font-family: arial;
        }
        .ldate{
          margin: auto;
          position: relative;
        }
        .ldate .day{
          font-size:3em;
          line-height: 70px;
          padding-left:10px;
        }
        .ldate .date{
          position: absolute;
              right: 10px;
    top: 12px;
          text-align: right;
        }
        .ldate .date .date1{
          font-size: 1.5em;
        }
        .ldate .date .date2{
          color:#A2A2A2;
        }
        .ldate .week{
          box-shadow: 0 0 20px 11px #00000008;
        }
        .ldate .week:after{
          content: ' ';
          display: block;
          clear: both;
        }
        .ldate .week .we{
          width:14.28%;
          float: left;
          text-align: center;
        }
        .ldate .week .we0{
          font-size: 0.8em;
          padding: 10px 0 10px;
          color:#A2A2A2;
        }
        .ldate .week .we.red .we0{
          color:#F05A5A;
        }
        .ldate .week .we1{
          font-size: 1.5em;
        }
        .ldate .week .we2{
          font-size: 0.8em;
          padding:5px 0 10px;
          color:#A2A2A2;
        }

        .ldate .week .we:nth-child(${act}){
          background-color: #639FED;
          color:#fff;
        }
        .ldate .week .we:nth-child(${act}),
        .ldate .week .we:nth-child(${act}).red .we0,
        .ldate .week .we:nth-child(${act}) .we0,
        .ldate .week .we:nth-child(${act}) .we2{
          color:#fff;
        }
      </style>
    `;
  }

  setConfig(config) {
    //if (!config.entity) {
    //throw new Error('You need to define an entity');
    //}
    //this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
}

customElements.define('lunar-calendar', LunarCalendar);
