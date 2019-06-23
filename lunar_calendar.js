
function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

function getLday(d){
  var day = +Intl.DateTimeFormat("zh-TW-u-ca-chinese", {day: "numeric"}).format(d).match(/\d+/)[0];
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
    const thu = ["Chủ Nhật","Thứ Hai", "Thứ Ba","Thứ Tư","Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    const ddd =  getMonday(date);
    
    //ddd.getDate();
    var day = [], lday = [];
    day[0] = ddd.getDate(); lday[0] = getLday(ddd);
    ddd.setDate(ddd.getDate() + 1); day[1] = ddd.getDate(); lday[1] = getLday(ddd);
    ddd.setDate(ddd.getDate() + 1); day[2] = ddd.getDate(); lday[2] = getLday(ddd);
    ddd.setDate(ddd.getDate() + 1); day[3] = ddd.getDate(); lday[3] = getLday(ddd);
    ddd.setDate(ddd.getDate() + 1); day[4] = ddd.getDate(); lday[4] = getLday(ddd);
    ddd.setDate(ddd.getDate() + 1); day[5] = ddd.getDate(); lday[5] = getLday(ddd);
    ddd.setDate(ddd.getDate() + 1); day[6] = ddd.getDate(); lday[6] = getLday(ddd);

    var today = '';
    today = new Date();
    var act = today.getDay();
    if(act==0) act = 7;
    today = today.getDay();
    today = thu[today];

    var currdate = (new Date()).toLocaleDateString('en-GB');
    var y = +Intl.DateTimeFormat("zh-TW-u-ca-chinese", {
        year: "numeric"
    }).format(date).match(/\d+/)[0],
        m = +Intl.DateTimeFormat("zh-TW-u-ca-chinese", {
            month: "numeric"
        }).format(date).match(/\d+/)[0],
        d = +Intl.DateTimeFormat("zh-TW-u-ca-chinese", {
            day: "numeric"
        }).format(date).match(/\d+/)[0],
        can = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"],
        chi = ["Tí", "Sửu", "Dần", "Mão", "Thìn", "Tị", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

    y = can [(y - 1) % 10] + ' ' + chi [(y - 1) % 12];




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
