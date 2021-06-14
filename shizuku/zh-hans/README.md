---
home: true
heroImage: /logo.png
actionText: 了解更多
actionLink: /zh-hans/introduction.html
features:
- title: 优雅地使用系统 API
  details: 忘掉 root shell 吧，你可以「直接使用」需要高权限的 API。此外，Shizuku 比 shell 要快得多。
- title: 支持 adb 使用
  details: 如果你的「需要 root 的应用」只需要 adb 权限，则可以使用 Shizuku 轻松地扩大用户群体。
- title: 节省时间
  details: Shizuku 有详细的文档引导用户，你只需要让用户安装 Shizuku。
footer: Copyright © 2019 RikkaApps
---

### 就像是系统应用一样简单

```java
private static final IPackageManager PACKAGE_MANAGER = IPackageManager.Stub.asInterface(
    new ShizukuBinderWrapper(SystemServiceHelper.getSystemService("package")));

public static void grantRuntimePermission(String packageName, String permissionName, int userId) {
    try {
        PACKAGE_MANAGER.grantRuntimePermission(packageName, permissionName, userId);
    } catch (RemoteException tr) {
        throw new RuntimeException(tr.getMessage(), tr);
    }
}
```

::: tip

还有一些步骤要做，比如检查权限或 Shizuku 是否正在运行。
:::