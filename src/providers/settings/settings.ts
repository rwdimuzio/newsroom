import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { CacheService } from "ionic-cache";



@Injectable()
export class SettingsProvider {
    SETTINGS_KEY: string = "settings";
    SETTINGS_GROUP: string = "settings";
    TTL = 10 * 365 * 24 * 60 * 60; // 10 year time to live

    constructor(public cache: CacheService, public platform: Platform) {
    }

    clear(): Promise<any> {
        return this.cache.clearGroup(this.SETTINGS_GROUP);
    }

    getValue(key: string): Promise<any> {
        return this.cache.getItem(key).then(res => {
            console.log('getValue');
            console.log(res);
            return JSON.parse(res);
        });
    }

    setValue(key: string, value: any): Promise<any> {
        let jsonObj = JSON.stringify(value);
        console.log("setValue: " + key + " ->" + jsonObj);
        return this.cache.saveItem(key, jsonObj, this.SETTINGS_GROUP, this.TTL);
    }

}
