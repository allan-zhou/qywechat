const request = require('request');
const XLSX = require('xlsx');
const path = require('path');

const ACCESS_TOKEN = 'h90d5VAYMU6VfgfAsYNKUP1tU8Q_3YL3ewoo9ujiII2nQMHDHM4Q6z9r6mX3vXqWLat5DR-FH5aYyVEHc_kGJZwyo5mN1xi-MhIzAci5GuZ1h1Y_xz0PEkOAJhDeESo-EOI5ceZTvfWqxRZHL8Yl8H_ElVwpVsNru6y-XAlsBqDSZKTQlezGh2R6fm9OcYQPEhQEAMxfvFrbxKrA4UHkxGWSJM3KQiJWFqVdJvkVDXaU0Vi3z6mF_CH1t0kvEc4-hy0RaS27UOH1TQNGHLPvPBQ0LHDkM4b3lg-A3Nh8TC8';

const file = path.resolve(__dirname, '../data/Attendee.xls');
const workbook = XLSX.readFile(file);
const json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

const testUserIds = ['zhoujl'].join(',');

const testUsers = json.filter((element) => {
  if (element.email) {
    const userid = element.email.split('@')[0];
    return testUserIds.indexOf(userid) > -1;
  }
  return false;
});

function getFormData(userData) {
  const userid = userData.email.split('@')[0];
  const content = `${userData.name}，您好！今天下午您参加的分会场信息是：
14:00~15:00 1号会场
  
15:30~16:30 2号会场`;
  return {
    touser: userid,
    msgtype: 'text',
    agentid: 1000002,
    text: {
      content,
    },
  };
}

function getOptions(formdata) {
  return {
    method: 'POST',
    url: `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${ACCESS_TOKEN}`,
    headers: {
      'user-agent': 'node.js',
    },
    form: JSON.stringify(formdata),
  };
}

function callback(error, response, body) {
  if (!error && response.statusCode === 200) {
    const info = JSON.parse(body);

    console.log(info);
  }
}

let i = 0;
while (i < 200) {
  testUsers.forEach((element) => {
    const formData = getFormData(element);
    const options = getOptions(formData);
    request(options, callback);
  });

  i += 1;
}

