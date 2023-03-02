(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/.pnpm/hypercast@0.2.0/node_modules/hypercast/client.js
  var require_client = __commonJS({
    "node_modules/.pnpm/hypercast@0.2.0/node_modules/hypercast/client.js"(exports, module) {
      "use strict";
      var p = Object.defineProperty;
      var S = Object.defineProperties;
      var D = Object.getOwnPropertyDescriptor;
      var H = Object.getOwnPropertyDescriptors;
      var A = Object.getOwnPropertyNames;
      var f = Object.getOwnPropertySymbols;
      var M = Object.prototype.hasOwnProperty;
      var O = Object.prototype.propertyIsEnumerable;
      var k = (n, e, t) => e in n ? p(n, e, { enumerable: true, configurable: true, writable: true, value: t }) : n[e] = t;
      var b = (n, e) => {
        for (var t in e || (e = {}))
          M.call(e, t) && k(n, t, e[t]);
        if (f)
          for (var t of f(e))
            O.call(e, t) && k(n, t, e[t]);
        return n;
      };
      var w = (n, e) => S(n, H(e));
      var R = (n, e) => {
        for (var t in e)
          p(n, t, { get: e[t], enumerable: true });
      };
      var $ = (n, e, t, s) => {
        if (e && typeof e == "object" || typeof e == "function")
          for (let i of A(e))
            !M.call(n, i) && i !== t && p(n, i, { get: () => e[i], enumerable: !(s = D(e, i)) || s.enumerable });
        return n;
      };
      var N = (n) => $(p({}, "__esModule", { value: true }), n);
      var d = (n, e, t) => new Promise((s, i) => {
        var o = (r) => {
          try {
            c(t.next(r));
          } catch (a) {
            i(a);
          }
        }, u = (r) => {
          try {
            c(t.throw(r));
          } catch (a) {
            i(a);
          }
        }, c = (r) => r.done ? s(r.value) : Promise.resolve(r.value).then(o, u);
        c((t = t.apply(n, e)).next());
      });
      var I = {};
      R(I, { ErrorCode: () => y, EventVersion: () => h, Hypercast: () => v, MessageType: () => l, Operator: () => E });
      module.exports = N(I);
      var m = () => {
        let n = {};
        return { emit(e, t) {
          (n[e] || []).map((s) => s(t));
        }, on(e, t) {
          n[e] = (n[e] || []).concat(t);
          let s = false;
          return () => {
            s || (n[e].splice(n[e].indexOf(t), 1), s = true);
          };
        } };
      };
      var V = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
      var x = (n = 21) => {
        let e = "", t = n;
        for (; t--; )
          e += V[Math.random() * 64 | 0];
        return e;
      };
      var y = ((t) => (t.Error = "error", t.InvalidMessage = "invalid_message", t))(y || {});
      var l = ((i) => (i.Error = "error", i.Message = "message", i.Connect = "connect", i.Ack = "ack", i))(l || {});
      var h = ((e) => (e.V1 = "2023-01-23", e))(h || {});
      function C(n, e) {
        return e ? `${JSON.stringify(n)}::${typeof e == "string" ? e : JSON.stringify(e)}` : JSON.stringify(n);
      }
      var g = "hypercast@0.2.0";
      var v = class {
        constructor(e, t = "https://hypercast.dev") {
          this.version = "0.2.0";
          this.connected = false;
          this.connecting = false;
          this.events = m();
          this.internalEvents = m();
          this.on = this.events.on;
          let s = new URL(t), o = s.protocol === "https:" ? `wss://${s.host}` : `ws://${s.host}`;
          this.topic = e, this.host = t, this.socketUri = o;
        }
        connect() {
          return d(this, null, function* () {
            if (this.connecting || this.connected)
              return;
            this.connecting = true, this.socket = new WebSocket(`${this.socketUri}/topic/connect/${this.topic}`), this.socket.addEventListener("close", () => {
              this.handleDisconnect();
            }), this.socket.addEventListener("error", (s) => {
              console.error(`${g} received an unexpected error`, s);
            }), this.socket.addEventListener("message", (s) => {
              let i = this.deserialize(s.data.toString());
              switch (i.type) {
                case "message":
                  this.events.emit("message", i);
                  break;
                case "error":
                  this.events.emit("error", i);
                  break;
                case "ack":
                  this.internalEvents.emit("ack", i);
                  break;
                case "connect":
                  this.events.emit("connect", i), this.internalEvents.emit("connect", i);
                  break;
              }
            });
            let e = setTimeout(() => {
              throw this.connected = false, this.connecting = false, new Error(`${g} failed to connect to the server`);
            }, 2e3), t = this.internalEvents.on("connect", (s) => {
              this.connected = true, this.connecting = false, this.id = s.data.clientId, clearTimeout(e), t();
            });
          });
        }
        send(e) {
          return d(this, null, function* () {
            return this.connected || (yield this.connect()), new Promise((t, s) => {
              var r;
              let i = { id: x(64), type: "message", version: "2023-01-23", sentAt: Date.now(), clientVersion: this.version, originatingClientId: this.id }, o = JSON.stringify(e), u = setTimeout(() => s(`${g} message send timed out`), 1e4), c = this.internalEvents.on("ack", (a) => {
                a.id === i.id && (c(), clearTimeout(u), t(void 0));
              });
              (r = this.socket) == null || r.send(C(i, o));
            });
          });
        }
        disconnect(e = 1e3) {
          if (!this.socket)
            throw new Error(`${g} cannot disconnect before the connection is established`);
          this.socket.close(e), this.handleDisconnect();
        }
        handleDisconnect() {
          this.socket = void 0, this.connected = false, this.connecting = false, this.id = void 0, this.events.emit("disconnect"), console.log(this);
        }
        deserialize(e) {
          let [t, s] = e.split("::"), i = JSON.parse(t), o = s ? JSON.parse(s) : void 0;
          return w(b({}, i), { data: o });
        }
      };
      var E = class {
        constructor(e = "https://hypercast.dev") {
          this.version = "0.2.0";
          this.host = e;
        }
        connect(e) {
          return new v(e, this.host);
        }
        createTopic(e) {
          return d(this, null, function* () {
            let { topic: t } = yield fetch(`${this.host}/topic/create/${e || ""}`, { headers: { "x-hypercast-client-version": this.version } }).then((s) => s.json());
            return { topic: t };
          });
        }
      };
    }
  });

  // index.ts
  var import_client = __toESM(require_client());
  var operator = new import_client.Operator();
  function truncate(value) {
    return value.slice(0, 4) + "..." + value.slice(-8);
  }
  function timestamp() {
    return (/* @__PURE__ */ new Date()).toISOString().split("T")[1].slice(0, 8);
  }
  (async () => {
    const status = document.getElementById("status");
    const form = document.getElementById("form");
    const messages = document.getElementById("messages");
    if (!status || !form || !messages) {
      return;
    }
    const { topic } = await operator.createTopic("hypercast-demo");
    const hypercast = new import_client.Hypercast(topic);
    window.hypercast = hypercast;
    hypercast.on("connect", (e) => {
      status.innerHTML = `Status: Connected @ ${truncate(e.data.clientId)}`;
    });
    hypercast.on("message", (e) => {
      messages.innerHTML = `
      <div class='pb2 mono f aic jcb'>
        <span class='blue'>${e.data.message}</span>
        <span class='gray'>${timestamp()}</span>
      </div>
    ` + messages.innerHTML;
    });
    await hypercast.connect();
    form.onsubmit = async (e) => {
      e.preventDefault();
      const message = e.target.elements?.message.value;
      if (!message)
        return;
      await hypercast.send({ message });
      e.target.reset();
    };
  })();
})();
