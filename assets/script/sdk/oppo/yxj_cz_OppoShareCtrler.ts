import IShareCtrler, { ShareResult, ShareInfo } from "../../../../packages/fw-gjj/FrameWork/fw_gjj_framework/sdk/fw_gjj_IShareCtrler";

export default class OppoShareCtrler implements IShareCtrler {
    constructor() {  }

    share(shareInfo: ShareInfo, onCpl?: (rsl: ShareResult) => void): void;
    share(shareInfo: ShareInfo, pos?: string, onCpl?: (rsl: ShareResult) => void): void;
    share(shareInfo: ShareInfo, posOrCpl?: string | { (rsl: ShareResult): void }, onCpl?: (rsl: ShareResult) => void): void {
       
    }
}