import { Notifier } from "../../framework/notify/Notifier";
import { ListenID } from "../../ListenID";
import { MVC } from "../../framework/MVC";
import { NotifyID } from "../../framework/notify/NotifyID";
import { CallID } from "../../CallID";
import { ListView, DataAdapter } from "../../component/ListView";
import { Log } from "../../framework/Log";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {

    start() {
        Notifier.addListener(ListenID.Game_FinishUI, this.finishOneUI, this);
        Notifier.addListener(ListenID.Game_AddOpenUI, this.addOpenUI, this);
        if (wonderSdk.isTest) {
            let cheatobj = new MVC.OpenArgs();
            cheatobj.setUiLayer(MVC.eUILayer.Loading);
            Notifier.send(NotifyID.Func_Open, "ui/cheat/CheatView", cheatobj);
        }
        Notifier.send(ListenID.Common_OpenCurrencyView);
        let obj = new MVC.OpenArgs();
        obj.setUiLayer(MVC.eUILayer.Main)
        Notifier.send(ListenID.Travel_OpenHomeView, obj);
        // Notifier.send(ListenID.Idiom_OpenView, obj);

        this.initOpenList();
    }
    public checkOffline() {
        let reward = Notifier.call(CallID.Compose_OfflineReward);//首次进入游戏的离线收益
        if (reward > 0) {
            this.addOpenUI(() => {
                let offobj = new MVC.OpenArgs();
                offobj.setUiLayer(MVC.eUILayer.Popup).setTransition(MVC.eTransition.EaseScale).setParam({ gold: reward });
                Notifier.send(ListenID.Compose_OpenOfflineView, offobj);
            });
        }
    }
    public openList: Function[] = [];
    public nofinishOpenUI: number = 0;
    public initOpenList() {
        this.nofinishOpenUI = 0;
        this.checkOffline();
    }
    public addOpenUI(func: Function) {
        Log.log("addOpenUI", this.nofinishOpenUI, this.openList.length);
        if (func) {
            this.openList.push(func);
            if (this.nofinishOpenUI <= 0 && this.openList.length == 1) {
                this.openUIList();
            }
        }
    }
    public openUIList() {
        let cb = this.openList.shift();
        cb && cb();
        this.nofinishOpenUI++;
    }
    public finishOneUI() {
        this.nofinishOpenUI--;
        if (this.nofinishOpenUI < 0) this.nofinishOpenUI = 0;
        if (this.openList.length > 0 && this.nofinishOpenUI <= 0) {
            this.openUIList();
        }
    }
    update(dt) {
    }
}