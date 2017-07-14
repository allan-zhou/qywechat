const request = require('request');

const ACCESS_TOKEN = 'h90d5VAYMU6VfgfAsYNKUP1tU8Q_3YL3ewoo9ujiII2nQMHDHM4Q6z9r6mX3vXqWLat5DR-FH5aYyVEHc_kGJZwyo5mN1xi-MhIzAci5GuZ1h1Y_xz0PEkOAJhDeESo-EOI5ceZTvfWqxRZHL8Yl8H_ElVwpVsNru6y-XAlsBqDSZKTQlezGh2R6fm9OcYQPEhQEAMxfvFrbxKrA4UHkxGWSJM3KQiJWFqVdJvkVDXaU0Vi3z6mF_CH1t0kvEc4-hy0RaS27UOH1TQNGHLPvPBQ0LHDkM4b3lg-A3Nh8TC8';

const formdata = {
  touser: 'zhoujl',
  msgtype: 'text',
  agentid: 1000002,
  text: {
    content: '你的快递已到，请携带工卡前往邮件中心领取。\n出发前可查看<a href="http://work.weixin.qq.com">邮件中心视频实况</a>，聪明避开排队。',
  },
};

const options = {
  method: 'POST',
  url: `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${ACCESS_TOKEN}`,
  headers: {
    'user-agent': 'node.js',
  },
  form: JSON.stringify(formdata),
};

function callback(error, response, body) {
  if (!error && response.statusCode === 200) {
    const info = JSON.parse(body);

    console.log(info);
  }
}

request(options, callback);

// console.log(JSON.stringify(formdata));