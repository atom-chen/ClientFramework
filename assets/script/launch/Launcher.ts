import { Time } from "../framework/manager/Time";
import { Manager } from "../framework/manager/Manager";
import { UILauncher } from "./UILauncher";
import { NetLauncher } from "./NetLauncher";
import { ModuleLauncher } from "./ModuleLauncher";
import { SdkLauncher } from "./SdkLauncher";
import { Notifier } from "../framework/notify/Notifier";
import { FuncDefine } from "../config/FuncCfg";
import { MVC } from "../framework/MVC";
import { NotifyID } from "../framework/notify/NotifyID";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Launcher extends cc.Component {

    onLoad() {
        cc.game.addPersistRootNode(this.node);
    }
    start() {
        new UILauncher();
        new NetLauncher();
        new ModuleLauncher();
        new SdkLauncher();
        this.onTest();
    }

    update(dt) {
        Time.update(dt);
        Manager.loader.update(dt);
    }

    onTest() {
        // let args = new MVC.OpenArgs();
        // args.setId(FuncDefine.Login)
        // Notifier.send(NotifyID.Func_Open, args);
        let start = Date.now();
        let a = 0;
        for (let i = 0; i < 100000; i++) {
            if (i % 2 == 0) {
                a++;
            }
        }
        let end = Date.now();
        console.log(end - start);
    }
}
