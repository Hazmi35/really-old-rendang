const request = require('superagent');
const nodeVersion = parseInt(process.versions.node.split('.'), 10);

class Util {
  constructor() {
    this.shuffle = (ArrayResolveable) => {
      const arr = ArrayResolveable.slice(0);
      for (let i = arr.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      return arr;
    };
    this.base64 = {
      encode: (StringResolveable) => {
        return Buffer.from(StringResolveable).toString('base64');
      },
      decode: (Base64Resolveable) => {
        return Buffer.from(Base64Resolveable, 'base64').toString();
      }
    };
    this.hastebin = async (text) => {
      const {
        body
      } = await request.post('https://www.hastebin.com/documents')
        .send(text);
      return `https://www.hastebin.com/${body.key}`;
    };
    this.chunk = (array, chunkSize) => {
      const temp = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        temp.push(array.slice(i, i + chunkSize));
      }
      return temp;
    };
    this.parseDur = (ms) => {
      let seconds = ms / 1000;
      let days = parseInt(seconds / 86400);
      seconds = seconds % 86400;
      let hours = parseInt(seconds / 3600);
      seconds = seconds % 3600;
      let minutes = parseInt(seconds / 60);
      seconds = parseInt(seconds % 60);

      if (days) {
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
      } else if (hours) {
        return `${hours}h ${minutes}m ${seconds}s`;
      } else if (minutes) {
        return `${minutes}m ${seconds}s`;
      }
      return `${seconds}s`;
    };
    this.trimArray = (array, length = 10) => {
      const len = array.length - length;
      const temp = array.slice(0, length);
      temp.push(`...${len} more.`);
      return temp;
    };
    this.verify = async (user, msg, time = 30000) => {
      await msg.react('🇾');
      await msg.react('🇳');
      const data = await msg.awaitReactions(reaction => reaction.users.has(user.id), {
        time: time,
        max: 1
      });
      if (data.firstKey() === '🇾') return true;
      return false;
    };
    this.codeblock = (string, code) => {
      return `\`\`\`${code}\n${string}\`\`\``;
    };
    this.decodeHtmlEntities = (text) => {
      return text.replace(/&#(\d+);/g, (rep, code) => {
        return String.fromCharCode(code);
      });
    };
    this.scrapeSubreddit = async (subreddit) => {
      subreddit = typeof subreddit === "string" && subreddit.length !== 0 ? subreddit : "puppies";
      const {
        body
      } = await request.get(`https://imgur.com/r/${subreddit}/hot.json`);
      if (!body.data) return undefined;
      const img = body.data[Math.floor(Math.random() * body.data.length)];
      return `http://imgur.com/${img.hash}${img.ext.replace(/\?.*/, "")}`;
    };
    this.promisify = (fn) => {
      if (nodeVersion >= 8) return require('util').promisify(fn);
      let name = fn.name;
      name = (name || '').replace(/\s|bound(?!$)/g, '');

      function newFunction(...args) {
        const arg = [];
        for (const key of Object.keys(args)) arg.push(args[key]);
        return new Promise((resolve, reject) =>
          fn.apply(this, [...args, (err, res) => {
            if (err) return reject(err);
            return resolve(res);
          }]));
      }
      Object.defineProperty(newFunction, 'name', {
        value: name
      });
      return newFunction;
    };
    this.promisifyAll = (obj, suffix = 'Async') => {
      const newObj = Object.getPrototypeOf(obj);
      for (const key of Object.keys(obj).concat(Object.keys(newObj))) {
        if (typeof obj[key] !== 'function') continue;
        obj[`${key}${suffix}`] = this.promisify(obj[key]);
      }
      return obj;
    };
  }
}


module.exports = Util;