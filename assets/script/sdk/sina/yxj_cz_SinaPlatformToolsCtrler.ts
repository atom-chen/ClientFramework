import IPlatformToolsCtrler from "../../../../packages/fw-gjj/FrameWork/fw_gjj_framework/sdk/fw_gjj_IPlatformToolsCtrler";
export default class SinaPlatformToolsCtrler implements IPlatformToolsCtrler {
    showKefu() { }
    showImage(url: string) { }
    jumpApp(appId: string, path?: string, extraData?: PathObj, onCpl?: (failReason?: string) => void, envVersion?: "develop" | "trial" | "release") {
        console.log('------跳转', appId);
        wb.navigateToMiniProgram({
            appId,
            query: '',
            path,
            extraData,
            success: () => onCpl(),
            fail: () => onCpl("跳转失败"),
        });
    }
}