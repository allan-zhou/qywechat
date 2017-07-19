const request = require('request');
const XLSX = require('xlsx');
const path = require('path');

const ACCESS_TOKEN = 'i937HXT6SuNs4kLuDJy8WRZo1GDFOi2kOpYkdInoIC_U2U3Df0-nPz9t9uo6OS62kHfPIE7FBrjEh2rSKp9rRorNxsYwNYY35CQZ8m135qFMTkfxB9xt7TIHGLrcv8sAvsa6ztNW8Vm_IE3CPVU1DhzVatyEx1kMrGYFXJkhzY3VsdOgpz8sEBxEhHiQ8QzXuytpmMts6P1QP39teywCfkjKUvxIkEOVx-Hy9sM1L22-rpALCdjokIJH0c0OsE4DL-OvDaR6_0jNKoOo6xjpVJVbUBQhrEamHaH6W8_mVbs';

const file = path.resolve(__dirname, '../data/Attendee-test.xls');
const workbook = XLSX.readFile(file);
const json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

function getFormData(userData) {
  const userid = userData.email.split('@')[0];
  const seat = userData.seat;
  const content = `您的主会场座位是：
${seat}`;

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

json.forEach((element) => {
  if (!element.email || !element.seat) return;

  const formData = getFormData(element);
  const options = getOptions(formData);
  request(options, callback);
});