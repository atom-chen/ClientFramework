import { UserVo } from "./UserVo";
import { SwitchVo } from "./SwitchVo";
import { Manager } from "../util/Manager";
import { StorageID } from "../StorageID";
import { Const } from "../config/Const";
import { Notifier } from "../framework/notify/Notifier";
import { ListenID } from "../ListenID";

let generateRoleTag = (function genTag() {
    var tag = 1;
    function a() { tag += 1; return tag; };
    return a;
})();

export class VoManager {
    private static _instance: VoManager = null;
    private _userVo: UserVo;
    private _switchVo: SwitchVo;
    public isGetData: boolean = false;
    public static get getInstance(): VoManager {
        if (VoManager._instance == null) {
            VoManager._instance = new VoManager();
        }
        return VoManager._instance;
    }

    public constructor() {
        this._userVo = new UserVo();
        this._switchVo = new SwitchVo();
    }

    public get switchVo(): SwitchVo {
        return this._switchVo;
    }
    public get userVo(): UserVo {
        return this._userVo;
    }

    public uodateSwitchVo(res: Object) {
        this.switchVo.updateSwitchVo(res);
    }

    public saveUserData(): Promise<any> | void {
        if (!this.isGetData) return;
        let data = this.userVo.serializeAll();
        this.updateLocalUserData(data);
    }

    public updateLocalUserData(data: string) {
        try {
            let newdata = data;
            if (data == "" || data == null) {
                newdata = this.userVo.serializeAll();
            }
            Manager.storage.setString(StorageID.UserData, newdata);
        } catch (error) {
            console.error(error);
        }
    }

    public getLocalData(key?: string) {
        let a = Manager.storage.getString(StorageID.UserData, "{}");
        return JSON.parse(a);
    }

    public getGold(): number {
        return this._userVo.gold;
    }

    public setGold(gold: number, from: number = 0) {
        this._userVo.gold += gold;
        Notifier.send(ListenID.Game_UpdateGold, gold, from)
    }

    public setDiamond(diamond, from: number = 0) {
        this._userVo.diamond += diamond;
        Notifier.send(ListenID.Game_UpdateDiamond, diamond, from);
    }

    public getNewId(): number {
        return generateRoleTag();
    }
}