define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var KeyedCollection = (function () {
        function KeyedCollection() {
            this.items = {};
            this.count = 0;
            /*
        
             public Keys(): string[] {
             return Object.keys(this.items);
             }
        
             public Values(): string[] {
             return Object.values(this.items);
             }
             */
        }
        KeyedCollection.prototype.ContainsKey = function (key) {
            return this.items.hasOwnProperty(key);
        };
        KeyedCollection.prototype.Count = function () {
            return this.count;
        };
        KeyedCollection.prototype.Add = function (key, value) {
            this.items[key] = value;
            this.count++;
        };
        KeyedCollection.prototype.Isset = function (key) {
            if (typeof this.items[key] == 'undefined')
                return false;
            else
                return true;
        };
        KeyedCollection.prototype.Remove = function (key) {
            var val = this.items[key];
            delete this.items[key];
            this.count--;
            return val;
        };
        KeyedCollection.prototype.Item = function (key) {
            return this.items[key];
        };
        KeyedCollection.prototype.Keys = function () {
            var keySet = [];
            for (var prop in this.items) {
                if (this.items.hasOwnProperty(prop)) {
                    keySet.push(prop);
                }
            }
            return keySet;
        };
        KeyedCollection.prototype.Values = function () {
            var values = [];
            for (var prop in this.items) {
                if (this.items.hasOwnProperty(prop)) {
                    values.push(this.items[prop]);
                }
            }
            return values;
        };
        return KeyedCollection;
    }());
    exports.KeyedCollection = KeyedCollection;
});
//# sourceMappingURL=KeyedCollection.js.map