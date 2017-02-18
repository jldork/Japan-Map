import { action, extendObservable } from "mobx";

class JapanStore {
    constructor() {
        extendObservable(this, {
            selected: {
                "en": "Japan",
                "jp": "日本"
            },
            scale: 1500,
            coords: {
                latitude: 35.5,
                longitude: 138.5
            },
            update_prefecture: action((value) => {
                if (value) {
                    this.selected = {
                        "en": value["name"],
                        "jp": value["name_local"]
                    }
                } else {
                    this.selected = {
                        "en": "Japan",
                        "jp": "日本"
                    };
                }
            })
        })
    }
};

export default new JapanStore();